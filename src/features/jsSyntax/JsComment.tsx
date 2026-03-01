/**
 * JsComment - تعليق في JavaScript
 * JavaScript comment with syntax highlighting
 */

import type { ReactNode } from 'react';

interface JsCommentProps {
  children: ReactNode;
}

export const JsComment: React.FC<JsCommentProps> = ({ children }) => (
  <span className="text-gray-500 italic">{children}</span>
);

export default JsComment;
