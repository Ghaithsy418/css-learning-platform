/**
 * GridPreview - معاينة الشبكة المباشرة
 * Live grid preview component
 */

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

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
      className="my-5 p-5 bg-white rounded-lg border-2 border-purple-500"
    >
      {label && (
        <div className="font-bold mb-4 text-purple-600 text-lg">{label}</div>
      )}
      <motion.div
        layout
        className="bg-gray-200 p-2.5 rounded"
        style={gridStyles}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
