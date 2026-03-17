import { Redis } from '@upstash/redis';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import * as fs from 'fs';
import * as path from 'path';

const TOKEN_KEY_PREFIX = 'notifications:user:';

interface UserRecord {
  id: number;
  username: string;
  name: string;
  role: string;
}

interface NotificationPayload {
  title: string;
  body: string;
  link?: string;
  data?: Record<string, string>;
}

function getUsersPath() {
  return path.join(process.cwd(), 'public', 'users.json');
}

export function readUsers(): UserRecord[] {
  try {
    return JSON.parse(fs.readFileSync(getUsersPath(), 'utf-8'));
  } catch {
    return [];
  }
}

export function getUserById(userId: number) {
  return readUsers().find((user) => user.id === userId) ?? null;
}

export function getUsersByRole(role: 'student' | 'admin') {
  return readUsers().filter((user) => user.role === role);
}

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export function getPublicFirebaseConfig() {
  return {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    vapidKey: process.env.VITE_FIREBASE_VAPID_KEY,
  };
}

export async function registerNotificationToken(
  redis: Redis,
  userId: number,
  token: string,
) {
  await redis.sadd(`${TOKEN_KEY_PREFIX}${userId}`, token);
}

async function getTokensForUsers(redis: Redis, userIds: number[]) {
  const uniqueUserIds = [...new Set(userIds)];
  if (uniqueUserIds.length === 0) {
    return [] as string[];
  }

  const pipeline = redis.pipeline();
  for (const userId of uniqueUserIds) {
    pipeline.smembers(`${TOKEN_KEY_PREFIX}${userId}`);
  }

  const result = await pipeline.exec<string[][]>();
  return [...new Set(result.flat().filter(Boolean))];
}

async function removeInvalidTokens(
  redis: Redis,
  userIds: number[],
  tokens: string[],
) {
  if (tokens.length === 0) {
    return;
  }

  await Promise.all(
    [...new Set(userIds)].map((userId) =>
      redis.srem(`${TOKEN_KEY_PREFIX}${userId}`, ...tokens),
    ),
  );
}

export async function sendNotificationToUsers(
  redis: Redis,
  userIds: number[],
  payload: NotificationPayload,
) {
  const app = getFirebaseAdminApp();
  if (!app) {
    console.warn(
      'Firebase Admin is not configured; skipping notification send',
    );
    return { skipped: true, sentCount: 0 };
  }

  const tokens = await getTokensForUsers(redis, userIds);
  if (tokens.length === 0) {
    return { skipped: true, sentCount: 0 };
  }

  const data = Object.entries(payload.data ?? {}).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {});
  const link = payload.link ?? data.link ?? '/';

  const response = await getMessaging(app).sendEachForMulticast({
    tokens,
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: {
      ...data,
      link,
    },
    webpush: {
      fcmOptions: {
        link,
      },
    },
  });

  const invalidTokens = response.responses.flatMap((entry, index) => {
    const code = entry.error?.code;
    if (
      code === 'messaging/registration-token-not-registered' ||
      code === 'messaging/invalid-registration-token'
    ) {
      return [tokens[index]];
    }
    return [];
  });

  await removeInvalidTokens(redis, userIds, invalidTokens);

  return {
    skipped: false,
    sentCount: response.successCount,
  };
}

export async function sendNotificationToRole(
  redis: Redis,
  role: 'student' | 'admin',
  payload: NotificationPayload,
) {
  const userIds = getUsersByRole(role).map((user) => user.id);
  return sendNotificationToUsers(redis, userIds, payload);
}
