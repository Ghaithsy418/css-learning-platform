import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserById, registerNotificationToken } from './_lib/notifications';
import {
  getRedisClient,
  getRedisConfigurationErrorMessage,
} from './_lib/redis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const redis = getRedisClient();
  if (!redis) {
    return res.status(503).json({
      error: getRedisConfigurationErrorMessage(),
    });
  }

  const { userId, token } = req.body as { userId?: number; token?: string };
  if (!userId || !token) {
    return res.status(400).json({ error: 'userId and token are required' });
  }

  const user = getUserById(Number(userId));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    await registerNotificationToken(redis, Number(userId), token);
    return res.json({ ok: true });
  } catch (error) {
    console.error('Notification token registration error:', error);
    return res.status(500).json({ error: 'Failed to register token' });
  }
}
