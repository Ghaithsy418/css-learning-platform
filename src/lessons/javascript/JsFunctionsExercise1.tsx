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
import JsFunction from '../../features/jsSyntax/JsFunction';
import JsKeyword from '../../features/jsSyntax/JsKeyword';
import StartQuizButton from '../../features/quiz/StartQuizButton';

/* ════════════════════════════════════════════
   JS Exercise 2 — الدوال (Functions)
════════════════════════════════════════════ */

const JsFunctionsExercise1: React.FC = () => {
  /* ── Exercise 1: basic function ── */
  const [funcName, setFuncName] = useState('');
  const [funcParam, setFuncParam] = useState('');
  const [funcReturn, setFuncReturn] = useState('');

  /* ── Exercise 2: arrow function ── */
  const [arrowParam1, setArrowParam1] = useState('');
  const [arrowParam2, setArrowParam2] = useState('');
  const [arrowBody, setArrowBody] = useState('');

  /* ── Exercise 3: callback ── */
  const [callbackArr, setCallbackArr] = useState('');
  const [callbackMethod, setCallbackMethod] = useState('');
  const [callbackBody, setCallbackBody] = useState('');

  /* ── Console for exercise 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const name = funcName.trim();
    const param = funcParam.trim();
    const ret = funcReturn.trim();

    if (!name && !param && !ret) return lines;

    if (name && !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
      lines.push({ type: 'error', text: `"${name}" ليس اسم دالة صالحاً` });
      return lines;
    }

    if (name && param && ret) {
      lines.push({ type: 'info', text: `تم تعريف الدالة: ${name}(${param})` });
      // Simulate calling greet("أحمد")
      if (ret.includes(param)) {
        lines.push({
          type: 'log',
          text: `${name}("أحمد") → "${ret.replace(param, 'أحمد')}"`,
        });
      } else {
        lines.push({ type: 'log', text: `${name}("أحمد") → "${ret}"` });
      }
      lines.push({ type: 'result', text: `✅ أحسنت! الدالة تعمل` });
    }
    return lines;
  }, [funcName, funcParam, funcReturn]);

  /* ── Console for exercise 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const p1 = arrowParam1.trim();
    const p2 = arrowParam2.trim();
    const body = arrowBody.trim();

    if (!p1 && !p2 && !body) return lines;

    if (p1 && p2 && body) {
      lines.push({
        type: 'info',
        text: `Arrow Function: (${p1}, ${p2}) => ${body}`,
      });
      // Try to evaluate
      if (body.includes('+') || body.includes(p1)) {
        lines.push({ type: 'log', text: `add(5, 3) → 8` });
        lines.push({ type: 'result', text: `✅ الدالة السهمية تعمل بنجاح!` });
      } else {
        lines.push({ type: 'log', text: `add(5, 3) → ${body}` });
      }
    }
    return lines;
  }, [arrowParam1, arrowParam2, arrowBody]);

  /* ── Console for exercise 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const arr = callbackArr.trim();
    const method = callbackMethod.trim().toLowerCase();
    const body = callbackBody.trim();

    if (!arr && !method && !body) return lines;

    const validMethods = ['filter', 'map', 'foreach', 'find', 'reduce'];
    if (method && !validMethods.includes(method)) {
      lines.push({
        type: 'error',
        text: `"${method}" ليست دالة مصفوفة صالحة. جرب: filter, map, forEach`,
      });
      return lines;
    }

    if (arr && method && body) {
      lines.push({ type: 'info', text: `${arr}.${method}(${body})` });
      // Simulate filter example
      if (method === 'filter' && body.includes('>')) {
        lines.push({ type: 'log', text: `النتيجة → [4, 5, 6]` });
        lines.push({
          type: 'result',
          text: `✅ filter يُرجع العناصر التي تحقق الشرط`,
        });
      } else if (method === 'map') {
        lines.push({ type: 'log', text: `النتيجة → مصفوفة جديدة بعد التحويل` });
        lines.push({ type: 'result', text: `✅ map يُنشئ مصفوفة جديدة` });
      } else if (method === 'foreach') {
        lines.push({ type: 'log', text: `يطبع كل عنصر...` });
        lines.push({ type: 'result', text: `✅ forEach ينفذ دالة لكل عنصر` });
      } else {
        lines.push({ type: 'log', text: `← نتيجة` });
      }
    }
    return lines;
  }, [callbackArr, callbackMethod, callbackBody]);

  return (
    <>
      {/* ═══════ Exercise 1: Basic Function ═══════ */}
      <ExerciseSection
        title="التمرين الأول: الدالة الأساسية"
        borderColor="amber"
        lessonId="js-5"
        exerciseId="ex1"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            الدوال هي كتل كود قابلة لإعادة الاستخدام. أنشئ دالة ترحّب بالمستخدم
            باسمه!
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// أنشئ دالة ترحيب</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>function</JsKeyword>{' '}
            <JsFunction>
              <CodeInput
                value={funcName}
                onChange={setFuncName}
                width="w-24"
                correctValue="greet"
              />
            </JsFunction>
            (
            <CodeInput
              value={funcParam}
              onChange={setFuncParam}
              width="w-20"
              correctValue="name"
            />
            ) {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>return</JsKeyword>{' '}
            <CodeInput
              value={funcReturn}
              onChange={setFuncReturn}
              width="w-48"
              correctValue="`مرحباً ${name}`"
            />
            ;
          </CodeLine>
          <CodeLine>{'}'}</CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// استدعاء الدالة</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <span className="text-gray-300">{funcName || 'greet'}</span>(
            <span className="text-amber-300">"أحمد"</span>));
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              اسم الدالة يمكن أن يكون:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                greet
              </code>
            </li>
            <li>
              البارمتر هو المدخل:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                name
              </code>
            </li>
            <li>
              القيمة المُرجعة:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                {'`مرحباً ${name}`'}
              </code>
            </li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* ═══════ Exercise 2: Arrow Function ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: الدالة السهمية (Arrow Function)"
        borderColor="amber"
        lessonId="js-5"
        exerciseId="ex2"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            الدالة السهمية هي طريقة مختصرة لكتابة الدوال في JavaScript الحديثة.
            أنشئ دالة تجمع رقمين!
          </p>
          <div className="mt-3 bg-indigo-50 rounded-lg p-3 border border-indigo-200">
            <p className="text-sm text-indigo-800 font-medium">📝 الفرق:</p>
            <p
              dir="ltr"
              className="text-sm text-indigo-600 font-mono mt-1"
            >
              function add(a, b) {'{ return a + b; }'}
            </p>
            <p
              dir="ltr"
              className="text-sm text-indigo-600 font-mono"
            >
              const add = (a, b) =&gt; a + b;
            </p>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// دالة سهمية لجمع رقمين</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> add = (
            <CodeInput
              value={arrowParam1}
              onChange={setArrowParam1}
              width="w-12"
              correctValue="a"
            />
            ,{' '}
            <CodeInput
              value={arrowParam2}
              onChange={setArrowParam2}
              width="w-12"
              correctValue="b"
            />
            ) =&gt;{' '}
            <CodeInput
              value={arrowBody}
              onChange={setArrowBody}
              width="w-28"
              correctValue="a + b"
            />
            ;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsFunction>add</JsFunction>(
            <span className="text-orange-300">5</span>,{' '}
            <span className="text-orange-300">3</span>));{' '}
            <JsComment>// → 8</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              البارامترين:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                a
              </code>{' '}
              و{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                b
              </code>
            </li>
            <li>
              الجسم:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                a + b
              </code>{' '}
              — بدون {'{'} {'}'} و بدون return
            </li>
            <li>عندما تكون الدالة سطر واحد، يتم إرجاع القيمة تلقائياً</li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* ═══════ Exercise 3: Array Methods with Callbacks ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: دوال المصفوفات (Callbacks)"
        borderColor="amber"
        lessonId="js-5"
        exerciseId="ex3"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            المصفوفات لديها دوال مدمجة تقبل {'"'}callback{'"'} — أي دالة كمعامل.
            استخدم{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              filter
            </code>{' '}
            لتصفية الأرقام!
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
              <span className="text-violet-700 font-bold text-sm">
                .filter()
              </span>
              <p className="text-xs text-gray-600 mt-1">تصفية بشرط</p>
            </div>
            <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
              <span className="text-teal-700 font-bold text-sm">.map()</span>
              <p className="text-xs text-gray-600 mt-1">تحويل كل عنصر</p>
            </div>
            <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
              <span className="text-rose-700 font-bold text-sm">
                .forEach()
              </span>
              <p className="text-xs text-gray-600 mt-1">تنفيذ لكل عنصر</p>
            </div>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> numbers = [1, 2, 3, 4, 5, 6];
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// فلترة الأرقام الأكبر من 3</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> bigNumbers ={' '}
            <CodeInput
              value={callbackArr}
              onChange={setCallbackArr}
              width="w-24"
              correctValue="numbers"
            />
            .
            <JsFunction>
              <CodeInput
                value={callbackMethod}
                onChange={setCallbackMethod}
                width="w-20"
                correctValue="filter"
              />
            </JsFunction>
            (
            <CodeInput
              value={callbackBody}
              onChange={setCallbackBody}
              width="w-32"
              correctValue="n => n > 3"
            />
            );
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>
            (bigNumbers); <JsComment>// → [4, 5, 6]</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              المصفوفة:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                numbers
              </code>
            </li>
            <li>
              الدالة:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                filter
              </code>
            </li>
            <li>
              الشرط (arrow function):{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                n =&gt; n &gt; 3
              </code>
            </li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="اكتب دالة حسابية"
        instructions="اكتب دالة سهمية اسمها multiply تأخذ عددين وتُرجع ناتج ضربهما. ثم اطبع نتيجة multiply(4, 5)."
        starterCode={`// اكتب الدالة السهمية هنا\nconst multiply = \n\nconsole.log(multiply(4, 5));`}
        answerCode={`const multiply = (a, b) => a * b;\n\nconsole.log(multiply(4, 5)); // 20`}
        hint="الدالة السهمية المختصرة: (a, b) => a * b"
        lessonId="js-5"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-5"
        lessonNum="5"
        totalQuestions={8}
      />
    </>
  );
};

export default JsFunctionsExercise1;
