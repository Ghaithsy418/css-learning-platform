/**
 * FreeCodeEditor — محرر كود حر باستخدام Monaco
 */

import MonacoEditor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

interface FreeCodeEditorProps {
  defaultCode?: string;
  placeholder?: string;
  onCodeChange?: (code: string) => void;
  height?: number;
  language?: string;
  readOnly?: boolean;
}

const FreeCodeEditor: React.FC<FreeCodeEditorProps> = ({
  defaultCode = '',
  placeholder = '// اكتب الكود هنا...',
  onCodeChange,
  height = 280,
  language = 'javascript',
  readOnly = false,
}) => {
  const [code, setCode] = useState(defaultCode);

  useEffect(() => {
    setCode(defaultCode);
  }, [defaultCode]);

  return (
    <div dir="ltr" className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 my-4">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-950 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
        <span className="text-gray-500 text-xs font-mono mr-2">editor.js</span>
      </div>

      <MonacoEditor
        height={height}
        language={language}
        theme="vs-dark"
        value={code}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
        }}
        onChange={(value) => {
          const nextCode = value ?? '';
          setCode(nextCode);
          onCodeChange?.(nextCode);
        }}
        loading={<div className="p-4 text-sm text-gray-300">Loading editor...</div>}
      />

      {!code.trim() && !readOnly && (
        <span className="pointer-events-none absolute top-[54px] left-[54px] text-gray-500 text-sm font-mono">
          {placeholder}
        </span>
      )}
    </div>
  );
};

export default FreeCodeEditor;
