import { useMemo, useState } from 'react';
import { AnswerKey } from '../../features/code/AnswerKey';
import CodeEditor from '../../features/code/CodeEditor';
import CodeInput from '../../features/code/CodeInput';
import CodeLine from '../../features/code/CodeLine';
import { ExerciseSection } from '../../features/code/ExerciseSection';
import { Explanation } from '../../features/code/Explanation';
import FreeCodeExercise from '../../features/code/FreeCodeExercise';
import { HintBox } from '../../features/code/HintBox';
import ConsoleOutput from '../../features/js/ConsoleOutput';
import JsComment from '../../features/jsSyntax/JsComment';
import JsKeyword from '../../features/jsSyntax/JsKeyword';
import QuizSection from '../../features/quiz/QuizSection';

/* ════════════════════════════════════════════
   Lesson 2 — العمليات والمعاملات (Operators)
════════════════════════════════════════════ */

const JsOperatorsExercise1: React.FC = () => {
  /* ── Exercise 1: Arithmetic ── */
  const [op1, setOp1] = useState('');
  const [op2, setOp2] = useState('');
  const [op3, setOp3] = useState('');

  /* ── Exercise 2: Comparison ── */
  const [comp1, setComp1] = useState('');
  const [comp2, setComp2] = useState('');
  const [comp3, setComp3] = useState('');

  /* ── Exercise 3: Logical ── */
  const [logic1, setLogic1] = useState('');
  const [logic2, setLogic2] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Console 1: Arithmetic ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const o1 = op1.trim();
    const o2 = op2.trim();
    const o3 = op3.trim();

    if (!o1 && !o2 && !o3) return lines;

    if (o1) {
      if (['+', '-', '*', '/'].includes(o1)) {
        const r = o1 === '+' ? 15 : o1 === '-' ? 5 : o1 === '*' ? 50 : 2;
        lines.push({ type: 'log', text: `10 ${o1} 5 = ${r}  ✅` });
      } else {
        lines.push({ type: 'error', text: `"${o1}" ليست عملية حسابية صالحة` });
      }
    }
    if (o2) {
      if (o2 === '%') {
        lines.push({ type: 'log', text: `10 % 3 = 1  ✅ (باقي القسمة)` });
      } else {
        lines.push({ type: 'error', text: `المطلوب عملية باقي القسمة: %` });
      }
    }
    if (o3) {
      if (o3 === '**') {
        lines.push({ type: 'log', text: `2 ** 3 = 8  ✅ (الأس)` });
      } else {
        lines.push({ type: 'error', text: `المطلوب عملية الأس: **` });
      }
    }
    return lines;
  }, [op1, op2, op3]);

  /* ── Console 2: Comparison ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const c1 = comp1.trim();
    const c2 = comp2.trim();
    const c3 = comp3.trim();

    if (!c1 && !c2 && !c3) return lines;

    if (c1) {
      if (c1 === '===') {
        lines.push({ type: 'log', text: `5 === 5 → true  ✅` });
      } else if (c1 === '==') {
        lines.push({
          type: 'info',
          text: `5 == 5 → true (لكن === أفضل لأنها تقارن النوع أيضاً)`,
        });
      } else {
        lines.push({ type: 'error', text: `استخدم === للمقارنة` });
      }
    }
    if (c2) {
      if (c2 === '!==') {
        lines.push({ type: 'log', text: `10 !== 5 → true  ✅` });
      } else if (c2 === '!=') {
        lines.push({ type: 'info', text: `10 != 5 → true (لكن !== أفضل)` });
      } else {
        lines.push({
          type: 'error',
          text: `استخدم !== للمقارنة بعدم المساواة`,
        });
      }
    }
    if (c3) {
      if (['>', '<', '>=', '<='].includes(c3)) {
        const r =
          c3 === '>'
            ? 'true'
            : c3 === '<'
              ? 'false'
              : c3 === '>='
                ? 'true'
                : 'false';
        lines.push({ type: 'log', text: `10 ${c3} 5 → ${r}  ✅` });
      } else {
        lines.push({ type: 'error', text: `استخدم > أو < أو >= أو <=` });
      }
    }
    return lines;
  }, [comp1, comp2, comp3]);

  /* ── Console 3: Logical ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const l1 = logic1.trim();
    const l2 = logic2.trim();

    if (!l1 && !l2) return lines;

    if (l1) {
      if (l1 === '&&') {
        lines.push({
          type: 'log',
          text: `true && false → false  ✅ (كلاهما يجب أن يكون true)`,
        });
      } else if (l1 === '||') {
        lines.push({ type: 'info', text: `&& تعني "و" — كلا الشرطين مطلوب` });
      } else {
        lines.push({ type: 'error', text: `استخدم && (العملية المنطقية "و")` });
      }
    }
    if (l2) {
      if (l2 === '||') {
        lines.push({
          type: 'log',
          text: `true || false → true  ✅ (أحدهما يكفي)`,
        });
      } else {
        lines.push({
          type: 'error',
          text: `استخدم || (العملية المنطقية "أو")`,
        });
      }
    }
    return lines;
  }, [logic1, logic2]);

  return (
    <>
      {/* ═══════ Exercise 1: Arithmetic Operators ═══════ */}
      <ExerciseSection
        title="التمرين الأول: العمليات الحسابية"
        borderColor="amber"
        lessonId="js-2"
        exerciseId="ex1"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            JavaScript يدعم العمليات الحسابية الأساسية:{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              +
            </code>{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              -
            </code>{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              *
            </code>{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              /
            </code>{' '}
            وأيضاً{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              %
            </code>{' '}
            (باقي القسمة) و{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              **
            </code>{' '}
            (الأس).
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// أكمل العمليات الحسابية</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> sum = 10{' '}
            <CodeInput
              value={op1}
              onChange={setOp1}
              width="w-10"
              hint="+"
              correctValue="+"
            />{' '}
            5; <JsComment>// الجمع</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> remainder = 10{' '}
            <CodeInput
              value={op2}
              onChange={setOp2}
              width="w-10"
              hint="%"
              correctValue="%"
            />{' '}
            3; <JsComment>// باقي القسمة</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> power = 2{' '}
            <CodeInput
              value={op3}
              onChange={setOp3}
              width="w-10"
              hint="**"
              correctValue="**"
            />{' '}
            3; <JsComment>// الأس (2³ = 8)</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                +
              </code>{' '}
              جمع،{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                -
              </code>{' '}
              طرح،{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                *
              </code>{' '}
              ضرب،{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                /
              </code>{' '}
              قسمة
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                %
              </code>{' '}
              تُرجع باقي القسمة (مثلاً: 10 % 3 = 1)
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                **
              </code>{' '}
              عملية الأس (مثلاً: 2 ** 3 = 8)
            </li>
          </ul>
        </HintBox>

        <AnswerKey
          show={showAnswer1}
          onToggle={() => setShowAnswer1(!showAnswer1)}
        >
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const sum = 10 <strong>+</strong> 5;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const remainder = 10 <strong>%</strong> 3;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const power = 2 <strong>**</strong> 3;
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: Comparison Operators ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: عمليات المقارنة"
        borderColor="amber"
        lessonId="js-2"
        exerciseId="ex2"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            عمليات المقارنة تُرجع{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              true
            </code>{' '}
            أو{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              false
            </code>
            . استخدم دائماً{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              ===
            </code>{' '}
            بدلاً من{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              ==
            </code>{' '}
            للمقارنة الدقيقة.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// أكمل عمليات المقارنة</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> isEqual = 5{' '}
            <CodeInput
              value={comp1}
              onChange={setComp1}
              width="w-14"
              hint="==="
              correctValue="==="
            />{' '}
            5; <JsComment>// المساواة التامة</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> isNotEqual = 10{' '}
            <CodeInput
              value={comp2}
              onChange={setComp2}
              width="w-14"
              hint="!=="
              correctValue="!=="
            />{' '}
            5; <JsComment>// عدم المساواة</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> isGreater = 10{' '}
            <CodeInput
              value={comp3}
              onChange={setComp3}
              width="w-12"
              hint=">"
              correctValue=">"
            />{' '}
            5; <JsComment>// أكبر من</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                ===
              </code>{' '}
              مساواة تامة (القيمة والنوع)
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                !==
              </code>{' '}
              عدم مساواة تامة
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                {'>'}
              </code>{' '}
              أكبر من،{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                {'<'}
              </code>{' '}
              أصغر من
            </li>
          </ul>
        </HintBox>

        <AnswerKey
          show={showAnswer2}
          onToggle={() => setShowAnswer2(!showAnswer2)}
        >
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const isEqual = 5 <strong>===</strong> 5;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const isNotEqual = 10 <strong>!==</strong> 5;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const isGreater = 10 <strong>&gt;</strong> 5;
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: Logical Operators ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: العمليات المنطقية"
        borderColor="amber"
        lessonId="js-2"
        exerciseId="ex3"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            العمليات المنطقية تربط بين شروط متعددة:{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              &&
            </code>{' '}
            (و)،{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              ||
            </code>{' '}
            (أو)،{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              !
            </code>{' '}
            (نفي).
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> age = 20;
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> hasID = <JsKeyword>true</JsKeyword>;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>
              // يمكنه الدخول إذا كان عمره 18+ "و" لديه هوية
            </JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> canEnter = (age {'>'} 18){' '}
            <CodeInput
              value={logic1}
              onChange={setLogic1}
              width="w-12"
              hint="&&"
              correctValue="&&"
            />{' '}
            hasID;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>
              // يحصل على خصم إذا كان طالباً "أو" عمره أقل من 12
            </JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> isStudent = <JsKeyword>true</JsKeyword>
            ;
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> discount = isStudent{' '}
            <CodeInput
              value={logic2}
              onChange={setLogic2}
              width="w-12"
              hint="||"
              correctValue="||"
            />{' '}
            (age {'<'} 12);
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                &&
              </code>{' '}
              — "و": يُرجع true فقط إذا كلا الشرطين صحيح
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                ||
              </code>{' '}
              — "أو": يُرجع true إذا أحد الشرطين صحيح
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                !
              </code>{' '}
              — "نفي": يعكس القيمة المنطقية
            </li>
          </ul>
        </HintBox>

        <AnswerKey
          show={showAnswer3}
          onToggle={() => setShowAnswer3(!showAnswer3)}
        >
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const canEnter = (age {'>'} 18) <strong>&&</strong> hasID;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const discount = isStudent <strong>||</strong> (age {'<'} 12);
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="حاسبة بسيطة"
        instructions="اكتب برنامجاً يعرّف متغيرين (a و b) ويطبع نتيجة الجمع والطرح والضرب والقسمة وباقي القسمة."
        starterCode={`const a = 15;\nconst b = 4;\n\n// اطبع نتائج العمليات\nconsole.log("الجمع:", );\nconsole.log("الطرح:", );\nconsole.log("الضرب:", );\nconsole.log("القسمة:", );\nconsole.log("الباقي:", );`}
        answerCode={`const a = 15;\nconst b = 4;\n\nconsole.log("الجمع:", a + b);   // 19\nconsole.log("الطرح:", a - b);   // 11\nconsole.log("الضرب:", a * b);   // 60\nconsole.log("القسمة:", a / b);  // 3.75\nconsole.log("الباقي:", a % b);  // 3`}
        hint="استخدم a + b, a - b, a * b, a / b, a % b"
        lessonId="js-2"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <QuizSection
        lessonId="js-2"
        exerciseId="quiz"
        questions={[
          {
            question: 'ما نتيجة 10 % 3 ؟',
            options: ['3', '1', '3.33', '0'],
            correctIndex: 1,
            explanation: '% تُرجع باقي القسمة: 10 ÷ 3 = 3 والباقي 1.',
          },
          {
            question: 'ما الفرق بين == و === ؟',
            options: [
              'لا فرق',
              '=== تقارن القيمة فقط',
              '=== تقارن القيمة والنوع معاً',
              '== أحدث من ===',
            ],
            correctIndex: 2,
            explanation:
              '=== (strict equality) تتحقق من تطابق القيمة والنوع معاً.',
          },
          {
            question: 'ما نتيجة true && false ؟',
            options: ['true', 'false', 'undefined', 'null'],
            correctIndex: 1,
            explanation: '&& تُرجع true فقط إذا كان كلا الطرفين true.',
          },
          {
            question: 'ما نتيجة 2 ** 4 ؟',
            options: ['8', '6', '16', '24'],
            correctIndex: 2,
            explanation: '** عملية الأس: 2⁴ = 16.',
          },
        ]}
      />
    </>
  );
};

export default JsOperatorsExercise1;
