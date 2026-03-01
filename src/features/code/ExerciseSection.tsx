/**
 * ExerciseSection - قسم التمرين الكامل
 * Complete exercise section wrapper with optional scoring support
 */

import { type ReactNode, useCallback, useRef, useState } from 'react';
import { useProgress } from '../progress/ProgressContext';

interface ExerciseSectionProps {
  title: string;
  children: ReactNode;
  borderColor?: 'purple' | 'amber' | 'blue';
  /** Lesson identifier for progress tracking */
  lessonId?: string;
  /** Exercise identifier for progress tracking */
  exerciseId?: string;
  /** Points available for this exercise */
  maxPoints?: number;
  /** Number of inputs in this exercise (for auto score calc) */
  inputCount?: number;
}

const borderColors = {
  purple: 'border-purple-500',
  amber: 'border-amber-500',
  blue: 'border-blue-500',
};

const bgScoreColors = {
  perfect: 'bg-emerald-50 border-emerald-300 text-emerald-700',
  good: 'bg-amber-50 border-amber-300 text-amber-700',
  low: 'bg-red-50 border-red-300 text-red-700',
};

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  title,
  children,
  borderColor = 'purple',
  lessonId,
  exerciseId,
  maxPoints,
  inputCount,
}) => {
  const { submitResult, getExerciseResult } = useProgress();
  const [validationResults, setValidationResults] = useState<
    Record<string, boolean>
  >({});
  const [answerValues, setAnswerValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const indexCounter = useRef(0);

  const canScore = lessonId && exerciseId && maxPoints && inputCount;

  // Existing result?
  const existingResult =
    lessonId && exerciseId ? getExerciseResult(lessonId, exerciseId) : null;

  const registerValidation = useCallback(
    (inputKey: string, isCorrect: boolean) => {
      setValidationResults((prev) => ({ ...prev, [inputKey]: isCorrect }));
    },
    [],
  );

  const registerAnswer = useCallback((inputKey: string, value: string) => {
    setAnswerValues((prev) => ({ ...prev, [inputKey]: value }));
  }, []);

  const handleCheck = async () => {
    if (!canScore) return;

    const results = Object.values(validationResults);
    const correct = results.filter(Boolean).length;
    const pointsPerInput = maxPoints / inputCount;
    const earned = Math.round(correct * pointsPerInput);

    const wrongList = Object.entries(validationResults)
      .filter(([, v]) => !v)
      .map(([k]) => k);

    setScore(earned);
    setSubmitted(true);

    await submitResult(
      lessonId,
      exerciseId,
      earned,
      maxPoints,
      wrongList,
      answerValues,
    );
  };

  // Generate index for child inputs
  const getNextIndex = () => {
    indexCounter.current += 1;
    return indexCounter.current;
  };

  const showExistingScore = existingResult && !submitted;
  const displayScore = submitted ? score : existingResult?.score;
  const displayMax = submitted ? maxPoints : existingResult?.maxScore;

  return (
    <ExerciseSectionContext.Provider
      value={{ registerValidation, registerAnswer, getNextIndex }}
    >
      <div
        className={`mb-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 border-r-4 ${borderColors[borderColor]}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="text-gray-800 text-2xl font-bold">{title}</h2>
          {canScore && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500">
              {maxPoints} نقطة
            </span>
          )}
        </div>
        {children}

        {/* Score / check area */}
        {canScore && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            {(showExistingScore || submitted) && displayScore != null ? (
              <div
                className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                  displayScore === displayMax
                    ? bgScoreColors.perfect
                    : displayScore! >= displayMax! / 2
                      ? bgScoreColors.good
                      : bgScoreColors.low
                }`}
              >
                <span className="font-bold text-sm">
                  {displayScore === displayMax
                    ? '🎉 ممتاز!'
                    : displayScore! >= displayMax! / 2
                      ? '👍 أحسنت!'
                      : '💪 حاول مرة أخرى'}
                </span>
                <span className="font-bold text-lg">
                  {displayScore} / {displayMax}
                </span>
              </div>
            ) : (
              <button
                onClick={handleCheck}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                }}
              >
                ✅ تحقق من الإجابة
              </button>
            )}
          </div>
        )}
      </div>
    </ExerciseSectionContext.Provider>
  );
};

/* ── Context for child CodeInputs to register validation ── */
import { createContext, useContext } from 'react';

interface ExerciseSectionContextType {
  registerValidation: (key: string, isCorrect: boolean) => void;
  registerAnswer: (key: string, value: string) => void;
  getNextIndex: () => number;
}

const ExerciseSectionContext = createContext<ExerciseSectionContextType | null>(
  null,
);

export const useExerciseSection = () => useContext(ExerciseSectionContext);
