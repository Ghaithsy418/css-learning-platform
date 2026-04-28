import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type StackStep = {
  desc: string;
  stack: string[];
  action: string;
};

const steps: StackStep[] = [
  {
    desc: 'تم إنشاء Global Execution Context ووضعه في أعلى الـ Call Stack.',
    stack: ['Global Context'],
    action: 'global',
  },
  {
    desc: 'استدعاء multiply(5, 5) يعني إضافة frame جديد أعلى الـ Stack.',
    stack: ['Global Context', 'multiply(5, 5)'],
    action: 'push_multiply',
  },
  {
    desc: 'تنفيذ جسم multiply وحساب ناتج a * b.',
    stack: ['Global Context', 'multiply(5, 5)'],
    action: 'calc',
  },
  {
    desc: 'انتهاء multiply وإزالة الـ frame من الـ Stack.',
    stack: ['Global Context'],
    action: 'pop_multiply',
  },
  {
    desc: 'استدعاء printResult(25) فيُضاف frame جديد.',
    stack: ['Global Context', 'printResult(25)'],
    action: 'push_print',
  },
  {
    desc: 'داخل printResult تم استدعاء console.log، لذلك يدخل frame ثالث.',
    stack: ['Global Context', 'printResult(25)', 'console.log(25)'],
    action: 'push_log',
  },
  {
    desc: 'انتهاء console.log ثم خروجه من الـ Stack.',
    stack: ['Global Context', 'printResult(25)'],
    action: 'pop_log',
  },
  {
    desc: 'انتهاء printResult والعودة إلى السياق العام.',
    stack: ['Global Context'],
    action: 'pop_print',
  },
  {
    desc: 'انتهى التنفيذ المتزامن، والـ Stack أصبح فارغا.',
    stack: [],
    action: 'done',
  },
];

export default function CallStackScene() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying && step < steps.length - 1) {
      timer = setTimeout(() => setStep((s) => s + 1), 2200);
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
            ⚙️ مشهد تفاعلي: كيف تعمل الـ Call Stack
          </h3>
          <p className="text-sm leading-7 text-slate-200">
            اضغط تشغيل وشاهد كيف تتم إضافة وإزالة كل frame أثناء تنفيذ الكود
            المتزامن خطوة بخطوة.
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          dir="ltr"
          className="relative rounded-xl border border-slate-700 bg-slate-950 p-5 font-mono text-sm text-slate-100"
        >
          <div className="mb-3 inline-flex rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs font-bold text-slate-300">
            script.js
          </div>

          <div
            className={`${['push_multiply', 'calc'].includes(currentStep.action) ? 'rounded bg-cyan-500/20 px-2' : ''}`}
          >
            <span className="text-fuchsia-300">function</span>{' '}
            <span className="text-cyan-300">multiply</span>(a, b) {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-fuchsia-300">return</span> a * b;
            <br />
            {'}'}
          </div>

          <br />

          <div
            className={`${['push_print', 'push_log'].includes(currentStep.action) ? 'rounded bg-cyan-500/20 px-2' : ''}`}
          >
            <span className="text-fuchsia-300">function</span>{' '}
            <span className="text-cyan-300">printResult</span>(num) {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-yellow-200">console</span>.
            <span className="text-cyan-300">log</span>(
            <span className="text-emerald-300">'Result:'</span>, num);
            <br />
            {'}'}
          </div>

          <br />

          <div
            className={`${currentStep.action === 'global' ? 'rounded bg-amber-500/20 px-2' : ''}`}
          >
            <span className="text-fuchsia-300">const</span> result ={' '}
            <span className="text-cyan-300">multiply</span>(
            <span className="text-amber-200">5</span>,
            <span className="text-amber-200"> 5</span>);
          </div>

          <div
            className={`${currentStep.action === 'pop_multiply' ? 'rounded bg-amber-500/20 px-2' : ''}`}
          >
            <span className="text-cyan-300">printResult</span>(result);
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
          <div className="mb-3 flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900 p-3">
            <h4 className="text-sm font-black text-slate-100">
              💾 Call Stack (LIFO)
            </h4>
            <span className="text-xs font-bold text-slate-300">
              آخر داخل = أول خارج
            </span>
          </div>

          <div className="mb-3 rounded-lg border border-cyan-400/35 bg-cyan-500/15 p-3">
            <p className="text-sm font-bold leading-7 text-cyan-100">
              {currentStep.desc}
            </p>
          </div>

          <div className="min-h-52 space-y-2">
            <AnimatePresence mode="popLayout">
              {currentStep.stack.length > 0 ? (
                [...currentStep.stack].reverse().map((frame, i) => (
                  <motion.div
                    key={`${frame}-${i}`}
                    initial={{ opacity: 0, y: -14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`rounded-lg border px-3 py-2 text-center font-mono text-sm font-bold ${
                      i === 0
                        ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-100'
                        : 'border-slate-700 bg-slate-900 text-slate-200'
                    }`}
                  >
                    {frame}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-52 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-sm font-bold text-slate-300"
                >
                  لا يوجد أي frame حاليا
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
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
