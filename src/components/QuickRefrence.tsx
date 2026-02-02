import { ExerciseSection } from "../features/code/ExerciseSection";
import { Explanation } from "../features/code/Explanation";

const QuickReference: React.FC = () => {
  return (
    <ExerciseSection title="📖 مرجع سريع">
      <Explanation>
        <p className="font-bold mb-2">خصائص الشبكة الأساسية:</p>
        <ul className="mr-5 leading-7 mb-4">
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              display: grid
            </code>{" "}
            - ينشئ حاوية شبكة
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              grid-template-columns
            </code>{" "}
            - يحدد عروض الأعمدة
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              grid-template-rows
            </code>{" "}
            - يحدد ارتفاعات الصفوف
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              gap
            </code>{" "}
            - المسافة بين العناصر
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              grid-template-areas
            </code>{" "}
            - مناطق الشبكة المسماة
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              grid-area
            </code>{" "}
            - يعين عنصر لمنطقة مسماة
          </li>
        </ul>
        <p className="font-bold mb-2">القيم المفيدة:</p>
        <ul className="mr-5 leading-7">
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              1fr
            </code>{" "}
            - جزء واحد من المساحة المتاحة
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              auto
            </code>{" "}
            - الحجم بناءً على المحتوى
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              repeat(3, 1fr)
            </code>{" "}
            - تكرار نمط 3 مرات
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              200px
            </code>{" "}
            - حجم ثابت بالبكسل
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              minmax(100px, 1fr)
            </code>{" "}
            - مرن مع حد أدنى/أقصى
          </li>
        </ul>
      </Explanation>
    </ExerciseSection>
  );
};

export default QuickReference;
