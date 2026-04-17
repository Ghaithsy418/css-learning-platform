import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  advancedJavaScriptLessonsDetailed,
  type AdvancedJavaScriptLesson,
} from '../config/advancedJavaScriptLessons';
import { advancedJavaScriptLessonsArabic } from '../config/advancedJavaScriptLessonsArabic';

type LessonLocale = 'en' | 'ar';

export default function AdvancedJavaScriptPage() {
  const [locale, setLocale] = useState<LessonLocale>(() => {
    if (typeof window === 'undefined') return 'en';
    const cached = localStorage.getItem('advanced_js_locale');
    return cached === 'ar' ? 'ar' : 'en';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('advanced_js_locale', locale);
  }, [locale]);

  const lessons: AdvancedJavaScriptLesson[] = useMemo(
    () =>
      locale === 'ar'
        ? advancedJavaScriptLessonsArabic
        : advancedJavaScriptLessonsDetailed,
    [locale],
  );

  return (
    <div
      className="space-y-6"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <header className="rounded-2xl border border-cyan-200 bg-linear-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">
              Advanced JavaScript Module
            </p>
            <h1 className="mt-1 text-2xl font-black text-slate-900">
              {locale === 'ar'
                ? 'مسار JavaScript المتقدم'
                : 'Advanced JavaScript'}
            </h1>
          </div>

          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
            <button
              onClick={() => setLocale('en')}
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                locale === 'en' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale('ar')}
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                locale === 'ar' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              AR
            </button>
          </div>
        </div>

        <p className="leading-8 text-slate-700">
          {locale === 'ar'
            ? 'جميع دروس هذا المسار مفصولة كملفات مستقلة داخل lessons/advanced-js وتستخدم مكوناتك القابلة لإعادة الاستخدام من features/code، مع تمارين واختبارات لكل درس.'
            : 'Each lesson in this track is now a separate file under lessons/advanced-js and uses your reusable features/code components, with exercises and quizzes in every lesson.'}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/js/advanced/1"
            className="rounded-lg border border-cyan-200 bg-white px-4 py-2 text-sm font-bold text-cyan-900 hover:bg-cyan-50"
          >
            {locale === 'ar' ? 'ابدأ الدرس الأول' : 'Start Lesson 1'}
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.id}
            to={`/js/advanced/${index + 1}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-cyan-700">
              Lesson {index + 1}
            </p>
            <h2 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-cyan-700">
              {lesson.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-7 text-slate-600">
              {lesson.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
