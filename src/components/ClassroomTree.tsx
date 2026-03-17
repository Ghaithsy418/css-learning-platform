import { useNavigate } from 'react-router-dom';
import type { ClassroomTreeTopic } from '../config/jsClassroomTrees';
import { useLessonLock } from '../features/lessonLock/LessonLockContext';

const jsLessonMeta: Record<string, { label: string; path: string }> = {
  'js-1': { label: 'المتغيرات وأنواع البيانات', path: '/js/1' },
  'js-2': { label: 'العمليات والمعاملات', path: '/js/2' },
  'js-3': { label: 'الجمل الشرطية', path: '/js/3' },
  'js-4': { label: 'الحلقات التكرارية', path: '/js/4' },
  'js-5': { label: 'الدوال', path: '/js/5' },
  'js-6': { label: 'المصفوفات', path: '/js/6' },
  'js-7': { label: 'الكائنات', path: '/js/7' },
  'js-8': { label: 'DOM والعناصر', path: '/js/8' },
  'js-9': { label: 'الأحداث', path: '/js/9' },
  'js-10': { label: 'النصوص', path: '/js/10' },
  'js-11': { label: 'دوال المصفوفات', path: '/js/11' },
  'js-12': { label: 'تصحيح الأخطاء', path: '/js/12' },
};

interface ClassroomTreeProps {
  title: string;
  description: string;
  accent: 'amber' | 'blue';
  topics: ClassroomTreeTopic[];
}

export default function ClassroomTree({
  title,
  description,
  accent,
  topics,
}: ClassroomTreeProps) {
  const navigate = useNavigate();
  const { isLocked } = useLessonLock();

  const accentMap = {
    amber: {
      border: 'border-amber-300',
      badge: 'bg-amber-100 text-amber-800',
      summary: 'text-amber-700',
      line: 'border-amber-200',
      button: 'bg-amber-50 hover:bg-amber-100 text-amber-900',
    },
    blue: {
      border: 'border-sky-300',
      badge: 'bg-sky-100 text-sky-800',
      summary: 'text-sky-700',
      line: 'border-sky-200',
      button: 'bg-sky-50 hover:bg-sky-100 text-sky-900',
    },
  };

  const tone = accentMap[accent];

  return (
    <section
      className={`rounded-2xl border bg-white p-5 shadow-sm ${tone.border}`}
    >
      <div className="mb-5 text-right">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${tone.badge}`}
        >
          {title}
        </span>
        <p className="mt-3 text-sm leading-7 text-gray-600">{description}</p>
      </div>

      <div className="space-y-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`rounded-2xl border-r-4 border bg-white p-4 ${tone.line}`}
          >
            <div className="text-right">
              <h3 className="text-lg font-bold text-gray-800">{topic.title}</h3>
              <p className={`mt-1 text-sm leading-6 ${tone.summary}`}>
                {topic.summary}
              </p>
            </div>

            <div className="mt-4 mr-3 space-y-2 border-r-2 border-dashed border-gray-200 pr-4">
              {/* Separate locked and unlocked lessons */}
              {(() => {
                const lessons = topic.lessonIds
                  .map((lessonId) => {
                    const lesson = jsLessonMeta[lessonId];
                    const locked = isLocked(lessonId);
                    return lesson ? { lessonId, lesson, locked } : null;
                  })
                  .filter(
                    (
                      item,
                    ): item is {
                      lessonId: string;
                      lesson: { label: string; path: string };
                      locked: boolean;
                    } => item !== null,
                  );

                const unlockedLessons = lessons.filter((l) => !l.locked);
                const lockedLessons = lessons.filter((l) => l.locked);

                return (
                  <>
                    {/* Unlocked lessons */}
                    {unlockedLessons.map(({ lessonId, lesson }) => (
                      <button
                        key={lessonId}
                        onClick={() => navigate(lesson.path)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${tone.button}`}
                      >
                        <span className="font-medium">📘</span>
                        <span className="text-right text-gray-700">
                          {lesson.label}
                        </span>
                      </button>
                    ))}

                    {/* Locked lessons section */}
                    {lockedLessons.length > 0 && unlockedLessons.length > 0 && (
                      <div className="my-2 border-t border-gray-300"></div>
                    )}

                    {lockedLessons.map(({ lessonId, lesson }) => (
                      <button
                        key={lessonId}
                        onClick={() => navigate(lesson.path)}
                        disabled
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors opacity-50 cursor-not-allowed ${tone.button}`}
                      >
                        <span className="font-medium">🔒</span>
                        <span className="text-right text-gray-700">
                          {lesson.label}
                        </span>
                      </button>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
