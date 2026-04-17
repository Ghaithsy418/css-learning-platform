import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useAuth } from '../auth/AuthContext';

/* ── Lesson ID → Route mapping per track ── */
export const cssLessonRoutes: { id: string; path: string }[] = [
  { id: 'grid-1', path: '/css/grid/1' },
  { id: 'grid-2', path: '/css/grid/2' },
  { id: 'grid-3', path: '/css/grid/3' },
  { id: 'flex-1', path: '/css/flexbox/1' },
  { id: 'flex-2', path: '/css/flexbox/2' },
  { id: 'flex-3', path: '/css/flexbox/3' },
  { id: 'shadow-1', path: '/css/shadows/1' },
  { id: 'units-1', path: '/css/units/1' },
  { id: 'vars-1', path: '/css/variables/1' },
  { id: 'resp-1', path: '/css/responsive/1' },
  { id: 'resp-2', path: '/css/responsive/2' },
  { id: 'resp-3', path: '/css/responsive/3' },
  { id: 'pos-1', path: '/css/position/1' },
  { id: 'pos-2', path: '/css/position/2' },
];

export const jsLessonRoutes: { id: string; path: string }[] = [
  { id: 'js-1', path: '/js/1' },
  { id: 'js-2', path: '/js/2' },
  { id: 'js-3', path: '/js/3' },
  { id: 'js-4', path: '/js/4' },
  { id: 'js-5', path: '/js/5' },
  { id: 'js-6', path: '/js/6' },
  { id: 'js-7', path: '/js/7' },
  { id: 'js-8', path: '/js/8' },
  { id: 'js-9', path: '/js/9' },
  { id: 'js-10', path: '/js/10' },
  { id: 'js-11', path: '/js/11' },
  { id: 'js-12', path: '/js/12' },
  { id: 'adv-js-1', path: '/js/advanced/1' },
  { id: 'adv-js-2', path: '/js/advanced/2' },
  { id: 'adv-js-3', path: '/js/advanced/3' },
  { id: 'adv-js-4', path: '/js/advanced/4' },
  { id: 'adv-js-5', path: '/js/advanced/5' },
  { id: 'adv-js-6', path: '/js/advanced/6' },
  { id: 'adv-js-7', path: '/js/advanced/7' },
  { id: 'adv-js-8', path: '/js/advanced/8' },
  { id: 'adv-js-9', path: '/js/advanced/9' },
  { id: 'adv-js-10', path: '/js/advanced/10' },
  { id: 'adv-js-11', path: '/js/advanced/11' },
  { id: 'adv-js-12', path: '/js/advanced/12' },
];

interface LessonLockState {
  lockedLessons: string[];
  isLocked: (lessonId: string) => boolean;
  refreshLocks: () => void;
  /** Returns the first unlocked lesson route for a track, or null if all locked */
  getFirstUnlockedRoute: (track: 'css' | 'js') => string | null;
  /** Returns true if every lesson in the track is locked */
  isTrackFullyLocked: (track: 'css' | 'js') => boolean;
}

const LessonLockContext = createContext<LessonLockState>({
  lockedLessons: [],
  isLocked: () => false,
  refreshLocks: () => {},
  getFirstUnlockedRoute: () => null,
  isTrackFullyLocked: () => false,
});

export const useLessonLock = () => useContext(LessonLockContext);

const FORCE_REMOTE_API_IN_LOCAL =
  import.meta.env.VITE_USE_REMOTE_API_IN_LOCAL === 'true';

const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

const useLocalFallback = isLocalHost && !FORCE_REMOTE_API_IN_LOCAL;

export function LessonLockProvider({ children }: { children: ReactNode }) {
  const [lockedLessons, setLockedLessons] = useState<string[]>([]);
  const { user } = useAuth();

  const isBypassUser =
    user?.role === 'admin' ||
    user?.username?.trim().toLowerCase() === 'ghaith' ||
    user?.name?.trim().toLowerCase() === 'ghaith';

  const fetchLocks = useCallback(async () => {
    try {
      if (useLocalFallback) {
        const raw = localStorage.getItem('ta3allam_locked_lessons');
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
    (lessonId: string) => {
      if (isBypassUser) return false;
      return lockedLessons.includes(lessonId);
    },
    [isBypassUser, lockedLessons],
  );

  const getFirstUnlockedRoute = useCallback(
    (track: 'css' | 'js'): string | null => {
      const routes = track === 'css' ? cssLessonRoutes : jsLessonRoutes;
      if (isBypassUser) return routes[0]?.path ?? null;
      const found = routes.find((r) => !lockedLessons.includes(r.id));
      return found ? found.path : null;
    },
    [isBypassUser, lockedLessons],
  );

  const isTrackFullyLocked = useCallback(
    (track: 'css' | 'js'): boolean => {
      if (isBypassUser) return false;
      const routes = track === 'css' ? cssLessonRoutes : jsLessonRoutes;
      return routes.every((r) => lockedLessons.includes(r.id));
    },
    [isBypassUser, lockedLessons],
  );

  return (
    <LessonLockContext.Provider
      value={{
        lockedLessons,
        isLocked,
        refreshLocks: fetchLocks,
        getFirstUnlockedRoute,
        isTrackFullyLocked,
      }}
    >
      {children}
    </LessonLockContext.Provider>
  );
}
