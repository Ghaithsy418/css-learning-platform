import { type ReactNode, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLessonLock } from './LessonLockContext';

export default function LessonGuard({
  lessonId,
  children,
}: {
  lessonId: string;
  children: ReactNode;
}) {
  const { isLocked, getFirstUnlockedRoute } = useLessonLock();
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!isLocked(lessonId)) {
      hasRedirected.current = false;
      return;
    }
    if (hasRedirected.current) return;
    hasRedirected.current = true;

    // Determine which track this lesson belongs to
    const track: 'css' | 'js' = location.pathname.startsWith('/js')
      ? 'js'
      : 'css';
    const firstUnlocked = getFirstUnlockedRoute(track);

    if (firstUnlocked) {
      toast('🔒 هذا الدرس مقفل حاليًا — تم توجيهك لأول درس متاح', {
        style: {
          background: '#1e1e2e',
          color: '#e2e8f0',
          border: '1px solid rgba(255,255,255,0.1)',
          direction: 'rtl',
        },
        duration: 3000,
      });
      navigate(firstUnlocked, { replace: true });
    } else {
      toast('🔒 جميع الدروس مقفلة حاليًا', {
        style: {
          background: '#1e1e2e',
          color: '#e2e8f0',
          border: '1px solid rgba(255,255,255,0.1)',
          direction: 'rtl',
        },
        duration: 3000,
      });
      navigate('/', { replace: true });
    }
  }, [isLocked, lessonId, navigate, getFirstUnlockedRoute, location.pathname]);

  if (isLocked(lessonId)) {
    // Return null while redirecting
    return null;
  }

  return <>{children}</>;
}
