/**
 * Progress type definitions — shared between client and API
 */

export interface ExerciseResult {
  score: number;
  maxScore: number;
  wrong?: string[];
  /** Exact answers the student typed, keyed by input id */
  answers?: Record<string, string>;
  completedAt: string; // ISO timestamp
}

export interface LessonProgress {
  exercises: Record<string, ExerciseResult>;
  totalScore: number;
  maxTotalScore: number;
}

export interface UserProgress {
  userId: number;
  userName: string;
  lessonResults: Record<string, LessonProgress>;
  totalPoints: number;
  lastUpdated: string;
}

export interface SubmitResultPayload {
  userId: number;
  userName: string;
  lessonId: string;
  exerciseId: string;
  score: number;
  maxScore: number;
  wrong?: string[];
  answers?: Record<string, string>;
}
