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
   Lesson 3 — الجمل الشرطية (Conditionals)
════════════════════════════════════════════ */

const JsConditionalsExercise1: React.FC = () => {
  /* ── Exercise 1: if/else ── */
  const [ifKeyword, setIfKeyword] = useState('');
  const [condition1, setCondition1] = useState('');
  const [elseKeyword, setElseKeyword] = useState('');

  /* ── Exercise 2: else if ── */
  const [grade, setGrade] = useState('');

  /* ── Exercise 3: ternary ── */
  const [ternaryOp, setTernaryOp] = useState('');

  /* ── Exercise 4: switch/case ── */
  const [dayNumber, setDayNumber] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
  const [showAnswer4, setShowAnswer4] = useState(false);

  /* ── Console 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const kw = ifKeyword.trim().toLowerCase();
    const cond = condition1.trim();
    const el = elseKeyword.trim().toLowerCase();

    if (!kw && !cond && !el) return lines;

    if (kw && kw !== 'if') {
      lines.push({ type: 'error', text: `الكلمة المفتاحية هي "if"` });
    }
    if (cond) {
      if (cond.includes('>=') && cond.includes('18')) {
        lines.push({ type: 'log', text: `الشرط: age >= 18 → true ✅` });
        lines.push({ type: 'result', text: `"مرحباً! يمكنك الدخول"` });
      } else if (cond.includes('>') && cond.includes('18')) {
        lines.push({
          type: 'info',
          text: `> تعني أكبر (بدون يساوي). استخدم >= لتشمل 18`,
        });
      } else {
        lines.push({ type: 'info', text: `حاول: age >= 18` });
      }
    }
    if (el && el !== 'else') {
      lines.push({ type: 'error', text: `الكلمة المفتاحية هي "else"` });
    } else if (el === 'else') {
      lines.push({
        type: 'info',
        text: `✅ else يُنفذ عندما يكون الشرط false`,
      });
    }
    return lines;
  }, [ifKeyword, condition1, elseKeyword]);

  /* ── Console 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const g = grade.trim();
    if (!g) return lines;

    const num = Number(g);
    if (isNaN(num)) {
      lines.push({ type: 'error', text: `أدخل رقماً بين 0 و 100` });
    } else if (num >= 90) {
      lines.push({ type: 'result', text: `التقدير: ممتاز 🌟` });
    } else if (num >= 70) {
      lines.push({ type: 'result', text: `التقدير: جيد جداً 👍` });
    } else if (num >= 50) {
      lines.push({ type: 'result', text: `التقدير: مقبول ✅` });
    } else {
      lines.push({ type: 'result', text: `التقدير: راسب ❌` });
    }
    return lines;
  }, [grade]);

  /* ── Console 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const op = ternaryOp.trim();
    if (!op) return lines;

    if (op === '?') {
      lines.push({
        type: 'log',
        text: `العامل الشرطي (ternary): condition ? valueIfTrue : valueIfFalse`,
      });
      lines.push({
        type: 'result',
        text: `20 >= 18 ? "بالغ" : "قاصر" → "بالغ" ✅`,
      });
    } else {
      lines.push({ type: 'error', text: `العامل الشرطي هو ? (علامة استفهام)` });
    }
    return lines;
  }, [ternaryOp]);

  /* ── Console 4 ── */
  const console4Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const day = dayNumber.trim();

    if (!day) return lines;

    const dayMap: Record<number, string> = {
      1: 'السبت',
      2: 'الأحد',
      3: 'الاثنين',
      4: 'الثلاثاء',
      5: 'الأربعاء',
      6: 'الخميس',
      7: 'الجمعة',
    };

    const num = Number(day);
    if (Number.isNaN(num)) {
      lines.push({ type: 'error', text: 'أدخل رقماً من 1 إلى 7' });
      return lines;
    }

    if (!dayMap[num]) {
      lines.push({
        type: 'info',
        text: 'هذه قيمة خارج الحالات، سيتم تنفيذ default.',
      });
      lines.push({ type: 'result', text: 'اليوم غير معروف' });
      return lines;
    }

    lines.push({ type: 'log', text: `switch(dayNumber) => case ${num}` });
    lines.push({ type: 'result', text: `اليوم هو: ${dayMap[num]} ✅` });
    return lines;
  }, [dayNumber]);

  return (
    <>
      {/* ═══════ Exercise 1: if / else ═══════ */}
      <ExerciseSection
        title="التمرين الأول: جملة if / else"
        borderColor="amber"
        lessonId="js-3"
        exerciseId="ex1"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            جملة{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              if
            </code>{' '}
            تتحقق من شرط معين. إذا كان الشرط{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              true
            </code>{' '}
            يُنفذ الكود بداخلها، وإلا يُنفذ كود{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              else
            </code>
            .
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> age = 20;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <CodeInput
              value={ifKeyword}
              onChange={setIfKeyword}
              width="w-12"
              correctValue="if"
            />{' '}
            (
            <CodeInput
              value={condition1}
              onChange={setCondition1}
              width="w-28"
              correctValue="age >= 18"
            />
            ) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"مرحباً! يمكنك الدخول"</JsString>);
          </CodeLine>
          <CodeLine>
            {'}'}{' '}
            <CodeInput
              value={elseKeyword}
              onChange={setElseKeyword}
              width="w-14"
              correctValue="else"
            />{' '}
            {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"عذراً، أنت أصغر من 18"</JsString>);
          </CodeLine>
          <CodeLine>{'}'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                if (شرط)
              </code>{' '}
              — يتحقق من الشرط
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                else
              </code>{' '}
              — يُنفذ عند عدم تحقق الشرط
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                {'>'}=
              </code>{' '}
              تعني "أكبر من أو يساوي"
            </li>
          </ul>
        </HintBox>

        <AnswerKey
          show={showAnswer1}
          onToggle={() => setShowAnswer1(!showAnswer1)}
        >
          <pre
            dir="ltr"
            className="bg-gray-200 px-3 py-2 rounded font-mono text-sm leading-relaxed"
          >
            {`if (age >= 18) {
  console.log("مرحباً! يمكنك الدخول");
} else {
  console.log("عذراً، أنت أصغر من 18");
}`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: else if ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: سلسلة else if"
        borderColor="amber"
        lessonId="js-3"
        exerciseId="ex2"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>
            يمكنك إضافة عدة شروط متتالية باستخدام{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              else if
            </code>
            . أدخل درجة بين 0 و 100 لترى التقدير:
          </p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-emerald-50 rounded-lg p-2 text-center border border-emerald-200">
              <span className="font-bold text-emerald-700 text-sm">90+ 🌟</span>
              <p className="text-xs text-gray-500">ممتاز</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200">
              <span className="font-bold text-blue-700 text-sm">70-89 👍</span>
              <p className="text-xs text-gray-500">جيد جداً</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-2 text-center border border-amber-200">
              <span className="font-bold text-amber-700 text-sm">50-69 ✅</span>
              <p className="text-xs text-gray-500">مقبول</p>
            </div>
            <div className="bg-red-50 rounded-lg p-2 text-center border border-red-200">
              <span className="font-bold text-red-700 text-sm">0-49 ❌</span>
              <p className="text-xs text-gray-500">راسب</p>
            </div>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> score ={' '}
            <CodeInput
              value={grade}
              onChange={setGrade}
              width="w-16"
              correctValue="85"
            />
            ;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>if</JsKeyword> (score {'>'} 90) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"ممتاز 🌟"</JsString>);
          </CodeLine>
          <CodeLine>
            {'}'} <JsKeyword>else if</JsKeyword> (score {'>'} 70) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"جيد جداً 👍"</JsString>);
          </CodeLine>
          <CodeLine>
            {'}'} <JsKeyword>else if</JsKeyword> (score {'>'} 50) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"مقبول ✅"</JsString>);
          </CodeLine>
          <CodeLine>
            {'}'} <JsKeyword>else</JsKeyword> {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"راسب ❌"</JsString>);
          </CodeLine>
          <CodeLine>{'}'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        <AnswerKey
          show={showAnswer2}
          onToggle={() => setShowAnswer2(!showAnswer2)}
        >
          <p className="text-sm text-gray-600">
            أدخل أي رقم بين 0 و 100 لترى التقدير المناسب.
          </p>
          <p className="mt-1 text-sm">
            مثال: <strong>85</strong> → جيد جداً 👍
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: Ternary Operator ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: العامل الشرطي (Ternary)"
        borderColor="amber"
        lessonId="js-3"
        exerciseId="ex3"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>
            العامل الشرطي هو اختصار لجملة if/else في سطر واحد:{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              condition ? valueIfTrue : valueIfFalse
            </code>
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> age = 20;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// اختصار if/else في سطر واحد</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> status = age {'>'}= 18{' '}
            <CodeInput
              value={ternaryOp}
              onChange={setTernaryOp}
              width="w-10"
              correctValue="?"
            />{' '}
            <JsString>"بالغ"</JsString> : <JsString>"قاصر"</JsString>;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(status);
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              الصيغة:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                شرط ? قيمة_إذا_صح : قيمة_إذا_خطأ
              </code>
            </li>
            <li>العامل الشرطي عملي لقيم بسيطة، استخدم if/else للكود المعقد</li>
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
              const status = age &gt;= 18 <strong>?</strong> "بالغ" : "قاصر";
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 4: Switch / Case ═══════ */}
      <ExerciseSection
        title="التمرين الرابع: switch / case"
        borderColor="amber"
        lessonId="js-3"
        exerciseId="ex4"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>
            نستخدم{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              switch
            </code>{' '}
            عندما نريد مقارنة متغير واحد مع حالات متعددة بشكل واضح، مع{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              case
            </code>{' '}
            و{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              default
            </code>
            .
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> dayNumber ={' '}
            <CodeInput
              value={dayNumber}
              onChange={setDayNumber}
              width="w-14"
              correctValue="3"
            />
            ;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>switch</JsKeyword> (dayNumber) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>case</JsKeyword> 1:
          </CodeLine>
          <CodeLine indent={2}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"السبت"</JsString>);
          </CodeLine>
          <CodeLine indent={2}>
            <JsKeyword>break</JsKeyword>;
          </CodeLine>
          <CodeLine indent={1}>
            <JsComment>// ... حالات أخرى ...</JsComment>
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>default</JsKeyword>:
          </CodeLine>
          <CodeLine indent={2}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"اليوم غير معروف"</JsString>);
          </CodeLine>
          <CodeLine>{'}'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console4Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              كل{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                case
              </code>{' '}
              تمثل قيمة محددة
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                break
              </code>{' '}
              تمنع الانتقال للحالة التالية
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                default
              </code>{' '}
              تُنفذ إذا لم تطابق أي حالة
            </li>
          </ul>
        </HintBox>

        <AnswerKey
          show={showAnswer4}
          onToggle={() => setShowAnswer4(!showAnswer4)}
        >
          <pre
            dir="ltr"
            className="bg-gray-200 px-3 py-2 rounded font-mono text-sm leading-relaxed"
          >
            {`switch (dayNumber) {
  case 1:
    console.log("السبت");
    break;
  case 2:
    console.log("الأحد");
    break;
  case 3:
    console.log("الاثنين");
    break;
  default:
    console.log("اليوم غير معروف");
}`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="برنامج تصنيف العمر"
        instructions="حوّل تصنيف العمر لاستخدام switch/case (باستخدام switch(true)) واطبع: طفل (أقل من 13)، مراهق (13-17)، شاب (18-30)، بالغ (أكبر من 30)."
        starterCode={`const age = 25;\n\n// استخدم switch(true) مع الحالات\nswitch (true) {\n  case age < 13:\n    console.log("طفل");\n    break;\n  case age < 18:\n    \n    break;\n  case age <= 30:\n    \n    break;\n  default:\n    \n}`}
        answerCode={`const age = 25;\n\nswitch (true) {\n  case age < 13:\n    console.log("طفل");\n    break;\n  case age < 18:\n    console.log("مراهق");\n    break;\n  case age <= 30:\n    console.log("شاب");\n    break;\n  default:\n    console.log("بالغ");\n}`}
        hint="في switch(true)، كل case يكون شرطاً منطقياً يعيد true أو false"
        lessonId="js-3"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-3"
        lessonNum="3"
        totalQuestions={9}
      />
    </>
  );
};

export default JsConditionalsExercise1;
