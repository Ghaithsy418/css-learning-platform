import type { ReactNode } from 'react';
import { useLessonLock } from './LessonLockContext';

export default function LessonGuard({
  lessonId,
  children,
}: {
  lessonId: string;
  children: ReactNode;
}) {
  const { isLocked } = useLessonLock();

  if (isLocked(lessonId)) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-center"
        dir="rtl"
      >
        <div className="text-6xl mb-6">🔒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          هذا الدرس مقفل حاليًا
        </h2>
        <p className="text-gray-500 text-sm max-w-md">
          قام المعلم بقفل هذا الدرس مؤقتًا. يرجى الانتظار حتى يتم فتحه أو
          التواصل مع المعلم.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
