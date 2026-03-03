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
   Lesson 10 — النصوص (Strings)
════════════════════════════════════════════ */

const JsStringsExercise1: React.FC = () => {
  /* ── Exercise 1: String methods ── */
  const [upperMethod, setUpperMethod] = useState('');
  const [lowerMethod, setLowerMethod] = useState('');

  /* ── Exercise 2: Search ── */
  const [includesArg, setIncludesArg] = useState('');
  const [indexOfArg, setIndexOfArg] = useState('');

  /* ── Exercise 3: slice & split ── */
  const [sliceStart, setSliceStart] = useState('');
  const [sliceEnd, setSliceEnd] = useState('');
  const [splitArg, setSplitArg] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Console 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const up = upperMethod.trim();
    const low = lowerMethod.trim();
    if (!up && !low) return lines;

    if (up) {
      if (up === 'toUpperCase' || up === 'toUpperCase()') {
        lines.push({
          type: 'result',
          text: `"hello".toUpperCase() → "HELLO" ✅`,
        });
      } else {
        lines.push({ type: 'info', text: `الدالة هي toUpperCase` });
      }
    }
    if (low) {
      if (low === 'toLowerCase' || low === 'toLowerCase()') {
        lines.push({
          type: 'result',
          text: `"HELLO".toLowerCase() → "hello" ✅`,
        });
      } else {
        lines.push({ type: 'info', text: `الدالة هي toLowerCase` });
      }
    }
    return lines;
  }, [upperMethod, lowerMethod]);

  /* ── Console 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const inc = includesArg.trim().replace(/['"]/g, '');
    const idx = indexOfArg.trim().replace(/['"]/g, '');
    if (!inc && !idx) return lines;

    if (inc) {
      const text = 'مرحباً بك في JavaScript';
      if (text.includes(inc)) {
        lines.push({ type: 'result', text: `includes("${inc}") → true ✅` });
      } else {
        lines.push({ type: 'log', text: `includes("${inc}") → false` });
      }
    }
    if (idx) {
      const text = 'مرحباً بك في JavaScript';
      const pos = text.indexOf(idx);
      if (pos >= 0) {
        lines.push({ type: 'result', text: `indexOf("${idx}") → ${pos} ✅` });
      } else {
        lines.push({ type: 'log', text: `indexOf("${idx}") → -1 (غير موجود)` });
      }
    }
    return lines;
  }, [includesArg, indexOfArg]);

  /* ── Console 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const s = sliceStart.trim();
    const e = sliceEnd.trim();
    const sp = splitArg.trim().replace(/['"]/g, '');
    if (!s && !e && !sp) return lines;

    if (s && e) {
      const text = 'JavaScript';
      const start = Number(s);
      const end = Number(e);
      if (!isNaN(start) && !isNaN(end)) {
        lines.push({
          type: 'result',
          text: `"JavaScript".slice(${start}, ${end}) → "${text.slice(start, end)}" ✅`,
        });
      }
    } else if (s) {
      lines.push({ type: 'info', text: `أضف فهرس النهاية أيضاً` });
    }

    if (sp) {
      if (sp === ',') {
        lines.push({
          type: 'result',
          text: `"أحمد,سارة,محمد".split(",") → ["أحمد", "سارة", "محمد"] ✅`,
        });
      } else if (sp === ' ') {
        lines.push({ type: 'log', text: `split(" ") يقسم حسب المسافات` });
      } else {
        lines.push({ type: 'info', text: `جرّب الفاصلة: ","` });
      }
    }
    return lines;
  }, [sliceStart, sliceEnd, splitArg]);

  return (
    <>
      {/* ═══════ Exercise 1: toUpperCase / toLowerCase ═══════ */}
      <ExerciseSection
        title="التمرين الأول: تحويل حالة الأحرف"
        borderColor="amber"
        lessonId="js-10"
        exerciseId="ex1"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            النصوص في JavaScript <strong>غير قابلة للتغيير</strong> (immutable).
            الدوال تُرجع نصاً جديداً ولا تغير الأصلي.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200">
              <code className="text-blue-700 text-sm font-bold">
                toUpperCase()
              </code>
              <p className="text-xs text-gray-500 mt-1">→ أحرف كبيرة</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 text-center border border-green-200">
              <code className="text-green-700 text-sm font-bold">
                toLowerCase()
              </code>
              <p className="text-xs text-gray-500 mt-1">→ أحرف صغيرة</p>
            </div>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> text = <JsString>"hello"</JsString>;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(text.
            <CodeInput
              value={upperMethod}
              onChange={setUpperMethod}
              width="w-36"
              hint="toUpperCase"
              correctValue="toUpperCase"
            />
            ()); <JsComment>// "HELLO"</JsComment>
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>const</JsKeyword> big = <JsString>"HELLO"</JsString>;
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(big.
            <CodeInput
              value={lowerMethod}
              onChange={setLowerMethod}
              width="w-36"
              hint="toLowerCase"
              correctValue="toLowerCase"
            />
            ()); <JsComment>// "hello"</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <AnswerKey
          show={showAnswer1}
          onToggle={() => setShowAnswer1(!showAnswer1)}
        >
          <pre
            dir="ltr"
            className="bg-gray-200 px-3 py-2 rounded font-mono text-sm"
          >
            {`text.toUpperCase()  // "HELLO"
big.toLowerCase()   // "hello"`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: includes & indexOf ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: البحث في النصوص"
        borderColor="amber"
        lessonId="js-10"
        exerciseId="ex2"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              includes()
            </code>{' '}
            تُرجع true/false، و{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              indexOf()
            </code>{' '}
            تُرجع موقع النص (-1 إذا غير موجود).
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> message ={' '}
            <JsString>"مرحباً بك في JavaScript"</JsString>;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// هل النص يحتوي "JavaScript"؟</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>
            (message.includes(
            <CodeInput
              value={includesArg}
              onChange={setIncludesArg}
              width="w-28"
              hint='"JavaScript"'
              correctValue='"JavaScript"'
            />
            ));
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// أين يبدأ "بك"؟</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>
            (message.indexOf(
            <CodeInput
              value={indexOfArg}
              onChange={setIndexOfArg}
              width="w-20"
              hint='"بك"'
              correctValue='"بك"'
            />
            ));
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        <AnswerKey
          show={showAnswer2}
          onToggle={() => setShowAnswer2(!showAnswer2)}
        >
          <pre
            dir="ltr"
            className="bg-gray-200 px-3 py-2 rounded font-mono text-sm"
          >
            {`message.includes("JavaScript")  // true
message.indexOf("بك")           // الموقع الرقمي`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: slice & split ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: القص والتقسيم"
        borderColor="amber"
        lessonId="js-10"
        exerciseId="ex3"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              slice(start, end)
            </code>{' '}
            تقص جزءاً من النص، و{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              split(separator)
            </code>{' '}
            تُقسم النص إلى مصفوفة.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> lang ={' '}
            <JsString>"JavaScript"</JsString>;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// قص "Java" من البداية</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>
            (lang.slice(
            <CodeInput
              value={sliceStart}
              onChange={setSliceStart}
              width="w-10"
              hint="0"
              correctValue="0"
            />
            ,{' '}
            <CodeInput
              value={sliceEnd}
              onChange={setSliceEnd}
              width="w-10"
              hint="4"
              correctValue="4"
            />
            ));
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>const</JsKeyword> names ={' '}
            <JsString>"أحمد,سارة,محمد"</JsString>;
          </CodeLine>
          <CodeLine>
            <JsComment>// قسّم إلى مصفوفة حسب الفاصلة</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>
            (names.split(
            <CodeInput
              value={splitArg}
              onChange={setSplitArg}
              width="w-14"
              hint='","'
              correctValue='","'
            />
            ));
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                slice(0, 4)
              </code>{' '}
              — من الحرف 0 إلى 3 (4 غير شاملة)
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                split(",")
              </code>{' '}
              — تقسم عند كل فاصلة
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                trim()
              </code>{' '}
              — تحذف المسافات من الطرفين
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                replace("a", "b")
              </code>{' '}
              — تستبدل أول تطابق
            </li>
          </ul>
        </HintBox>

        <AnswerKey
          show={showAnswer3}
          onToggle={() => setShowAnswer3(!showAnswer3)}
        >
          <pre
            dir="ltr"
            className="bg-gray-200 px-3 py-2 rounded font-mono text-sm"
          >
            {`lang.slice(0, 4)    // "Java"
names.split(",")    // ["أحمد", "سارة", "محمد"]`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="معالج بريد إلكتروني"
        instructions="اكتب كوداً يأخذ بريداً إلكترونياً ويطبع: هل يحتوي @? واستخرج اسم المستخدم (ما قبل @) واسم المزود (ما بعد @)."
        starterCode={`const email = "ahmed@gmail.com";\n\n// هل يحتوي @?\nconsole.log(email.includes());\n\n// اقسم عند @\nconst parts = email.split();\nconsole.log("المستخدم:", parts[0]);\nconsole.log("المزود:", parts[1]);`}
        answerCode={`const email = "ahmed@gmail.com";\n\nconsole.log(email.includes("@")); // true\n\nconst parts = email.split("@");\nconsole.log("المستخدم:", parts[0]); // "ahmed"\nconsole.log("المزود:", parts[1]);   // "gmail.com"`}
        hint='استخدم includes("@") للتحقق و split("@") للتقسيم'
        lessonId="js-10"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-10"
        lessonNum="10"
        totalQuestions={8}
      />
    </>
  );
};

export default JsStringsExercise1;
