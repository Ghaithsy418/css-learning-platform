import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
  type MessagePayload,
} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function hasFirebaseClientConfig() {
  return Object.values(firebaseConfig).every(Boolean);
}

function getFirebaseApp() {
  if (!hasFirebaseClientConfig()) {
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
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

  const app = getFirebaseApp();
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
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });

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
