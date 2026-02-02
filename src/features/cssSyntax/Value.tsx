/**
 * Value - قيمة CSS
 * CSS value with syntax highlighting
 */

import type { ReactNode } from "react";

interface ValueProps {
  children: ReactNode;
}

const Value: React.FC<ValueProps> = ({ children }) => (
  <span className="text-emerald-400">{children}</span>
);

export default Value;
