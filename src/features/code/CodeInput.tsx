/**
 * CodeInput - حقل إدخال الكود مع التلميح
 * Reusable code input component with hint display
 */

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  width?: string;
  id?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({
  value,
  onChange,
  hint,
  width = "w-40",
  id,
}) => {
  return (
    <span className="inline-flex items-center gap-2 bg-yellow-100/20 px-2 md:px-3 py-1 rounded-lg border-2 border-yellow-400">
      <input
        type="text"
        className={`${width} min-w-[80px] px-2 md:px-3 py-1 bg-white text-gray-900 border-2 border-purple-500 rounded-md font-mono text-xs md:text-sm font-semibold text-center outline-none transition-all duration-300 shadow-sm hover:border-purple-700 focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:scale-105`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
      />
      {hint && (
        <span className="text-xs text-red-500 font-bold italic whitespace-nowrap font-mono">
          {hint}
        </span>
      )}
    </span>
  );
};

export default CodeInput;
