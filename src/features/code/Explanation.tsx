/**
 * Explanation - شرح التمرين
 * Exercise explanation text
 */

import type { ReactNode } from "react";

interface ExplanationProps {
  children: ReactNode;
}

export const Explanation: React.FC<ExplanationProps> = ({ children }) => {
  return (
    <div className="bg-white p-4 rounded-lg mb-5 leading-7">{children}</div>
  );
};
