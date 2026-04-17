import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { JavaScriptLessonMeta } from '../../config/javascriptLessons';

export default function JavaScriptLessonTemplate({
  lesson,
  children,
}: {
  lesson: JavaScriptLessonMeta;
  children: ReactNode;
}) {
  return (
    <div
      className="space-y-6"
      dir="rtl"
    >
      <section className="relative isolate overflow-hidden rounded-3xl border border-amber-200 bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 shadow-sm">
        <div className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-amber-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-amber-500 to-orange-500" />

        <div className="relative z-10">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              JavaScript • Lesson {lesson.lessonNum}
            </span>
            <Link
              to="/js/lessons"
              className="rounded-lg border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-white"
            >
              📚 خريطة الدروس
            </Link>
          </div>

          <h2 className="text-2xl font-black leading-tight text-gray-900">
            {lesson.title}
          </h2>
          <p className="mt-3 leading-8 text-gray-700">{lesson.description}</p>

          <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
            {lesson.objectives.map((objective, index) => (
              <div
                key={`${lesson.id}-objective-${index}`}
                className="rounded-xl border border-white/70 bg-white/70 p-3 text-sm leading-7 text-gray-700"
              >
                <span className="font-bold text-gray-900">
                  هدف {index + 1}:
                </span>{' '}
                {objective}
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}
