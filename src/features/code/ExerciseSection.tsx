/**
 * ExerciseSection - قسم التمرين الكامل
 * Complete exercise section wrapper
 */

import type { ReactNode } from "react";

interface ExerciseSectionProps {
  title: string;
  children: ReactNode;
}

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="mb-10 p-6 bg-gray-50 rounded-lg border-r-4 border-purple-500">
      <h2 className="text-gray-800 mb-4 text-3xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};
