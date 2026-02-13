/* eslint-disable @typescript-eslint/no-explicit-any */
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

const ResponsiveExercise3: React.FC = () => {
  const [flexDir, setFlexDir] = useState<string>('row');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(800);

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

  const isSmall = containerWidth <= 500;

  // Simulated media query logic
  const currentFlexDir = isSmall ? flexDir : 'row';

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: currentFlexDir as any,
    gap: '10px',
    padding: '10px',
    background: '#fff',
    width: '100%',
    height: '100%',
    transition: 'all 0.3s ease',
  };

  return (
    <ExerciseSection title="Responsive 3: تغيير التخطيط (Layout Shift)">
      <Explanation>
        <p>
          أحد أهم استخدامات <code>@media</code> هو تغيير اتجاه العناصر من أفقي
          (Row) في الشاشات الكبيرة إلى عمودي (Column) في الشاشات الصغيرة لتوفير
          مساحة.
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine>
          .nav {'{'} display: flex; flex-direction: row; {'}'}
        </CodeLine>
        <CodeLine>
          <span className="text-purple-600 font-bold">@media</span> (max-width:
          500px) {'{'}
        </CodeLine>
        <CodeLine indent={1}>.nav {'{'}</CodeLine>
        <CodeLine indent={2}>
          <Property>flex-direction</Property>:{' '}
          <CodeInput
            value={flexDir}
            onChange={setFlexDir}
            width="w-32"
          />
          ;
        </CodeLine>
        <CodeLine indent={1}>{'}'}</CodeLine>
        <CodeLine>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            بشكل افتراضي، العناصر مرتبة في <Value>row</Value>.
          </li>
          <li>
            اجعل القيمة <Value>column</Value> لتظهر العناصر تحت بعضها في الشاشات
            الصغيرة.
          </li>
          <li>صغّر الحاوية أدناه (أقل من 500px) لتفعيل التغيير!</li>
        </ul>
      </HintBox>

      <div className="flex flex-col items-center my-8">
        <div className="text-sm font-mono text-gray-400 mb-2">
          عرض المحاكي: {containerWidth}px (العتبة: 500px)
        </div>
        <div
          dir="ltr"
          className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-white shadow-inner flex"
          style={{ width: `${containerWidth}px`, height: '250px' }}
        >
          <div style={containerStyles}>
            <div className="flex-1 bg-blue-500 text-white p-4 rounded flex items-center justify-center font-bold font-mono">
              1
            </div>
            <div className="flex-1 bg-purple-500 text-white p-4 rounded flex items-center justify-center font-bold font-mono">
              2
            </div>
            <div className="flex-1 bg-pink-500 text-white p-4 rounded flex items-center justify-center font-bold font-mono">
              3
            </div>
          </div>

          <div
            onMouseDown={handleMouseDown}
            className="w-4 h-full cursor-ew-resize bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-500"
          >
            ↔
          </div>
        </div>
      </div>

      <AnswerKey
        show={showAnswer}
        onToggle={() => setShowAnswer(!showAnswer)}
      >
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            flex-direction: column;
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default ResponsiveExercise3;
