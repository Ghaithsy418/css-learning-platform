import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CallStackScene from '../../features/js/CallStackScene';
import StartQuizButton from '../../features/quiz/StartQuizButton';

export default function AdvancedJsLesson1() {
  return (
    <div
      className="mx-auto mt-[1vh] min-h-screen max-w-4xl p-4 md:mt-[4vh] md:p-8"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-10 overflow-hidden rounded-3xl border border-slate-700 bg-linear-to-br from-slate-900 to-slate-950 p-6 shadow-2xl md:p-8"
      >
        <div className="pointer-events-none absolute -left-14 -top-16 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-5">
          <Link
            to="/js/lessons"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-cyan-400/35 bg-cyan-500/15 px-4 py-2 text-sm font-bold text-cyan-100 hover:bg-cyan-500/25"
          >
            ⮕ العودة إلى خارطة الطريق
          </Link>

          <div>
            <p className="mb-2 text-sm font-bold text-cyan-300">
              JavaScript المتقدم • الدرس 1
            </p>
            <h1 className="mb-3 text-3xl font-black leading-tight text-white md:text-5xl">
              كيف يعمل محرك JavaScript والـ Call Stack؟
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
              هذا الدرس يبني النموذج الذهني الأساسي: ماذا يحدث للكود لحظة بلحظة
              من أول سطر حتى آخر سطر، ولماذا ترتيب الاستدعاءات مهم لفهم الأخطاء
              والأداء.
            </p>
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
            الفكرة الأساسية
          </h2>
          <p className="mb-3 leading-8 text-slate-200">
            محرك JavaScript ينفذ الكود بشكل <strong>متزامن</strong> داخل خيط
            واحد. كل استدعاء دالة يدخل إلى الـ <strong>Call Stack</strong>، وكل
            دالة تنتهي تخرج منه. إذا فهمت هذه الحركة، ستعرف لماذا يظهر stack
            trace في الأخطاء ولماذا بعض الأكواد تجمد الصفحة.
          </p>
          <div className="rounded-xl border border-cyan-400/35 bg-cyan-500/15 p-4 text-sm leading-8 text-cyan-100">
            قاعدة ذهبية: أي دالة جديدة = frame جديد أعلى الـ Stack، والانتهاء
            منها = Pop.
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 md:p-6">
          <h2 className="mb-4 text-2xl font-black text-white">
            شاهد التنفيذ بصريا
          </h2>
          <p className="mb-5 leading-8 text-slate-200">
            في المشهد التالي، راقب العلاقة بين الكود (يسار) والـ Call Stack
            (يمين). كل خطوة مرفقة بشرح دقيق لما يحدث داخل المحرك.
          </p>
          <CallStackScene />
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 md:p-6">
          <h2 className="mb-4 text-2xl font-black text-white">
            لماذا هذا مهم عمليا؟
          </h2>
          <ul className="list-disc space-y-2 pr-6 leading-8 text-slate-200">
            <li>
              عند ظهور خطأ، ستقرأ stack trace كقصة: من استدعى من؟ وأين توقف
              التنفيذ؟
            </li>
            <li>
              ستتجنب كتابة دوال طويلة جدا تسدّ الـ Stack وتؤخر استجابة الواجهة.
            </li>
            <li>
              ستفهم الدرس القادم (Event Loop) بسرعة، لأنك عرفت أولا حدود التنفيذ
              المتزامن.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-amber-500/60 bg-amber-600/25 p-5">
          <h3 className="mb-2 text-lg font-black text-amber-50">ملخص الدرس</h3>
          <p className="leading-8 text-amber-50">
            JavaScript لا ينفذ كل شيء دفعة واحدة. ينفذ مهمة واحدة في كل لحظة عبر
            الـ Call Stack. فهمك لهذه الحركة هو أساس فهم الأداء، الأخطاء،
            واللا-تزامن.
          </p>
        </section>

        <StartQuizButton
          lessonId="adv-js-1"
          lessonNum="advanced/1"
          totalQuestions={5}
        />

        <div className="mt-8 flex justify-end border-t border-slate-700 pt-8">
          <Link
            to="/js/advanced/2"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-600 bg-cyan-600 px-6 py-3 text-base font-black text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/30"
          >
            التالي: البيئة و Event Loop ⮕
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
