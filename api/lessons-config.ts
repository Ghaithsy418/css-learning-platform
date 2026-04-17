import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';
import {
  getRedisClient,
  getRedisConfigurationErrorMessage,
  isRedisAuthOrConfigError,
} from './_lib/redis';

const LOCKED_KEY = 'config:locked_lessons';

interface UserRecord {
  id: number;
  username: string;
  name: string;
  role: string;
}

function verifyAdmin(adminId: string): boolean {
  try {
    const usersPath = path.join(process.cwd(), 'public', 'users.json');
    const usersData: UserRecord[] = JSON.parse(
      fs.readFileSync(usersPath, 'utf-8'),
    );
    return usersData.some(
      (u) => String(u.id) === adminId && u.role === 'admin',
    );
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const redis = getRedisClient();
  if (!redis) {
    return res.status(503).json({
      error: getRedisConfigurationErrorMessage(),
    });
  }

  try {
    /* ── GET /api/lessons-config — get locked lesson IDs ── */
    if (req.method === 'GET') {
      const locked = await redis.smembers(LOCKED_KEY);
      return res.json({ locked: locked ?? [] });
    }

    /* ── POST /api/lessons-config — lock or unlock a lesson (admin only) ── */
    if (req.method === 'POST') {
      const { adminId, lessonId, action } = req.body as {
        adminId: string;
        lessonId: string;
        action: 'lock' | 'unlock';
      };

      if (!adminId || !lessonId || !action) {
        return res
          .status(400)
          .json({ error: 'adminId, lessonId, and action required' });
      }

      if (!verifyAdmin(adminId)) {
        return res.status(403).json({ error: 'Admin access required' });
      }

      if (action === 'lock') {
        await redis.sadd(LOCKED_KEY, lessonId);
      } else {
        await redis.srem(LOCKED_KEY, lessonId);
      }

      const locked = await redis.smembers(LOCKED_KEY);
      return res.json({ locked: locked ?? [] });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Lessons-config API error:', err);
    if (isRedisAuthOrConfigError(err)) {
      return res.status(503).json({
        error:
          'Redis auth/config failed — verify matching URL+TOKEN env pair in Vercel',
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
