/**
 * GridItem - عنصر في الشبكة
 * Individual grid item with gradient background
 */

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

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
      className="bg-linear-to-br from-purple-500 to-purple-800 text-white p-5 rounded flex items-center justify-center font-bold text-xl min-h-[60px]"
      style={style}
    >
      {children}
    </motion.div>
  );
};
