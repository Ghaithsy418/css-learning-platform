/**
 * QuizSection — قسم الاختبار في نهاية الدرس
 * End-of-lesson quiz wrapping multiple QuizQuestion components
 * Now with progress tracking support
 */

import { useEffect, useState } from 'react';
import { useProgress } from '../progress/ProgressContext';
import QuizQuestion, { type QuizQuestionData } from './QuizQuestion';

interface QuizSectionProps {
  title?: string;
  questions: QuizQuestionData[];
  /** Lesson identifier for progress tracking */
  lessonId?: string;
  /** Exercise identifier for progress tracking */
  exerciseId?: string;
  /** Points per question (default 5) */
  pointsPerQuestion?: number;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  title = '📝 اختبر فهمك',
  questions,
  lessonId,
  exerciseId,
  pointsPerQuestion = 5,
}) => {
  const [scores, setScores] = useState<Record<number, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [saved, setSaved] = useState(false);
  const { submitResult, getExerciseResult } = useProgress();

  const answeredCount = Object.keys(scores).length;
  const correctCount = Object.values(scores).filter(Boolean).length;
  const allAnswered = answeredCount === questions.length;
  const maxPoints = questions.length * pointsPerQuestion;

  // Check existing result
  const existingResult =
    lessonId && exerciseId ? getExerciseResult(lessonId, exerciseId) : null;
  const normalizedExistingMax = existingResult
    ? Math.min(existingResult.maxScore, maxPoints)
    : null;
  const normalizedExistingScore = existingResult
    ? Math.min(
        existingResult.score,
        normalizedExistingMax ?? existingResult.score,
      )
    : null;

  const handleAnswer = (
    index: number,
    isCorrect: boolean,
    selectedIndex: number,
  ) => {
    setScores((prev) => ({ ...prev, [index]: isCorrect }));
    setSelectedAnswers((prev) => ({ ...prev, [index]: selectedIndex }));
  };

  // Auto-save when all answered
  useEffect(() => {
    if (allAnswered && lessonId && exerciseId && !saved) {
      const earnedPoints = correctCount * pointsPerQuestion;
      const wrongQuestions = Object.entries(scores)
        .filter(([, v]) => !v)
        .map(
          ([i]) => questions[Number(i)]?.question ?? `سؤال ${Number(i) + 1}`,
        );

      // Build answers map: question text → selected option text
      const answersMap: Record<string, string> = {};
      Object.entries(selectedAnswers).forEach(([i, optIdx]) => {
        const q = questions[Number(i)];
        if (q) answersMap[q.question] = q.options[optIdx] ?? '';
      });

      submitResult(
        lessonId,
        exerciseId,
        earnedPoints,
        maxPoints,
        wrongQuestions,
        answersMap,
      );
      setSaved(true);
    }
  }, [
    allAnswered,
    correctCount,
    lessonId,
    exerciseId,
    saved,
    scores,
    selectedAnswers,
    questions,
    maxPoints,
    pointsPerQuestion,
    submitResult,
  ]);

  return (
    <div className="mt-10 mb-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gray-200" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, i) => (
          <QuizQuestion
            key={i}
            {...q}
            onAnswer={(isCorrect, selectedIndex) =>
              handleAnswer(i, isCorrect, selectedIndex ?? 0)
            }
          />
        ))}
      </div>

      {/* Score summary */}
      {allAnswered && (
        <div
          className={`mt-6 p-5 rounded-xl text-center ${
            correctCount === questions.length
              ? 'bg-emerald-50 border-2 border-emerald-300'
              : correctCount >= questions.length / 2
                ? 'bg-amber-50 border-2 border-amber-300'
                : 'bg-red-50 border-2 border-red-300'
          }`}
        >
          <p className="text-2xl font-black mb-1">
            {correctCount === questions.length
              ? '🎉 ممتاز!'
              : correctCount >= questions.length / 2
                ? '👍 أحسنت!'
                : '💪 حاول مرة أخرى'}
          </p>
          <p className="text-gray-600 text-sm">
            أجبت{' '}
            <span className="font-bold text-gray-800">
              {correctCount} من {questions.length}
            </span>{' '}
            بشكل صحيح
            {lessonId && (
              <span className="block mt-1 text-xs text-gray-500">
                {correctCount * pointsPerQuestion} / {maxPoints} نقطة
                {saved && ' — ✅ تم الحفظ'}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Show existing result if quiz not yet re-taken */}
      {!allAnswered && existingResult && (
        <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200 text-center text-sm text-gray-500">
          نتيجتك السابقة:{' '}
          <span className="font-bold text-gray-700">
            {normalizedExistingScore} / {normalizedExistingMax}
          </span>{' '}
          نقطة
        </div>
      )}
    </div>
  );
};

export default QuizSection;
