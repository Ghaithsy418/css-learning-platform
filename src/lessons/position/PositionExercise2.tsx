import { useState, type CSSProperties } from 'react';
import { AnswerKey } from '../../features/code/AnswerKey';
import CodeEditor from '../../features/code/CodeEditor';
import CodeInput from '../../features/code/CodeInput';
import CodeLine from '../../features/code/CodeLine';
import { ExerciseSection } from '../../features/code/ExerciseSection';
import { Explanation } from '../../features/code/Explanation';
import { HintBox } from '../../features/code/HintBox';
import Property from '../../features/cssSyntax/Property';

const PositionExercise2: React.FC = () => {
  const [position, setPosition] = useState<string>('relative');
  const [top, setTop] = useState<string>('0');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // We use absolute to simulate "fixed" inside our limited preview "viewport"
  // This is more robust and behaves exactly like fixed in a browser window.
  const isFixed = position === 'fixed';

  const viewportStyles: CSSProperties = {
    height: '400px',
    background: '#f8fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    position: 'relative',
    overflow: 'hidden', // Contain the "fixed" element
    display: 'flex',
    flexDirection: 'column',
  };

  const scrollerStyles: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
    padding: '10px',
  };

  const headerStyles: CSSProperties = {
    // If user typed fixed, we use 'absolute' relative to the 'viewport' container
    // If they typed sticky or relative, it stays inside the scroller's flow
    position: isFixed
      ? 'absolute'
      : (position as CSSProperties['position']) || 'relative',
    top: top.match(/^\d+$/) ? `${top}px` : top || '0',
    left: 0,
    width: '100%',
    background: isFixed ? '#ef4444' : '#3b82f6',
    color: 'white',
    padding: '15px',
    zIndex: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow:
      isFixed || position === 'sticky' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
  };

  return (
    <ExerciseSection title="Position 2: Fixed vs Sticky">
      <Explanation>
        <p className="mb-4">
          يواجه الكثيرون صعوبة في التمييز بين <code>Fixed</code> و{' '}
          <code>Sticky</code>. إليك الفرق الجوهري:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Fixed:</strong> يخرج تماماً من "تدفق الصفحة". يتموضّع
            بالنسبة <strong>للنافذة (Viewport)</strong>.
          </li>
          <li>
            <strong>Sticky:</strong> يبقى داخل "تدفق الصفحة" حتى يصل للقمة، ثم
            يلتصق ولكن <strong>فقط داخل أبيه</strong>.
          </li>
        </ul>
      </Explanation>

      <CodeEditor>
        <CodeLine indent={0}>
          .viewport {'{'} position: relative; overflow: hidden; {'}'}
        </CodeLine>
        <CodeLine indent={0}>.nav-header {'{'}</CodeLine>
        <CodeLine indent={1}>
          <Property>position</Property>:{' '}
          <CodeInput
            value={position}
            onChange={setPosition}
            width="w-32"
          />
          ;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>top</Property>:{' '}
          <CodeInput
            value={top}
            onChange={setTop}
            width="w-20"
          />
          ;
        </CodeLine>
        <CodeLine indent={0}>{'}'}</CodeLine>
      </CodeEditor>

      <HintBox>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="bg-blue-50 p-2 rounded border border-blue-200">
            <strong>قاعدة Sticky:</strong>
            <p>سيلتزم بحدود "القسم الأزرق" ويختفي عندما ينتهي القسم.</p>
          </div>
          <div className="bg-red-50 p-2 rounded border border-red-200">
            <strong>قاعدة Fixed:</strong>
            <p>سيتجاهل كل الأقسام ويلتصق بأعلى "النافذة" (الإطار الرمادي).</p>
          </div>
        </div>
      </HintBox>

      <div className="my-6">
        <p className="text-center text-sm text-gray-500 mb-2 font-mono">
          🖥️ نافذة محاكاة (Simulated Viewport)
        </p>

        <div
          style={viewportStyles}
          className="shadow-2xl"
        >
          {/* If fixed, it renders here directly under the viewport */}
          {isFixed && (
            <div style={headerStyles}>🚀 Fixed: أنا الآن جزء من النافذة!</div>
          )}

          <div
            style={scrollerStyles}
            className="custom-scrollbar"
          >
            <div className="h-20 flex items-center justify-center text-gray-300 italic border-b border-gray-100 mb-4">
              بداية محتوى الصفحة...
            </div>

            <div className="border-4 border-blue-100 rounded-2xl p-0 transition-all">
              <div className="bg-blue-50 px-4 py-2 text-[10px] text-blue-400 font-bold uppercase rounded-t-xl border-b border-blue-100">
                📦 حاوية الأب (Parent Container)
              </div>

              <div className="relative">
                {/* If NOT fixed, it renders here inside its parent flow */}
                {!isFixed && (
                  <div style={headerStyles}>
                    {position === 'sticky'
                      ? '📌 Sticky: أنا أتحرك داخل الحدود الزرقاء'
                      : 'عنصر عادي'}
                  </div>
                )}

                <div className="p-6 space-y-6 bg-white">
                  <div className="h-32 bg-blue-50/30 rounded-xl flex items-center justify-center border border-dashed border-blue-200 text-blue-300">
                    محتوى داخل الأب #1
                  </div>
                  <div className="h-32 bg-blue-50/30 rounded-xl flex items-center justify-center border border-dashed border-blue-200 text-blue-300">
                    محتوى داخل الأب #2
                  </div>
                  <div className="h-32 bg-blue-50/30 rounded-xl flex items-center justify-center border border-dashed border-blue-200 text-blue-300">
                    محتوى داخل الأب #3
                  </div>
                  <p className="text-xs text-red-400 font-bold text-center py-4 border-t border-red-50 italic">
                    🛑 نهاية الحاوية: الـ Sticky سيتوقف هنا!
                  </p>
                </div>
              </div>
            </div>

            <div className="h-150 mt-10 bg-linear-to-b from-gray-50 to-white rounded-t-3xl p-10 text-center">
              <p className="text-gray-400 font-medium">
                مساحة بيضاء خارج الحاوية...
              </p>
              <div className="mt-20 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-100 rounded-full w-3/4 mx-auto animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnswerKey
        show={showAnswer}
        onToggle={() => setShowAnswer(!showAnswer)}
      >
        <div className="text-sm space-y-2">
          <p>أين يلتصق العنصر؟</p>
          <code className="block bg-gray-100 p-2 rounded font-mono">
            Sticky: Within Parent Scope
          </code>
          <code className="block bg-gray-100 p-2 rounded font-mono">
            Fixed: Viewport Scope (Global)
          </code>
        </div>
      </AnswerKey>
    </ExerciseSection>
  );
};

export default PositionExercise2;
