/**
 * FreeCodeExercise — تمرين كتابة كود حر
 * Combines FreeCodeEditor + instructions + answer key + completion tracking
 */

import { useState } from 'react';
import ConsoleOutput from '../js/ConsoleOutput';
import { useProgress } from '../progress/ProgressContext';
import FreeCodeEditor from './FreeCodeEditor';
import { runUserJavaScript } from './runUserJavaScript';

type ConsoleLine = {
  type: 'log' | 'error' | 'info' | 'result';
  text: string;
};

interface FreeCodeExerciseProps {
  title: string;
  instructions: string;
  starterCode?: string;
  answerCode: string;
  hint?: string;
  /** Lesson identifier for progress tracking */
  lessonId?: string;
  /** Exercise identifier for progress tracking */
  exerciseId?: string;
  /** Points for completing this exercise (default 10) */
  maxPoints?: number;
}

const FreeCodeExercise: React.FC<FreeCodeExerciseProps> = ({
  title,
  instructions,
  starterCode = '',
  answerCode,
  hint,
  lessonId,
  exerciseId,
  maxPoints = 10,
}) => {
  const [completed, setCompleted] = useState(false);
  const [userCode, setUserCode] = useState(starterCode);
  const [outputLines, setOutputLines] = useState<ConsoleLine[]>([]);
  const { submitResult, getExerciseResult } = useProgress();

  const existingResult =
    lessonId && exerciseId ? getExerciseResult(lessonId, exerciseId) : null;

  const isCompleted = completed || !!existingResult;

  const handleRunCode = () => {
    setOutputLines(runUserJavaScript(userCode));
  };

  const handleClearOutput = () => {
    setOutputLines([]);
  };

  const handleComplete = async () => {
    if (!lessonId || !exerciseId || completed) return;
    setCompleted(true);
    await submitResult(lessonId, exerciseId, maxPoints, maxPoints);
  };

  return (
    <div className="mb-10 p-5 sm:p-6 bg-white rounded-xl border border-dashed border-gray-200 shadow-sm">
      {/* Header badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full">
          ✍️ تمرين كتابة
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
        {instructions}
      </p>

      {hint && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
          <span className="font-bold">💡 تلميح:</span> {hint}
        </div>
      )}

      <FreeCodeEditor
        defaultCode={starterCode}
        onCodeChange={setUserCode}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={handleRunCode}
          className="px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          ▶ شغّل الكود
        </button>
        <button
          onClick={handleClearOutput}
          disabled={outputLines.length === 0}
          className="px-5 py-2.5 rounded-lg font-bold text-sm border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🧹 مسح النتائج
        </button>
      </div>

      <ConsoleOutput
        lines={outputLines}
        label="👇 نتيجة تشغيل كودك:"
      />

      {/* Completion tracking */}
      {lessonId && exerciseId && (
        <div className="mt-4">
          {isCompleted ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-700 text-sm font-bold">
              <span>✅ تم إنهاء التمرين</span>
              <span>
                {maxPoints} / {maxPoints} نقطة
              </span>
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] bg-emerald-500 hover:bg-emerald-600"
            >
              ✓ أنهيت التمرين
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FreeCodeExercise;
