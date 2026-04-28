import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type LoopStep = {
  desc: string;
  stack: string[];
  webApi: string[];
  queue: string[];
  action: string;
};

const steps: LoopStep[] = [
  {
    desc: "تنفيذ console.log('first') مباشرة داخل Call Stack.",
    stack: ["console.log('first')"],
    webApi: [],
    queue: [],
    action: 'first-log',
  },
  {
    desc: 'انتهى التنفيذ الأول وتم تفريغ الـ Stack.',
    stack: [],
    webApi: [],
    queue: [],
    action: 'first-done',
  },
  {
    desc: 'استدعاء setTimeout وإرساله إلى Web APIs لبدء المؤقت.',
    stack: ['setTimeout(cb, 1000)'],
    webApi: ['timer: cb()'],
    queue: [],
    action: 'timer-start',
  },
  {
    desc: "تنفيذ console.log('third') المتزامن قبل callback.",
    stack: ["console.log('third')"],
    webApi: ['timer: cb()'],
    queue: [],
    action: 'third-log',
  },
  {
    desc: 'بعد انتهاء التوقيت ينتقل cb إلى Callback Queue.',
    stack: [],
    webApi: [],
    queue: ['cb()'],
    action: 'queue-cb',
  },
  {
    desc: 'Event Loop يلاحظ أن الـ Stack فارغ، فيسحب cb من Queue للـ Stack.',
    stack: ['cb()'],
    webApi: [],
    queue: [],
    action: 'cb-pushed',
  },
  {
    desc: "داخل cb يتم تنفيذ console.log('second').",
    stack: ['cb()', "console.log('second')"],
    webApi: [],
    queue: [],
    action: 'second-log',
  },
  {
    desc: 'انتهى callback بالكامل، وبذلك تكتمل الدورة.',
    stack: [],
    webApi: [],
    queue: [],
    action: 'done',
  },
];

export default function EventLoopScene() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying && step < steps.length - 1) {
      timer = setTimeout(() => setStep((prev) => prev + 1), 2400);
    } else if (isPlaying && step === steps.length - 1) {
      setTimeout(() => setIsPlaying(false), 100);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  const currentStep = steps[step];

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl md:p-7">
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-950/80 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="mb-1 text-2xl font-black text-white">
            🔄 مشهد تفاعلي: Event Loop + Web APIs
          </h3>
          <p className="text-sm leading-7 text-slate-200">
            تابع كيف يخرج setTimeout خارج الـ Stack، ثم يعود callback في الوقت
            المناسب بدون تجميد الواجهة.
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
          className={`${['first-log', 'first-done'].includes(currentStep.action) ? 'rounded bg-cyan-500/20 px-2' : ''}`}
        >
          console.log('first');
        </div>

        <div
          className={`${currentStep.action === 'timer-start' ? 'rounded bg-cyan-500/20 px-2' : ''}`}
        >
          setTimeout(() =&gt; {'{'}
          <br />
          &nbsp;&nbsp;
          <span
            className={`${['cb-pushed', 'second-log'].includes(currentStep.action) ? 'rounded bg-fuchsia-500/20 px-2 text-fuchsia-100' : ''}`}
          >
            console.log('second');
          </span>
          <br />
          {'}'}, 1000);
        </div>

        <div
          className={`${currentStep.action === 'third-log' ? 'rounded bg-cyan-500/20 px-2' : ''}`}
        >
          console.log('third');
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Panel
          title="💾 Call Stack"
          emptyLabel="فارغ حاليا"
          itemCount={currentStep.stack.length}
        >
          <AnimatePresence>
            {currentStep.stack.map((item, i) => (
              <motion.div
                key={`${item}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="rounded-lg border border-cyan-400/60 bg-cyan-500/20 px-3 py-2 text-center font-mono text-sm font-bold text-cyan-100"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </Panel>

        <Panel
          title="🌐 Web APIs"
          emptyLabel="لا توجد مهام"
          itemCount={currentStep.webApi.length}
        >
          <AnimatePresence>
            {currentStep.webApi.map((item, i) => (
              <motion.div
                key={`${item}-${i}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="rounded-lg border border-indigo-400/60 bg-indigo-500/20 px-3 py-2 text-center font-mono text-sm font-bold text-indigo-100"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </Panel>

        <Panel
          title="➡ Callback Queue"
          emptyLabel="لا يوجد callback"
          itemCount={currentStep.queue.length}
        >
          <AnimatePresence>
            {currentStep.queue.map((item, i) => (
              <motion.div
                key={`${item}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="rounded-lg border border-fuchsia-400/60 bg-fuchsia-500/20 px-3 py-2 text-center font-mono text-sm font-bold text-fuchsia-100"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </Panel>
      </div>

      <div className="mt-5 rounded-lg border border-amber-400/35 bg-amber-500/15 p-3">
        <p className="text-sm font-bold leading-7 text-amber-100">
          {currentStep.desc}
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

type PanelProps = {
  title: string;
  emptyLabel: string;
  itemCount: number;
  children: React.ReactNode;
};

function Panel({ title, emptyLabel, itemCount, children }: PanelProps) {
  const hasContent = itemCount > 0;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-3">
      <h4 className="mb-2 text-center text-sm font-black text-slate-100">
        {title}
      </h4>
      <div className="flex min-h-36 flex-col justify-start gap-2">
        {hasContent ? (
          children
        ) : (
          <div className="flex min-h-36 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300">
            {emptyLabel}
          </div>
        )}
      </div>
    </div>
  );
}
