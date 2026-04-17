import { Link } from 'react-router-dom';
import { javaScriptLessons } from '../config/javascriptLessons';
import { useLessonLock } from '../features/lessonLock/LessonLockContext';

export default function JavaScriptLessonsPage() {
  const { isLocked } = useLessonLock();

  return (
    <div
      className="space-y-6"
      dir="rtl"
    >
      <header className="relative overflow-hidden rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 shadow-sm">
        <div className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-orange-300/25 blur-3xl" />

        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            JavaScript Learning Path
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            خريطة دروس جافاسكريبت
          </h1>
          <p className="mt-2 max-w-3xl leading-8 text-slate-700">
            اختر أي درس من المسار الأساسي. كل بطاقة تقودك مباشرة إلى التمرين
            التفاعلي الخاص به.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {javaScriptLessons.map((lesson, index) => {
          const locked = isLocked(lesson.id);

          return (
            <Link
              key={lesson.id}
              to={locked ? '#' : lesson.path}
              aria-disabled={locked}
              className={`group rounded-2xl border bg-white p-5 shadow-sm transition-all ${
                locked
                  ? 'cursor-not-allowed border-slate-200 opacity-60'
                  : 'border-slate-200 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow'
              }`}
              onClick={(event) => {
                if (locked) event.preventDefault();
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                  الدرس {index + 1}
                </p>
                <span className="text-xl">{locked ? '🔒' : lesson.icon}</span>
              </div>

              <h2 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-amber-700">
                {lesson.title}
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                {lesson.description}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
