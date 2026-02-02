/**
 * Property - خاصية CSS
 * CSS property name with syntax highlighting
 */

import type { ReactNode } from "react";

interface PropertyProps {
  children: ReactNode;
}

export const Property: React.FC<PropertyProps> = ({ children }) => (
  <span className="text-pink-400">{children}</span>
);

export default Property;
