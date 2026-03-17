import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  listenForForegroundNotifications,
  registerForPushNotifications,
} from '../../firebase';
import { useAuth } from '../auth/AuthContext';

export default function NotificationManager() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    void registerForPushNotifications(user.id);

    let unsubscribe: (() => void) | undefined;

    void listenForForegroundNotifications((payload) => {
      const title = payload.notification?.title ?? 'إشعار جديد';
      const body = payload.notification?.body ?? '';
      toast(`${title}${body ? `: ${body}` : ''}`, {
        duration: 5000,
      });
    }).then((cleanup) => {
      unsubscribe = cleanup ?? undefined;
    });

    return () => {
      unsubscribe?.();
    };
  }, [user]);

  return null;
}
