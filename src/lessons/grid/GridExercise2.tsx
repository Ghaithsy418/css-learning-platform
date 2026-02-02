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

const GridExercise2: React.FC = () => {
  const [columns, setColumns] = useState<string>("");
  const [rows, setRows] = useState<string>("");
  const [gap, setGap] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const gridStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: columns || "1fr 1fr 1fr",
    gridTemplateRows: rows || "auto auto",
    gap: gap || "10px",
  };

  return (
    <ExerciseSection title="التمرين الثاني: عروض أعمدة مختلطة">
      <Explanation>
        <p>
          أنشئ شبكة بأحجام أعمدة مختلفة: شريط جانبي 200 بكسل، منطقة محتوى مرنة،
          وشريط جانبي 150 بكسل.
        </p>
      </Explanation>

      <CodeEditor>
        <CodeLine>.grid-container {"{"}</CodeLine>
        <CodeLine indent={1}>
          <Property>display</Property>: <Value>grid</Value>;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-template-columns</Property>:{" "}
          <CodeInput value={columns} onChange={setColumns} width="w-44" />;{" "}
          <Comment>/* جانبي، محتوى، جانبي */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>grid-template-rows</Property>:{" "}
          <CodeInput value={rows} onChange={setRows} width="w-32" />;{" "}
          <Comment>/* صفين */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>gap</Property>:{" "}
          <CodeInput value={gap} onChange={setGap} width="w-20" />;
        </CodeLine>
        <CodeLine>{"}"}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            امزج قيم البكسل مع وحدات{" "}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              fr
            </code>
            :{" "}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              200px 1fr 150px
            </code>
          </li>
          <li>
            العمود الأوسط يجب أن يكون{" "}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              1fr
            </code>{" "}
            ليأخذ المساحة المتبقية
          </li>
          <li>
            جرب{" "}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              auto
            </code>{" "}
            للصفوف لتناسب ارتفاع المحتوى
          </li>
        </ul>
      </HintBox>

      <GridPreview gridStyles={gridStyles} label="👇 معاينة الشبكة:">
        <GridItem>شريط جانبي</GridItem>
        <GridItem>المحتوى الرئيسي</GridItem>
        <GridItem>جانبي</GridItem>
        <GridItem>قائمة</GridItem>
        <GridItem>مقالة</GridItem>
        <GridItem>إعلانات</GridItem>
      </GridPreview>

      <AnswerKey show={showAnswer} onToggle={() => setShowAnswer(!showAnswer)}>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            grid-template-columns: <strong>200px 1fr 150px</strong>
          </code>
        </p>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            grid-template-rows: <strong>auto auto</strong>
          </code>{" "}
          أو <strong>100px 100px</strong>
        </p>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            gap: <strong>15px</strong>
          </code>{" "}
          (أو أي قيمة تفضلها)
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default GridExercise2;
