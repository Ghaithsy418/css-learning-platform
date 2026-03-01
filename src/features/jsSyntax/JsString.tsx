/**
 * JsString - نص (String) في JavaScript
 * JavaScript string literal with syntax highlighting
 */

import type { ReactNode } from 'react';

interface JsStringProps {
  children: ReactNode;
}

export const JsString: React.FC<JsStringProps> = ({ children }) => (
  <span className="text-amber-300">{children}</span>
);

export default JsString;
