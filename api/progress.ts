import type { VercelRequest, VercelResponse } from '@vercel/node';
import type {
  AddHomeworkMessageReactionPayload,
  AddHomeworkReactionPayload,
  AddHomeworkTeacherMessagePayload,
  ExerciseResult,
  HomeworkReaction,
  HomeworkSubmission,
  HomeworkTeacherMessage,
  LessonProgress,
  ProgressSubmissionPayload,
  UserProgress,
} from '../src/types/progress';
import {
  getRedisClient,
  getRedisConfigurationErrorMessage,
  isRedisAuthOrConfigError,
} from './_lib/redis';
const HOMEWORK_LESSON_ID = 'js-homework';
const HOMEWORK_EXERCISE_ID = 'submission-history';

function pushReaction(
  existing: HomeworkReaction[] | undefined,
  reaction: HomeworkReaction,
) {
  return [...(existing ?? []), reaction];
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
      if (!body.userId) {
        return res.status(400).json({ error: 'Missing userId' });
      }

      if (
        body.type === 'homework-message' ||
        body.type === 'homework-reaction' ||
        body.type === 'homework-message-reaction'
      ) {
        const lessonId = HOMEWORK_LESSON_ID;
        const exerciseId = HOMEWORK_EXERCISE_ID;
        const key = `progress:${body.userId}`;
        const existing = (await redis.get<UserProgress>(key)) ?? {
          userId: body.userId,
          userName: '',
          lessonResults: {},
          totalPoints: 0,
          lastUpdated: '',
        };

        const lesson: LessonProgress = existing.lessonResults[lessonId] ?? {
          exercises: {},
          totalScore: 0,
          maxTotalScore: 0,
        };

        const exercise = lesson.exercises[exerciseId];
        if (!exercise?.submissions?.length) {
          return res
            .status(404)
            .json({ error: 'Homework submission not found' });
        }

        const nextSubmissions = exercise.submissions.map((submission) => {
          if (submission.id !== body.submissionId) {
            return submission;
          }

          if (body.type === 'homework-message') {
            const msgPayload = body as AddHomeworkTeacherMessagePayload;
            const teacherMessage: HomeworkTeacherMessage = {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              teacherId: msgPayload.teacherId,
              teacherName: msgPayload.teacherName,
              message: msgPayload.message,
              createdAt: new Date().toISOString(),
              reactions: [],
            };

            return {
              ...submission,
              teacherMessages: [
                ...(submission.teacherMessages ?? []),
                teacherMessage,
              ],
            };
          }

          if (body.type === 'homework-reaction') {
            const reactionPayload = body as AddHomeworkReactionPayload;
            const reaction: HomeworkReaction = {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              emoji: reactionPayload.emoji,
              reactorId: reactionPayload.reactorId,
              reactorName: reactionPayload.reactorName,
              createdAt: new Date().toISOString(),
            };
            return {
              ...submission,
              reactions: pushReaction(submission.reactions, reaction),
            };
          }

          const messageReactionPayload =
            body as AddHomeworkMessageReactionPayload;
          const reaction: HomeworkReaction = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            emoji: messageReactionPayload.emoji,
            reactorId: messageReactionPayload.reactorId,
            reactorName: messageReactionPayload.reactorName,
            createdAt: new Date().toISOString(),
          };

          return {
            ...submission,
            teacherMessages: (submission.teacherMessages ?? []).map(
              (message) =>
                message.id === messageReactionPayload.messageId
                  ? {
                      ...message,
                      reactions: pushReaction(message.reactions, reaction),
                    }
                  : message,
            ),
          };
        });

        lesson.exercises[exerciseId] = {
          ...exercise,
          submissions: nextSubmissions,
          completedAt: new Date().toISOString(),
        };

        lesson.totalScore = Object.values(lesson.exercises).reduce(
          (sum, e) => sum + e.score,
          0,
        );
        lesson.maxTotalScore = Object.values(lesson.exercises).reduce(
          (sum, e) => sum + e.maxScore,
          0,
        );

        existing.lessonResults[lessonId] = lesson;
        existing.totalPoints = Object.values(existing.lessonResults).reduce(
          (sum, l) => sum + l.totalScore,
          0,
        );
        existing.lastUpdated = new Date().toISOString();

        await redis.set(key, existing);
        await redis.sadd('progress:user_ids', body.userId);

        return res.json(existing);
      }

      if (!body.lessonId || !body.exerciseId) {
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
    if (isRedisAuthOrConfigError(err)) {
      return res.status(503).json({
        error:
          'Redis auth/config failed — verify matching URL+TOKEN env pair in Vercel',
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
