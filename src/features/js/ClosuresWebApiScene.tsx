import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ClosureStep = {
  desc: string;
  stack: string[];
  closureState: string[];
  webApiState: string[];
  output: string;
  action: string;
};

const steps: ClosureStep[] = [
  {
    desc: 'الخطوة 1: نستدعي createCounter("UI"). هنا ينشأ lexical scope جديد ويحمل count = 0 و label = "UI".',
    stack: ['createCounter("UI")'],
    closureState: ['count = 0', 'label = "UI"'],
    webApiState: [],
    output: '-',
    action: 'create-counter',
  },
  {
    desc: 'الخطوة 2: createCounter تعيد الدالة increment. هذه الدالة لا تأخذ نسخة من القيم، بل تحتفظ بنفس lexical environment. هذا هو الـ closure.',
    stack: ['return increment'],
    closureState: ['count = 0', 'label = "UI"'],
    webApiState: [],
    output: '-',
    action: 'return-closure',
  },
  {
    desc: 'الخطوة 3: نمرر نفس الدالة إلى addEventListener. الآن callback محفوظ داخل Web APIs بانتظار click.',
    stack: ['addEventListener("click", increment)'],
    closureState: ['count = 0', 'label = "UI"'],
    webApiState: ['click -> increment'],
    output: '-',
    action: 'register-click',
  },
  {
    desc: 'الخطوة 4: نضيف callback آخر عبر setTimeout. هذا أيضا Web API، لكنه يطلق callback بعد تأخير زمني بدل طلب شبكة.',
    stack: ['setTimeout(increment, 1500)'],
    closureState: ['count = 0', 'label = "UI"'],
    webApiState: ['click -> increment', 'timer -> increment (1500ms)'],
    output: '-',
    action: 'register-timer',
  },
  {
    desc: 'الخطوة 5: يحدث click. المتصفح يعيد callback إلى Call Stack، والدالة تقرأ count الحالي ثم ترفعه إلى 1.',
    stack: ['increment() from click'],
    closureState: ['count = 1', 'label = "UI"'],
    webApiState: ['timer -> increment (1500ms)'],
    output: 'UI 1',
    action: 'click-run',
  },
  {
    desc: 'الخطوة 6: ينتهي timer. يعود نفس callback مرة ثانية، ويستخدم نفس closure state التي بقيت حيّة طوال الوقت.',
    stack: ['increment() from setTimeout'],
    closureState: ['count = 2', 'label = "UI"'],
    webApiState: [],
    output: 'UI 2',
    action: 'timer-run',
  },
  {
    desc: 'الخطوة 7: النتيجة النهائية توضح الفكرة: نفس الدالة عادت مرتين، وكل مرة قرأت نفس البيئة المغلقة وعدلتها.',
    stack: [],
    closureState: ['count = 2', 'label = "UI"'],
    webApiState: [],
    output: 'UI 1 -> UI 2',
    action: 'done',
  },
];

export default function ClosuresWebApiScene() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying && step < steps.length - 1) {
      timer = setTimeout(() => setStep((prev) => prev + 1), 2500);
    } else if (isPlaying && step === steps.length - 1) {
      setTimeout(() => setIsPlaying(false), 100);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  const currentStep = steps[step];

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl md:p-7">
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-950/85 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="mb-1 text-2xl font-black text-white">
            🧠 مشهد تفاعلي: Closures + Web APIs
          </h3>
          <p className="text-sm leading-7 text-slate-200">
            شاهد كيف تحتفظ الدالة الداخلية ببياناتها (closure state) حتى بعد
            انتهاء الدالة الخارجية، وكيف تعود هذه الدالة عبر Web APIs في وقت
            لاحق.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setStep(0);
              setIsPlaying(true);
            }}
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-bold text-slate-100 hover:bg-slate-700"
          >
            إعادة ↺
          </button>
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className={`rounded-lg border px-4 py-2 text-sm font-bold ${
              isPlaying
                ? 'border-amber-400/50 bg-amber-500/20 text-amber-100'
                : 'border-emerald-400/50 bg-emerald-500/20 text-emerald-100'
            }`}
          >
            {isPlaying ? 'إيقاف مؤقت ⏸' : 'تشغيل ▶'}
          </button>
        </div>
      </div>

      <div
        dir="ltr"
        className="mb-6 rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-slate-100"
      >
        <div
          className={`${['create-counter', 'return-closure'].includes(currentStep.action) ? 'rounded bg-cyan-500/20 px-2' : ''}`}
        >
          function createCounter(label) {'{'}
          <br />
          &nbsp;&nbsp;let count = 0;
          <br />
          &nbsp;&nbsp;return function increment() {'{'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;count++;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;console.log(label, count);
          <br />
          &nbsp;&nbsp;{'}'};
          <br />
          {'}'}
        </div>

        <br />

        <div
          className={`${currentStep.action === 'register-click' ? 'rounded bg-indigo-500/20 px-2' : ''}`}
        >
          const counter = createCounter('UI');
          <br />
          button.addEventListener('click', counter);
        </div>

        <br />

        <div
          className={`${currentStep.action === 'register-timer' ? 'rounded bg-fuchsia-500/20 px-2' : ''}`}
        >
          setTimeout(counter, 1500);
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatePanel
          title="💾 Call Stack"
          emptyLabel="فارغ حاليا"
          tone="cyan"
          items={currentStep.stack}
        />
        <StatePanel
          title="🔒 Closure Memory"
          emptyLabel="لا توجد بيانات"
          tone="emerald"
          items={currentStep.closureState}
        />
        <StatePanel
          title="⏳ Web APIs / Timer Queue"
          emptyLabel="لا توجد callbacks"
          tone="indigo"
          items={currentStep.webApiState}
        />
      </div>

      <div className="mt-5 rounded-lg border border-amber-400/35 bg-amber-500/15 p-3">
        <p className="text-sm font-bold leading-7 text-amber-100">
          {currentStep.desc}
        </p>
      </div>

      <div className="mt-3 rounded-lg border border-slate-700 bg-slate-950 p-3">
        <p className="text-xs font-bold text-slate-300">المخرجات المتوقعة:</p>
        <p className="mt-1 font-mono text-sm font-bold text-cyan-200">
          {currentStep.output}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            aria-label={`الخطوة ${i + 1}`}
            onClick={() => setStep(i)}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-cyan-400' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

type StatePanelProps = {
  title: string;
  emptyLabel: string;
  tone: 'cyan' | 'emerald' | 'indigo';
  items: string[];
};

function StatePanel({ title, emptyLabel, tone, items }: StatePanelProps) {
  const toneClass =
    tone === 'emerald'
      ? 'border-emerald-400/60 bg-emerald-500/20 text-emerald-100'
      : tone === 'indigo'
        ? 'border-indigo-400/60 bg-indigo-500/20 text-indigo-100'
        : 'border-cyan-400/60 bg-cyan-500/20 text-cyan-100';

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-3">
      <h4 className="mb-2 text-center text-sm font-black text-slate-100">
        {title}
      </h4>
      <div className="flex min-h-36 flex-col justify-start gap-2">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={`${item}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`rounded-lg border px-3 py-2 text-center font-mono text-sm font-bold ${toneClass}`}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="flex min-h-36 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300">
            {emptyLabel}
          </div>
        )}
      </div>
    </div>
  );
}
