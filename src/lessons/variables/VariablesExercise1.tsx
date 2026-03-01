import { useState, type CSSProperties } from "react";
import CodeEditor from "../../features/code/CodeEditor";
import CodeInput from "../../features/code/CodeInput";
import CodeLine from "../../features/code/CodeLine";
import { ExerciseSection } from "../../features/code/ExerciseSection";
import { Explanation } from "../../features/code/Explanation";
import { HintBox } from "../../features/code/HintBox";
import { Comment } from "../../features/cssSyntax/Comments";
import Property from "../../features/cssSyntax/Property";

const VariablesExercise1: React.FC = () => {
  // Variable definitions
  const [primaryColor, setPrimaryColor] = useState<string>("#8b5cf6");
  const [secondaryColor, setSecondaryColor] = useState<string>("#06b6d4");
  const [spacing, setSpacing] = useState<string>("16px");
  const [borderRadius, setBorderRadius] = useState<string>("8px");

  // Exercise: Using variables
  const [userPrimaryVar, setUserPrimaryVar] = useState<string>("");
  const [userSpacingVar, setUserSpacingVar] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Check if user entered correct answers
  const isPrimaryCorrect =
    userPrimaryVar.includes("--primary-color") ||
    userPrimaryVar.includes("primary-color");
  const isSpacingCorrect =
    userSpacingVar.includes("--spacing") || userSpacingVar.includes("spacing");

  const cardStyles: CSSProperties = {
    backgroundColor: "#ffffff",
    padding: spacing || "16px",
    borderRadius: borderRadius || "8px",
    border: `2px solid ${primaryColor}`,
    transition: "all 0.3s ease",
  };

  const buttonStyles: CSSProperties = {
    backgroundColor: primaryColor,
    color: "#ffffff",
    padding: `${parseInt(spacing || "16") / 2}px ${spacing}`,
    borderRadius: borderRadius,
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "bold",
  };

  const secondaryButtonStyles: CSSProperties = {
    ...buttonStyles,
    backgroundColor: secondaryColor,
  };

  return (
    <>
      {/* Introduction */}
      <ExerciseSection title="ما هي متغيرات CSS؟">
        <Explanation>
          <p>
            متغيرات CSS (تسمى أيضاً Custom Properties) تتيح لك تخزين قيم وإعادة
            استخدامها في جميع أنحاء ملف CSS. كأنك تنشئ ثوابت يمكنك تغييرها من
            مكان واحد!
          </p>
        </Explanation>

        {/* Syntax Overview */}
        <div
          dir="ltr"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📝 الصيغة الأساسية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Defining Variables */}
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
              <p className="text-gray-400 mb-2">/* تعريف المتغيرات */</p>
              <p className="text-purple-400">:root {"{"}</p>
              <p className="text-green-400 mr-4">--primary-color: #8b5cf6;</p>
              <p className="text-green-400 mr-4">--spacing: 16px;</p>
              <p className="text-green-400 mr-4">--border-radius: 8px;</p>
              <p className="text-purple-400">{"}"}</p>
            </div>

            {/* Using Variables */}
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
              <p className="text-gray-400 mb-2">/* استخدام المتغيرات */</p>
              <p className="text-purple-400">.button {"{"}</p>
              <p className="text-blue-400 mr-4">
                background:{" "}
                <span className="text-yellow-300">var(--primary-color)</span>;
              </p>
              <p className="text-blue-400 mr-4">
                padding: <span className="text-yellow-300">var(--spacing)</span>
                ;
              </p>
              <p className="text-blue-400 mr-4">
                border-radius:{" "}
                <span className="text-yellow-300">var(--border-radius)</span>;
              </p>
              <p className="text-purple-400">{"}"}</p>
            </div>
          </div>
        </div>

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <strong>تعريف المتغير:</strong> يبدأ دائماً بشرطتين{" "}
              <code className="bg-gray-200 px-1 rounded">--</code>
            </li>
            <li>
              <strong>استخدام المتغير:</strong> داخل دالة{" "}
              <code className="bg-gray-200 px-1 rounded">var()</code>
            </li>
            <li>
              <strong>:root</strong> يمثل عنصر html ويجعل المتغيرات متاحة في كل
              مكان
            </li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* Interactive Demo */}
      <ExerciseSection title="جرب بنفسك: تغيير قيم المتغيرات">
        <Explanation>
          <p>
            غير قيم المتغيرات وشاهد كيف تتحدث جميع العناصر التي تستخدمها
            تلقائياً! هذه هي قوة المتغيرات.
          </p>
        </Explanation>

        {/* Variable Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            🎛️ تحكم في المتغيرات
          </h3>

          <div dir="ltr" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Color */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>--primary-color</span>
                <span className="font-mono text-purple-600">
                  {primaryColor}
                </span>
              </label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
              />
            </div>

            {/* Secondary Color */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>--secondary-color</span>
                <span className="font-mono text-cyan-600">
                  {secondaryColor}
                </span>
              </label>
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
              />
            </div>

            {/* Spacing */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>--spacing</span>
                <span className="font-mono text-green-600">{spacing}</span>
              </label>
              <input
                type="range"
                min="4"
                max="32"
                value={parseInt(spacing)}
                onChange={(e) => setSpacing(`${e.target.value}px`)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>--border-radius</span>
                <span className="font-mono text-orange-600">
                  {borderRadius}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="24"
                value={parseInt(borderRadius)}
                onChange={(e) => setBorderRadius(`${e.target.value}px`)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-6">
          <p className="text-sm text-gray-600 mb-4 text-center">
            👇 جميع العناصر تستخدم نفس المتغيرات
          </p>

          <div className="space-y-4">
            {/* Card Preview */}
            <div style={cardStyles}>
              <h4 className="font-bold text-gray-800 mb-2">بطاقة عينة</h4>
              <p className="text-gray-600 text-sm mb-4">
                هذه البطاقة تستخدم المتغيرات للحدود والمسافات
              </p>
              <div className="flex gap-2">
                <button style={buttonStyles}>زر رئيسي</button>
                <button style={secondaryButtonStyles}>زر ثانوي</button>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Code */}
        <div
          dir="ltr"
          className="bg-gray-900 rounded-xl p-4 font-mono text-sm overflow-x-auto mb-6"
        >
          <p className="text-gray-400 mb-2">/* المتغيرات الحالية */</p>
          <p className="text-purple-400">:root {"{"}</p>
          <p className="text-green-400 mr-4">
            --primary-color: {primaryColor};
          </p>
          <p className="text-green-400 mr-4">
            --secondary-color: {secondaryColor};
          </p>
          <p className="text-green-400 mr-4">--spacing: {spacing};</p>
          <p className="text-green-400 mr-4">
            --border-radius: {borderRadius};
          </p>
          <p className="text-purple-400">{"}"}</p>
        </div>
      </ExerciseSection>

      {/* Exercise */}
      <ExerciseSection title="تمرين: استخدام المتغيرات" lessonId="css-variables-1" exerciseId="ex1" maxPoints={10} inputCount={2}>
        <Explanation>
          <p>أكمل الكود التالي لاستخدام المتغيرات بدلاً من القيم المباشرة:</p>
        </Explanation>

        <CodeEditor>
          <CodeLine>:root {"{"}</CodeLine>
          <CodeLine indent={1}>
            <Property>--primary-color</Property>: #8b5cf6;
          </CodeLine>
          <CodeLine indent={1}>
            <Property>--spacing</Property>: 16px;
          </CodeLine>
          <CodeLine>{"}"}</CodeLine>
          <CodeLine>&nbsp;</CodeLine>
          <CodeLine>.button {"{"}</CodeLine>
          <CodeLine indent={1}>
            <Property>background</Property>:{" "}
            <CodeInput
              value={userPrimaryVar}
              onChange={setUserPrimaryVar}
              width="w-48"
              correctValue="var(--primary-color)"
            />
            ; <Comment>/* استخدم متغير اللون */</Comment>
          </CodeLine>
          <CodeLine indent={1}>
            <Property>padding</Property>:{" "}
            <CodeInput
              value={userSpacingVar}
              onChange={setUserSpacingVar}
              width="w-40"
              correctValue="var(--spacing)"
            />
            ; <Comment>/* استخدم متغير المسافة */</Comment>
          </CodeLine>
          <CodeLine>{"}"}</CodeLine>
        </CodeEditor>

        {/* Validation Feedback */}
        <div className="mt-4 space-y-2">
          <div
            className={`p-3 rounded-lg ${isPrimaryCorrect ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
          >
            {isPrimaryCorrect ? "✅" : "⏳"} background: var(--primary-color)
          </div>
          <div
            className={`p-3 rounded-lg ${isSpacingCorrect ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
          >
            {isSpacingCorrect ? "✅" : "⏳"} padding: var(--spacing)
          </div>
        </div>

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              استخدم الصيغة:{" "}
              <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
                var(--اسم-المتغير)
              </code>
            </li>
          </ul>
        </HintBox>

        {/* Answer Key */}
        <div className="mt-6">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            {showAnswer ? "🙈 إخفاء الإجابة" : "👁️ إظهار الإجابة"}
          </button>
          {showAnswer && (
            <div className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="font-mono text-sm">
                background: <strong>var(--primary-color)</strong>
              </p>
              <p className="font-mono text-sm">
                padding: <strong>var(--spacing)</strong>
              </p>
            </div>
          )}
        </div>
      </ExerciseSection>

      {/* Best Practices */}
      <ExerciseSection title="أفضل الممارسات لمتغيرات CSS">
        <div className="space-y-6">
          {/* Naming Convention */}
          <div className="bg-white rounded-xl p-6 border-r-4 border-green-400">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">📛</span>
              تسمية واضحة وموحدة
            </h4>
            <div
              dir="ltr"
              className="bg-gray-900 rounded-lg p-4 font-mono text-sm"
            >
              <p className="text-gray-400">/* ✅ أسماء جيدة */</p>
              <p className="text-green-400">--color-primary: #8b5cf6;</p>
              <p className="text-green-400">--color-secondary: #06b6d4;</p>
              <p className="text-green-400">--spacing-sm: 8px;</p>
              <p className="text-green-400">--spacing-md: 16px;</p>
              <p className="text-green-400">--font-size-lg: 1.25rem;</p>
              <p className="text-gray-500 mt-2">/* ❌ أسماء سيئة */</p>
              <p className="text-red-400">--c1: #8b5cf6;</p>
              <p className="text-red-400">--x: 16px;</p>
            </div>
          </div>

          {/* Organize in :root */}
          <div className="bg-white rounded-xl p-6 border-r-4 border-blue-400">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">📁</span>
              تنظيم المتغيرات في مجموعات
            </h4>
            <div
              dir="ltr"
              className="bg-gray-900 rounded-lg p-4 font-mono text-sm"
            >
              <p className="text-purple-400">:root {"{"}</p>
              <p className="text-gray-400 mr-4">/* الألوان */</p>
              <p className="text-green-400 mr-4">--color-primary: #8b5cf6;</p>
              <p className="text-green-400 mr-4">--color-text: #1f2937;</p>
              <p className="text-gray-400 mr-4 mt-2">/* المسافات */</p>
              <p className="text-green-400 mr-4">--spacing-xs: 4px;</p>
              <p className="text-green-400 mr-4">--spacing-sm: 8px;</p>
              <p className="text-gray-400 mr-4 mt-2">/* الخطوط */</p>
              <p className="text-green-400 mr-4">
                --font-family: 'Cairo', sans-serif;
              </p>
              <p className="text-purple-400">{"}"}</p>
            </div>
          </div>

          {/* Fallback Values */}
          <div className="bg-white rounded-xl p-6 border-r-4 border-orange-400">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              استخدم قيم احتياطية (Fallback)
            </h4>
            <div
              dir="ltr"
              className="bg-gray-900 rounded-lg p-4 font-mono text-sm"
            >
              <p className="text-gray-400">
                /* قيمة احتياطية إذا لم يوجد المتغير */
              </p>
              <p className="text-blue-400">
                background: var(--color-primary,{" "}
                <span className="text-yellow-300">#8b5cf6</span>);
              </p>
              <p className="text-gray-400 mt-2">
                /* القيمة الثانية هي الاحتياطية */
              </p>
            </div>
          </div>

          {/* Theming */}
          <div className="bg-white rounded-xl p-6 border-r-4 border-purple-400">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              السمات (Theming) مع المتغيرات
            </h4>
            <div
              dir="ltr"
              className="bg-gray-900 rounded-lg p-4 font-mono text-sm"
            >
              <p className="text-gray-400">/* الوضع الفاتح (الافتراضي) */</p>
              <p className="text-purple-400">:root {"{"}</p>
              <p className="text-green-400 mr-4">--bg-color: #ffffff;</p>
              <p className="text-green-400 mr-4">--text-color: #1f2937;</p>
              <p className="text-purple-400">{"}"}</p>
              <p className="text-gray-400 mt-2">/* الوضع الداكن */</p>
              <p className="text-purple-400">[data-theme="dark"] {"{"}</p>
              <p className="text-green-400 mr-4">--bg-color: #1f2937;</p>
              <p className="text-green-400 mr-4">--text-color: #f9fafb;</p>
              <p className="text-purple-400">{"}"}</p>
            </div>
          </div>
        </div>
      </ExerciseSection>
    </>
  );
};

export default VariablesExercise1;
