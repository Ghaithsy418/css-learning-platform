/**
 * CodeInput - حقل إدخال الكود مع التلميح
 * Reusable code input component with hint display and optional validation
 */

import { useEffect, useRef, useState } from 'react';
import { useExerciseSection } from './ExerciseSection';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  width?: string;
  id?: string;
  /** Expected correct answer for auto-validation */
  correctValue?: string;
  /** Called whenever validation state changes */
  onValidate?: (isCorrect: boolean) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  value,
  onChange,
  hint,
  width = 'w-40',
  id,
  correctValue,
  onValidate,
}) => {
  const [touched, setTouched] = useState(false);
  const exerciseCtx = useExerciseSection();
  const indexRef = useRef<number | null>(null);

  // Get a stable index from the parent ExerciseSection
  if (exerciseCtx && indexRef.current === null) {
    indexRef.current = exerciseCtx.getNextIndex();
  }

  const normalise = (v: string) => v.trim().toLowerCase().replace(/\s+/g, ' ');
  const isCorrect =
    correctValue != null &&
    value.trim() !== '' &&
    normalise(value) === normalise(correctValue);
  const isWrong =
    correctValue != null && touched && value.trim() !== '' && !isCorrect;

  useEffect(() => {
    if (correctValue != null && value.trim() !== '') {
      onValidate?.(isCorrect);
      // Register with parent ExerciseSection
      if (exerciseCtx && indexRef.current != null) {
        const key = id ?? `input-${indexRef.current}`;
        exerciseCtx.registerValidation(key, isCorrect);
        exerciseCtx.registerAnswer(key, value.trim());
      }
    }
  }, [isCorrect, correctValue, value, onValidate, exerciseCtx, id]);

  const borderClass = isCorrect
    ? 'border-emerald-400 ring-2 ring-emerald-100 bg-emerald-50'
    : isWrong
      ? 'border-red-300 ring-2 ring-red-100 bg-red-50/30'
      : 'border-gray-300 hover:border-indigo-400 focus-within:border-indigo-500 focus-within:ring-3 focus-within:ring-indigo-100 bg-white';

  return (
    <span className="inline-flex items-center gap-2 bg-indigo-50/30 px-2 md:px-3 py-1 rounded-lg border border-indigo-200/60">
      <span className="relative inline-flex items-center">
        <input
          type="text"
          className={`${width} min-w-20 px-2 md:px-3 py-1 text-gray-900 border-2 rounded-md font-mono text-xs md:text-sm font-semibold text-center outline-none transition-all duration-200 shadow-sm ${borderClass}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          id={id}
        />
        {isCorrect && (
          <span className="absolute -left-1 -top-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-sm">
            ✓
          </span>
        )}
      </span>
      {hint && (
        <span className="text-xs text-gray-400 font-medium italic whitespace-nowrap font-mono">
          {hint}
        </span>
      )}
    </span>
  );
};

export default CodeInput;
