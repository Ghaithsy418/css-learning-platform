/**
 * CodeLine - سطر كود واحد
 * Single line of code with optional indentation
 */

import type { ReactNode } from "react";

interface CodeLineProps {
  indent?: number;
  children: ReactNode;
}

export const CodeLine: React.FC<CodeLineProps> = ({ indent = 0, children }) => {
  return (
    <div
      className="flex items-center gap-2 my-2 min-w-max"
      style={{ paddingLeft: `${indent * 20}px` }}
    >
      {children}
    </div>
  );
};

export default CodeLine;
