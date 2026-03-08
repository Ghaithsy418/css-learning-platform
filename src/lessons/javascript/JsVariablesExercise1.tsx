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
   JS Exercise 1 — المتغيرات وأنواع البيانات
   Variables & Data Types
════════════════════════════════════════════ */

const JsVariablesExercise1: React.FC = () => {
  const isNonEmpty = (value: string) => value.trim().length > 0;
  const isValidIdentifier = (value: string) =>
    /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value.trim());
  const isQuotedString = (value: string) => {
    const trimmed = value.trim();
    return (
      (trimmed.startsWith('"') &&
        trimmed.endsWith('"') &&
        trimmed.length >= 2) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2)
    );
  };
  const isValidNumber = (value: string) => {
    const trimmed = value.trim();
    return trimmed !== '' && !Number.isNaN(Number(trimmed));
  };
  const isBooleanLiteral = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    return trimmed === 'true' || trimmed === 'false';
  };

  /* ── Exercise 1: let / const / var ── */
  const [keyword1, setKeyword1] = useState('');
  const [varName1, setVarName1] = useState('');
  const [value1, setValue1] = useState('');

  /* ── Exercise 2: data types ── */
  const [numValue, setNumValue] = useState('');
  const [strValue, setStrValue] = useState('');
  const [boolValue, setBoolValue] = useState('');

  /* ── Exercise 3: template literal ── */
  const [templateName, setTemplateName] = useState('');
  const [templateAge, setTemplateAge] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Console outputs for exercise 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const kw = keyword1.trim().toLowerCase();
    const name = varName1.trim();
    const val = value1.trim();

    if (!kw && !name && !val) return lines;

    if (kw && !['let', 'const', 'var'].includes(kw)) {
      lines.push({
        type: 'error',
        text: `SyntaxError: "${kw}" ليست كلمة مفتاحية صالحة. استخدم let أو const أو var`,
      });
      return lines;
    }

    if (kw && name && val) {
      lines.push({
        type: 'info',
        text: `تم تعريف المتغير "${name}" بالقيمة: ${val}`,
      });
      lines.push({ type: 'log', text: `${name} = ${val}` });

      if (kw === 'const') {
        lines.push({
          type: 'info',
          text: `ℹ️ const: لا يمكن إعادة تعيين القيمة لاحقاً`,
        });
      } else if (kw === 'let') {
        lines.push({
          type: 'info',
          text: `ℹ️ let: يمكن إعادة تعيين القيمة ولكن ضمن نطاق الكتلة`,
        });
      } else if (kw === 'var') {
        lines.push({
          type: 'info',
          text: `⚠️ var: قديمة ولها نطاق دالة — استخدم let أو const بدلاً منها`,
        });
      }
    }
    return lines;
  }, [keyword1, varName1, value1]);

  /* ── Console outputs for exercise 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const num = numValue.trim();
    const str = strValue.trim();
    const bool = boolValue.trim().toLowerCase();

    if (num) {
      if (!isNaN(Number(num)) && num !== '') {
        lines.push({ type: 'log', text: `typeof ${num} → "number"  ✅` });
      } else {
        lines.push({ type: 'error', text: `"${num}" ليس رقماً صالحاً` });
      }
    }
    if (str) {
      if (
        (str.startsWith('"') && str.endsWith('"')) ||
        (str.startsWith("'") && str.endsWith("'"))
      ) {
        lines.push({ type: 'log', text: `typeof ${str} → "string"  ✅` });
      } else {
        lines.push({
          type: 'error',
          text: `النص يجب أن يكون بين علامات تنصيص: "${str}"`,
        });
      }
    }
    if (bool) {
      if (bool === 'true' || bool === 'false') {
        lines.push({ type: 'log', text: `typeof ${bool} → "boolean"  ✅` });
      } else {
        lines.push({
          type: 'error',
          text: `القيمة المنطقية يجب أن تكون true أو false`,
        });
      }
    }
    return lines;
  }, [numValue, strValue, boolValue]);

  /* ── Console outputs for exercise 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const name = templateName.trim();
    const age = templateAge.trim();

    if (name || age) {
      const nameDisplay = name || '___';
      const ageDisplay = age || '___';
      lines.push({
        type: 'log',
        text: `مرحباً، أنا ${nameDisplay} وعمري ${ageDisplay} سنة`,
      });

      if (name && age && !isNaN(Number(age))) {
        lines.push({
          type: 'result',
          text: `✅ ممتاز! Template Literal يعمل بشكل صحيح`,
        });
      }
    }
    return lines;
  }, [templateName, templateAge]);

  return (
    <>
      {/* ═══════ Exercise 1: Declaring Variables ═══════ */}
      <ExerciseSection
        title="التمرين الأول: تعريف المتغيرات"
        borderColor="amber"
        lessonId="js-1"
        exerciseId="ex1"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            في JavaScript يمكنك تعريف المتغيرات باستخدام{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              let
            </code>{' '}
            أو{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              const
            </code>{' '}
            أو{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              var
            </code>
            . قم بتعريف متغير لتخزين اسمك!
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// عرّف متغيراً لاسمك</JsComment>
          </CodeLine>
          <CodeLine>
            <CodeInput
              value={keyword1}
              onChange={setKeyword1}
              width="w-16"
              hint="let/const"
              correctValue="const"
            />{' '}
            <CodeInput
              value={varName1}
              onChange={setVarName1}
              width="w-24"
              hint="اسم المتغير"
              validator={isValidIdentifier}
            />{' '}
            ={' '}
            <CodeInput
              value={value1}
              onChange={setValue1}
              width="w-32"
              hint="القيمة"
              validator={isQuotedString}
            />
            ;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(
            <span className="text-gray-300">{varName1 || 'myName'}</span>
            );
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                const
              </code>{' '}
              — لا يمكن تغيير قيمته ⟵ الأفضل للثوابت
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                let
              </code>{' '}
              — يمكن تغيير قيمته ⟵ الأفضل للمتغيرات
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                var
              </code>{' '}
              — قديمة ⟵ تجنب استخدامها
            </li>
            <li>
              القيم النصية تُكتب بين علامات تنصيص:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                "مرحبا"
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
              const myName = <strong>"أحمد"</strong>;
            </code>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            أو أي اسم تحبه بين علامات تنصيص
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: Data Types ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: أنواع البيانات"
        borderColor="amber"
        lessonId="js-1"
        exerciseId="ex2"
        maxPoints={15}
        inputCount={3}
      >
        <Explanation>
          <p>
            JavaScript لديها أنواع بيانات مختلفة. أكمل القيم التالية لكل نوع
            بيانات:
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <span className="text-blue-700 font-bold text-sm">Number</span>
              <p className="text-xs text-gray-600 mt-1">أرقام: 42, 3.14</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <span className="text-amber-700 font-bold text-sm">String</span>
              <p className="text-xs text-gray-600 mt-1">نصوص: "مرحبا"</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <span className="text-green-700 font-bold text-sm">Boolean</span>
              <p className="text-xs text-gray-600 mt-1">منطقي: true / false</p>
            </div>
          </div>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// عرّف متغيراً من كل نوع</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> age ={' '}
            <CodeInput
              value={numValue}
              onChange={setNumValue}
              width="w-20"
              hint="رقم"
              validator={isValidNumber}
            />
            ; <JsComment>// Number</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> name ={' '}
            <CodeInput
              value={strValue}
              onChange={setStrValue}
              width="w-28"
              hint='"نص"'
              validator={isQuotedString}
            />
            ; <JsComment>// String</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> isStudent ={' '}
            <CodeInput
              value={boolValue}
              onChange={setBoolValue}
              width="w-20"
              hint="true/false"
              validator={isBooleanLiteral}
            />
            ; <JsComment>// Boolean</JsComment>
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console2Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              الأرقام تُكتب بدون علامات تنصيص:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                25
              </code>
            </li>
            <li>
              النصوص تُحاط بعلامات تنصيص:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                "مرحبا"
              </code>
            </li>
            <li>
              القيم المنطقية هي فقط:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                true
              </code>{' '}
              أو{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                false
              </code>
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
              const age = <strong>25</strong>;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const name = <strong>"أحمد"</strong>;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const isStudent = <strong>true</strong>;
            </code>
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: Template Literals ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: القوالب النصية (Template Literals)"
        borderColor="amber"
        lessonId="js-1"
        exerciseId="ex3"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            بدلاً من دمج النصوص بعلامة{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              +
            </code>
            ، يمكنك استخدام{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              {'`${}`'}
            </code>{' '}
            لتضمين المتغيرات داخل النص مباشرة!
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> myName ={' '}
            <JsString>
              "
              <CodeInput
                value={templateName}
                onChange={setTemplateName}
                width="w-24"
                hint="اسمك"
                validator={isNonEmpty}
              />
              "
            </JsString>
            ;
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> myAge ={' '}
            <CodeInput
              value={templateAge}
              onChange={setTemplateAge}
              width="w-16"
              hint="عمرك"
              validator={isValidNumber}
            />
            ;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// Template Literal — لاحظ استخدام ` بدل "</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> message ={' '}
            <JsString>{'`مرحباً، أنا ${'}</JsString>
            <span className="text-orange-300">myName</span>
            <JsString>{'} وعمري ${'}</JsString>
            <span className="text-orange-300">myAge</span>
            <JsString>{'} سنة`'}</JsString>;
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(message);
          </CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console3Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              Template Literal يستخدم الـ backtick{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                `
              </code>{' '}
              بدلاً من علامات التنصيص العادية
            </li>
            <li>
              لتضمين متغير داخل النص:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                {'`${variableName}`'}
              </code>
            </li>
            <li>
              يمكنك وضع أي تعبير JavaScript داخل{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">{`\${}`}</code>
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
              const myName = <strong>"غيث"</strong>;
            </code>
          </p>
          <p>
            <code
              dir="ltr"
              className="bg-gray-200 px-2 py-1 rounded font-mono"
            >
              const myAge = <strong>20</strong>;
            </code>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            اكتب أي اسم بين علامات تنصيص وأي رقم للعمر
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="اكتب برنامجك الأول"
        instructions="عرّف ثلاثة متغيرات: اسمك (نص)، عمرك (رقم)، وهل أنت طالب (منطقي). ثم اطبع جملة تعريفية باستخدام Template Literal."
        starterCode={`// عرّف المتغيرات هنا\nconst name = \nconst age = \nconst isStudent = \n\n// اطبع جملة تعريفية\nconsole.log();`}
        answerCode={`const name = "أحمد";\nconst age = 20;\nconst isStudent = true;\n\nconsole.log(\`مرحباً، أنا \${name} وعمري \${age} سنة\`);`}
        hint="استخدم const لتعريف المتغيرات و backtick ` للقوالب النصية"
        lessonId="js-1"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-1"
        lessonNum="1"
        totalQuestions={7}
      />
    </>
  );
};

export default JsVariablesExercise1;
