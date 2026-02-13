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
import { GridItem } from '../../features/grid/GridItem';
import { GridPreview } from '../../features/grid/GridPreview';

const FlexboxExercise3: React.FC = () => {
  const [flexGrow2, setFlexGrow2] = useState<string>('0');
  const [flexGrow3, setFlexGrow3] = useState<string>('0');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const containerStyles: CSSProperties = {
    display: 'flex',
    gap: '10px',
    height: '150px',
    background: '#eee',
    padding: '10px',
  };

  return (
    <ExerciseSection title="Flexbox 3: التمدد (Flex Grow)">
      <Explanation>
        <p>
          خاصية <code>flex-grow</code> تحدد مقدار المساحة التي سيأخذها العنصر من
          المساحة المتبقية.
          <br />
          لدينا 3 عناصر. العنصر 1 ثابت. حاول جعل العنصر 2 يأخذ مساحة أكبر من
          العنصر 3.
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine>
          .item-1 {'{'} <Property>flex-grow</Property>: <Value>0</Value>; {'}'}
        </CodeLine>
        <CodeLine indent={0}>.item-2 {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>flex-grow</Property>:{' '}
          <CodeInput
            value={flexGrow2}
            onChange={setFlexGrow2}
            width="w-20"
          />
          ;
        </CodeLine>
        <CodeLine indent={0}>{'}'}</CodeLine>

        <CodeLine indent={0}>.item-3 {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>flex-grow</Property>:{' '}
          <CodeInput
            value={flexGrow3}
            onChange={setFlexGrow3}
            width="w-20"
          />
          ;
        </CodeLine>
        <CodeLine indent={0}>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>القيمة الافتراضية هي 0 (لا يتمدد).</li>
          <li>
            إذا أعطيت العنصر 2 قيمة <code>2</code> والعنصر 3 قيمة <code>1</code>
            ، سيأخذ العنصر 2 ضعف المساحة الإضافية التي يأخذها العنصر 3.
          </li>
          <li>
            جرب وضع <code>1</code> لكلا العنصرين لتقاسم المساحة بالتساوي.
          </li>
        </ul>
      </HintBox>

      <GridPreview
        gridStyles={containerStyles}
        label="👇 معاينة التمدد:"
      >
        <GridItem
          style={{ width: '100px', background: '#3b82f6', flexGrow: 0 }}
        >
          Fixed (0)
        </GridItem>
        <GridItem
          style={{ background: '#ef4444', flexGrow: Number(flexGrow2) || 0 }}
        >
          Item 2
        </GridItem>
        <GridItem
          style={{ background: '#22c55e', flexGrow: Number(flexGrow3) || 0 }}
        >
          Item 3
        </GridItem>
      </GridPreview>

      <AnswerKey
        show={showAnswer}
        onToggle={() => setShowAnswer(!showAnswer)}
      >
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            Item 2: flex-grow: <strong>2</strong>
          </code>
        </p>
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            Item 3: flex-grow: <strong>1</strong>
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default FlexboxExercise3;
