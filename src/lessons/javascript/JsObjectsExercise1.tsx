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
   Lesson 7 — الكائنات (Objects)
════════════════════════════════════════════ */

const JsObjectsExercise1: React.FC = () => {
  /* ── Exercise 1: Create object ── */
  const [propName, setPropName] = useState('');
  const [propAge, setPropAge] = useState('');

  /* ── Exercise 2: Access ── */
  const [dotAccess, setDotAccess] = useState('');
  const [bracketAccess, setBracketAccess] = useState('');

  /* ── Exercise 3: Modify ── */
  const [newProp, setNewProp] = useState('');
  const [newValue, setNewValue] = useState('');

  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  /* ── Console 1 ── */
  const console1Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const name = propName.trim();
    const age = propAge.trim();

    if (!name && !age) return lines;

    if (name) {
      if ((name.startsWith('"') || name.startsWith("'")) && name.length > 2) {
        lines.push({ type: 'log', text: `name: ${name} ✅` });
      } else if (name.length > 0 && !name.startsWith('"')) {
        lines.push({
          type: 'info',
          text: `النص يحتاج علامات تنصيص: "${name}"`,
        });
      }
    }
    if (age) {
      if (!isNaN(Number(age))) {
        lines.push({ type: 'log', text: `age: ${age} ✅` });
      } else {
        lines.push({ type: 'error', text: `العمر يجب أن يكون رقماً` });
      }
    }
    if (name && age && !isNaN(Number(age))) {
      lines.push({ type: 'result', text: `✅ تم إنشاء كائن الشخص بنجاح!` });
    }
    return lines;
  }, [propName, propAge]);

  /* ── Console 2 ── */
  const console2Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const dot = dotAccess.trim();
    const bracket = bracketAccess.trim();

    if (!dot && !bracket) return lines;

    if (dot) {
      if (dot === 'name' || dot === 'age') {
        lines.push({
          type: 'result',
          text: `person.${dot} ✅ (النقطة للوصول المباشر)`,
        });
      } else {
        lines.push({ type: 'info', text: `جرّب: name أو age` });
      }
    }
    if (bracket) {
      if (
        bracket === '"name"' ||
        bracket === "'name'" ||
        bracket === '"age"' ||
        bracket === "'age'"
      ) {
        lines.push({
          type: 'result',
          text: `person[${bracket}] ✅ (الأقواس للمفاتيح الديناميكية)`,
        });
      } else {
        lines.push({ type: 'info', text: `استخدم اسم الخاصية كنص: "name"` });
      }
    }
    return lines;
  }, [dotAccess, bracketAccess]);

  /* ── Console 3 ── */
  const console3Lines = useMemo(() => {
    const lines: { type: 'log' | 'error' | 'info' | 'result'; text: string }[] =
      [];
    const prop = newProp.trim();
    const val = newValue.trim();

    if (!prop && !val) return lines;

    if (prop && val) {
      lines.push({
        type: 'log',
        text: `تمت إضافة خاصية "${prop}" بقيمة ${val} ✅`,
      });
      lines.push({
        type: 'info',
        text: `يمكنك إضافة خصائص جديدة لأي كائن في أي وقت!`,
      });
    } else if (prop) {
      lines.push({ type: 'info', text: `أضف قيمة للخاصية` });
    }
    return lines;
  }, [newProp, newValue]);

  return (
    <>
      {/* ═══════ Exercise 1: Create Object ═══════ */}
      <ExerciseSection
        title="التمرين الأول: إنشاء كائن"
        borderColor="amber"
        lessonId="js-7"
        exerciseId="ex1"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            الكائن يخزن بيانات في أزواج{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              مفتاح: قيمة
            </code>
            . مثل بطاقة هوية تحتوي الاسم والعمر والمدينة.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> person = {'{'}
          </CodeLine>
          <CodeLine indent={1}>
            name:{' '}
            <CodeInput
              value={propName}
              onChange={setPropName}
              width="w-24"
              hint='"أحمد"'
              correctValue='"أحمد"'
            />
            ,
          </CodeLine>
          <CodeLine indent={1}>
            age:{' '}
            <CodeInput
              value={propAge}
              onChange={setPropAge}
              width="w-16"
              hint="25"
              correctValue="25"
            />
            ,
          </CodeLine>
          <CodeLine indent={1}>
            city: <JsString>"الرياض"</JsString>
          </CodeLine>
          <CodeLine>{'};'}</CodeLine>
        </CodeEditor>

        <ConsoleOutput lines={console1Lines} />

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              الكائن يُنشأ بأقواس متعرجة:{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">{`{ key: value }`}</code>
            </li>
            <li>
              كل خاصية تنتهي بفاصلة{' '}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                ,
              </code>
            </li>
            <li>القيم يمكن أن تكون أي نوع: نص، رقم، مصفوفة، أو حتى كائن آخر</li>
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
            {`const person = {
  name: "أحمد",
  age: 25,
  city: "الرياض"
};`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 2: Access Properties ═══════ */}
      <ExerciseSection
        title="التمرين الثاني: الوصول للخصائص"
        borderColor="amber"
        lessonId="js-7"
        exerciseId="ex2"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            طريقتان للوصول لخصائص الكائن:{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              object.key
            </code>{' '}
            (النقطة) أو{' '}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              object["key"]
            </code>{' '}
            (الأقواس).
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// الطريقة الأولى: النقطة (Dot Notation)</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(person.
            <CodeInput
              value={dotAccess}
              onChange={setDotAccess}
              width="w-16"
              hint="name"
              correctValue="name"
            />
            );
          </CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>
              // الطريقة الثانية: الأقواس (Bracket Notation)
            </JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.<JsKeyword>log</JsKeyword>(person[
            <CodeInput
              value={bracketAccess}
              onChange={setBracketAccess}
              width="w-20"
              hint='"name"'
              correctValue='"name"'
            />
            ]);
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
            {`console.log(person.name);      // "أحمد"
console.log(person["name"]);   // "أحمد"`}
          </pre>
          <p className="mt-2 text-sm text-gray-600">
            النقطة أبسط، لكن الأقواس ضرورية عندما يكون اسم الخاصية في متغير.
          </p>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ Exercise 3: Modify ═══════ */}
      <ExerciseSection
        title="التمرين الثالث: تعديل وإضافة خصائص"
        borderColor="amber"
        lessonId="js-7"
        exerciseId="ex3"
        maxPoints={10}
        inputCount={2}
      >
        <Explanation>
          <p>
            يمكنك تعديل قيمة خاصية موجودة أو إضافة خاصية جديدة بنفس الطريقة.
          </p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// تعديل خاصية موجودة</JsComment>
          </CodeLine>
          <CodeLine>person.age = 26;</CodeLine>
          <CodeLine />
          <CodeLine>
            <JsComment>// إضافة خاصية جديدة</JsComment>
          </CodeLine>
          <CodeLine>
            person.
            <CodeInput
              value={newProp}
              onChange={setNewProp}
              width="w-20"
              hint="email"
              correctValue="email"
            />{' '}
            ={' '}
            <CodeInput
              value={newValue}
              onChange={setNewValue}
              width="w-32"
              hint='"a@b.com"'
              correctValue='"ahmed@email.com"'
            />
            ;
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
            {`person.age = 26;
person.email = "ahmed@email.com";`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      {/* ═══════ تمرين كتابة ═══════ */}
      <FreeCodeExercise
        title="بطاقة منتج"
        instructions="أنشئ كائناً لمنتج يحتوي: name (اسم)، price (سعر)، inStock (متوفر/لا). ثم اطبع جملة وصفية باستخدام Template Literal."
        starterCode={`const product = {\n  name: ,\n  price: ,\n  inStock: \n};\n\nconsole.log(\`المنتج: \${product.name} - السعر: \${product.price} ريال\`);`}
        answerCode={`const product = {\n  name: "لابتوب",\n  price: 3500,\n  inStock: true\n};\n\nconsole.log(\`المنتج: \${product.name} - السعر: \${product.price} ريال\`);\n// المنتج: لابتوب - السعر: 3500 ريال`}
        hint="استخدم مفاتيح مثل name, price, inStock مع القيم المناسبة"
        lessonId="js-7"
        exerciseId="free-code"
      />

      {/* ═══════ اختبار ═══════ */}
      <StartQuizButton
        lessonId="js-7"
        lessonNum="7"
        totalQuestions={8}
      />
    </>
  );
};

export default JsObjectsExercise1;
