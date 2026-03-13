import { Redis } from '@upstash/redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type {
  ExerciseResult,
  HomeworkSubmission,
  LessonProgress,
  ProgressSubmissionPayload,
  UserProgress,
} from '../src/types/progress';

const redis = Redis.fromEnv();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // Check that Redis env vars are configured
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return res.status(503).json({
      error:
        'Redis not configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel env vars',
    });
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    /* ── GET /api/progress?userId=1 ── */
    if (req.method === 'GET') {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: 'userId required' });

      const data = await redis.get<UserProgress>(`progress:${userId}`);
      return res.json(data ?? null);
    }

    /* ── POST /api/progress — save exercise result ── */
    if (req.method === 'POST') {
      const body = req.body as ProgressSubmissionPayload;
      if (!body.userId || !body.lessonId || !body.exerciseId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Get existing progress or create new
      const key = `progress:${body.userId}`;
      const existing = (await redis.get<UserProgress>(key)) ?? {
        userId: body.userId,
        userName: body.userName,
        lessonResults: {},
        totalPoints: 0,
        lastUpdated: '',
      };

      // Update lesson
      const lesson: LessonProgress = existing.lessonResults[body.lessonId] ?? {
        exercises: {},
        totalScore: 0,
        maxTotalScore: 0,
      };

      let exerciseResult: ExerciseResult;

      if (body.type === 'homework') {
        const existingExercise = lesson.exercises[body.exerciseId];
        const nextSubmission: HomeworkSubmission = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          title: body.title,
          code: body.code,
          submittedAt: new Date().toISOString(),
          output: body.output,
        };

        exerciseResult = {
          score: existingExercise?.score ?? 0,
          maxScore: existingExercise?.maxScore ?? 0,
          wrong: existingExercise?.wrong,
          answers: existingExercise?.answers,
          submissions: [
            ...(existingExercise?.submissions ?? []),
            nextSubmission,
          ],
          completedAt: nextSubmission.submittedAt,
        };
      } else {
        exerciseResult = {
          score: body.score,
          maxScore: body.maxScore,
          wrong: body.wrong,
          answers: body.answers,
          completedAt: new Date().toISOString(),
        };
      }

      lesson.exercises[body.exerciseId] = exerciseResult;

      // Recalculate lesson totals
      lesson.totalScore = Object.values(lesson.exercises).reduce(
        (sum, e) => sum + e.score,
        0,
      );
      lesson.maxTotalScore = Object.values(lesson.exercises).reduce(
        (sum, e) => sum + e.maxScore,
        0,
      );

      existing.lessonResults[body.lessonId] = lesson;

      // Recalculate grand total
      existing.totalPoints = Object.values(existing.lessonResults).reduce(
        (sum, l) => sum + l.totalScore,
        0,
      );
      existing.userName = body.userName;
      existing.lastUpdated = new Date().toISOString();

      await redis.set(key, existing);

      // Track this user ID in the index
      await redis.sadd('progress:user_ids', body.userId);

      return res.json(existing);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Progress API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
