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

export interface HomeworkReaction {
  id: string;
  emoji: string;
  reactorId: number;
  reactorName: string;
  createdAt: string;
}

export interface HomeworkTeacherMessage {
  id: string;
  teacherId: number;
  teacherName: string;
  message: string;
  createdAt: string;
  reactions?: HomeworkReaction[];
}

export interface HomeworkSubmission {
  id: string;
  title: string;
  code: string;
  submittedAt: string;
  output?: HomeworkOutputLine[];
  reactions?: HomeworkReaction[];
  teacherMessages?: HomeworkTeacherMessage[];
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

export interface AddHomeworkTeacherMessagePayload {
  type: 'homework-message';
  userId: number;
  submissionId: string;
  teacherId: number;
  teacherName: string;
  message: string;
}

export interface AddHomeworkReactionPayload {
  type: 'homework-reaction';
  userId: number;
  submissionId: string;
  reactorId: number;
  reactorName: string;
  emoji: string;
}

export interface AddHomeworkMessageReactionPayload {
  type: 'homework-message-reaction';
  userId: number;
  submissionId: string;
  messageId: string;
  reactorId: number;
  reactorName: string;
  emoji: string;
}

export interface LeaderboardEntry {
  userId: number;
  userName: string;
  totalPoints: number;
  rank: number;
}

export type ProgressSubmissionPayload =
  | SubmitResultPayload
  | SubmitHomeworkPayload
  | AddHomeworkTeacherMessagePayload
  | AddHomeworkReactionPayload
  | AddHomeworkMessageReactionPayload;
