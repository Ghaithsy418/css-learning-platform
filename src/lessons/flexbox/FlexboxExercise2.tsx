import { useState, type CSSProperties } from 'react';
import { AnswerKey } from '../../features/code/AnswerKey';
import CodeEditor from '../../features/code/CodeEditor';
import CodeInput from '../../features/code/CodeInput';
import CodeLine from '../../features/code/CodeLine';
import { ExerciseSection } from '../../features/code/ExerciseSection';
import { Explanation } from '../../features/code/Explanation';
import { HintBox } from '../../features/code/HintBox';
import { Comment } from '../../features/cssSyntax/Comments';
import Property from '../../features/cssSyntax/Property';
import Value from '../../features/cssSyntax/Value';
import { GridItem } from '../../features/grid/GridItem';
import { GridPreview } from '../../features/grid/GridPreview';

const FlexboxExercise2: React.FC = () => {
  const [direction, setDirection] = useState<string>('row');
  const [wrap, setWrap] = useState<string>('nowrap');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: (direction as CSSProperties['flexDirection']) || 'row',
    flexWrap: (wrap as CSSProperties['flexWrap']) || 'nowrap',
    gap: '10px',
    height: '300px',
    width: '100%',
    border: '2px dashed #ccc',
  };

  return (
    <ExerciseSection title="Flexbox 2: الاتجاه والالتفاف (Direction & Wrap)">
      <Explanation>
        <p>
          تحكم في اتجاه العناصر (صف أو عمود) وما إذا كانت يجب أن تلتف عندما لا
          توجد مساحة كافية.
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine>.flex-container {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>display</Property>: <Value>flex</Value>;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>flex-direction</Property>:{' '}
          <CodeInput
            value={direction}
            onChange={setDirection}
            width="w-32"
          />
          ; <Comment>/* row, column, row-reverse... */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>flex-wrap</Property>:{' '}
          <CodeInput
            value={wrap}
            onChange={setWrap}
            width="w-32"
          />
          ; <Comment>/* nowrap, wrap */</Comment>
        </CodeLine>
        <CodeLine>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            <strong>flex-direction</strong>: يحدد اتجاه المحور الرئيسي.
            <br />
            جرب <Value>column</Value> لرص العناصر عموديًا.
            <br />
            جرب <Value>row-reverse</Value> لعكس الترتيب.
          </li>
          <li>
            <strong>flex-wrap</strong>: يحدد ما إذا كان يجب أن تنزل العناصر لسطر
            جديد.
            <br />
            جرب <Value>wrap</Value> إذا كانت العناصر تفيض خارج الحاوية.
          </li>
        </ul>
      </HintBox>

      <GridPreview
        gridStyles={containerStyles}
        label="👇 جرب تغيير الاتجاه (لديك 6 عناصر):"
      >
        <GridItem style={{ width: '100px', height: '80px' }}>1</GridItem>
        <GridItem style={{ width: '100px', height: '80px' }}>2</GridItem>
        <GridItem style={{ width: '100px', height: '80px' }}>3</GridItem>
        <GridItem style={{ width: '100px', height: '80px' }}>4</GridItem>
        <GridItem style={{ width: '100px', height: '80px' }}>5</GridItem>
        <GridItem style={{ width: '100px', height: '80px' }}>6</GridItem>
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
            flex-direction: <strong>column</strong>
          </code>
        </p>
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            flex-wrap: <strong>wrap</strong>
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default FlexboxExercise2;
