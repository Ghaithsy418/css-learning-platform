import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
  type MessagePayload,
} from 'firebase/messaging';

interface FirebaseRuntimeConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  vapidKey?: string;
}

function normalizeEnvValue(raw: unknown) {
  if (typeof raw !== 'string') return undefined;

  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function normalizeVapidKey(raw: unknown) {
  const value = normalizeEnvValue(raw);
  if (!value) return undefined;
  return value.replace(/\s+/g, '');
}

function parseRuntimeConfig(raw: Partial<Record<string, unknown>>) {
  const apiKey = normalizeEnvValue(raw.apiKey);
  const authDomain = normalizeEnvValue(raw.authDomain);
  const projectId = normalizeEnvValue(raw.projectId);
  const storageBucket = normalizeEnvValue(raw.storageBucket);
  const messagingSenderId = normalizeEnvValue(raw.messagingSenderId);
  const appId = normalizeEnvValue(raw.appId);

  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !storageBucket ||
    !messagingSenderId ||
    !appId
  ) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    vapidKey: normalizeVapidKey(raw.vapidKey),
  } satisfies FirebaseRuntimeConfig;
}

function isValidVapidPublicKey(vapidKey: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(vapidKey)) {
    return false;
  }

  try {
    const base64 = vapidKey.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const decoded = atob(base64 + padding);

    // VAPID public key must be uncompressed P-256 public key (65 bytes).
    return decoded.length === 65;
  } catch {
    return false;
  }
}

let runtimeConfigPromise: Promise<FirebaseRuntimeConfig | null> | null = null;

async function getRuntimeFirebaseConfig() {
  if (!runtimeConfigPromise) {
    runtimeConfigPromise = (async () => {
      try {
        const response = await fetch('/api/firebase-config');
        if (response.ok) {
          const config = parseRuntimeConfig(await response.json());
          if (config) return config;
        }
      } catch {
        // Fallback to build-time variables.
      }

      return parseRuntimeConfig({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
    })();
  }

  return runtimeConfigPromise;
}

async function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  const config = await getRuntimeFirebaseConfig();
  if (!config) {
    return null;
  }

  return initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  });
}

async function getMessagingInstance() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    return null;
  }

  if (!(await isSupported())) {
    return null;
  }

  const app = await getFirebaseApp();
  if (!app) {
    return null;
  }

  return getMessaging(app);
}

async function saveTokenToRedis(userId: number, token: string) {
  const response = await fetch('/api/notification-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, token }),
  });

  if (!response.ok) {
    throw new Error('Failed to save notification token');
  }
}

export async function registerForPushNotifications(userId: number) {
  const runtimeConfig = await getRuntimeFirebaseConfig();
  if (!runtimeConfig) {
    return null;
  }

  const vapidKey = runtimeConfig.vapidKey;
  if (!vapidKey || !isValidVapidPublicKey(vapidKey)) {
    console.error(
      'Invalid Firebase VAPID key. Check VITE_FIREBASE_VAPID_KEY format in Vercel env vars.',
    );
    return null;
  }

  const messaging = await getMessagingInstance();
  if (!messaging) {
    return null;
  }

  const permissionKey = `ta3allam_notifications_prompted:${userId}`;
  let permission = Notification.permission;

  if (permission === 'default' && !localStorage.getItem(permissionKey)) {
    localStorage.setItem(permissionKey, '1');
    permission = await Notification.requestPermission();
  }

  if (permission !== 'granted') {
    return null;
  }

  const registration = await navigator.serviceWorker.register(
    '/firebase-messaging-sw.js',
  );
  let token: string | null;
  try {
    token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });
  } catch (error) {
    console.error('Push registration failed during getToken():', error);
    return null;
  }

  if (!token) {
    return null;
  }

  await saveTokenToRedis(userId, token);
  return token;
}

export async function listenForForegroundNotifications(
  handler: (payload: MessagePayload) => void,
) {
  const messaging = await getMessagingInstance();
  if (!messaging) {
    return null;
  }

  return onMessage(messaging, handler);
}
