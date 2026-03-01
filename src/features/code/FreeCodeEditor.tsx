/**
 * FreeCodeEditor — محرر كود حر مع أرقام الأسطر
 * Styled textarea code editor with line numbers
 */

import { useCallback, useRef, useState } from 'react';

interface FreeCodeEditorProps {
  defaultCode?: string;
  placeholder?: string;
  onCodeChange?: (code: string) => void;
  height?: string;
}

const FreeCodeEditor: React.FC<FreeCodeEditorProps> = ({
  defaultCode = '',
  placeholder = '// اكتب الكود هنا...',
  onCodeChange,
  height = 'min-h-[200px]',
}) => {
  const [code, setCode] = useState(defaultCode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split('\n');
  const lineCount = Math.max(lines.length, 5);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setCode(val);
      onCodeChange?.(val);
    },
    [onCodeChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Tab key inserts 2 spaces instead of moving focus
      if (e.key === 'Tab') {
        e.preventDefault();
        const ta = textareaRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newVal = code.substring(0, start) + '  ' + code.substring(end);
        setCode(newVal);
        onCodeChange?.(newVal);
        // Restore cursor after React re-render
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2;
        });
      }
    },
    [code, onCodeChange],
  );

  return (
    <div
      dir="ltr"
      className={`relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 my-4 ${height}`}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-950 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
        <span className="text-gray-500 text-xs font-mono mr-2">editor.js</span>
      </div>

      <div className="flex">
        {/* Line numbers */}
        <div className="select-none py-4 px-3 text-right border-r border-gray-800 bg-gray-950/50">
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className="text-gray-600 text-xs font-mono leading-6 h-6"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          spellCheck={false}
          className={`flex-1 bg-transparent text-gray-100 font-mono text-sm leading-6 p-4 outline-none resize-none placeholder:text-gray-600 w-full ${height}`}
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  );
};

export default FreeCodeEditor;
