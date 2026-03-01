import { useMemo, useState } from 'react';
import { AnswerKey } from '../../features/code/AnswerKey';
import CodeEditor from '../../features/code/CodeEditor';
import CodeInput from '../../features/code/CodeInput';
import CodeLine from '../../features/code/CodeLine';
import { ExerciseSection } from '../../features/code/ExerciseSection';
import { Explanation } from '../../features/code/Explanation';
import FreeCodeExercise from '../../features/code/FreeCodeExercise';
import { HintBox } from '../../features/code/HintBox';
import BrowserPreview from '../../features/js/BrowserPreview';
import ConsoleOutput from '../../features/js/ConsoleOutput';
import JsFunction from '../../features/jsSyntax/JsFunction';
import JsKeyword from '../../features/jsSyntax/JsKeyword';
import JsString from '../../features/jsSyntax/JsString';
import QuizSection from '../../features/quiz/QuizSection';

/* ════════════════════════════════════════════
   Lesson 9 — الأحداث (Events)
════════════════════════════════════════════ */

const JsEventsExercise1: React.FC = () => {
  /* ── Exercise 1: click ── */
  const [eventType1, setEventType1] = useState('');
  const [clickCount, setClickCount] = useState(0);

  /* ── Exercise 2: input ── */
  const [eventType2, setEventType2] = useState('');
  const [inputPreview, setInputPreview] = useState('');

  /* ── Exercise 3: mouseover ── */
  const [eventType3, setEventType3] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Console 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const e = eventType1.trim().replace(/['"]/g, '');
    if (!e) return lines;

    if (e === 'click') {
      lines.push({
        type: 'result',
        text: `✅ حدث "click" — ينطلق عند النقر على العنصر`,
      });
      lines.push({
        type: 'info',
        text: `جرّب النقر على الزر في المعاينة أدناه!`,
      });
    } else if (e === 'dblclick') {
      lines.push({
        type: 'info',
        text: `"dblclick" للنقر المزدوج. المطلوب هنا "click"`,
      });
    } else {
      lines.push({ type: 'error', text: `حدث النقر اسمه: "click"` });
    }
    return lines;
  }, [eventType1]);

  /* ── Console 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const e = eventType2.trim().replace(/['"]/g, '');
    if (!e) return lines;

    if (e === 'input') {
      lines.push({
        type: 'result',
        text: `✅ حدث "input" — ينطلق مع كل تغيير في الحقل`,
      });
      lines.push({
        type: 'info',
        text: `event.target.value يعطيك محتوى الحقل الحالي`,
      });
    } else if (e === 'change') {
      lines.push({
        type: 'info',
        text: `"change" ينطلق عند فقدان التركيز. "input" ينطلق فوراً`,
      });
    } else {
      lines.push({ type: 'error', text: `حدث الكتابة الفوري يسمى: "input"` });
    }
    return lines;
  }, [eventType2]);

  /* ── Console 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const e = eventType3.trim().replace(/['"]/g, '');
    if (!e) return lines;

    if (e === 'mouseover' || e === 'mouseenter') {
      lines.push({
        type: 'result',
        text: `✅ حدث "${e}" — ينطلق عند تمرير الماوس فوق العنصر`,
      });
    } else if (e === 'mouseout' || e === 'mouseleave') {
      lines.push({
        type: 'info',
        text: `"${e}" عند مغادرة الماوس. المطلوب عند الدخول: "mouseover"`,
      });
    } else {
      lines.push({ type: 'error', text: `حدث تمرير الماوس يسمى: "mouseover"` });
    }
    return lines;
  }, [eventType3]);

  return (
    <>
      {/* ═══════ Exercise 1: Click Event ═══════ */}
      <ExerciseSection
        title="التمرين الأول: حدث النقر (click)"
        borderColor="amber"
        lessonId="js-9"
        exerciseId="ex1"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              addEventListener
            </code>{' '}
            تربط دالة بحدث معين. أشهر الأحداث:{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              click
            </code>
            ،{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              input
            </code>
            ،{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              mouseover
            </code>
            .
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> btn = <JsFunction>document</JsFunction>
            .querySelector(<JsString>"#myBtn"</JsString>);
          </CodeLine>
          <CodeLine />
          <CodeLine>
            btn.<JsFunction>addEventListener</JsFunction>(
            <CodeInput
              value={eventType1}
              onChange={setEventType1}
              width="w-20"
              hint='"click"'
              correctValue="click"
            />
            , () ={'>'} {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <JsString>"تم النقر!"</JsString>);
          </CodeLine>
          <CodeLine>{'});'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        {/* Interactive preview */}
        {eventType1.trim().replace(/['"]/g, '') === 'click' && (
          <BrowserPreview>
            <div className="text-center">
              <button
                onClick={() => setClickCount((c) => c + 1)}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors"
              >
                اضغطني! 👆
              </button>
              {clickCount > 0 && (
                <p className="mt-3 text-gray-700 font-medium">
                  تم النقر {clickCount} {clickCount === 1 ? 'مرة' : 'مرات'} ✅
                </p>
              )}
            </div>
          </BrowserPreview>
        )}

        <AnswerKey
          show={showAnswer1}
          onToggle={() => setShowAnswer1(!showAnswer1)}
        >
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              btn.addEventListener(<strong>"click"</strong>, () =&gt;{' '}
              {'{ ... }'});
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: Input Event ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: حدث الكتابة (input)"
        borderColor="amber"
        lessonId="js-9"
        exerciseId="ex2"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>
            حدث{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              input
            </code>{' '}
            ينطلق مع كل حرف يُكتب.{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              event.target.value
            </code>{' '}
            يعطيك محتوى الحقل الحالي.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> input ={' '}
            <JsFunction>document</JsFunction>.querySelector(
            <JsString>"#nameInput"</JsString>);
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> display ={' '}
            <JsFunction>document</JsFunction>.querySelector(
            <JsString>"#greeting"</JsString>);
          </CodeLine>
          <CodeLine />
          <CodeLine>
            input.<JsFunction>addEventListener</JsFunction>(
            <CodeInput
              value={eventType2}
              onChange={setEventType2}
              width="w-20"
              hint='"input"'
              correctValue="input"
            />
            , (event) ={'>'} {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            display.textContent = <JsString>`مرحباً، ${'{'}</JsString>
            event.target.value<JsString>{'}'}`</JsString>;
          </CodeLine>
          <CodeLine>{'});'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        {/* Interactive preview */}
        {eventType2.trim().replace(/['"]/g, '') === 'input' && (
          <BrowserPreview>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="اكتب اسمك هنا..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-right focus:outline-none focus:border-amber-400 transition-colors"
                onChange={(e) => setInputPreview(e.target.value)}
                dir="rtl"
              />
              <p className="text-gray-700 font-medium text-right">
                {inputPreview ? `مرحباً، ${inputPreview} 👋` : 'مرحباً، ...'}
              </p>
            </div>
          </BrowserPreview>
        )}

        <AnswerKey
          show={showAnswer2}
          onToggle={() => setShowAnswer2(!showAnswer2)}
        >
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              input.addEventListener(<strong>"input"</strong>, (event) =&gt;{' '}
              {'{ ... }'});
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: Mouseover ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: حدث تمرير الماوس"
        borderColor="amber"
        lessonId="js-9"
        exerciseId="ex3"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              mouseover
            </code>{' '}
            ينطلق عند تمرير الماوس فوق العنصر. مثالي لإضافة تأثيرات تفاعلية.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> card ={' '}
            <JsFunction>document</JsFunction>.querySelector(
            <JsString>".card"</JsString>);
          </CodeLine>
          <CodeLine />
          <CodeLine>
            card.<JsFunction>addEventListener</JsFunction>(
            <CodeInput
              value={eventType3}
              onChange={setEventType3}
              width="w-28"
              hint='"mouseover"'
              correctValue="mouseover"
            />
            , () ={'>'} {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            card.style.backgroundColor = <JsString>"#fef3c7"</JsString>;
          </CodeLine>
          <CodeLine>{'});'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                click
              </code>{' '}
              — النقر
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                input
              </code>{' '}
              — الكتابة في حقل
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                mouseover
              </code>{' '}
              /{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                mouseout
              </code>{' '}
              — دخول/خروج الماوس
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                keydown
              </code>{' '}
              /{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                keyup
              </code>{' '}
              — ضغط/رفع المفتاح
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                submit
              </code>{' '}
              — إرسال النموذج
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
              card.addEventListener(<strong>"mouseover"</strong>, () =&gt;{' '}
              {'{ ... }'});
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="زر إظهار/إخفاء"
        instructions="اكتب كوداً يربط حدث click بزر. عند النقر، يُظهر أو يُخفي عنصر div باستخدام style.display."
        starterCode={`const btn = document.querySelector("#toggleBtn");\nconst box = document.querySelector("#box");\nlet visible = true;\n\nbtn.addEventListener("click", () => {\n  // بدّل بين إظهار وإخفاء\n  if (visible) {\n    box.style.display = ;\n  } else {\n    box.style.display = ;\n  }\n  visible = !visible;\n});`}
        answerCode={`const btn = document.querySelector("#toggleBtn");\nconst box = document.querySelector("#box");\nlet visible = true;\n\nbtn.addEventListener("click", () => {\n  if (visible) {\n    box.style.display = "none";\n  } else {\n    box.style.display = "block";\n  }\n  visible = !visible;\n});`}
        hint='استخدم "none" للإخفاء و "block" للإظهار'
        lessonId="js-9"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <QuizSection
        lessonId="js-9"
        exerciseId="quiz"
        questions={[
          {
            question: 'ما الحدث الذي ينطلق عند كل حرف يُكتب في حقل إدخال؟',
            options: ['change', 'click', 'input', 'keypress'],
            correctIndex: 2,
            explanation:
              '"input" ينطلق فوراً مع كل تغيير. "change" ينتظر فقدان التركيز.',
          },
          {
            question: 'كيف تحصل على قيمة حقل إدخال عند استماعك لحدث input؟',
            options: [
              'event.value',
              'event.target.value',
              'event.input',
              'this.value',
            ],
            correctIndex: 1,
            explanation:
              'event.target يشير للعنصر المُستهدف، و.value يعطيك محتواه.',
          },
          {
            question: 'ما الفرق بين mouseover و mouseenter؟',
            options: [
              'لا فرق',
              'mouseover يتفعل على العناصر الأبناء أيضاً',
              'mouseenter أقدم',
              'mouseover للموبايل فقط',
            ],
            correctIndex: 1,
            explanation:
              'mouseover ينطلق على العنصر وأبنائه (bubbles)، mouseenter فقط على العنصر نفسه.',
          },
        ]}
      />
    </>
  );
};

export default JsEventsExercise1;
