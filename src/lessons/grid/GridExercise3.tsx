import { useState, type CSSProperties } from "react";
import { ExerciseSection } from "../../features/code/ExerciseSection";
import { Explanation } from "../../features/code/Explanation";
import CodeEditor from "../../features/code/CodeEditor";
import CodeLine from "../../features/code/CodeLine";
import Property from "../../features/cssSyntax/Property";
import Value from "../../features/cssSyntax/Value";
import CodeInput from "../../features/code/CodeInput";
import { Comment } from "../../features/cssSyntax/Comments";
import { HintBox } from "../../features/code/HintBox";
import { GridPreview } from "../../features/grid/GridPreview";
import { GridItem } from "../../features/grid/GridItem";
import { AnswerKey } from "../../features/code/AnswerKey";

const GridExercise3: React.FC = () => {
  // State for Item 1
  const [colSpan1, setColSpan1] = useState<string>("");
  const [rowSpan1, setRowSpan1] = useState<string>("");

  // State for the Last Item
  const [colSpanLast, setColSpanLast] = useState<string>("");

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Static styles for the container
  const containerStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "repeat(3, 80px)",
    gap: "10px",
  };

  return (
    <ExerciseSection title="التمرين الثالث: التمدد والتحكم في الخطوط (Spanning)">
      <Explanation>
        <p>
          بدلاً من مجرد وضع العناصر في خلايا فردية، يمكنك جعلها تمتد عبر عدة
          أعمدة أو صفوف باستخدام
          <code>grid-column</code> و <code>grid-row</code>.
          <br />
          <strong>المهمة:</strong> لدينا شبكة 3×3. اجعل العنصر رقم{" "}
          <strong>1</strong> يغطي مربعاً بحجم 2×2 في الزاوية العلوية اليمنى،
          واجعل العنصر رقم <strong>6</strong> يمتد عبر الصف السفلي بالكامل.
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine>.grid-container {"{"}</CodeLine>
        <CodeLine indent={1}>
          <Property>display</Property>: <Value>grid</Value>;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-template-columns</Property>: <Value>1fr 1fr 1fr</Value>
          ;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-template-rows</Property>:{" "}
          <Value>repeat(3, 80px)</Value>;
        </CodeLine>
        <CodeLine>{"}"}</CodeLine>

        <CodeLine>&nbsp;</CodeLine>

        <CodeLine>.item-1 {"{"}</CodeLine>
        <CodeLine indent={1}>
          <Property>background</Property>: <Value>#purple</Value>;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-column</Property>:{" "}
          <CodeInput value={colSpan1} onChange={setColSpan1} width="w-32" />;{" "}
          <Comment>/* تمدد عمودين */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-row</Property>:{" "}
          <CodeInput value={rowSpan1} onChange={setRowSpan1} width="w-32" />;{" "}
          <Comment>/* تمدد صفين */</Comment>
        </CodeLine>
        <CodeLine>{"}"}</CodeLine>

        <CodeLine>&nbsp;</CodeLine>

        <CodeLine>.item-6 {"{"}</CodeLine>
        <CodeLine indent={1}>
          <Property>background</Property>: <Value>#pink</Value>;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-column</Property>:{" "}
          <CodeInput
            value={colSpanLast}
            onChange={setColSpanLast}
            width="w-32"
          />
          ; <Comment>/* كامل العرض */</Comment>
        </CodeLine>
        <CodeLine>{"}"}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            استخدم الكلمة المفتاحية <strong>span</strong>. مثال:{" "}
            <Value>span 2</Value>.
          </li>
          <li>
            أو استخدم أرقام الخطوط (lines). الخطوط في شبكة 3 أعمدة هي 1، 2، 3،
            4.
            <br />
            للتمدد من البداية للنهاية: <Value>1 / -1</Value>.
          </li>
          <li>
            لاحظ كيف تتحرك العناصر الأخرى تلقائيًا (Auto Flow) لملء الفراغات!
          </li>
        </ul>
      </HintBox>

      <GridPreview gridStyles={containerStyles} label="👇 تحدي التمدد:">
        {/* Item 1: The Giant Box */}
        <GridItem
          style={{
            gridColumn: colSpan1,
            gridRow: rowSpan1,
            background: "#7c3aed", // darker purple
            zIndex: 10,
          }}
        >
          1
        </GridItem>

        {/* Other items flowing around */}
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>

        {/* Last Item: The Footer */}
        <GridItem
          style={{
            gridColumn: colSpanLast,
            background: "#ec4899", // pink
          }}
        >
          6
        </GridItem>
      </GridPreview>

      <AnswerKey show={showAnswer} onToggle={() => setShowAnswer(!showAnswer)}>
        <p className="font-bold mb-2 text-purple-600">.item-1</p>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            grid-column: <strong>span 2</strong>
          </code>{" "}
          أو <strong>1 / 3</strong>
        </p>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            grid-row: <strong>span 2</strong>
          </code>{" "}
          أو <strong>1 / 3</strong>
        </p>

        <p className="font-bold mb-2 mt-4 text-pink-600">.item-6</p>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            grid-column: <strong>1 / -1</strong>
          </code>{" "}
          أو <strong>span 3</strong>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default GridExercise3;
