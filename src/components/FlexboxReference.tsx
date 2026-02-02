import { ExerciseSection } from "../features/code/ExerciseSection";
import { Explanation } from "../features/code/Explanation";

const FlexboxReference: React.FC = () => {
  return (
    <ExerciseSection title="📖 مرجع Flexbox السريع">
      <Explanation>
        <p className="font-bold mb-2">خصائص الحاوية (Container):</p>
        <ul className="mr-5 leading-7 mb-4">
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              display: flex
            </code>{" "}
            - تفعيل Flexbox
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              flex-direction
            </code>{" "}
            - اتجاه المحور الرئيسي
            <span className="text-gray-500 text-sm block indent-4">
              Values: row | column | row-reverse | column-reverse
            </span>
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              justify-content
            </code>{" "}
            - المحاذاة على المحور الرئيسي
            <span className="text-gray-500 text-sm block indent-4">
              Values: flex-start | flex-end | center | space-between |
              space-around
            </span>
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              align-items
            </code>{" "}
            - المحاذاة على المحور الثانوي (العمودي)
            <span className="text-gray-500 text-sm block indent-4">
              Values: stretch | flex-start | flex-end | center | baseline
            </span>
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              flex-wrap
            </code>{" "}
            - التفاف العناصر
            <span className="text-gray-500 text-sm block indent-4">
              Values: nowrap | wrap
            </span>
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              gap
            </code>{" "}
            - المسافة بين العناصر
          </li>
        </ul>

        <p className="font-bold mb-2">خصائص العناصر (Items):</p>
        <ul className="mr-5 leading-7">
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              flex-grow
            </code>{" "}
            - نسبة تمدد العنصر (الافتراضي 0)
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              flex-shrink
            </code>{" "}
            - نسبة انكماش العنصر
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              flex-basis
            </code>{" "}
            - الحجم المبدئي للعنصر قبل التوزيع
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-0.5 rounded font-mono text-sm">
              align-self
            </code>{" "}
            - محاذاة عنصر واحد بشكل مختلف عن البقية
          </li>
        </ul>
      </Explanation>
    </ExerciseSection>
  );
};

export default FlexboxReference;
