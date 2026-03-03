/**
 * ProgressContext — سياق تتبع تقدم الطلاب
 * Tracks exercise scores, persists to API (Upstash Redis) or localStorage fallback
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  ExerciseResult,
  LessonProgress,
  SubmitResultPayload,
  UserProgress,
} from '../../types/progress';
import { useAuth } from '../auth/AuthContext';
import { jsQuizzes } from '../quiz/jsQuizData';

interface ProgressState {
  progress: UserProgress | null;
  isLoading: boolean;
  submitResult: (
    lessonId: string,
    exerciseId: string,
    score: number,
    maxScore: number,
    wrong?: string[],
    answers?: Record<string, string>,
  ) => Promise<void>;
  getExerciseResult: (
    lessonId: string,
    exerciseId: string,
  ) => ExerciseResult | null;
  totalPoints: number;
}

const ProgressContext = createContext<ProgressState | undefined>(undefined);

const LS_KEY = 'ta3allam_progress';

/* ── Helpers — localStorage fallback for local dev ── */
function isApiAvailable() {
  // In production (Vercel), API routes are available. Locally, they're not.
  return (
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1')
  );
}

function getLocalProgress(userId: number): UserProgress | null {
  try {
    const all = JSON.parse(localStorage.getItem(LS_KEY) ?? '{}');
    return all[userId] ?? null;
  } catch {
    return null;
  }
}

function saveLocalProgress(userId: number, data: UserProgress) {
  try {
    const all = JSON.parse(localStorage.getItem(LS_KEY) ?? '{}');
    all[userId] = data;
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

/* ── Provider ── */
export const ProgressProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /* Load progress on user change */
  useEffect(() => {
    if (!user) {
      setProgress(null);
      return;
    }

    const load = async () => {
      setIsLoading(true);
      try {
        if (isApiAvailable()) {
          const res = await fetch(`/api/progress?userId=${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setProgress(data);
          }
        } else {
          setProgress(getLocalProgress(user.id));
        }
      } catch {
        // Fallback to localStorage
        setProgress(getLocalProgress(user.id));
      }
      setIsLoading(false);
    };
    load();
  }, [user]);

  /* Submit exercise result */
  const submitResult = useCallback(
    async (
      lessonId: string,
      exerciseId: string,
      score: number,
      maxScore: number,
      wrong?: string[],
      answers?: Record<string, string>,
    ) => {
      if (!user) return;

      const payload: SubmitResultPayload = {
        userId: user.id,
        userName: user.name,
        lessonId,
        exerciseId,
        score,
        maxScore,
        wrong,
        answers,
      };

      try {
        if (isApiAvailable()) {
          const res = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            const updated: UserProgress = await res.json();
            setProgress(updated);
            // Also save locally as backup
            saveLocalProgress(user.id, updated);
            return;
          }
        }
      } catch {
        /* fall through to localStorage */
      }

      // localStorage fallback
      const existing = progress ?? {
        userId: user.id,
        userName: user.name,
        lessonResults: {},
        totalPoints: 0,
        lastUpdated: '',
      };

      const lesson: LessonProgress = existing.lessonResults[lessonId] ?? {
        exercises: {},
        totalScore: 0,
        maxTotalScore: 0,
      };

      lesson.exercises[exerciseId] = {
        score,
        maxScore,
        wrong,
        answers,
        completedAt: new Date().toISOString(),
      };

      lesson.totalScore = Object.values(lesson.exercises).reduce(
        (s, e) => s + e.score,
        0,
      );
      lesson.maxTotalScore = Object.values(lesson.exercises).reduce(
        (s, e) => s + e.maxScore,
        0,
      );

      existing.lessonResults[lessonId] = lesson;
      existing.totalPoints = Object.values(existing.lessonResults).reduce(
        (s, l) => s + l.totalScore,
        0,
      );
      existing.lastUpdated = new Date().toISOString();

      setProgress({ ...existing });
      saveLocalProgress(user.id, existing);
    },
    [user, progress],
  );

  /* Get a specific exercise result */
  const getExerciseResult = useCallback(
    (lessonId: string, exerciseId: string): ExerciseResult | null => {
      const result =
        progress?.lessonResults[lessonId]?.exercises[exerciseId] ?? null;

      if (!result) return null;

      if (exerciseId === 'quiz') {
        const quizConfig = jsQuizzes[lessonId];
        if (quizConfig) {
          const currentMaxScore = quizConfig.questions.length * 5;
          return {
            ...result,
            maxScore: currentMaxScore,
            score: Math.min(result.score, currentMaxScore),
          };
        }
      }

      return result;
    },
    [progress],
  );

  const totalPoints = progress?.totalPoints ?? 0;

  const value = useMemo(
    () => ({
      progress,
      isLoading,
      submitResult,
      getExerciseResult,
      totalPoints,
    }),
    [progress, isLoading, submitResult, getExerciseResult, totalPoints],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

/* ── Hook ── */
export const useProgress = (): ProgressState => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
};
