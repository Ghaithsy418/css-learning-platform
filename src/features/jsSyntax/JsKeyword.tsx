/**
 * JsKeyword - كلمة مفتاحية في JavaScript
 * JavaScript keyword with syntax highlighting
 */

import type { ReactNode } from 'react';

interface JsKeywordProps {
  children: ReactNode;
}

export const JsKeyword: React.FC<JsKeywordProps> = ({ children }) => (
  <span className="text-purple-400 font-semibold">{children}</span>
);

export default JsKeyword;
