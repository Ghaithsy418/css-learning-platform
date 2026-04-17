import { Navigate } from 'react-router-dom';
import { useLessonLock } from './LessonLockContext';

/**
 * Replaces the static <Navigate to="/css/grid/1" /> or <Navigate to="/js/1" />.
 * Redirects to the first unlocked lesson in the track,
 * or to "/" if all are locked (TrackGuard will handle the toast).
 */
export default function SmartIndexRedirect({ track }: { track: 'css' | 'js' }) {
  const { getFirstUnlockedRoute, isTrackFullyLocked, isLocksLoading } =
    useLessonLock();

  if (isLocksLoading) {
    return null;
  }

  if (isTrackFullyLocked(track)) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const firstUnlocked = getFirstUnlockedRoute(track);
  return (
    <Navigate
      to={firstUnlocked ?? '/'}
      replace
    />
  );
}
