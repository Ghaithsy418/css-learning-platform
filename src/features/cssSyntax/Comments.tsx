/**
 * Comment - تعليق في الكود
 * Code comment
 */

import type { ReactNode } from "react";

interface CommentProps {
  children: ReactNode;
}

export const Comment: React.FC<CommentProps> = ({ children }) => (
  <span className="text-gray-500 italic mr-2">{children}</span>
);
