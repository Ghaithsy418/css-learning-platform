import { useState, type CSSProperties } from 'react';
import { AnswerKey } from '../../features/code/AnswerKey';
import CodeEditor from '../../features/code/CodeEditor';
import CodeInput from '../../features/code/CodeInput';
import CodeLine from '../../features/code/CodeLine';
import { ExerciseSection } from '../../features/code/ExerciseSection';
import { Explanation } from '../../features/code/Explanation';
import { HintBox } from '../../features/code/HintBox';
import Property from '../../features/cssSyntax/Property';
import Value from '../../features/cssSyntax/Value';

const ResponsiveExercise1: React.FC = () => {
  const [baseBg, setBaseBg] = useState<string>('white');
  const [mediaBg, setMediaBg] = useState<string>('');
  const [breakpoint, setBreakpoint] = useState<string>('600px');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  const isSmall = containerWidth <= (parseInt(breakpoint) || 600);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = containerWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(
        300,
        Math.min(800, startWidth + (moveEvent.clientX - startX)),
      );
      setContainerWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const dynamicStyles: CSSProperties = {
    backgroundColor: isSmall && mediaBg ? mediaBg : baseBg,
    transition: 'background-color 0.3s ease',
  };

  return (
    <ExerciseSection title="Responsive 1: قواعد @media">
      <Explanation>
        <p>
          تسمح لك <code>@media</code> بتطبيق كود CSS فقط عندما تتحقق شروط معينة
          (مثل عرض الشاشة). بتحريك مقبض التغيير أدناه، يمكنك محاكاة تغيير حجم
          الشاشة ورؤية كيف يتغير التصميم.
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine>.container {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>background-color</Property>:{' '}
          <CodeInput
            value={baseBg}
            onChange={setBaseBg}
            width="w-24"
          />
          ;
        </CodeLine>
        <CodeLine>{'}'}</CodeLine>
        <CodeLine>
          <span className="text-purple-600 font-bold">@media</span> (max-width:{' '}
          <CodeInput
            value={breakpoint}
            onChange={setBreakpoint}
            width="w-20"
          />
          ) {'{'}
        </CodeLine>
        <CodeLine indent={1}>.container {'{'}</CodeLine>
        <CodeLine indent={2}>
          <Property>background-color</Property>:{' '}
          <CodeInput
            value={mediaBg}
            onChange={setMediaBg}
            width="w-24"
          />
          ;
        </CodeLine>
        <CodeLine indent={1}>{'}'}</CodeLine>
        <CodeLine>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            الـ <strong>Base Styles</strong> تطبق على كل الحالات.
          </li>
          <li>
            الكود داخل <strong>@media</strong> يطبق فقط إذا كان عرض الحاوية أصغر
            من <Value>{breakpoint}</Value>.
          </li>
          <li>
            جرب وضع <Value>lightblue</Value> للخلفية الأساسية و{' '}
            <Value>orange</Value> للميديا.
          </li>
          <li>اسحب المقبض الأيمن للحاوية أدناه لتصغيرها!</li>
        </ul>
      </HintBox>

      <div className="flex flex-col items-center my-8">
        <div className="text-sm font-mono text-gray-500 mb-2">
          عرض الحاوية: {containerWidth}px
        </div>
        <div
          dir="ltr"
          className="relative border-2 border-purple-300 rounded-xl overflow-hidden shadow-lg bg-gray-50 flex"
          style={{ width: `${containerWidth}px`, height: '200px' }}
        >
          <div
            className="flex-1 flex items-center justify-center font-bold text-xl transition-all"
            style={dynamicStyles}
          >
            {isSmall ? 'وضع الشاشة الصغيرة 📱' : 'وضع الشاشة الكبيرة 💻'}
          </div>

          <div
            onMouseDown={handleMouseDown}
            className="w-4 h-full cursor-ew-resize bg-purple-500 hover:bg-purple-600 flex items-center justify-center text-white text-xs select-none"
          >
            ⋮
          </div>
        </div>
      </div>

      <AnswerKey
        show={showAnswer}
        onToggle={() => setShowAnswer(!showAnswer)}
      >
        <p>
          الميديا كويري النموذجية للهواتف:
          <code
            dir="ltr"
            className="block bg-gray-200 p-2 mt-2 rounded font-mono"
          >
            @media (max-width: 600px) {'{'} ... {'}'}
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default ResponsiveExercise1;
