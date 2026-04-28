import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ClosuresWebApiScene from '../../features/js/ClosuresWebApiScene';
import StartQuizButton from '../../features/quiz/StartQuizButton';

export default function AdvancedJsLesson2() {
  return (
    <div
      className="mx-auto mt-[1vh] min-h-screen max-w-4xl p-4 md:mt-[4vh] md:p-8"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-10 overflow-hidden rounded-3xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl md:p-8"
      >
        <div className="pointer-events-none absolute -left-14 -top-16 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-5">
          <Link
            to="/js/lessons"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-indigo-400/35 bg-indigo-500/15 px-4 py-2 text-sm font-bold text-indigo-100 hover:bg-indigo-500/25"
          >
            ⮕ العودة إلى خارطة الطريق
          </Link>

          <div>
            <p className="mb-2 text-sm font-bold text-indigo-300">
              JavaScript المتقدم • الدرس 2
            </p>
            <h1 className="mb-3 text-3xl font-black leading-tight text-white md:text-5xl">
              Closures + Timers: كيف تبقى البيانات حيّة؟
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
              الهدف من هذا الدرس أن تفهم كيف الدالة الداخلية تحتفظ بالبيانات حتى
              بعد انتهاء الدالة الخارجية، وكيف تعود هذه الدالة للتنفيذ عبر Web
              APIs (مثل click و setTimeout) في لحظة لاحقة.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
              <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                خطوة 1
              </p>
              <p className="text-sm leading-7 text-slate-200">
                ننشئ lexical scope ونحفظ state داخله قبل أن يخرج أي callback.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
              <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-indigo-300">
                خطوة 2
              </p>
              <p className="text-sm leading-7 text-slate-200">
                نمرر نفس الدالة إلى click و setTimeout، لكن التنفيذ يحدث لاحقا.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
              <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-amber-300">
                خطوة 3
              </p>
              <p className="text-sm leading-7 text-slate-200">
                عند العودة، تقرأ الدالة نفس closure وتزيد count مرة أخرى.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="space-y-8"
      >
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 md:p-6">
          <h2 className="mb-4 text-2xl font-black text-white">
            لماذا هذا الدرس مهم في رحلة التعلم؟
          </h2>
          <p className="mb-3 leading-8 text-slate-200">
            كثير من مطوري JavaScript يكتبون callbacks يوميا، لكن بدون فهم الـ
            closure تحصل أخطاء مزعجة في state والقيم القديمة. هذا الدرس يربط بين
            النظري والعملي: كيف تُحفظ البيانات، وكيف تستدعيها Web APIs لاحقا عبر
            click و setTimeout.
          </p>
          <div className="rounded-xl border border-indigo-400/35 bg-indigo-500/15 p-4 text-sm leading-8 text-indigo-100">
            القاعدة المختصرة: الدالة الداخلية لا تحفظ نسخة من القيم، بل مرجعا
            إلى lexical environment نفسه.
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 md:p-6">
          <h2 className="mb-4 text-2xl font-black text-white">
            المشهد التفاعلي
          </h2>
          <p className="mb-5 leading-8 text-slate-200">
            راقب في نفس الوقت: Call Stack، وذاكرة الـ Closure، وحالة Web APIs.
            بهذا ستفهم لماذا نفس callback يمكن أن يعود بعد click ثم بعد
            setTimeout مع استمرار state داخله.
          </p>
          <ClosuresWebApiScene />
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 md:p-6">
          <h2 className="mb-4 text-2xl font-black text-white">
            ماذا يجب أن تخرج به من الدرس؟
          </h2>
          <ol className="list-decimal space-y-2 pr-6 leading-8 text-slate-200">
            <li>
              تفهم معنى lexical scope والفرق بينه وبين نطاق التنفيذ المؤقت.
            </li>
            <li>تعرف لماذا closure يبقي المتغيرات متاحة عبر الزمن.</li>
            <li>تربط بين closure و Web APIs في callbacks الحقيقية.</li>
            <li>تشرح لماذا setTimeout يؤخر التنفيذ لكنه لا يمسح closure.</li>
            <li>تكتب كودا أوضح بدل الاعتماد على متغيرات global مربكة.</li>
          </ol>
        </section>

        <section className="rounded-2xl border border-amber-500/60 bg-amber-600/25 p-5">
          <h3 className="mb-2 text-lg font-black text-amber-50">ملخص الدرس</h3>
          <p className="leading-8 text-amber-50">
            Closures هي جسر الحالة الداخلية للدوال، وWeb APIs هي جسر الزمن.
            عندما تدمجهما صح، تبني تفاعلات UI موثوقة بدون فقدان الحالة.
          </p>
        </section>

        <StartQuizButton
          lessonId="adv-js-2"
          lessonNum="advanced/2"
          totalQuestions={5}
        />

        <div className="mt-8 flex items-center justify-between border-t border-slate-700 pt-8">
          <Link
            to="/js/advanced/1"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-bold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400/25"
          >
            ⮕ السابق: المحرك و Call Stack
          </Link>

          <Link
            to="/js/advanced/3"
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-600 bg-indigo-600 px-6 py-3 text-base font-black text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/30"
          >
            التالي ⮕
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
