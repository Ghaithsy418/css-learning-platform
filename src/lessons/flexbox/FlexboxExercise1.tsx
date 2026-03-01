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

const FlexboxExercise1: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [justifyContent, setJustifyContent] = useState<string>('');
  const [alignItems, setAlignItems] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // We ensure the container has height to demonstrate alignItems
  const containerStyles: CSSProperties = {
    display: display || 'block',
    justifyContent: justifyContent || 'flex-start',
    alignItems: alignItems || 'stretch',
    gap: '10px',
    height: '200px', // Fixed height to show vertical alignment
  };

  return (
    <ExerciseSection
      title="Flexbox 1: المحاذاة الأساسية"
      lessonId="css-flexbox-1"
      exerciseId="ex1"
      maxPoints={15}
      inputCount={3}
    >
      <Explanation>
        <p>تحكم في المحاذاة الأفقية والعمودية للعناصر.</p>
      </Explanation>

      <CodeEditor>
        <CodeLine>.flex-container {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>display</Property>:{' '}
          <CodeInput
            value={display}
            onChange={setDisplay}
            width="w-20"
            correctValue="flex"
          />
          ; <Comment>/* تفعيل Flexbox */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>justify-content</Property>:{' '}
          <CodeInput
            value={justifyContent}
            onChange={setJustifyContent}
            width="w-32"
            correctValue="center"
          />
          ; <Comment>/* المحاذاة الأفقية */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>align-items</Property>:{' '}
          <CodeInput
            value={alignItems}
            onChange={setAlignItems}
            width="w-32"
            correctValue="center"
          />
          ; <Comment>/* المحاذاة العمودية */</Comment>
        </CodeLine>
        <CodeLine>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            للبدء، اجعل العرض: <Value>flex</Value>
          </li>
          <li>
            القيم الشائعة لـ <strong>justify-content</strong>:
            <br />
            <span className="text-sm font-mono text-blue-600">center</span>{' '}
            (توصيط),
            <span className="text-sm font-mono text-blue-600">
              {' '}
              space-between
            </span>{' '}
            (مسافة بينية),
            <span className="text-sm font-mono text-blue-600">
              {' '}
              flex-end
            </span>{' '}
            (النهاية)
          </li>
          <li>
            القيم الشائعة لـ <strong>align-items</strong>:
            <br />
            <span className="text-sm font-mono text-blue-600">center</span>{' '}
            (توصيط عمودي),
            <span className="text-sm font-mono text-blue-600">
              {' '}
              flex-start
            </span>{' '}
            (الأعلى)
          </li>
        </ul>
      </HintBox>

      <GridPreview
        gridStyles={containerStyles}
        label="👇 معاينة Flexbox:"
      >
        <GridItem style={{ width: '80px', height: '80px' }}>1</GridItem>
        <GridItem style={{ width: '80px', height: '80px' }}>2</GridItem>
        <GridItem style={{ width: '80px', height: '80px' }}>3</GridItem>
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
            display: <strong>flex</strong>
          </code>
        </p>
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            justify-content: <strong>center</strong>
          </code>
        </p>
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            align-items: <strong>center</strong>
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default FlexboxExercise1;
