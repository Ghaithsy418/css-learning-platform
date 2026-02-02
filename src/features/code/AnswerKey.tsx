/**
 * AnswerKey - صندوق الإجابة القابل للطي
 * Collapsible answer key component
 */

import type { ReactNode } from "react";

interface AnswerKeyProps {
  show: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export const AnswerKey: React.FC<AnswerKeyProps> = ({
  show,
  onToggle,
  children,
}) => {
  return (
    <>
      <button
        className="bg-cyan-600 text-white border-none px-6 py-3 rounded-lg cursor-pointer text-base font-bold mt-2.5 transition-all duration-300 hover:bg-cyan-700 hover:-translate-y-0.5 hover:shadow-lg"
        onClick={onToggle}
      >
        {show ? "إخفاء الإجابة" : "إظهار الإجابة"}
      </button>
      {show && (
        <div className="bg-cyan-50 border-r-4 border-cyan-600 p-4 mt-4 rounded leading-7 animate-slideIn">
          <h3 className="text-cyan-900 mb-2.5 font-bold">
            ✅ الإجابة الصحيحة:
          </h3>
          {children}
        </div>
      )}
    </>
  );
};
