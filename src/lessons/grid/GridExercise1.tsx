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
import { GridItem } from '../../features/grid/GridItem';
import { GridPreview } from '../../features/grid/GridPreview';

const GridExercise1: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [columns, setColumns] = useState<string>('');
  const [rows, setRows] = useState<string>('');
  const [gap, setGap] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const gridStyles: CSSProperties = {
    display: display || 'block',
    gridTemplateColumns: columns || 'none',
    gridTemplateRows: rows || 'none',
    gap: gap || '0',
  };

  return (
    <ExerciseSection
      title="التمرين الأول: إنشاء شبكتك الأولى"
      lessonId="css-grid-1"
      exerciseId="ex1"
      maxPoints={20}
      inputCount={4}
    >
      <Explanation>
        <p>
          لنقم بإنشاء شبكة بسيطة تحتوي على 3 أعمدة و صفين. املأ خصائص CSS أدناه
          وشاهد الشبكة تظهر!
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine>.grid-container {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>display</Property>:{' '}
          <CodeInput
            value={display}
            onChange={setDisplay}
            width="w-20"
            correctValue="grid"
          />
          ; <Comment>/* اجعله شبكة */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-template-columns</Property>:{' '}
          <CodeInput
            value={columns}
            onChange={setColumns}
            width="w-40"
            correctValue="1fr 1fr 1fr"
          />
          ; <Comment>/* 3 أعمدة متساوية */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-template-rows</Property>:{' '}
          <CodeInput
            value={rows}
            onChange={setRows}
            width="w-40"
            correctValue="100px 100px"
          />
          ; <Comment>/* صفين */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>gap</Property>:{' '}
          <CodeInput
            value={gap}
            onChange={setGap}
            width="w-20"
            correctValue="10px"
          />
          ; <Comment>/* المسافة بين العناصر */</Comment>
        </CodeLine>
        <CodeLine>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>الحقل الأول: القيمة التي تجعل العنصر حاوية شبكة</li>
          <li>
            استخدم{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              repeat(3, 1fr)
            </code>{' '}
            لـ 3 أعمدة متساوية، أو اكتب{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              1fr 1fr 1fr
            </code>
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              1fr
            </code>{' '}
            تعني "جزء واحد من المساحة المتاحة"
          </li>
          <li>
            جرب{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              repeat(2, 100px)
            </code>{' '}
            للصفوف
          </li>
        </ul>
      </HintBox>

      <GridPreview
        gridStyles={gridStyles}
        label="👇 معاينة الشبكة:"
      >
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
        <GridItem>6</GridItem>
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
            display: <strong>grid</strong>
          </code>
        </p>
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            grid-template-columns: <strong>repeat(3, 1fr)</strong>
          </code>{' '}
          أو <strong>1fr 1fr 1fr</strong>
        </p>
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            grid-template-rows: <strong>repeat(2, 100px)</strong>
          </code>{' '}
          أو <strong>100px 100px</strong>
        </p>
        <p>
          <code
            dir="ltr"
            className="bg-gray-200 px-2 py-1 rounded font-mono"
          >
            gap: <strong>10px</strong>
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default GridExercise1;
