import { Redis } from '@upstash/redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';
import type { LeaderboardEntry, UserProgress } from '../src/types/progress';

const redis = Redis.fromEnv();

interface UserRecord {
  id: number;
  username: string;
  name: string;
  role: string;
}

function shouldExcludeUser(
  user: Pick<UserRecord, 'username' | 'name'>,
): boolean {
  const normalizedUsername = user.username.trim().toLowerCase();
  const normalizedName = user.name.trim().toLowerCase();

  return (
    normalizedUsername === 'ghaith' ||
    normalizedName === 'ghaith' ||
    user.name.trim() === 'غيث'
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const usersPath = path.join(process.cwd(), 'public', 'users.json');
    const usersData: UserRecord[] = JSON.parse(
      fs.readFileSync(usersPath, 'utf-8'),
    );

    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      return res.status(503).json({ error: 'Redis not configured' });
    }

    const userIds = await redis.smembers('progress:user_ids');
    const progressMap: Record<string, UserProgress> = {};

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

    const leaderboard = usersData
      .filter((user) => user.role === 'student' && !shouldExcludeUser(user))
      .map((user) => ({
        userId: user.id,
        userName: user.name,
        totalPoints: progressMap[String(user.id)]?.totalPoints ?? 0,
      }))
      .sort((left, right) => {
        if (right.totalPoints !== left.totalPoints) {
          return right.totalPoints - left.totalPoints;
        }
        return left.userName.localeCompare(right.userName, 'ar');
      })
      .map(
        (entry, index): LeaderboardEntry => ({
          ...entry,
          rank: index + 1,
        }),
      );

    return res.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
