import { useEffect, useRef, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLessonLock } from './LessonLockContext';

/**
 * Wraps a track layout. If every lesson in the track is locked,
 * redirects to home and shows a toast. If the index route lands
 * on a locked default lesson, redirects to the first unlocked one.
 */
export default function TrackGuard({
  track,
  children,
}: {
  track: 'css' | 'js';
  children: ReactNode;
}) {
  const { isTrackFullyLocked, getFirstUnlockedRoute, isLocksLoading } =
    useLessonLock();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  const fullyLocked = isTrackFullyLocked(track);

  useEffect(() => {
    if (isLocksLoading) return;

    if (!fullyLocked) {
      hasRedirected.current = false;
      return;
    }
    if (hasRedirected.current) return;
    hasRedirected.current = true;

    const label = track === 'css' ? 'CSS' : 'JavaScript';
    toast(`🔒 جميع دروس ${label} مقفلة حاليًا — تواصل مع المعلم`, {
      style: {
        background: '#1e1e2e',
        color: '#e2e8f0',
        border: '1px solid rgba(255,255,255,0.1)',
        direction: 'rtl',
      },
      duration: 4000,
    });
    navigate('/', { replace: true });
  }, [isLocksLoading, fullyLocked, navigate, track, getFirstUnlockedRoute]);

  if (isLocksLoading || fullyLocked) return null;

  return <>{children}</>;
}
