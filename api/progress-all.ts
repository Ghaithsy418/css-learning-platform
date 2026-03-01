import { Redis } from '@upstash/redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';
import type { UserProgress } from '../src/types/progress';

const redis = Redis.fromEnv();

interface UserRecord {
  id: number;
  username: string;
  name: string;
  role: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin role via query param (simple check — in production use JWT)
    const requestingUserId = req.query.adminId as string;
    if (!requestingUserId) {
      return res.status(400).json({ error: 'adminId required' });
    }

    // Check that Redis env vars are configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return res.status(503).json({ error: 'Redis not configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel env vars' });
    }

    // Read users.json to verify admin role
    const usersPath = path.join(process.cwd(), 'public', 'users.json');
    const usersData: UserRecord[] = JSON.parse(
      fs.readFileSync(usersPath, 'utf-8'),
    );
    const admin = usersData.find(
      (u) => String(u.id) === requestingUserId && u.role === 'admin',
    );
    if (!admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get all tracked user IDs from Redis
    const userIds = await redis.smembers('progress:user_ids');

    // Fetch existing progress records from Redis
    let progressMap: Record<string, UserProgress> = {};
    if (userIds && userIds.length > 0) {
      const pipeline = redis.pipeline();
      for (const id of userIds) {
        pipeline.get(`progress:${id}`);
      }
      const results = await pipeline.exec<(UserProgress | null)[]>();
      for (const record of results) {
        if (record) {
          progressMap[String(record.userId)] = record;
        }
      }
    }

    // Build response for ALL students (not just those with Redis data)
    const allProgress: UserProgress[] = usersData
      .filter((u) => u.role === 'student')
      .map((u) => {
        const existing = progressMap[String(u.id)];
        return {
          userId: u.id,
          userName: u.name, // always use name from users.json
          lessonResults: existing?.lessonResults ?? {},
          totalPoints: existing?.totalPoints ?? 0,
          lastUpdated: existing?.lastUpdated ?? '',
        };
      });

    return res.json(allProgress);
  } catch (err: any) {
    console.error('Progress-all API error:', err);
    if (err?.message?.includes('permission') || err?.code === 403) {
      return res.status(503).json({ error: 'Redis auth failed — check UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel env vars' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
