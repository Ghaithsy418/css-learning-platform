/**
 * JsFunction - اسم دالة في JavaScript
 * JavaScript function name with syntax highlighting
 */

import type { ReactNode } from 'react';

interface JsFunctionProps {
  children: ReactNode;
}

export const JsFunction: React.FC<JsFunctionProps> = ({ children }) => (
  <span className="text-sky-400">{children}</span>
);

export default JsFunction;
