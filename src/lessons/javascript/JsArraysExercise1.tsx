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
import JsString from '../../features/jsSyntax/JsString';
import StartQuizButton from '../../features/quiz/StartQuizButton';

/* ════════════════════════════════════════════
   Lesson 6 — المصفوفات (Arrays)
════════════════════════════════════════════ */

const JsArraysExercise1: React.FC = () => {
  /* ── Exercise 1: Create & Access ── */
  const [arrItem1, setArrItem1] = useState('');
  const [arrItem2, setArrItem2] = useState('');
  const [arrIndex, setArrIndex] = useState('');

  /* ── Exercise 2: Methods ── */
  const [pushVal, setPushVal] = useState('');
  const [popMethod, setPopMethod] = useState('');

  /* ── Exercise 3: length & includes ── */
  const [lengthProp, setLengthProp] = useState('');
  const [includesArg, setIncludesArg] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Console 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const i1 = arrItem1.trim();
    const i2 = arrItem2.trim();
    const idx = arrIndex.trim();

    if (!i1 && !i2 && !idx) return lines;

    if (i1 || i2) {
      const items = [i1 || '___', i2 || '___'];
      lines.push({
        type: 'log',
        text: `المصفوفة: ["أحمد", ${items.join(', ')}]`,
      });
    }
    if (idx) {
      const n = Number(idx);
      if (isNaN(n)) {
        lines.push({ type: 'error', text: 'الفهرس يجب أن يكون رقماً' });
      } else if (n === 0) {
        lines.push({
          type: 'result',
          text: `colors[0] = "أحمد" ✅ (الفهرس يبدأ من 0)`,
        });
      } else if (n === 1) {
        lines.push({ type: 'result', text: `colors[1] = العنصر الثاني ✅` });
      } else {
        lines.push({ type: 'info', text: `الفهارس تبدأ من 0. جرّب: 0` });
      }
    }
    return lines;
  }, [arrItem1, arrItem2, arrIndex]);

  /* ── Console 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const pv = pushVal.trim();
    const pm = popMethod.trim();

    if (!pv && !pm) return lines;

    if (pv) {
      if (pv.startsWith('"') || pv.startsWith("'")) {
        lines.push({
          type: 'log',
          text: `تمت إضافة ${pv} إلى نهاية المصفوفة ✅`,
        });
        lines.push({ type: 'info', text: `push() يضيف عنصراً في النهاية` });
      } else {
        lines.push({
          type: 'info',
          text: `أدخل نصاً بين علامات تنصيص: "قيمة"`,
        });
      }
    }
    if (pm) {
      if (pm === 'pop' || pm === 'pop()') {
        lines.push({ type: 'log', text: `تم حذف آخر عنصر من المصفوفة ✅` });
        lines.push({ type: 'info', text: `pop() يحذف آخر عنصر ويُرجعه` });
      } else {
        lines.push({ type: 'info', text: `الدالة المطلوبة هي pop` });
      }
    }
    return lines;
  }, [pushVal, popMethod]);

  /* ── Console 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const lp = lengthProp.trim();
    const ia = includesArg.trim();

    if (!lp && !ia) return lines;

    if (lp) {
      if (lp === 'length') {
        lines.push({ type: 'result', text: `fruits.length = 3  ✅` });
      } else {
        lines.push({ type: 'info', text: `خاصية عدد العناصر هي: length` });
      }
    }
    if (ia) {
      if (ia === '"موز"' || ia === "'موز'" || ia === 'موز') {
        lines.push({
          type: 'result',
          text: `fruits.includes("موز") = true  ✅`,
        });
      } else {
        lines.push({
          type: 'info',
          text: `includes() تتحقق من وجود عنصر — جرّب: "موز"`,
        });
      }
    }
    return lines;
  }, [lengthProp, includesArg]);

  return (
    <>
      {/* ═══════ Exercise 1: Create & Access ═══════ */}
      <ExerciseSection
        title="التمرين الأول: إنشاء مصفوفة والوصول للعناصر"
        borderColor="amber"
        lessonId="js-6"
        exerciseId="ex1"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            المصفوفة تخزن عدة قيم في متغير واحد. العناصر تُرقم من{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              0
            </code>{' '}
            (وليس 1).
          </p>
          <div
            className="mt-3 bg-gray-100 rounded-lg p-3 text-center font-mono text-sm"
            dir="ltr"
          >
            <span className="text-gray-400">[0]</span>{' '}
            <span className="text-gray-400">[1]</span>{' '}
            <span className="text-gray-400">[2]</span>
            <br />
            ["أحمد", "سارة", "محمد"]
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// أنشئ مصفوفة بأسماء أصدقائك</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> friends = [<JsString>"أحمد"</JsString>,{' '}
            <CodeInput
              value={arrItem1}
              onChange={setArrItem1}
              width="w-24"
              hint='"سارة"'
              correctValue='"سارة"'
            />
            ,{' '}
            <CodeInput
              value={arrItem2}
              onChange={setArrItem2}
              width="w-24"
              hint='"محمد"'
              correctValue='"محمد"'
            />
            ];
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// الوصول لعنصر بالفهرس</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(friends[
            <CodeInput
              value={arrIndex}
              onChange={setArrIndex}
              width="w-10"
              hint="0"
              correctValue="0"
            />
            ]);
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              المصفوفة تُنشأ بأقواس مربعة:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                ["a", "b", "c"]
              </code>
            </li>
            <li>
              الفهرس يبدأ من <strong>0</strong> وليس 1
            </li>
            <li>
              للوصول لأول عنصر:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                array[0]
              </code>
            </li>
          </ul>
        </HintBox>

        <AnswerKey
          show={showAnswer1}
          onToggle={() => setShowAnswer1(!showAnswer1)}
        >
          <pre
            dir="ltr"
            className="bg-gray-200 px-3 py-2 rounded font-mono text-sm"
          >
            {`const friends = ["أحمد", "سارة", "محمد"];
console.log(friends[0]); // "أحمد"`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: push / pop ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: إضافة وحذف العناصر"
        borderColor="amber"
        lessonId="js-6"
        exerciseId="ex2"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              push()
            </code>{' '}
            تضيف عنصراً في النهاية،{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              pop()
            </code>{' '}
            تحذف آخر عنصر.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> colors = [<JsString>"أحمر"</JsString>,{' '}
            <JsString>"أخضر"</JsString>];
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// أضف لوناً جديداً</JsComment>
          </CodeLine>
          <CodeLine>
            colors.<JsKeyword>push</JsKeyword>(
            <CodeInput
              value={pushVal}
              onChange={setPushVal}
              width="w-24"
              hint='"أزرق"'
              correctValue='"أزرق"'
            />
            );
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// احذف آخر عنصر</JsComment>
          </CodeLine>
          <CodeLine>
            colors.
            <CodeInput
              value={popMethod}
              onChange={setPopMethod}
              width="w-14"
              hint="pop"
              correctValue="pop"
            />
            ();
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                push("قيمة")
              </code>{' '}
              — إضافة في النهاية
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                pop()
              </code>{' '}
              — حذف من النهاية
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                unshift()
              </code>{' '}
              — إضافة في البداية
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                shift()
              </code>{' '}
              — حذف من البداية
            </li>
          </ul>
        </HintBox>

        <AnswerKey
          show={showAnswer2}
          onToggle={() => setShowAnswer2(!showAnswer2)}
        >
          <pre
            dir="ltr"
            className="bg-gray-200 px-3 py-2 rounded font-mono text-sm"
          >
            {`colors.push("أزرق");
colors.pop();`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: length & includes ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: خصائص المصفوفة"
        borderColor="amber"
        lessonId="js-6"
        exerciseId="ex3"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              .length
            </code>{' '}
            تعطيك عدد العناصر، و{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              .includes()
            </code>{' '}
            تتحقق من وجود عنصر.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> fruits = [<JsString>"تفاح"</JsString>,{' '}
            <JsString>"موز"</JsString>, <JsString>"برتقال"</JsString>];
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// عدد العناصر</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(fruits.
            <CodeInput
              value={lengthProp}
              onChange={setLengthProp}
              width="w-20"
              hint="length"
              correctValue="length"
            />
            );
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// هل "موز" موجود؟</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>
            (fruits.includes(
            <CodeInput
              value={includesArg}
              onChange={setIncludesArg}
              width="w-20"
              hint='"موز"'
              correctValue='"موز"'
            />
            ));
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <AnswerKey
          show={showAnswer3}
          onToggle={() => setShowAnswer3(!showAnswer3)}
        >
          <pre
            dir="ltr"
            className="bg-gray-200 px-3 py-2 rounded font-mono text-sm"
          >
            {`console.log(fruits.length);        // 3
console.log(fruits.includes("موز")); // true`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="قائمة مهام"
        instructions="أنشئ مصفوفة فيها 3 مهام. أضف مهمة رابعة بـ push. ثم اطبع عدد المهام وكل مهمة باستخدام for...of."
        starterCode={`const tasks = [];\n\n// أضف مهمة\ntasks.push();\n\nconsole.log("عدد المهام:", tasks.length);\n\nfor (const task of tasks) {\n  console.log("- " + task);\n}`}
        answerCode={`const tasks = ["دراسة", "رياضة", "قراءة"];\n\ntasks.push("برمجة");\n\nconsole.log("عدد المهام:", tasks.length); // 4\n\nfor (const task of tasks) {\n  console.log("- " + task);\n}`}
        hint='أنشئ المصفوفة بـ ["مهمة1", "مهمة2", "مهمة3"] ثم push("مهمة4")'
        lessonId="js-6"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-6"
        lessonNum="6"
        totalQuestions={8}
      />
    </>
  );
};

export default JsArraysExercise1;
