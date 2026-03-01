/**
 * GridItem - عنصر في الشبكة
 * Individual grid item with gradient background
 */

import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

interface GridItemProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const GridItem: React.FC<GridItemProps> = ({ children, style }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-linear-to-br from-purple-400 to-purple-600 text-white p-5 rounded-lg flex items-center justify-center font-bold text-xl min-h-[60px] shadow-sm"
      style={style}
    >
      {children}
    </motion.div>
  );
};
