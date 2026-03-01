/**
 * ConsoleOutput - معاينة مخرجات الكونسول
 * Interactive console output preview for JS exercises
 */

import { AnimatePresence, motion } from 'framer-motion';

interface ConsoleLine {
  type: 'log' | 'error' | 'info' | 'result';
  text: string;
}

interface ConsoleOutputProps {
  lines: ConsoleLine[];
  label?: string;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  lines,
  label = '👇 مخرجات الكونسول:',
}) => {
  const typeStyles: Record<ConsoleLine['type'], string> = {
    log: 'text-gray-100',
    error: 'text-red-400',
    info: 'text-sky-400',
    result: 'text-emerald-400',
  };

  const typePrefix: Record<ConsoleLine['type'], string> = {
    log: '›',
    error: '✕',
    info: 'ℹ',
    result: '←',
  };

  return (
    <div className="my-6">
      <p className="text-sm text-gray-600 mb-3 font-medium">{label}</p>
      <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border-b border-gray-800">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="text-gray-500 text-xs font-mono mr-3">Console</span>
        </div>

        {/* Console body */}
        <div className="p-4 font-mono text-sm min-h-[100px] max-h-[300px] overflow-y-auto">
          <AnimatePresence mode="sync">
            {lines.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 italic"
              >
                // اكتب الكود أعلاه لترى النتيجة هنا...
              </motion.div>
            ) : (
              lines.map((line, i) => (
                <motion.div
                  key={`${i}-${line.text}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className={`flex items-start gap-2 py-1 ${typeStyles[line.type]}`}
                >
                  <span className="text-gray-600 select-none flex-shrink-0 w-4 text-center">
                    {typePrefix[line.type]}
                  </span>
                  <span className="break-all">{line.text}</span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ConsoleOutput;
