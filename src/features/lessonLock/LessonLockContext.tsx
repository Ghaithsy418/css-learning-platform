import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

interface LessonLockState {
  lockedLessons: string[];
  isLocked: (lessonId: string) => boolean;
  refreshLocks: () => void;
}

const LessonLockContext = createContext<LessonLockState>({
  lockedLessons: [],
  isLocked: () => false,
  refreshLocks: () => {},
});

export const useLessonLock = () => useContext(LessonLockContext);

const isLocal =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

export function LessonLockProvider({ children }: { children: ReactNode }) {
  const [lockedLessons, setLockedLessons] = useState<string[]>([]);

  const fetchLocks = useCallback(async () => {
    try {
      if (isLocal) {
        const raw = localStorage.getItem('locked_lessons');
        setLockedLessons(raw ? JSON.parse(raw) : []);
      } else {
        const res = await fetch('/api/lessons-config');
        if (res.ok) {
          const data = await res.json();
          setLockedLessons(data.locked ?? []);
        }
      }
    } catch {
      /* silent */
    }
  }, []);

  useEffect(() => {
    fetchLocks();
  }, [fetchLocks]);

  const isLocked = useCallback(
    (lessonId: string) => lockedLessons.includes(lessonId),
    [lockedLessons],
  );

  return (
    <LessonLockContext.Provider
      value={{ lockedLessons, isLocked, refreshLocks: fetchLocks }}
    >
      {children}
    </LessonLockContext.Provider>
  );
}
