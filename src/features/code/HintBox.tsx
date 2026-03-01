/**
 * HintBox - صندوق النصائح
 * Hint/tip box component
 */

import type { ReactNode } from 'react';

interface HintBoxProps {
  title?: string;
  children: ReactNode;
}

export const HintBox: React.FC<HintBoxProps> = ({
  title = '💡 نصائح:',
  children,
}) => {
  return (
    <div className="bg-amber-50 border-r-4 border-amber-300 p-4 my-4 rounded-lg leading-7">
      <strong className="block mb-2">{title}</strong>
      {children}
    </div>
  );
};
