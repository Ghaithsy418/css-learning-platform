/**
 * StartQuizButton — زر الانتقال لصفحة الاختبار
 * Displayed at the bottom of each JS lesson
 */

import { useNavigate } from 'react-router-dom';
import { useProgress } from '../progress/ProgressContext';

interface StartQuizButtonProps {
  lessonId: string;
  lessonNum: string;
  totalQuestions: number;
}

export default function StartQuizButton({
  lessonId,
  lessonNum,
  totalQuestions,
}: StartQuizButtonProps) {
  const navigate = useNavigate();
  const { getExerciseResult } = useProgress();
  const existingResult = getExerciseResult(lessonId, 'quiz');
  const maxPoints = totalQuestions * 5;

  return (
    <div className="mt-10 mb-6">
      {/* Section divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gray-200" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap">
          📝 اختبر فهمك
        </h2>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Card */}
      <div className="bg-gradient-to-l from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 text-center">
        <p className="text-amber-800 text-lg font-bold mb-2">
          🎯 هل أنت مستعد للاختبار؟
        </p>
        <p className="text-amber-600 text-sm mb-4">
          {totalQuestions} أسئلة · {maxPoints} نقطة كحد أقصى
        </p>

        {existingResult && (
          <div className="mb-4 inline-block px-4 py-2 rounded-lg bg-white border border-amber-200 text-sm">
            <span className="text-amber-700 font-semibold">
              نتيجتك السابقة:{' '}
            </span>
            <span className="font-bold text-amber-900">
              {existingResult.score} / {existingResult.maxScore}
            </span>
            <span className="text-amber-500 text-xs mr-2">نقطة</span>
          </div>
        )}

        <div>
          <button
            onClick={() => navigate(`/js/${lessonNum}/quiz`)}
            className="px-8 py-4 bg-gradient-to-l from-amber-500 to-amber-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            🚀 ابدأ الاختبار
          </button>
        </div>
      </div>
    </div>
  );
}
