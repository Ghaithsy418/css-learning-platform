import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState, type CSSProperties } from 'react';
import { AnswerKey } from '../../features/code/AnswerKey';
import CodeEditor from '../../features/code/CodeEditor';
import CodeInput from '../../features/code/CodeInput';
import CodeLine from '../../features/code/CodeLine';
import { ExerciseSection } from '../../features/code/ExerciseSection';
import { Explanation } from '../../features/code/Explanation';
import FreeCodeExercise from '../../features/code/FreeCodeExercise';
import { HintBox } from '../../features/code/HintBox';
import BrowserPreview from '../../features/js/BrowserPreview';
import JsComment from '../../features/jsSyntax/JsComment';
import JsFunction from '../../features/jsSyntax/JsFunction';
import JsKeyword from '../../features/jsSyntax/JsKeyword';
import JsString from '../../features/jsSyntax/JsString';
import StartQuizButton from '../../features/quiz/StartQuizButton';

/* ════════════════════════════════════════════
   JS Exercise 3 — DOM والأحداث
════════════════════════════════════════════ */

const JsDomExercise1: React.FC = () => {
  /* ── Exercise 1: querySelector ── */
  const [selector, setSelector] = useState('');
  const [property, setProperty] = useState('');
  const [propValue, setPropValue] = useState('');

  /* ── Exercise 2: innerHTML / textContent ── */
  const [domMethod, setDomMethod] = useState('');
  const [newText, setNewText] = useState('');

  /* ── Exercise 3: addEventListener ── */
  const [eventType, setEventType] = useState('');
  const [eventAction, setEventAction] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Exercise 1 preview ── */
  const previewStyle1: CSSProperties = useMemo(() => {
    const styles: CSSProperties = {};
    const prop = property.trim().toLowerCase();
    const val = propValue.trim();
    if (!prop || !val) return styles;

    // Map common CSS properties
    const propMap: Record<string, string> = {
      color: 'color',
      'background-color': 'backgroundColor',
      backgroundcolor: 'backgroundColor',
      'font-size': 'fontSize',
      fontsize: 'fontSize',
      'border-radius': 'borderRadius',
      borderradius: 'borderRadius',
      padding: 'padding',
      margin: 'margin',
      background: 'background',
    };
    const jsProp = propMap[prop] || prop;
    if (jsProp) {
      (styles as Record<string, string>)[jsProp] = val;
    }
    return styles;
  }, [property, propValue]);

  const selectorHighlight = useMemo(() => {
    const sel = selector.trim().toLowerCase();
    if (sel === '.title' || sel === '.عنوان') return true;
    if (sel === '#title' || sel === '#عنوان') return true;
    if (sel === 'h1') return true;
    return false;
  }, [selector]);

  /* ── Exercise 2 preview ── */
  const previewText2 = useMemo(() => {
    const method = domMethod.trim().toLowerCase();
    const text = newText.trim();
    if (!method || !text) return 'مرحباً بالعالم!';
    if (method === 'textcontent' || method === 'innertext') {
      return text;
    }
    if (method === 'innerhtml') {
      return text;
    }
    return 'مرحباً بالعالم!';
  }, [domMethod, newText]);

  const isInnerHTML = domMethod.trim().toLowerCase() === 'innerhtml';

  /* ── Exercise 3: event simulation ── */
  const [clickCount, setClickCount] = useState(0);
  const eventValid = useMemo(() => {
    const evt = eventType.trim().toLowerCase();
    return evt === 'click' || evt === '"click"' || evt === "'click'";
  }, [eventType]);

  const actionValid = useMemo(() => {
    const action = eventAction.trim().toLowerCase();
    return (
      action.includes('alert') ||
      action.includes('console') ||
      action.includes('count')
    );
  }, [eventAction]);

  return (
    <>
      {/* ═══════ Exercise 1: querySelector + style ═══════ */}
      <ExerciseSection
        title="التمرين الأول: اختيار العناصر وتغيير الأنماط"
        borderColor="amber"
        lessonId="js-8"
        exerciseId="ex1"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            باستخدام{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              document.querySelector()
            </code>{' '}
            يمكنك الوصول لأي عنصر HTML وتغيير تنسيقه. جرب تغيير لون العنوان!
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>{'// اختر العنوان'}</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> title = <JsKeyword>document</JsKeyword>
            .<JsFunction>querySelector</JsFunction>(
            <JsString>
              "
              <CodeInput
                value={selector}
                onChange={setSelector}
                width="w-20"
                hint="المُحدد"
                correctValue="h1"
              />
              "
            </JsString>
            );
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>{'// غيّر التنسيق'}</JsComment>
          </CodeLine>
          <CodeLine>
            title.<JsKeyword>style</JsKeyword>.
            <CodeInput
              value={property}
              onChange={setProperty}
              width="w-32"
              hint="الخاصية"
              correctValue="color"
            />{' '}
            ={' '}
            <JsString>
              "
              <CodeInput
                value={propValue}
                onChange={setPropValue}
                width="w-28"
                hint="القيمة"
                correctValue="red"
              />
              "
            </JsString>
            ;
          </CodeLine>
        </CodeEditor>

        <BrowserPreview>
          <h1
            className="text-2xl font-bold transition-all duration-300"
            style={{
              ...previewStyle1,
              ...(selectorHighlight ? {} : {}),
              outline: selectorHighlight ? '2px dashed #7c3aed' : 'none',
              outlineOffset: '4px',
            }}
          >
            مرحباً بالعالم! 🌍
          </h1>
          {selectorHighlight && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-purple-500 mt-2 font-medium"
            >
              ✓ تم تحديد العنصر!
            </motion.p>
          )}
          <p className="text-gray-500 text-sm mt-3">
            هذه فقرة عادية. غيّر تنسيق العنوان أعلاه!
          </p>
        </BrowserPreview>

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              المُحدد يمكن أن يكون:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                h1
              </code>{' '}
              أو{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                .title
              </code>
            </li>
            <li>
              الخاصية:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                color
              </code>
            </li>
            <li>
              القيمة:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                red
              </code>{' '}
              أو{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                #7c3aed
              </code>
            </li>
            <li>
              لاحظ أن خصائص CSS في JS تُكتب بـ camelCase:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                fontSize
              </code>{' '}
              بدل{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                font-size
              </code>
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
              const title = document.querySelector(<strong>"h1"</strong>);
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              title.style.<strong>color</strong> = <strong>"red"</strong>;
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: textContent / innerHTML ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: تغيير المحتوى"
        borderColor="amber"
        lessonId="js-8"
        exerciseId="ex2"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>
            يمكنك تغيير محتوى أي عنصر باستخدام{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              textContent
            </code>{' '}
            أو{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              innerHTML
            </code>
            . غيّر نص الفقرة أدناه!
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <span className="text-blue-700 font-bold text-sm">
                textContent
              </span>
              <p className="text-xs text-gray-600 mt-1">
                يُغيّر النص فقط (آمن)
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <span className="text-orange-700 font-bold text-sm">
                innerHTML
              </span>
              <p className="text-xs text-gray-600 mt-1">
                يقبل HTML (احذر من XSS!)
              </p>
            </div>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> paragraph ={' '}
            <JsKeyword>document</JsKeyword>.
            <JsFunction>querySelector</JsFunction>(<JsString>"p"</JsString>);
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// غيّر محتوى الفقرة</JsComment>
          </CodeLine>
          <CodeLine>
            paragraph.
            <CodeInput
              value={domMethod}
              onChange={setDomMethod}
              width="w-28"
              hint="الخاصية"
              correctValue="textContent"
            />{' '}
            ={' '}
            <JsString>
              "
              <CodeInput
                value={newText}
                onChange={setNewText}
                width="w-40"
                hint="النص الجديد"
              />
              "
            </JsString>
            ;
          </CodeLine>
        </CodeEditor>

        <BrowserPreview>
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800">عنوان الصفحة</h2>
            <AnimatePresence mode="wait">
              <motion.p
                key={previewText2}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-600 p-3 rounded-lg border-2 border-dashed border-gray-200 transition-all"
                style={{
                  borderColor:
                    previewText2 !== 'مرحباً بالعالم!' ? '#22c55e' : undefined,
                }}
              >
                {isInnerHTML ? (
                  <span dangerouslySetInnerHTML={{ __html: previewText2 }} />
                ) : (
                  previewText2
                )}
              </motion.p>
            </AnimatePresence>
            {previewText2 !== 'مرحباً بالعالم!' && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-green-500 font-medium"
              >
                ✓ تم تغيير المحتوى بنجاح!
              </motion.span>
            )}
          </div>
        </BrowserPreview>

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                textContent
              </code>{' '}
              — يغير النص العادي فقط
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                innerHTML
              </code>{' '}
              — يقبل وسوم HTML (مثل {'<b>'})
            </li>
            <li>
              استخدم{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                textContent
              </code>{' '}
              عندما تتعامل مع مدخلات المستخدم
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
              paragraph.<strong>textContent</strong> ={' '}
              <strong>"النص الجديد"</strong>;
            </code>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            أو innerHTML إذا أردت إضافة HTML
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: addEventListener ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: الأحداث (Events)"
        borderColor="amber"
        lessonId="js-8"
        exerciseId="ex3"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            الأحداث تجعل صفحتك تفاعلية! استخدم{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              addEventListener
            </code>{' '}
            لإضافة سلوك عند الضغط على زر.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> btn = <JsKeyword>document</JsKeyword>.
            <JsFunction>querySelector</JsFunction>(<JsString>"button"</JsString>
            );
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// أضف حدث نقر</JsComment>
          </CodeLine>
          <CodeLine>
            btn.<JsFunction>addEventListener</JsFunction>(
            <JsString>
              "
              <CodeInput
                value={eventType}
                onChange={setEventType}
                width="w-20"
                hint="الحدث"
                correctValue="click"
              />
              "
            </JsString>
            , () =&gt; {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            <CodeInput
              value={eventAction}
              onChange={setEventAction}
              width="w-48"
              hint="الأمر"
              correctValue='alert("تم الضغط!")'
            />
            ;
          </CodeLine>
          <CodeLine>{'}'});</CodeLine>
        </CodeEditor>

        <BrowserPreview label="👇 جرب الضغط على الزر:">
          <div className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (eventValid) {
                  setClickCount((c) => c + 1);
                }
              }}
              className={`px-8 py-3 rounded-xl font-bold text-white shadow-md transition-all duration-200 ${
                eventValid
                  ? 'bg-linear-to-r from-purple-600 to-indigo-600 hover:shadow-lg cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!eventValid}
            >
              اضغطني! 🖱️
            </motion.button>

            <AnimatePresence>
              {clickCount > 0 && actionValid && (
                <motion.div
                  key={clickCount}
                  initial={{ opacity: 0, scale: 0.5, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="bg-green-100 border border-green-300 text-green-800 rounded-lg px-4 py-2 text-sm font-medium"
                >
                  🎉 تم الضغط! ({clickCount} {clickCount === 1 ? 'مرة' : 'مرات'}
                  )
                </motion.div>
              )}
            </AnimatePresence>

            {eventValid && !actionValid && (
              <p className="text-xs text-amber-600">
                ⬆️ أكمل كتابة الأمر لتفعيل الزر
              </p>
            )}
            {!eventValid && eventType.trim() && (
              <p className="text-xs text-red-500">
                ❌ نوع الحدث يجب أن يكون "click"
              </p>
            )}
          </div>
        </BrowserPreview>

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              نوع الحدث:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                click
              </code>
            </li>
            <li>
              الأمر:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                alert("تم الضغط!")
              </code>{' '}
              أو{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                console.log("تم")
              </code>
            </li>
            <li>أنواع أحداث أخرى: mouseover, keydown, submit, change</li>
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
              btn.addEventListener(<strong>"click"</strong>, () =&gt; {'{'}
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              {' '}
              <strong>alert("تم الضغط!")</strong>;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              {'}'});
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="أنشئ عداد بسيط"
        instructions="اكتب كود يختار زراً بـ querySelector ويضيف له addEventListener بحيث يزيد عداداً يظهر في عنصر p."
        starterCode={`// اختر العناصر\nconst btn = document.querySelector();\nconst display = document.querySelector();\nlet count = 0;\n\n// أضف حدث النقر\nbtn.addEventListener('click', () => {\n  \n});`}
        answerCode={`const btn = document.querySelector('#counterBtn');\nconst display = document.querySelector('#count');\nlet count = 0;\n\nbtn.addEventListener('click', () => {\n  count++;\n  display.textContent = count;\n});`}
        hint="استخدم count++ لزيادة العداد و .textContent لتحديث العرض"
        lessonId="js-8"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-8"
        lessonNum="8"
        totalQuestions={8}
      />
    </>
  );
};

export default JsDomExercise1;
