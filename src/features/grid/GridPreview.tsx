/**
 * GridPreview - معاينة الشبكة المباشرة
 * Live grid preview component
 */

import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

interface GridPreviewProps {
  gridStyles: CSSProperties;
  children: ReactNode;
  label?: string;
}

export const GridPreview: React.FC<GridPreviewProps> = ({
  gridStyles,
  children,
  label,
}) => {
  return (
    <motion.div
      dir="ltr"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-5 p-5 bg-white rounded-xl border border-purple-200 shadow-sm"
    >
      {label && (
        <div className="font-bold mb-4 text-purple-500 text-base">{label}</div>
      )}
      <motion.div
        layout
        className="bg-gray-200 p-2.5 rounded"
        style={gridStyles}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
