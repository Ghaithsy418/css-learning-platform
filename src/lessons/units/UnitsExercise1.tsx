import { useState, type CSSProperties } from "react";
import { ExerciseSection } from "../../features/code/ExerciseSection";
import { Explanation } from "../../features/code/Explanation";
import { HintBox } from "../../features/code/HintBox";

const UnitsExercise1: React.FC = () => {
  const [rootFontSize, setRootFontSize] = useState<number>(16);
  const [parentFontSize, setParentFontSize] = useState<number>(16);

  // Calculate actual sizes
  const pxSize = 32; // Fixed 32px
  const remSize = 2 * rootFontSize; // 2rem based on root
  const emSize = 2 * parentFontSize; // 2em based on parent

  const boxBaseStyles: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    border: "2px solid",
  };

  return (
    <>
      {/* Introduction */}
      <ExerciseSection title="ما الفرق بين px و rem و em؟">
        <Explanation>
          <p>
            في CSS، هناك وحدات مختلفة لتحديد الأحجام. فهم الفرق بينها مهم جداً
            لبناء تصميمات متجاوبة!
          </p>
        </Explanation>

        {/* Quick Comparison */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📏 مقارنة سريعة
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-r-4 border-red-400">
              <code className="text-red-600 font-bold text-xl">px</code>
              <div>
                <p className="font-bold text-gray-800">البكسل (Pixel)</p>
                <p className="text-gray-600 text-sm">
                  وحدة ثابتة مطلقة. لا تتغير أبداً بغض النظر عن أي إعدادات.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-r-4 border-green-400">
              <code className="text-green-600 font-bold text-xl">rem</code>
              <div>
                <p className="font-bold text-gray-800">
                  نسبة من حجم الخط الجذري
                </p>
                <p className="text-gray-600 text-sm">
                  تعتمد على حجم الخط في عنصر{" "}
                  <code className="bg-gray-200 px-1 rounded">html</code>{" "}
                  (الافتراضي 16px). مثالية للتصميم المتجاوب!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-r-4 border-blue-400">
              <code className="text-blue-600 font-bold text-xl">em</code>
              <div>
                <p className="font-bold text-gray-800">
                  نسبة من حجم خط العنصر الأب
                </p>
                <p className="text-gray-600 text-sm">
                  تعتمد على حجم الخط في العنصر الأب المباشر. قد تتراكم الأحجام!
                </p>
              </div>
            </div>
          </div>
        </div>
      </ExerciseSection>

      {/* Interactive Comparison */}
      <ExerciseSection title="التجربة التفاعلية: شاهد الفرق بنفسك!">
        <Explanation>
          <p>
            غير قيم حجم الخط وشاهد كيف تتأثر الوحدات المختلفة. العناصر الثلاثة
            محددة بـ 32px و 2rem و 2em.
          </p>
        </Explanation>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            🎛️ تحكم في أحجام الخط
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Root Font Size */}
            <div className="space-y-3">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>حجم خط العنصر الجذري (html)</span>
                <span className="font-mono text-green-600">
                  {rootFontSize}px
                </span>
              </label>
              <input
                type="range"
                min="10"
                max="32"
                value={rootFontSize}
                onChange={(e) => setRootFontSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <p className="text-xs text-gray-500">
                يؤثر على <code className="bg-green-100 px-1 rounded">rem</code>{" "}
                فقط
              </p>
            </div>

            {/* Parent Font Size */}
            <div className="space-y-3">
              <label className="flex justify-between text-sm font-medium text-gray-700">
                <span>حجم خط العنصر الأب</span>
                <span className="font-mono text-blue-600">
                  {parentFontSize}px
                </span>
              </label>
              <input
                type="range"
                min="10"
                max="32"
                value={parentFontSize}
                onChange={(e) => setParentFontSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-xs text-gray-500">
                يؤثر على <code className="bg-blue-100 px-1 rounded">em</code>{" "}
                فقط
              </p>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-6">
          <p className="text-sm text-gray-600 mb-6 text-center">
            👇 شاهد تغير الأحجام (جميعها تمثل نفس القيمة العددية: 32px أو 2rem
            أو 2em)
          </p>

          <div className="space-y-6">
            {/* px Box */}
            <div className="flex items-center gap-4">
              <div
                style={{
                  ...boxBaseStyles,
                  width: `${pxSize}px`,
                  height: `${pxSize}px`,
                  borderColor: "#ef4444",
                  color: "#ef4444",
                  fontSize: "12px",
                }}
              >
                px
              </div>
              <div>
                <p className="font-bold text-gray-800">
                  32px = <span className="text-red-500">{pxSize}px</span> (ثابت)
                </p>
                <p className="text-sm text-gray-500">لا يتغير أبداً</p>
              </div>
            </div>

            {/* rem Box */}
            <div className="flex items-center gap-4">
              <div
                style={{
                  ...boxBaseStyles,
                  width: `${remSize}px`,
                  height: `${remSize}px`,
                  borderColor: "#22c55e",
                  color: "#22c55e",
                  fontSize: "12px",
                }}
              >
                rem
              </div>
              <div>
                <p className="font-bold text-gray-800">
                  2rem = 2 × {rootFontSize}px ={" "}
                  <span className="text-green-500">{remSize}px</span>
                </p>
                <p className="text-sm text-gray-500">
                  يعتمد على حجم خط html ({rootFontSize}px)
                </p>
              </div>
            </div>

            {/* em Box */}
            <div className="flex items-center gap-4">
              <div
                style={{
                  ...boxBaseStyles,
                  width: `${emSize}px`,
                  height: `${emSize}px`,
                  borderColor: "#3b82f6",
                  color: "#3b82f6",
                  fontSize: "12px",
                }}
              >
                em
              </div>
              <div>
                <p className="font-bold text-gray-800">
                  2em = 2 × {parentFontSize}px ={" "}
                  <span className="text-blue-500">{emSize}px</span>
                </p>
                <p className="text-sm text-gray-500">
                  يعتمد على حجم خط الأب ({parentFontSize}px)
                </p>
              </div>
            </div>
          </div>
        </div>

        <HintBox>
          <ul className="mr-5 leading-7">
            <li>
              <strong>لاحظ:</strong> 32px يبقى ثابتاً بينما rem و em يتغيران!
            </li>
            <li>
              <strong>rem:</strong> يتغير فقط عند تغيير حجم خط html
            </li>
            <li>
              <strong>em:</strong> يتغير عند تغيير حجم خط العنصر الأب
            </li>
          </ul>
        </HintBox>
      </ExerciseSection>

      {/* Best Practices */}
      <ExerciseSection title="أفضل الممارسات: متى تستخدم كل وحدة؟">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* px */}
          <div className="bg-white rounded-xl p-6 border-2 border-red-200">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <code className="text-red-600 font-bold">px</code>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">استخدم px عندما:</h4>
            <ul className="text-sm text-gray-600 space-y-2 mr-4">
              <li>• الحدود (borders)</li>
              <li>• الظلال (shadows)</li>
              <li>• أحجام دقيقة ثابتة</li>
              <li>• قيم صغيرة جداً (1-3px)</li>
            </ul>
          </div>

          {/* rem */}
          <div className="bg-white rounded-xl p-6 border-2 border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <code className="text-green-600 font-bold">rem</code>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">استخدم rem عندما:</h4>
            <ul className="text-sm text-gray-600 space-y-2 mr-4">
              <li>• أحجام الخطوط</li>
              <li>• المسافات (padding/margin)</li>
              <li>• عرض/ارتفاع العناصر</li>
              <li>• أي شيء يحتاج للتجاوب</li>
            </ul>
          </div>

          {/* em */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <code className="text-blue-600 font-bold">em</code>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">استخدم em عندما:</h4>
            <ul className="text-sm text-gray-600 space-y-2 mr-4">
              <li>• المسافة داخل الأزرار</li>
              <li>• تباعد الأيقونات</li>
              <li>• أي شيء نسبي للنص</li>
              <li>• مكونات قابلة للتحجيم</li>
            </ul>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-yellow-50 border-r-4 border-yellow-400 rounded-xl p-6">
          <h4 className="font-bold text-yellow-800 mb-3">💡 نصائح احترافية</h4>
          <ul className="text-yellow-800 space-y-2 mr-4">
            <li>
              ✅ استخدم <code className="bg-yellow-200 px-1 rounded">rem</code>{" "}
              كوحدة افتراضية لمعظم الأحجام
            </li>
            <li>
              ✅ حدد حجم خط أساسي في{" "}
              <code className="bg-yellow-200 px-1 rounded">html</code> (عادة
              16px أو 62.5%)
            </li>
            <li>
              ⚠️ تجنب استخدام{" "}
              <code className="bg-yellow-200 px-1 rounded">em</code> في عناصر
              متداخلة كثيرة (يتراكم الحجم!)
            </li>
            <li>
              ✅ استخدم <code className="bg-yellow-200 px-1 rounded">px</code>{" "}
              فقط للقيم الدقيقة الثابتة مثل الحدود (Borders)
            </li>
          </ul>
        </div>
      </ExerciseSection>
    </>
  );
};

export default UnitsExercise1;
