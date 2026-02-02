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

const FlexboxExercise1: React.FC = () => {
  const [display, setDisplay] = useState<string>("");
  const [justifyContent, setJustifyContent] = useState<string>("");
  const [alignItems, setAlignItems] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // We ensure the container has height to demonstrate alignItems
  const containerStyles: CSSProperties = {
    display: display || "block",
    justifyContent: justifyContent || "flex-start",
    alignItems: alignItems || "stretch",
    gap: "10px",
    height: "200px", // Fixed height to show vertical alignment
  };

  return (
    <ExerciseSection title="Flexbox 1: المحاذاة الأساسية">
      <Explanation>
        <p>تحكم في المحاذاة الأفقية والعمودية للعناصر.</p>
      </Explanation>

      <CodeEditor>
        <CodeLine>.flex-container {"{"}</CodeLine>
        <CodeLine indent={1}>
          <Property>display</Property>:{" "}
          <CodeInput value={display} onChange={setDisplay} width="w-20" />;{" "}
          <Comment>/* تفعيل Flexbox */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>justify-content</Property>:{" "}
          <CodeInput
            value={justifyContent}
            onChange={setJustifyContent}
            width="w-32"
          />
          ; <Comment>/* المحاذاة الأفقية */</Comment>
        </CodeLine>
        <CodeLine indent={1}>
          <Property>align-items</Property>:{" "}
          <CodeInput value={alignItems} onChange={setAlignItems} width="w-32" />
          ; <Comment>/* المحاذاة العمودية */</Comment>
        </CodeLine>
        <CodeLine>{"}"}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul className="mr-5 leading-7">
          <li>
            للبدء، اجعل العرض: <Value>flex</Value>
          </li>
          <li>
            القيم الشائعة لـ <strong>justify-content</strong>:
            <br />
            <span className="text-sm font-mono text-blue-600">center</span>{" "}
            (توصيط),
            <span className="text-sm font-mono text-blue-600">
              {" "}
              space-between
            </span>{" "}
            (مسافة بينية),
            <span className="text-sm font-mono text-blue-600">
              {" "}
              flex-end
            </span>{" "}
            (النهاية)
          </li>
          <li>
            القيم الشائعة لـ <strong>align-items</strong>:
            <br />
            <span className="text-sm font-mono text-blue-600">center</span>{" "}
            (توصيط عمودي),
            <span className="text-sm font-mono text-blue-600">
              {" "}
              flex-start
            </span>{" "}
            (الأعلى)
          </li>
        </ul>
      </HintBox>

      <GridPreview gridStyles={containerStyles} label="👇 معاينة Flexbox:">
        <GridItem style={{ width: "80px", height: "80px" }}>1</GridItem>
        <GridItem style={{ width: "80px", height: "80px" }}>2</GridItem>
        <GridItem style={{ width: "80px", height: "80px" }}>3</GridItem>
      </GridPreview>

      <AnswerKey show={showAnswer} onToggle={() => setShowAnswer(!showAnswer)}>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            display: <strong>flex</strong>
          </code>
        </p>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            justify-content: <strong>center</strong>
          </code>
        </p>
        <p>
          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
            align-items: <strong>center</strong>
          </code>
        </p>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default FlexboxExercise1;
