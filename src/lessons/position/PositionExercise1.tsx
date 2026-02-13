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

const PositionExercise1: React.FC = () => {
  const [position, setPosition] = useState<string>('relative');
  const [top, setTop] = useState<string>('0');
  const [left, setLeft] = useState<string>('0');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const parentStyles: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '250px',
    background: '#f3f4f6',
    border: '2px dashed #9ca3af',
    borderRadius: '8px',
    marginTop: '20px',
  };

  const boxStyles: CSSProperties = {
    position: (position as any) || 'relative',
    top: top || '0',
    left: left || '0',
    width: '100px',
    height: '100px',
    background: '#ef4444',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderRadius: '4px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    transition: 'all 0.3s ease',
  };

  return (
    <ExerciseSection title="Position 1: الموقع المطلق (Absolute)">
      <Explanation>
        <p>
          تسمح لك خاصية <code>position: absolute</code> بوضع العنصر في أي مكان
          داخل أقرب أب يمتلك <code>position: relative</code>.
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine indent={0}>
          .parent {'{'} position: relative; {'}'}
        </CodeLine>
        <CodeLine indent={0}>.child {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>position</Property>:{' '}
          <CodeInput
            value={position}
            onChange={setPosition}
            width="w-32"
          />
          ;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>top</Property>:{' '}
          <CodeInput
            value={top}
            onChange={setTop}
            width="w-20"
          />
          ;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>left</Property>:{' '}
          <CodeInput
            value={left}
            onChange={setLeft}
            width="w-20"
          />
          ;
        </CodeLine>
        <CodeLine indent={0}>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            ابدأ بتغيير الموقع إلى <Value>absolute</Value>.
          </li>
          <li>
            جرب قيم مثل <Value>20px</Value> أو <Value>50px</Value> لـ{' '}
            <code>top</code> و <code>left</code>.
          </li>
          <li>لاحظ كيف يخرج العنصر من "التدفق الطبيعي" للصفحة.</li>
        </ul>
      </HintBox>

      <div style={parentStyles}>
        <div style={boxStyles}>تحريك!</div>
        <div className="absolute bottom-2 right-2 text-gray-400 text-xs text-ltr">
          .parent (relative)
        </div>
      </div>

      <AnswerKey
        show={showAnswer}
        onToggle={() => setShowAnswer(!showAnswer)}
      >
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            position: absolute;
          </code>
        </p>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            top: 50px; left: 50px;
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default PositionExercise1;
