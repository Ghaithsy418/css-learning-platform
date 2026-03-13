import { useMemo, useState } from 'react';
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
   Lesson 4 — الحلقات التكرارية (Loops)
════════════════════════════════════════════ */

const JsLoopsExercise1: React.FC = () => {
  /* ── Exercise 1: for loop ── */
  const [forInit, setForInit] = useState('');
  const [forCond, setForCond] = useState('');
  const [forUpdate, setForUpdate] = useState('');

  /* ── Exercise 2: while ── */
  const [whileKw, setWhileKw] = useState('');
  const [whileCond, setWhileCond] = useState('');

  /* ── Exercise 3: for...of ── */
  const [forOfKw, setForOfKw] = useState('');

  /* ── Console 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const init = forInit.trim();
    const cond = forCond.trim();
    const upd = forUpdate.trim();

    if (!init && !cond && !upd) return lines;

    const initOk =
      init.includes('let') && init.includes('i') && init.includes('0');
    const condOk =
      cond.includes('i') &&
      (cond.includes('<') || cond.includes('<=')) &&
      cond.includes('5');
    const updOk = upd === 'i++' || upd === 'i += 1' || upd === 'i = i + 1';

    if (init && !initOk)
      lines.push({ type: 'info', text: `التهيئة: let i = 0` });
    if (cond && !condOk) lines.push({ type: 'info', text: `الشرط: i < 5` });
    if (upd && !updOk) lines.push({ type: 'info', text: `التحديث: i++` });

    if (initOk && condOk && updOk) {
      for (let n = 0; n < 5; n++) {
        lines.push({ type: 'log', text: `العدد: ${n}` });
      }
      lines.push({ type: 'result', text: '✅ ممتاز! الحلقة تعمل بشكل صحيح' });
    }
    return lines;
  }, [forInit, forCond, forUpdate]);

  /* ── Console 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const kw = whileKw.trim().toLowerCase();
    const cond = whileCond.trim();

    if (!kw && !cond) return lines;

    if (kw && kw !== 'while') {
      lines.push({ type: 'error', text: `الكلمة المفتاحية هي "while"` });
    }
    if (cond) {
      if (cond.includes('count') && cond.includes('<') && cond.includes('3')) {
        lines.push({ type: 'log', text: `count = 0` });
        lines.push({ type: 'log', text: `count = 1` });
        lines.push({ type: 'log', text: `count = 2` });
        lines.push({
          type: 'result',
          text: '✅ ممتاز! while تتكرر ما دام الشرط صحيح',
        });
      } else {
        lines.push({ type: 'info', text: `جرّب: count < 3` });
      }
    }
    return lines;
  }, [whileKw, whileCond]);

  /* ── Console 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const kw = forOfKw.trim().toLowerCase();
    if (!kw) return lines;

    if (kw === 'of') {
      const fruits = ['🍎 تفاح', '🍌 موز', '🍊 برتقال'];
      fruits.forEach((f) => lines.push({ type: 'log', text: f }));
      lines.push({
        type: 'result',
        text: '✅ for...of تمر على كل عنصر في المصفوفة',
      });
    } else {
      lines.push({
        type: 'info',
        text: `استخدم الكلمة "of" — for (const item of array)`,
      });
    }
    return lines;
  }, [forOfKw]);

  return (
    <>
      {/* ═══════ Exercise 1: for loop ═══════ */}
      <ExerciseSection
        title="التمرين الأول: حلقة for"
        borderColor="amber"
        lessonId="js-4"
        exerciseId="ex1"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            حلقة{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              for
            </code>{' '}
            تتكون من ثلاثة أجزاء: <strong>التهيئة</strong>،{' '}
            <strong>الشرط</strong>، و<strong>التحديث</strong>.
          </p>
          <div
            className="mt-3 bg-gray-100 rounded-lg p-3 font-mono text-sm"
            dir="ltr"
          >
            for (<span className="text-purple-600">تهيئة</span>;{' '}
            <span className="text-blue-600">شرط</span>;{' '}
            <span className="text-amber-600">تحديث</span>) {'{ ... }'}
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// اطبع الأرقام من 0 إلى 4</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>for</JsKeyword> (
            <CodeInput
              value={forInit}
              onChange={setForInit}
              width="w-24"
              correctValue="let i = 0"
            />
            ;{' '}
            <CodeInput
              value={forCond}
              onChange={setForCond}
              width="w-16"
              correctValue="i < 5"
            />
            ;{' '}
            <CodeInput
              value={forUpdate}
              onChange={setForUpdate}
              width="w-14"
              correctValue="i++"
            />
            ) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"العدد:"</JsString>, i);
          </CodeLine>
          <CodeLine>{'}'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <strong>التهيئة:</strong>{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                let i = 0
              </code>{' '}
              — نبدأ من 0
            </li>
            <li>
              <strong>الشرط:</strong>{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                i &lt; 5
              </code>{' '}
              — نستمر ما دام i أقل من 5
            </li>
            <li>
              <strong>التحديث:</strong>{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                i++
              </code>{' '}
              — نزيد i بواحد كل مرة
            </li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* ═══════ Exercise 2: while loop ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: حلقة while"
        borderColor="amber"
        lessonId="js-4"
        exerciseId="ex2"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              while
            </code>{' '}
            تتكرر ما دام الشرط صحيحاً. <strong>تذكر:</strong> يجب تحديث المتغير
            داخل الحلقة لتجنب حلقة لا نهائية!
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>let</JsKeyword> count = 0;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <CodeInput
              value={whileKw}
              onChange={setWhileKw}
              width="w-16"
              correctValue="while"
            />{' '}
            (
            <CodeInput
              value={whileCond}
              onChange={setWhileCond}
              width="w-24"
              correctValue="count < 3"
            />
            ) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"count ="</JsString>, count);
          </CodeLine>
          <CodeLine indent={1}>count++;</CodeLine>
          <CodeLine>{'}'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />
      </ExerciseSection>

      {/* ═══════ Exercise 3: for...of ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: حلقة for...of"
        borderColor="amber"
        lessonId="js-4"
        exerciseId="ex3"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              for...of
            </code>{' '}
            هي طريقة سهلة للمرور على كل عنصر في مصفوفة بدون الحاجة لعداد.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> fruits = [
            <JsString>"🍎 تفاح"</JsString>, <JsString>"🍌 موز"</JsString>,{' '}
            <JsString>"🍊 برتقال"</JsString>];
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>for</JsKeyword> (<JsKeyword>const</JsKeyword> fruit{' '}
            <CodeInput
              value={forOfKw}
              onChange={setForOfKw}
              width="w-12"
              correctValue="of"
            />{' '}
            fruits) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(fruit);
          </CodeLine>
          <CodeLine>{'}'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                for...of
              </code>{' '}
              — تمر على القيم مباشرة
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                for...in
              </code>{' '}
              — تمر على المفاتيح/الفهارس (أقل استخداماً للمصفوفات)
            </li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="جدول الضرب"
        instructions="اكتب حلقة for تطبع جدول الضرب للعدد 7 (من 7×1 إلى 7×10)."
        starterCode={`const number = 7;\n\nfor (let i = 1; i <= 10; i++) {\n  // اطبع نتيجة الضرب\n  console.log();\n}`}
        answerCode={`const number = 7;\n\nfor (let i = 1; i <= 10; i++) {\n  console.log(\`\${number} × \${i} = \${number * i}\`);\n}`}
        lessonId="js-4"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-4"
        lessonNum="4"
        totalQuestions={8}
      />
    </>
  );
};

export default JsLoopsExercise1;
