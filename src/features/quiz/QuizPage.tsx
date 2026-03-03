/**
 * QuizPage — صفحة اختبار مستقلة لكل درس JavaScript
 * Standalone quiz page with: Start screen → Questions → Results + Celebration
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../progress/ProgressContext';
import Confetti from './Confetti';
import QuizQuestion from './QuizQuestion';
import { jsQuizzes } from './jsQuizData';

const POINTS_PER_QUESTION = 5;

export default function QuizPage() {
  const { lessonNum } = useParams<{ lessonNum: string }>();
  const navigate = useNavigate();
  const { submitResult, getExerciseResult } = useProgress();

  const lessonId = `js-${lessonNum}`;
  const quizConfig = jsQuizzes[lessonId];

  const [phase, setPhase] = useState<'start' | 'quiz' | 'results'>('start');
  const [scores, setScores] = useState<Record<number, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [saved, setSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Existing result check
  const existingResult = getExerciseResult(lessonId, 'quiz');

  const questions = quizConfig?.questions ?? [];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(scores).length;
  const correctCount = Object.values(scores).filter(Boolean).length;
  const allAnswered = answeredCount === totalQuestions;
  const maxPoints = totalQuestions * POINTS_PER_QUESTION;
  const earnedPoints = correctCount * POINTS_PER_QUESTION;
  const normalizedExistingMax = existingResult
    ? Math.min(existingResult.maxScore, maxPoints)
    : null;
  const normalizedExistingScore = existingResult
    ? Math.min(
        existingResult.score,
        normalizedExistingMax ?? existingResult.score,
      )
    : null;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = percentage > 50;

  // Derive per-question results for the results screen
  const questionResults = useMemo(() => {
    return questions.map((q, i) => ({
      question: q.question,
      isCorrect: scores[i] ?? false,
      selectedOption:
        selectedAnswers[i] !== undefined ? q.options[selectedAnswers[i]] : '',
      correctOption: q.options[q.correctIndex],
      explanation: q.explanation,
    }));
  }, [questions, scores, selectedAnswers]);

  const handleAnswer = (
    index: number,
    isCorrect: boolean,
    selectedIndex: number,
  ) => {
    setScores((prev) => ({ ...prev, [index]: isCorrect }));
    setSelectedAnswers((prev) => ({ ...prev, [index]: selectedIndex }));
  };

  // Auto-transition to results when all answered, save progress
  useEffect(() => {
    if (allAnswered && phase === 'quiz' && !saved) {
      const wrongQuestions = Object.entries(scores)
        .filter(([, v]) => !v)
        .map(
          ([i]) => questions[Number(i)]?.question ?? `سؤال ${Number(i) + 1}`,
        );

      const answersMap: Record<string, string> = {};
      Object.entries(selectedAnswers).forEach(([i, optIdx]) => {
        const q = questions[Number(i)];
        if (q) answersMap[q.question] = q.options[optIdx] ?? '';
      });

      submitResult(
        lessonId,
        'quiz',
        earnedPoints,
        maxPoints,
        wrongQuestions,
        answersMap,
      );
      setSaved(true);

      // Delay showing results for a brief moment
      setTimeout(() => {
        setPhase('results');
        if (passed) {
          setShowConfetti(true);
        }
      }, 800);
    }
  }, [
    allAnswered,
    phase,
    saved,
    scores,
    selectedAnswers,
    questions,
    lessonId,
    earnedPoints,
    maxPoints,
    passed,
    submitResult,
  ]);

  // If no quiz config, redirect back
  if (!quizConfig) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <p className="text-6xl">❓</p>
        <p className="text-xl text-gray-700 font-bold">
          لا يوجد اختبار لهذا الدرس
        </p>
        <button
          onClick={() => navigate(`/js/${lessonNum}`)}
          className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors"
        >
          العودة للدرس
        </button>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     PHASE 1: Start Screen
  ═══════════════════════════════════════ */
  if (phase === 'start') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 max-w-lg w-full text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
            اختبار: {quizConfig.lessonTitle}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {totalQuestions} أسئلة · {maxPoints} نقطة كحد أقصى ·{' '}
            {POINTS_PER_QUESTION} نقاط لكل سؤال
          </p>

          {existingResult && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm">
              <p className="text-amber-800 font-bold">
                نتيجتك السابقة: {normalizedExistingScore} /{' '}
                {normalizedExistingMax} نقطة
              </p>
              <p className="text-amber-600 text-xs mt-1">
                يمكنك إعادة الاختبار لتحسين نتيجتك
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => {
                setScores({});
                setSelectedAnswers({});
                setSaved(false);
                setShowConfetti(false);
                setPhase('quiz');
              }}
              className="w-full px-8 py-4 bg-gradient-to-l from-amber-500 to-amber-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              🚀 ابدأ الاختبار
            </button>
            <button
              onClick={() => navigate(`/js/${lessonNum}`)}
              className="w-full px-6 py-3 text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← العودة للدرس
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     PHASE 2: Quiz Questions
  ═══════════════════════════════════════ */
  if (phase === 'quiz') {
    return (
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-6 sticky top-0 bg-gray-50 py-3 z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 font-medium">
              {answeredCount} من {totalQuestions} أسئلة
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((answeredCount / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-amber-400 to-amber-500 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(answeredCount / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-5">
          {questions.map((q, i) => (
            <div
              key={i}
              className="relative"
            >
              <div className="absolute -right-8 top-5 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center hidden sm:flex">
                {i + 1}
              </div>
              <QuizQuestion
                {...q}
                onAnswer={(isCorrect, selectedIndex) =>
                  handleAnswer(i, isCorrect, selectedIndex)
                }
              />
            </div>
          ))}
        </div>

        {/* Waiting banner after all answered */}
        {allAnswered && (
          <div className="mt-6 text-center py-6">
            <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm">جارٍ حساب النتيجة...</p>
          </div>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════
     PHASE 3: Results
  ═══════════════════════════════════════ */
  return (
    <div className="max-w-3xl mx-auto">
      <Confetti active={showConfetti} />

      {/* ── Result Card ── */}
      <div
        className={`rounded-2xl shadow-lg border-2 p-8 sm:p-10 text-center mb-8 ${
          percentage === 100
            ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300'
            : passed
              ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
        }`}
      >
        {/* Emoji & Grade */}
        <div className="text-6xl mb-4">
          {percentage === 100
            ? '🏆'
            : percentage >= 80
              ? '🎉'
              : passed
                ? '👍'
                : '💪'}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black mb-2">
          {percentage === 100
            ? 'ممتاز! علامة كاملة!'
            : percentage >= 80
              ? 'أحسنت! أداء رائع!'
              : passed
                ? 'جيد! تجاوزت الاختبار'
                : 'حاول مرة أخرى'}
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          اختبار: {quizConfig.lessonTitle}
        </p>

        {/* Score circle */}
        <div className="inline-flex flex-col items-center gap-1 mb-6">
          <div
            className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center ${
              passed ? 'border-emerald-400 bg-white' : 'border-red-400 bg-white'
            }`}
          >
            <span className="text-3xl font-black">{percentage}%</span>
            <span className="text-xs text-gray-500">
              {correctCount}/{totalQuestions}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {earnedPoints} / {maxPoints} نقطة
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setPhase('start');
              setScores({});
              setSelectedAnswers({});
              setSaved(false);
              setShowConfetti(false);
            }}
            className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors"
          >
            🔄 أعد الاختبار
          </button>
          <button
            onClick={() => navigate(`/js/${lessonNum}`)}
            className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            ← العودة للدرس
          </button>
          {Number(lessonNum) < 12 && (
            <button
              onClick={() => navigate(`/js/${Number(lessonNum)! + 1}`)}
              className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors"
            >
              الدرس التالي →
            </button>
          )}
        </div>
      </div>

      {/* ── Per-question breakdown ── */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          📊 تفاصيل الإجابات
        </h3>
        <div className="space-y-3">
          {questionResults.map((r, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 ${
                r.isCorrect
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-red-50/50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 ${
                    r.isCorrect
                      ? 'bg-emerald-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {r.isCorrect ? '✓' : '✕'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm mb-1">
                    سؤال {i + 1}: {r.question}
                  </p>
                  {!r.isCorrect && (
                    <div className="text-xs space-y-1">
                      <p className="text-red-600">إجابتك: {r.selectedOption}</p>
                      <p className="text-emerald-700">
                        الإجابة الصحيحة: {r.correctOption}
                      </p>
                    </div>
                  )}
                  {r.explanation && (
                    <p className="text-xs text-gray-500 mt-1">
                      💡 {r.explanation}
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold shrink-0">
                  {r.isCorrect ? (
                    <span className="text-emerald-600">
                      +{POINTS_PER_QUESTION}
                    </span>
                  ) : (
                    <span className="text-red-400">0</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
