import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { advancedJavaScriptLessonsArabic } from '../config/advancedJavaScriptLessonsArabic';
import { javaScriptLessons } from '../config/javascriptLessons';
import { useLessonLock } from '../features/lessonLock/LessonLockContext';

export default function JsRoadmapPage() {
  const { isLocked } = useLessonLock();

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
      dir="rtl"
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <header className="mb-10 rounded-3xl border border-slate-700/80 bg-slate-900/85 p-6 shadow-xl md:p-8">
          <motion.h1
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl"
          >
            خارطة تعلم JavaScript من الصفر إلى الاحتراف
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="max-w-3xl text-base leading-8 text-slate-200 md:text-lg"
          >
            هذا المسار مصمم ليعطي الطالب صورة كاملة: تبدأ بأساسيات اللغة، ثم
            تنتقل تدريجيا إلى فهم كيف يعمل محرك JavaScript والمتصفح من الداخل.
            الهدف ليس حفظ الأوامر فقط، بل بناء طريقة تفكير قوية تساعدك تكتب كود
            أوضح، أسرع، وأسهل في التصحيح.
          </motion.p>

          <div className="mt-5 rounded-xl border border-cyan-400/35 bg-cyan-500/15 p-4">
            <p className="mb-2 text-sm font-black text-cyan-100">
              لماذا هذا الموقع؟ ولماذا هذه الدورة؟
            </p>
            <p className="text-sm leading-8 text-slate-100">
              لأن الهدف ليس فقط تعلم أوامر JavaScript، بل فهم المنطق الداخلي
              الذي يجعلك تحلل المشاكل بنفسك وتبني مشاريع حقيقية بثقة. كل درس هنا
              له سبب واضح داخل السلسلة، وليس مجرد موضوع منفصل.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4">
              <p className="mb-1 text-sm font-bold text-cyan-300">
                لماذا هذا المسار؟
              </p>
              <p className="text-sm leading-7 text-slate-200">
                لأن كل خطوة تبني التي بعدها بدل التعلم العشوائي.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4">
              <p className="mb-1 text-sm font-bold text-emerald-300">
                ما النتيجة؟
              </p>
              <p className="text-sm leading-7 text-slate-200">
                فهم نظري + تطبيق عملي + اختبارات تقيس التقدم.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4">
              <p className="mb-1 text-sm font-bold text-amber-300">
                طريقة التعلم
              </p>
              <p className="text-sm leading-7 text-slate-200">
                أساسيات ثم مفاهيم متقدمة ثم مشاريع وتمارين تفاعلية.
              </p>
            </div>
          </div>
        </header>

        <section className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <h2 className="text-2xl font-black text-white md:text-3xl">
              المرحلة الأولى: أساسيات JavaScript
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {javaScriptLessons.map((lesson, idx) => {
              const locked = isLocked(`js-${lesson.id}`);
              const accessible =
                idx === 0 || !isLocked(`js-${javaScriptLessons[idx - 1].id}`);

              return (
                <Link
                  key={lesson.id}
                  to={accessible ? `/js/${lesson.id}` : '#'}
                  className={`group block rounded-2xl border p-5 transition-all duration-200 ${
                    accessible
                      ? 'border-slate-700 bg-slate-900/90 hover:-translate-y-0.5 hover:border-amber-400/80 hover:bg-slate-900'
                      : 'cursor-not-allowed border-slate-800 bg-slate-900/60 opacity-70'
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-3xl">{lesson.icon}</span>
                    {locked ? (
                      <span
                        className="rounded-md border border-rose-400/40 bg-rose-500/10 px-2 py-1 text-xs font-bold text-rose-200"
                        aria-label="مقفل"
                      >
                        مقفل
                      </span>
                    ) : (
                      <span
                        className="rounded-md border border-emerald-400/40 bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-200"
                        aria-label="مفتوح"
                      >
                        متاح
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 text-lg font-extrabold leading-7 text-slate-100">
                    {lesson.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-200">
                    {lesson.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <h2 className="text-2xl font-black text-white md:text-3xl">
              المرحلة الثانية: JavaScript المتقدم
            </h2>
          </div>

          <p className="mb-6 rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4 text-sm leading-8 text-cyan-100 md:text-base">
            هذه المرحلة تركّز على ما يحدث خلف الكواليس بالترتيب الصحيح: أولا كيف
            يعمل المحرك والـ Call Stack، ثم كيف تعمل Closures مع Web APIs، ثم
            بقية المفاهيم المتقدمة التي تحتاجها لبناء واجهات تفاعلية قوية.
          </p>

          <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
              <p className="mb-1 text-xs font-black text-cyan-300">
                بداية المسار المتقدم
              </p>
              <p className="text-sm leading-7 text-slate-100">
                الدرس 1: تفهم المحرك والـ Stack (كيف ينفذ JavaScript الكود
                فعليا).
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
              <p className="mb-1 text-xs font-black text-cyan-300">
                الخطوة الثانية
              </p>
              <p className="text-sm leading-7 text-slate-100">
                الدرس 2: Closures + Web APIs (كيف تبقى البيانات حيّة داخل
                callbacks عبر الزمن).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {advancedJavaScriptLessonsArabic.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/js/advanced/${lesson.id}`}
                className="group flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-900/90 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/80 hover:bg-slate-900 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wide text-cyan-300">
                    الدرس {index + 1}
                  </p>
                  <h3 className="mb-1 text-xl font-black leading-8 text-slate-100">
                    {lesson.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-200">
                    {lesson.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-sm font-bold text-cyan-200 md:self-center">
                  ادخل الدرس
                  <span className="transition-transform group-hover:translate-x-1">
                    ⬅
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
