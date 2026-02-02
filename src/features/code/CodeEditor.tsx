/**
 * CodeEditor - محرر الكود
 * Code editor wrapper with syntax highlighting
 */

import type { ReactNode } from "react";

interface CodeEditorProps {
  children: ReactNode;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ children }) => {
  return (
    <div
      dir="ltr"
      className="bg-gray-900 text-gray-100 p-3 md:p-5 rounded-lg my-4 font-mono text-sm md:text-base leading-8 direction-ltr overflow-x-auto w-full"
    >
      {children}
    </div>
  );
};

export default CodeEditor;
