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

const ResponsiveExercise2: React.FC = () => {
  const [fontSize, setFontSize] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const textStyles: CSSProperties = {
    fontSize: fontSize || '16px',
    fontWeight: 'bold',
    color: '#1e293b',
    lineHeight: '1.4',
  };

  return (
    <ExerciseSection title="Responsive 2: النصوص المرنة (clamp)">
      <Explanation>
        <p>
          تسمح لك وظيفة <code>clamp()</code> بتحديد حجم خط يتغير بناءً على عرض
          الشاشة، مع حد أدنى وأقصى.
          <br />
          الصيغة: <code>clamp(min, preferred, max)</code>
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine>h1 {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>font-size</Property>:{' '}
          <CodeInput
            value={fontSize}
            onChange={setFontSize}
            width="w-64"
          />
          ;
        </CodeLine>
        <CodeLine>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            جرب استخدام <Value>clamp(1.5rem, 5vw, 3rem)</Value>.
          </li>
          <li>
            هذا يعني: لا يقل عن <Value>1.5rem</Value>، ولا يزيد عن{' '}
            <Value>3rem</Value>، وبينهما يتبع <Value>5vw</Value> (5% من عرض
            الشاشة).
          </li>
        </ul>
      </HintBox>

      <div className="my-5 p-8 bg-white rounded-lg border-2 border-dashed border-purple-200 min-h-[150px] flex items-center justify-center">
        <h1 style={textStyles}>نص يتغير حجمه بذكاء!</h1>
      </div>

      <p className="text-sm text-gray-500 italic text-center">
        (جرب تغيير حجم نافذة المتصفح لترى التأثير إذا استخدمت وحدات vw)
      </p>

      <AnswerKey
        show={showAnswer}
        onToggle={() => setShowAnswer(!showAnswer)}
      >
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            font-size: clamp(1.5rem, 5vw, 3rem);
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default ResponsiveExercise2;
