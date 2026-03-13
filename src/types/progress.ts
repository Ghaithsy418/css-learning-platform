/**
 * Progress type definitions — shared between client and API
 */

export interface ExerciseResult {
  score: number;
  maxScore: number;
  wrong?: string[];
  /** Exact answers the student typed, keyed by input id */
  answers?: Record<string, string>;
  submissions?: HomeworkSubmission[];
  completedAt: string; // ISO timestamp
}

export interface HomeworkOutputLine {
  type: 'log' | 'error' | 'info' | 'result';
  text: string;
}

export interface HomeworkSubmission {
  id: string;
  title: string;
  code: string;
  submittedAt: string;
  output?: HomeworkOutputLine[];
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
  type?: 'exercise';
  userId: number;
  userName: string;
  lessonId: string;
  exerciseId: string;
  score: number;
  maxScore: number;
  wrong?: string[];
  answers?: Record<string, string>;
}

export interface SubmitHomeworkPayload {
  type: 'homework';
  userId: number;
  userName: string;
  lessonId: string;
  exerciseId: string;
  title: string;
  code: string;
  output?: HomeworkOutputLine[];
}

export interface LeaderboardEntry {
  userId: number;
  userName: string;
  totalPoints: number;
  rank: number;
}

export type ProgressSubmissionPayload =
  | SubmitResultPayload
  | SubmitHomeworkPayload;
