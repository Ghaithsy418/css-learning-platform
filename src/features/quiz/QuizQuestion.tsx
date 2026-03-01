/**
 * QuizQuestion — سؤال اختيار من متعدد
 * Multiple-choice question with feedback
 */

import { useState } from 'react';

export interface QuizQuestionData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface QuizQuestionProps extends QuizQuestionData {
  /** Called when student answers — passes true if correct, and the selected index */
  onAnswer?: (isCorrect: boolean, selectedIndex: number) => void;
}

const optionLabels = ['أ', 'ب', 'ج', 'د', 'هـ', 'و'];

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const isAnswered = selected !== null;
  const isCorrect = selected === correctIndex;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelected(index);
    onAnswer?.(index === correctIndex, index);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
      {/* Question text */}
      <p className="text-gray-800 font-semibold text-base sm:text-lg leading-relaxed mb-4">
        {question}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {options.map((option, i) => {
          const isThis = selected === i;
          const isCorrectOption = i === correctIndex;

          let borderColor = 'border-gray-200 hover:border-gray-300';
          let bg = 'bg-gray-50 hover:bg-gray-100';
          let textColor = 'text-gray-700';
          let labelBg = 'bg-gray-200 text-gray-600';

          if (isAnswered) {
            if (isCorrectOption) {
              borderColor = 'border-emerald-400';
              bg = 'bg-emerald-50';
              textColor = 'text-emerald-800';
              labelBg = 'bg-emerald-500 text-white';
            } else if (isThis && !isCorrect) {
              borderColor = 'border-red-400';
              bg = 'bg-red-50';
              textColor = 'text-red-700';
              labelBg = 'bg-red-500 text-white';
            } else {
              bg = 'bg-gray-50';
              borderColor = 'border-gray-100';
              textColor = 'text-gray-400';
              labelBg = 'bg-gray-100 text-gray-400';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-right ${borderColor} ${bg} ${textColor} ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-200 ${labelBg}`}
              >
                {optionLabels[i] ?? i + 1}
              </span>
              <span className="flex-1 text-sm sm:text-base font-medium">
                {option}
              </span>
              {isAnswered && isCorrectOption && (
                <span className="text-emerald-500 text-lg">✓</span>
              )}
              {isAnswered && isThis && !isCorrect && (
                <span className="text-red-500 text-lg">✕</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & explanation */}
      {isAnswered && (
        <div
          className={`mt-4 p-4 rounded-lg text-sm leading-relaxed ${
            isCorrect
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <p className="font-bold mb-1">
            {isCorrect ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة'}
          </p>
          {explanation && <p className="text-gray-600">{explanation}</p>}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
