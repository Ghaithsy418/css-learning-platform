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
   Lesson 11 — دوال المصفوفات (Array Methods)
════════════════════════════════════════════ */

const JsArrayMethodsExercise1: React.FC = () => {
  /* ── Exercise 1: map ── */
  const [mapCallback, setMapCallback] = useState('');

  /* ── Exercise 2: filter ── */
  const [filterCallback, setFilterCallback] = useState('');

  /* ── Exercise 3: find & reduce ── */
  const [findCallback, setFindCallback] = useState('');
  const [reduceCallback, setReduceCallback] = useState('');
  const [reduceInit, setReduceInit] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Console 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] = [];
    const cb = mapCallback.trim();
    if (!cb) return lines;

    if (cb.includes('* 2') || cb.includes('*2') || cb.includes('=> n * 2') || cb.includes('=> n*2')) {
      lines.push({ type: 'result', text: `[1,2,3].map(n => n * 2) → [2, 4, 6] ✅` });
    } else if (cb.includes('=>')) {
      try {
        const arr = [1, 2, 3];
        lines.push({ type: 'info', text: `map يطبق الدالة على كل عنصر. جرّب: n => n * 2` });
      } catch {
        lines.push({ type: 'error', text: 'خطأ في الصياغة' });
      }
    } else {
      lines.push({ type: 'info', text: `استخدم سهم: n => n * 2` });
    }
    return lines;
  }, [mapCallback]);

  /* ── Console 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] = [];
    const cb = filterCallback.trim();
    if (!cb) return lines;

    if (cb.includes('> 18') || cb.includes('>18') || cb.includes('>= 19') || cb.includes('>=19')) {
      lines.push({ type: 'result', text: `[15, 22, 17, 30].filter(age => age > 18) → [22, 30] ✅` });
    } else if (cb.includes('=>')) {
      lines.push({ type: 'info', text: `filter يُبقي العناصر التي تُرجع true. جرّب: age => age > 18` });
    } else {
      lines.push({ type: 'info', text: `استخدم سهم: age => age > 18` });
    }
    return lines;
  }, [filterCallback]);

  /* ── Console 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] = [];
    const fd = findCallback.trim();
    const rd = reduceCallback.trim();
    const ri = reduceInit.trim();

    if (fd) {
      if (fd.includes('> 20') || fd.includes('>20')) {
        lines.push({ type: 'result', text: `find(n => n > 20) → 25 ✅` });
      } else {
        lines.push({ type: 'info', text: `find تُرجع أول عنصر يحقق الشرط. جرّب: n => n > 20` });
      }
    }

    if (rd && ri) {
      if ((rd.includes('a + b') || rd.includes('a+b')) && ri === '0') {
        lines.push({ type: 'result', text: `reduce((a, b) => a + b, 0) → 70 ✅` });
      } else {
        lines.push({ type: 'info', text: `reduce تجمع القيم. جرّب: (a, b) => a + b والقيمة الأولية 0` });
      }
    } else if (rd) {
      lines.push({ type: 'info', text: `أضف القيمة الأولية (0)` });
    }

    return lines;
  }, [findCallback, reduceCallback, reduceInit]);

  return (
    <>
      {/* ═══════ Exercise 1: map ═══════ */}
      <ExerciseSection title="التمرين الأول: map — التحويل" borderColor="amber" lessonId="js-11" exerciseId="ex1" maxPoints={5} inputCount={1}>
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">map()</code>{' '}
            تُنشئ مصفوفة جديدة بتطبيق دالة على <strong>كل عنصر</strong>.
          </p>
          <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-200" dir="ltr">
            <p className="text-sm font-mono text-blue-800">
              [1, 2, 3].map(<span className="text-purple-600">n =&gt; n * 2</span>) → [2, 4, 6]
            </p>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> numbers = [<span className="text-amber-600">1</span>, <span className="text-amber-600">2</span>, <span className="text-amber-600">3</span>];
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// ضاعف كل عنصر</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> doubled = numbers.map(
            <CodeInput value={mapCallback} onChange={setMapCallback} width="w-32" hint="n => n * 2" correctValue="n => n * 2" />);
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(doubled);{' '}
            <JsComment>// [2, 4, 6]</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <AnswerKey show={showAnswer1} onToggle={() => setShowAnswer1(!showAnswer1)}>
          <pre dir="ltr" className="bg-gray-200 px-3 py-2 rounded font-mono text-sm">
{`const doubled = numbers.map(n => n * 2);
// [2, 4, 6]`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: filter ═══════ */}
      <ExerciseSection title="التمرين الثاني: filter — التصفية" borderColor="amber" lessonId="js-11" exerciseId="ex2" maxPoints={5} inputCount={1}>
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">filter()</code>{' '}
            تُرجع مصفوفة جديدة تحتوي <strong>فقط</strong> العناصر التي تحقق الشرط.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> ages = [<span className="text-amber-600">15</span>, <span className="text-amber-600">22</span>, <span className="text-amber-600">17</span>, <span className="text-amber-600">30</span>];
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// فقط الأعمار فوق 18</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> adults = ages.filter(
            <CodeInput value={filterCallback} onChange={setFilterCallback} width="w-36" hint="age => age > 18" correctValue="age => age > 18" />);
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(adults);{' '}
            <JsComment>// [22, 30]</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li><strong>map</strong> → تحوّل كل عنصر (الناتج بنفس الطول)</li>
            <li><strong>filter</strong> → تختار عناصر محددة (الناتج قد يكون أقصر)</li>
            <li>كلاهما لا يغير المصفوفة الأصلية</li>
          </ul>
        </HintBox>

        <AnswerKey show={showAnswer2} onToggle={() => setShowAnswer2(!showAnswer2)}>
          <pre dir="ltr" className="bg-gray-200 px-3 py-2 rounded font-mono text-sm">
{`const adults = ages.filter(age => age > 18);
// [22, 30]`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: find & reduce ═══════ */}
      <ExerciseSection title="التمرين الثالث: find و reduce" borderColor="amber" lessonId="js-11" exerciseId="ex3" maxPoints={15} inputCount={3}>
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">find()</code>{' '}
            تُرجع <strong>أول عنصر</strong> يحقق الشرط، و{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">reduce()</code>{' '}
            تُجمع كل العناصر في <strong>قيمة واحدة</strong>.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> nums = [<span className="text-amber-600">10</span>, <span className="text-amber-600">25</span>, <span className="text-amber-600">5</span>, <span className="text-amber-600">30</span>];
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// أول عدد أكبر من 20</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> big = nums.find(
            <CodeInput value={findCallback} onChange={setFindCallback} width="w-32" hint="n => n > 20" correctValue="n => n > 20" />);
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(big);{' '}
            <JsComment>// 25</JsComment>
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// مجموع كل الأعداد</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> sum = nums.reduce(
            <CodeInput value={reduceCallback} onChange={setReduceCallback} width="w-36" hint="(a, b) => a + b" correctValue="(a, b) => a + b" />,{' '}
            <CodeInput value={reduceInit} onChange={setReduceInit} width="w-10" hint="0" correctValue="0" />);
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(sum);{' '}
            <JsComment>// 70</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <AnswerKey show={showAnswer3} onToggle={() => setShowAnswer3(!showAnswer3)}>
          <pre dir="ltr" className="bg-gray-200 px-3 py-2 rounded font-mono text-sm">
{`const big = nums.find(n => n > 20);       // 25
const sum = nums.reduce((a, b) => a + b, 0); // 70`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="معالج بيانات طلاب"
        instructions="لديك مصفوفة طلاب. استخدم map لاستخراج الأسماء، filter للطلاب الناجحين (فوق 50)، و reduce لحساب المعدل."
        starterCode={`const students = [\n  { name: "أحمد", grade: 85 },\n  { name: "سارة", grade: 45 },\n  { name: "محمد", grade: 72 },\n  { name: "نورة", grade: 38 },\n];\n\n// 1. أسماء الطلاب فقط\nconst names = students.map();\n\n// 2. الناجحون فقط\nconst passed = students.filter();\n\n// 3. معدل الدرجات\nconst avg = students.reduce() / students.length;`}
        answerCode={`const students = [\n  { name: "أحمد", grade: 85 },\n  { name: "سارة", grade: 45 },\n  { name: "محمد", grade: 72 },\n  { name: "نورة", grade: 38 },\n];\n\nconst names = students.map(s => s.name);\n// ["أحمد", "سارة", "محمد", "نورة"]\n\nconst passed = students.filter(s => s.grade > 50);\n// [{ name: "أحمد", grade: 85 }, { name: "محمد", grade: 72 }]\n\nconst avg = students.reduce((sum, s) => sum + s.grade, 0) / students.length;\n// 60`}
        hint="في map استخدم s => s.name، في filter استخدم s => s.grade > 50، في reduce استخدم (sum, s) => sum + s.grade, 0"
        lessonId="js-11"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <QuizSection
        lessonId="js-11"
        exerciseId="quiz"
        questions={[
          {
            question: 'ماذا يُرجع [1,2,3].map(n => n + 10)؟',
            options: ['[1, 2, 3]', '[11, 12, 13]', '36', '[10, 20, 30]'],
            correctIndex: 1,
            explanation: 'map تطبق الدالة على كل عنصر: 1+10=11, 2+10=12, 3+10=13.',
          },
          {
            question: 'ما الفرق بين find و filter؟',
            options: [
              'لا فرق بينهما',
              'find تُرجع أول تطابق، filter تُرجع كل التطابقات',
              'filter أسرع من find',
              'find تُرجع مصفوفة، filter تُرجع عنصر واحد',
            ],
            correctIndex: 1,
            explanation: 'find تتوقف عند أول عنصر يحقق الشرط، بينما filter تمر على كل العناصر.',
          },
          {
            question: 'ماذا يُرجع [5,10,15].reduce((a,b) => a + b, 0)؟',
            options: ['[5, 10, 15]', '15', '30', '0'],
            correctIndex: 2,
            explanation: 'reduce تجمع: 0+5=5, 5+10=15, 15+15=30.',
          },
          {
            question: 'هل map تغير المصفوفة الأصلية؟',
            options: ['نعم', 'لا، تُرجع مصفوفة جديدة', 'أحياناً', 'فقط مع الأعداد'],
            correctIndex: 1,
            explanation: 'map, filter, find, reduce كلها لا تغير المصفوفة الأصلية.',
          },
        ]}
      />
    </>
  );
};

export default JsArrayMethodsExercise1;
