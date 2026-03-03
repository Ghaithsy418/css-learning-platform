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
   Lesson 12 — تصحيح الأخطاء (Debugging)
════════════════════════════════════════════ */

const JsDebuggingExercise1: React.FC = () => {
  /* ── Exercise 1: Types of errors ── */
  const [error1Type, setError1Type] = useState('');
  const [error2Type, setError2Type] = useState('');
  const [error3Type, setError3Type] = useState('');

  /* ── Exercise 2: Fix the bug ── */
  const [fix1, setFix1] = useState('');
  const [fix2, setFix2] = useState('');

  /* ── Exercise 3: try/catch ── */
  const [tryBody, setTryBody] = useState('');
  const [catchParam, setCatchParam] = useState('');
  const [catchBody, setCatchBody] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Console 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const e1 = error1Type.trim().toLowerCase();
    const e2 = error2Type.trim().toLowerCase();
    const e3 = error3Type.trim().toLowerCase();

    if (e1) {
      if (e1.includes('syntax')) {
        lines.push({
          type: 'result',
          text: `✅ SyntaxError — خطأ في الكتابة/الصياغة`,
        });
      } else {
        lines.push({
          type: 'info',
          text: `هذا خطأ في كتابة الكود (أقواس ناقصة) → SyntaxError`,
        });
      }
    }
    if (e2) {
      if (e2.includes('reference')) {
        lines.push({
          type: 'result',
          text: `✅ ReferenceError — متغير غير معرّف`,
        });
      } else {
        lines.push({
          type: 'info',
          text: `المتغير غير موجود → ReferenceError`,
        });
      }
    }
    if (e3) {
      if (e3.includes('type')) {
        lines.push({
          type: 'result',
          text: `✅ TypeError — عملية خاطئة على نوع بيانات`,
        });
      } else {
        lines.push({ type: 'info', text: `استدعاء دالة على null → TypeError` });
      }
    }
    return lines;
  }, [error1Type, error2Type, error3Type]);

  /* ── Console 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const f1 = fix1.trim();
    const f2 = fix2.trim();

    if (f1) {
      if (f1 === '===' || f1.includes('===')) {
        lines.push({
          type: 'result',
          text: `✅ استخدم === بدلاً من = للمقارنة`,
        });
      } else if (f1 === '==' || f1.includes('==')) {
        lines.push({
          type: 'info',
          text: `قريب! لكن === أفضل من == (مقارنة صارمة)`,
        });
      } else {
        lines.push({
          type: 'info',
          text: `= هو تعيين وليس مقارنة. استخدم === للمقارنة`,
        });
      }
    }
    if (f2) {
      if (f2 === 'toUpperCase' || f2.includes('toUpperCase')) {
        lines.push({
          type: 'result',
          text: `✅ الاسم الصحيح هو toUpperCase (بحرف U كبير)`,
        });
      } else {
        lines.push({
          type: 'info',
          text: `JavaScript حساسة لحالة الأحرف! الدالة هي toUpperCase`,
        });
      }
    }
    return lines;
  }, [fix1, fix2]);

  /* ── Console 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const tb = tryBody.trim();
    const cp = catchParam.trim();
    const cb = catchBody.trim();

    if (!tb && !cp && !cb) return lines;

    if (tb && tb.includes('JSON.parse')) {
      lines.push({ type: 'result', text: `✅ الكود الخطير يوضع داخل try` });
    } else if (tb) {
      lines.push({
        type: 'info',
        text: `ضع الكود الذي قد يسبب خطأ: JSON.parse(data)`,
      });
    }

    if (cp) {
      if (cp === 'error' || cp === 'err' || cp === 'e') {
        lines.push({ type: 'result', text: `✅ catch(${cp}) — يلتقط الخطأ` });
      } else {
        lines.push({
          type: 'info',
          text: `عادةً نسمي المعامل error أو err أو e`,
        });
      }
    }

    if (cb) {
      if (cb.includes('console') || cb.includes('message')) {
        lines.push({
          type: 'result',
          text: `✅ نطبع رسالة الخطأ بدلاً من توقف البرنامج`,
        });
      }
    }

    return lines;
  }, [tryBody, catchParam, catchBody]);

  return (
    <>
      {/* ═══════ Exercise 1: Types of Errors ═══════ */}
      <ExerciseSection
        title="التمرين الأول: أنواع الأخطاء"
        borderColor="amber"
        lessonId="js-12"
        exerciseId="ex1"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>JavaScript لديها 3 أنواع أخطاء رئيسية:</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 bg-red-50 rounded-lg p-2 border border-red-200">
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold shrink-0">
                SyntaxError
              </span>
              <span className="text-sm text-gray-700">
                خطأ في كتابة الكود (أقواس، فاصلة...)
              </span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-2 border border-orange-200">
              <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold shrink-0">
                ReferenceError
              </span>
              <span className="text-sm text-gray-700">
                استخدام متغير غير معرّف
              </span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-2 border border-yellow-200">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold shrink-0">
                TypeError
              </span>
              <span className="text-sm text-gray-700">
                عملية خاطئة على نوع بيانات
              </span>
            </div>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// 1. console.log("hello" ← قوس ناقص</JsComment>
          </CodeLine>
          <CodeLine>
            <JsComment>// ما نوع الخطأ؟</JsComment>
          </CodeLine>
          <CodeLine>
            <JsComment>//</JsComment> →{' '}
            <CodeInput
              value={error1Type}
              onChange={setError1Type}
              width="w-32"
              hint="SyntaxError"
              correctValue="SyntaxError"
            />
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// 2. console.log(myName) ← لم يُعرّف</JsComment>
          </CodeLine>
          <CodeLine>
            <JsComment>//</JsComment> →{' '}
            <CodeInput
              value={error2Type}
              onChange={setError2Type}
              width="w-36"
              hint="ReferenceError"
              correctValue="ReferenceError"
            />
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// 3. null.toString() ← لا يمكن</JsComment>
          </CodeLine>
          <CodeLine>
            <JsComment>//</JsComment> →{' '}
            <CodeInput
              value={error3Type}
              onChange={setError3Type}
              width="w-28"
              hint="TypeError"
              correctValue="TypeError"
            />
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
            {`1. SyntaxError  — قوس ناقص
2. ReferenceError — متغير غير معرّف
3. TypeError — عملية على null`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: Fix the Bug ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: أصلح الخطأ 🐛"
        borderColor="amber"
        lessonId="js-12"
        exerciseId="ex2"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            من أشهر الأخطاء: الخلط بين{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              =
            </code>{' '}
            (تعيين) و{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              ===
            </code>{' '}
            (مقارنة)، والأخطاء الإملائية في أسماء الدوال.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// خطأ 1: المقارنة لا تعمل!</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> age ={' '}
            <span className="text-amber-600">18</span>;
          </CodeLine>
          <CodeLine>
            <JsComment>
              // ❌ if (age = 18) {'{'} ... {'}'}
            </JsComment>
          </CodeLine>
          <CodeLine>
            <JsComment>// ✅ أصلحها:</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>if</JsKeyword> (age{' '}
            <CodeInput
              value={fix1}
              onChange={setFix1}
              width="w-16"
              hint="==="
              correctValue="==="
            />{' '}
            <span className="text-amber-600">18</span>) {'{'}
          </CodeLine>
          <CodeLine>
            {'  '}
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"بالغ"</JsString>);
          </CodeLine>
          <CodeLine>{'}'}</CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// خطأ 2: الدالة لا تعمل!</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> name = <JsString>"أحمد"</JsString>;
          </CodeLine>
          <CodeLine>
            <JsComment>// ❌ name.touppercase()</JsComment>
          </CodeLine>
          <CodeLine>
            <JsComment>// ✅ أصلحها:</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(name.
            <CodeInput
              value={fix2}
              onChange={setFix2}
              width="w-32"
              hint="toUpperCase"
              correctValue="toUpperCase"
            />
            ());
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <strong>=</strong> → تعيين قيمة (a = 5)
            </li>
            <li>
              <strong>==</strong> → مقارنة مع تحويل النوع
            </li>
            <li>
              <strong>===</strong> → مقارنة صارمة (الأفضل!)
            </li>
            <li>
              JavaScript حساسة لحالة الأحرف: <strong>toUpperCase</strong> وليس{' '}
              <strong>touppercase</strong>
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
            {`// Fix 1: === بدلاً من =
if (age === 18) { ... }

// Fix 2: toUpperCase وليس touppercase
name.toUpperCase()`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: try/catch ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: try / catch"
        borderColor="amber"
        lessonId="js-12"
        exerciseId="ex3"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              try/catch
            </code>{' '}
            يمنع البرنامج من التوقف عند حدوث خطأ. نضع الكود الخطير في{' '}
            <strong>try</strong> ونتعامل مع الخطأ في <strong>catch</strong>.
          </p>
          <div
            className="mt-3 bg-emerald-50 rounded-lg p-3 border border-emerald-200"
            dir="ltr"
          >
            <pre className="text-sm font-mono text-emerald-800">
              {`try {
  // كود قد يسبب خطأ
} catch (error) {
  // التعامل مع الخطأ
}`}
            </pre>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> data ={' '}
            <JsString>"{'{'} invalid json"</JsString>;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>try</JsKeyword> {'{'}
          </CodeLine>
          <CodeLine>
            {'  '}
            <JsComment>// حاول تحليل النص كـ JSON</JsComment>
          </CodeLine>
          <CodeLine>
            {'  '}
            <JsKeyword>const</JsKeyword> result ={' '}
            <CodeInput
              value={tryBody}
              onChange={setTryBody}
              width="w-36"
              hint="JSON.parse(data)"
              correctValue="JSON.parse(data)"
            />
            ;
          </CodeLine>
          <CodeLine>
            {'}'} <JsKeyword>catch</JsKeyword> (
            <CodeInput
              value={catchParam}
              onChange={setCatchParam}
              width="w-16"
              hint="error"
              correctValue="error"
            />
            ) {'{'}
          </CodeLine>
          <CodeLine>
            {'  '}
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <CodeInput
              value={catchBody}
              onChange={setCatchBody}
              width="w-36"
              hint="error.message"
              correctValue="error.message"
            />
            );
          </CodeLine>
          <CodeLine>{'}'}</CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// البرنامج يستمر بالعمل!</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"✅ انتهى"</JsString>);
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
            {`try {
  const result = JSON.parse(data);
} catch (error) {
  console.log(error.message);
}
// "✅ انتهى" يُطبع — البرنامج لم يتوقف!`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="محلل أخطاء"
        instructions="اكتب دالة safeDivide(a, b) تقسم a على b. إذا كان b يساوي 0، ارمِ خطأ باستخدام throw. استدعِ الدالة داخل try/catch."
        starterCode={`function safeDivide(a, b) {\n  if (b === 0) {\n    throw new Error("لا يمكن القسمة على صفر!");\n  }\n  return a / b;\n}\n\ntry {\n  console.log(safeDivide(10, 2));  // 5\n  console.log(safeDivide(10, 0));  // خطأ!\n} catch (error) {\n  console.log("خطأ:", error.message);\n}`}
        answerCode={`function safeDivide(a, b) {\n  if (b === 0) {\n    throw new Error("لا يمكن القسمة على صفر!");\n  }\n  return a / b;\n}\n\ntry {\n  console.log(safeDivide(10, 2));  // 5\n  console.log(safeDivide(10, 0));  // يرمي خطأ\n} catch (error) {\n  console.log("خطأ:", error.message);\n  // "خطأ: لا يمكن القسمة على صفر!"\n}`}
        hint="استخدم throw new Error() لرمي خطأ و try/catch لالتقاطه"
        lessonId="js-12"
        exerciseId="free-code"
      />

      {/* ═══════ نصائح التصحيح ═══════ */}
      <div className="mt-6 bg-amber-50 border border-amber-300 rounded-xl p-5">
        <h3 className="text-lg font-bold text-amber-800 mb-3">
          🔧 نصائح لتصحيح الأخطاء
        </h3>
        <div className="grid gap-2">
          <div className="flex items-start gap-2">
            <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded text-xs font-bold mt-0.5">
              1
            </span>
            <p className="text-sm text-gray-700">
              اقرأ رسالة الخطأ بعناية — تخبرك بالنوع والسطر
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded text-xs font-bold mt-0.5">
              2
            </span>
            <p className="text-sm text-gray-700">
              استخدم{' '}
              <code className="bg-gray-200 px-1 rounded font-mono text-xs">
                console.log()
              </code>{' '}
              لتتبع قيم المتغيرات
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded text-xs font-bold mt-0.5">
              3
            </span>
            <p className="text-sm text-gray-700">
              تحقق من الأقواس والفواصل المنقوطة
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded text-xs font-bold mt-0.5">
              4
            </span>
            <p className="text-sm text-gray-700">
              استخدم{' '}
              <code className="bg-gray-200 px-1 rounded font-mono text-xs">
                typeof
              </code>{' '}
              لفحص نوع المتغير
            </p>
          </div>
        </div>
      </div>

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-12"
        lessonNum="12"
        totalQuestions={8}
      />
    </>
  );
};

export default JsDebuggingExercise1;
