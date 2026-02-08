import { useState, type CSSProperties } from "react";
import { ExerciseSection } from "../../features/code/ExerciseSection";
import { Explanation } from "../../features/code/Explanation";
import { HintBox } from "../../features/code/HintBox";
import CodeEditor from "../../features/code/CodeEditor";
import CodeLine from "../../features/code/CodeLine";
import Property from "../../features/cssSyntax/Property";
import Value from "../../features/cssSyntax/Value";

const ShadowExercise1: React.FC = () => {
  // Box Shadow Values
  const [offsetX, setOffsetX] = useState<number>(5);
  const [offsetY, setOffsetY] = useState<number>(5);
  const [blur, setBlur] = useState<number>(10);
  const [spread, setSpread] = useState<number>(0);
  const [shadowColor, setShadowColor] = useState<string>("#6b7280");
  const [inset, setInset] = useState<boolean>(false);

  // Text Shadow Values
  const [textOffsetX, setTextOffsetX] = useState<number>(2);
  const [textOffsetY, setTextOffsetY] = useState<number>(2);
  const [textBlur, setTextBlur] = useState<number>(4);
  const [textShadowColor, setTextShadowColor] = useState<string>("#3b82f6");

  // Generate box-shadow CSS
  const boxShadowValue = `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}`;

  // Generate text-shadow CSS
  const textShadowValue = `${textOffsetX}px ${textOffsetY}px ${textBlur}px ${textShadowColor}`;

  const previewBoxStyles: CSSProperties = {
    width: "200px",
    height: "200px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: boxShadowValue,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "box-shadow 0.2s ease",
  };

  const previewTextStyles: CSSProperties = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    textShadow: textShadowValue,
    transition: "text-shadow 0.2s ease",
  };

  return (
    <>
      {/* Box Shadow Section */}
      <ExerciseSection title="التمرين الأول: ظل الصندوق (Box Shadow)">
        <Explanation>
          <p>
            جرب تغيير قيم الظل وشاهد النتيجة مباشرة! الظلال تضيف عمقاً وجمالاً
            لتصميماتك.
          </p>
        </Explanation>

        {/* Interactive Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            🎛️ تحكم في قيم الظل
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Offset X */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>الإزاحة الأفقية (X)</span>
                <span className="font-mono text-purple-600">{offsetX}px</span>
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Offset Y */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>الإزاحة العمودية (Y)</span>
                <span className="font-mono text-purple-600">{offsetY}px</span>
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Blur */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>نصف قطر الضبابية (Blur)</span>
                <span className="font-mono text-purple-600">{blur}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Spread */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>الانتشار (Spread)</span>
                <span className="font-mono text-purple-600">{spread}px</span>
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>لون الظل</span>
                <span className="font-mono text-purple-600">{shadowColor}</span>
              </label>
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
              />
            </div>

            {/* Inset Toggle */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={inset}
                  onChange={(e) => setInset(e.target.checked)}
                  className="w-5 h-5 rounded accent-purple-600"
                />
                <span>ظل داخلي (Inset)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-6">
          <p className="text-sm text-gray-600 mb-4 text-center">
            👇 معاينة الظل
          </p>
          <div className="flex justify-center">
            <div style={previewBoxStyles}>
              <span className="text-gray-400 text-sm">صندوق</span>
            </div>
          </div>
        </div>

        {/* Live Code Display */}
        <CodeEditor>
          <CodeLine>.box {"{"}</CodeLine>
          <CodeLine indent={1}>
            <Property>box-shadow</Property>: {inset && <Value>inset </Value>}
            <Value>{offsetX}px</Value> <Value>{offsetY}px</Value>{" "}
            <Value>{blur}px</Value> <Value>{spread}px</Value>{" "}
            <Value>{shadowColor}</Value>;
          </CodeLine>
          <CodeLine>{"}"}</CodeLine>
        </CodeEditor>

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <strong>الإزاحة الأفقية:</strong> القيم الموجبة تحرك الظل لليمين،
              السالبة لليسار
            </li>
            <li>
              <strong>الإزاحة العمودية:</strong> القيم الموجبة تحرك الظل للأسفل،
              السالبة للأعلى
            </li>
            <li>
              <strong>الضبابية:</strong> كلما زادت القيمة، أصبح الظل أكثر نعومة
            </li>
            <li>
              <strong>الانتشار:</strong> القيم الموجبة توسع الظل، السالبة تقلصه
              لحد معين
            </li>
            <li>
              <strong>Inset:</strong> يجعل الظل داخل الصندوق بدلاً من خارجه
            </li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* Text Shadow Section */}
      <ExerciseSection title="التمرين الثاني: ظل النص (Text Shadow)">
        <Explanation>
          <p>
            ظل النص يضيف بروزاً وجمالاً للعناوين والنصوص. جربه مع ألوان مختلفة!
          </p>
        </Explanation>

        {/* Interactive Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            🎛️ تحكم في ظل النص
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Text Offset X */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>الإزاحة الأفقية (X)</span>
                <span className="font-mono text-blue-600">{textOffsetX}px</span>
              </label>
              <input
                type="range"
                min="-20"
                max="20"
                value={textOffsetX}
                onChange={(e) => setTextOffsetX(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Text Offset Y */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>الإزاحة العمودية (Y)</span>
                <span className="font-mono text-blue-600">{textOffsetY}px</span>
              </label>
              <input
                type="range"
                min="-20"
                max="20"
                value={textOffsetY}
                onChange={(e) => setTextOffsetY(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Text Blur */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>نصف قطر الضبابية (Blur)</span>
                <span className="font-mono text-blue-600">{textBlur}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={textBlur}
                onChange={(e) => setTextBlur(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Text Shadow Color */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>لون الظل</span>
                <span className="font-mono text-blue-600">
                  {textShadowColor}
                </span>
              </label>
              <input
                type="color"
                value={textShadowColor}
                onChange={(e) => setTextShadowColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Text Preview */}
        <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-6">
          <p className="text-sm text-gray-600 mb-4 text-center">
            👇 معاينة ظل النص
          </p>
          <div className="flex justify-center">
            <p style={previewTextStyles}>مرحباً بالعالم!</p>
          </div>
        </div>

        {/* Live Code Display */}
        <CodeEditor>
          <CodeLine>.text {"{"}</CodeLine>
          <CodeLine indent={1}>
            <Property>text-shadow</Property>: <Value>{textOffsetX}px</Value>{" "}
            <Value>{textOffsetY}px</Value> <Value>{textBlur}px</Value>{" "}
            <Value>{textShadowColor}</Value>;
          </CodeLine>
          <CodeLine>{"}"}</CodeLine>
        </CodeEditor>

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <strong>ملاحظة:</strong> text-shadow لا يدعم قيمة الانتشار
              (spread) مثل box-shadow
            </li>
            <li>
              <strong>نصيحة:</strong> استخدم ظلال خفيفة للنصوص لتحسين القراءة
              على خلفيات مختلفة
            </li>
            <li>
              <strong>تأثير التوهج:</strong> اجعل الإزاحات صفراً وزد الضبابية
              للحصول على تأثير التوهج
            </li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* Common Shadow Patterns */}
      <ExerciseSection title="أنماط ظلال شائعة">
        <Explanation>
          <p>إليك بعض أنماط الظلال الشائعة المستخدمة في التصميم الحديث:</p>
        </Explanation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Subtle Shadow */}
          <div className="bg-white rounded-xl p-6 text-center">
            <div
              className="w-24 h-24 bg-white rounded-lg mx-auto mb-4"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
            />
            <p className="font-bold text-gray-800 mb-2">ظل خفيف</p>
            <code className="text-xs text-gray-500 block">
              0 1px 3px rgba(0,0,0,0.12)
            </code>
          </div>

          {/* Medium Shadow */}
          <div className="bg-white rounded-xl p-6 text-center">
            <div
              className="w-24 h-24 bg-white rounded-lg mx-auto mb-4"
              style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
            />
            <p className="font-bold text-gray-800 mb-2">ظل متوسط</p>
            <code className="text-xs text-gray-500 block">
              0 4px 6px rgba(0,0,0,0.1)
            </code>
          </div>

          {/* Large Shadow */}
          <div className="bg-white rounded-xl p-6 text-center">
            <div
              className="w-24 h-24 bg-white rounded-lg mx-auto mb-4"
              style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
            />
            <p className="font-bold text-gray-800 mb-2">ظل كبير</p>
            <code className="text-xs text-gray-500 block">
              0 10px 25px rgba(0,0,0,0.15)
            </code>
          </div>

          {/* Colored Shadow */}
          <div className="bg-white rounded-xl p-6 text-center">
            <div
              className="w-24 h-24 bg-purple-500 rounded-lg mx-auto mb-4"
              style={{ boxShadow: "0 10px 30px rgba(139,92,246,0.4)" }}
            />
            <p className="font-bold text-gray-800 mb-2">ظل ملون</p>
            <code className="text-xs text-gray-500 block">
              0 10px 30px rgba(139,92,246,0.4)
            </code>
          </div>

          {/* Inset Shadow */}
          <div className="bg-white rounded-xl p-6 text-center">
            <div
              className="w-24 h-24 bg-gray-100 rounded-lg mx-auto mb-4"
              style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}
            />
            <p className="font-bold text-gray-800 mb-2">ظل داخلي</p>
            <code className="text-xs text-gray-500 block">
              inset 0 2px 4px rgba(0,0,0,0.1)
            </code>
          </div>

          {/* Layered Shadow */}
          <div className="bg-white rounded-xl p-6 text-center">
            <div
              className="w-24 h-24 bg-white rounded-lg mx-auto mb-4"
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07)",
              }}
            />
            <p className="font-bold text-gray-800 mb-2">ظل متعدد الطبقات</p>
            <code className="text-xs text-gray-500 block">ظلال متراكبة</code>
          </div>
        </div>
      </ExerciseSection>
    </>
  );
};

export default ShadowExercise1;
