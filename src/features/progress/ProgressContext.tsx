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
  AddHomeworkMessageReactionPayload,
  AddHomeworkReactionPayload,
  ExerciseResult,
  HomeworkOutputLine,
  HomeworkReaction,
  HomeworkSubmission,
  LessonProgress,
  SubmitHomeworkPayload,
  SubmitResultPayload,
  UserProgress,
} from '../../types/progress';
import { useAuth } from '../auth/AuthContext';
import { advancedJsQuizzes } from '../quiz/advancedJsQuizData';
import { jsQuizzes } from '../quiz/jsQuizData';

const HOMEWORK_LESSON_ID = 'js-homework';
const HOMEWORK_EXERCISE_ID = 'submission-history';

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
  submitHomework: (
    title: string,
    code: string,
    output?: HomeworkOutputLine[],
  ) => Promise<void>;
  getHomeworkSubmissions: () => HomeworkSubmission[];
  reactToHomework: (submissionId: string, emoji: string) => Promise<void>;
  reactToTeacherMessage: (
    submissionId: string,
    messageId: string,
    emoji: string,
  ) => Promise<void>;
  totalPoints: number;
}

const ProgressContext = createContext<ProgressState | undefined>(undefined);

const LS_KEY = 'ta3allam_progress';
const FORCE_REMOTE_API_IN_LOCAL =
  import.meta.env.VITE_USE_REMOTE_API_IN_LOCAL === 'true';

function isLocalhost() {
  return (
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1')
  );
}

/* ── Helpers — localStorage fallback for local dev ── */
function isApiAvailable() {
  if (FORCE_REMOTE_API_IN_LOCAL) return true;
  // Default behavior: local dev uses localStorage fallback unless overridden.
  return !isLocalhost();
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

function createEmptyProgress(userId: number, userName: string): UserProgress {
  return {
    userId,
    userName,
    lessonResults: {},
    totalPoints: 0,
    lastUpdated: '',
  };
}

function createReaction(
  emoji: string,
  reactorId: number,
  reactorName: string,
): HomeworkReaction {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    emoji,
    reactorId,
    reactorName,
    createdAt: new Date().toISOString(),
  };
}

function normalizeProgress(
  data: UserProgress | null,
  userId: number,
  userName: string,
): UserProgress {
  if (!data) return createEmptyProgress(userId, userName);

  return {
    userId: data.userId ?? userId,
    userName: data.userName ?? userName,
    lessonResults: data.lessonResults ?? {},
    totalPoints: data.totalPoints ?? 0,
    lastUpdated: data.lastUpdated ?? '',
  };
}

function recalculateLesson(lesson: LessonProgress): LessonProgress {
  return {
    ...lesson,
    totalScore: Object.values(lesson.exercises).reduce(
      (sum, entry) => sum + entry.score,
      0,
    ),
    maxTotalScore: Object.values(lesson.exercises).reduce(
      (sum, entry) => sum + entry.maxScore,
      0,
    ),
  };
}

function recalculateProgress(progress: UserProgress): UserProgress {
  return {
    ...progress,
    totalPoints: Object.values(progress.lessonResults).reduce(
      (sum, lesson) => sum + lesson.totalScore,
      0,
    ),
    lastUpdated: new Date().toISOString(),
  };
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
            setProgress(normalizeProgress(data, user.id, user.name));
          }
        } else {
          setProgress(
            normalizeProgress(getLocalProgress(user.id), user.id, user.name),
          );
        }
      } catch {
        // Fallback to localStorage
        setProgress(
          normalizeProgress(getLocalProgress(user.id), user.id, user.name),
        );
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
        type: 'exercise',
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
      const existing = normalizeProgress(progress, user.id, user.name);
      const lesson = recalculateLesson(
        existing.lessonResults[lessonId] ?? {
          exercises: {},
          totalScore: 0,
          maxTotalScore: 0,
        },
      );

      const updatedLesson = recalculateLesson({
        ...lesson,
        exercises: {
          ...lesson.exercises,
          [exerciseId]: {
            score,
            maxScore,
            wrong,
            answers,
            completedAt: new Date().toISOString(),
          },
        },
      });

      const updatedProgress = recalculateProgress({
        ...existing,
        userName: user.name,
        lessonResults: {
          ...existing.lessonResults,
          [lessonId]: updatedLesson,
        },
      });

      setProgress(updatedProgress);
      saveLocalProgress(user.id, updatedProgress);
    },
    [user, progress],
  );

  const submitHomework = useCallback(
    async (title: string, code: string, output?: HomeworkOutputLine[]) => {
      if (!user) return;

      const payload: SubmitHomeworkPayload = {
        type: 'homework',
        userId: user.id,
        userName: user.name,
        lessonId: HOMEWORK_LESSON_ID,
        exerciseId: HOMEWORK_EXERCISE_ID,
        title,
        code,
        output,
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
            setProgress(normalizeProgress(updated, user.id, user.name));
            saveLocalProgress(
              user.id,
              normalizeProgress(updated, user.id, user.name),
            );
            return;
          }
        }
      } catch {
        /* fall through to localStorage */
      }

      const existing = normalizeProgress(progress, user.id, user.name);
      const lesson = existing.lessonResults[HOMEWORK_LESSON_ID] ?? {
        exercises: {},
        totalScore: 0,
        maxTotalScore: 0,
      };

      const existingExercise = lesson.exercises[HOMEWORK_EXERCISE_ID];
      const nextSubmission: HomeworkSubmission = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        code,
        submittedAt: new Date().toISOString(),
        output,
      };

      const updatedLesson = recalculateLesson({
        ...lesson,
        exercises: {
          ...lesson.exercises,
          [HOMEWORK_EXERCISE_ID]: {
            score: existingExercise?.score ?? 0,
            maxScore: existingExercise?.maxScore ?? 0,
            wrong: existingExercise?.wrong,
            answers: existingExercise?.answers,
            submissions: [
              ...(existingExercise?.submissions ?? []),
              nextSubmission,
            ],
            completedAt: nextSubmission.submittedAt,
          },
        },
      });

      const updatedProgress = recalculateProgress({
        ...existing,
        userName: user.name,
        lessonResults: {
          ...existing.lessonResults,
          [HOMEWORK_LESSON_ID]: updatedLesson,
        },
      });

      setProgress(updatedProgress);
      saveLocalProgress(user.id, updatedProgress);
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
        const quizConfig = jsQuizzes[lessonId] ?? advancedJsQuizzes[lessonId];
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

  const reactToHomework = useCallback(
    async (submissionId: string, emoji: string) => {
      if (!user) return;

      const payload: AddHomeworkReactionPayload = {
        type: 'homework-reaction',
        userId: user.id,
        submissionId,
        reactorId: user.id,
        reactorName: user.name,
        emoji,
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
            const normalized = normalizeProgress(updated, user.id, user.name);
            setProgress(normalized);
            saveLocalProgress(user.id, normalized);
            return;
          }
        }
      } catch {
        /* fall through to localStorage */
      }

      const existing = normalizeProgress(progress, user.id, user.name);
      const lesson = existing.lessonResults[HOMEWORK_LESSON_ID] ?? {
        exercises: {},
        totalScore: 0,
        maxTotalScore: 0,
      };
      const exercise = lesson.exercises[HOMEWORK_EXERCISE_ID];
      if (!exercise) return;

      const reaction = createReaction(emoji, user.id, user.name);
      const updatedLesson = recalculateLesson({
        ...lesson,
        exercises: {
          ...lesson.exercises,
          [HOMEWORK_EXERCISE_ID]: {
            ...exercise,
            submissions: (exercise.submissions ?? []).map((submission) =>
              submission.id === submissionId
                ? {
                    ...submission,
                    reactions: [...(submission.reactions ?? []), reaction],
                  }
                : submission,
            ),
            completedAt: new Date().toISOString(),
          },
        },
      });

      const updatedProgress = recalculateProgress({
        ...existing,
        lessonResults: {
          ...existing.lessonResults,
          [HOMEWORK_LESSON_ID]: updatedLesson,
        },
      });

      setProgress(updatedProgress);
      saveLocalProgress(user.id, updatedProgress);
    },
    [user, progress],
  );

  const reactToTeacherMessage = useCallback(
    async (submissionId: string, messageId: string, emoji: string) => {
      if (!user) return;

      const payload: AddHomeworkMessageReactionPayload = {
        type: 'homework-message-reaction',
        userId: user.id,
        submissionId,
        messageId,
        reactorId: user.id,
        reactorName: user.name,
        emoji,
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
            const normalized = normalizeProgress(updated, user.id, user.name);
            setProgress(normalized);
            saveLocalProgress(user.id, normalized);
            return;
          }
        }
      } catch {
        /* fall through to localStorage */
      }

      const existing = normalizeProgress(progress, user.id, user.name);
      const lesson = existing.lessonResults[HOMEWORK_LESSON_ID] ?? {
        exercises: {},
        totalScore: 0,
        maxTotalScore: 0,
      };
      const exercise = lesson.exercises[HOMEWORK_EXERCISE_ID];
      if (!exercise) return;

      const reaction = createReaction(emoji, user.id, user.name);
      const updatedLesson = recalculateLesson({
        ...lesson,
        exercises: {
          ...lesson.exercises,
          [HOMEWORK_EXERCISE_ID]: {
            ...exercise,
            submissions: (exercise.submissions ?? []).map((submission) =>
              submission.id === submissionId
                ? {
                    ...submission,
                    teacherMessages: (submission.teacherMessages ?? []).map(
                      (message) =>
                        message.id === messageId
                          ? {
                              ...message,
                              reactions: [
                                ...(message.reactions ?? []),
                                reaction,
                              ],
                            }
                          : message,
                    ),
                  }
                : submission,
            ),
            completedAt: new Date().toISOString(),
          },
        },
      });

      const updatedProgress = recalculateProgress({
        ...existing,
        lessonResults: {
          ...existing.lessonResults,
          [HOMEWORK_LESSON_ID]: updatedLesson,
        },
      });

      setProgress(updatedProgress);
      saveLocalProgress(user.id, updatedProgress);
    },
    [user, progress],
  );

  const getHomeworkSubmissions = useCallback((): HomeworkSubmission[] => {
    const submissions =
      progress?.lessonResults[HOMEWORK_LESSON_ID]?.exercises[
        HOMEWORK_EXERCISE_ID
      ]?.submissions ?? [];

    return [...submissions].sort(
      (left, right) =>
        new Date(right.submittedAt).getTime() -
        new Date(left.submittedAt).getTime(),
    );
  }, [progress]);

  const value = useMemo(
    () => ({
      progress,
      isLoading,
      submitResult,
      submitHomework,
      getExerciseResult,
      getHomeworkSubmissions,
      reactToHomework,
      reactToTeacherMessage,
      totalPoints,
    }),
    [
      progress,
      isLoading,
      submitResult,
      submitHomework,
      getExerciseResult,
      getHomeworkSubmissions,
      reactToHomework,
      reactToTeacherMessage,
      totalPoints,
    ],
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
