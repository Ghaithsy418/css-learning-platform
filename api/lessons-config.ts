import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';
import { sendNotificationToRole } from './_lib/notifications';
import {
  getRedisClient,
  getRedisConfigurationErrorMessage,
} from './_lib/redis';

const LOCKED_KEY = 'config:locked_lessons';
const lessonNotificationMeta: Record<string, { label: string; link: string }> =
  {
    'grid-1': { label: 'الشبكة الأساسية', link: '/css/grid/1' },
    'grid-2': { label: 'أعمدة مختلطة', link: '/css/grid/2' },
    'grid-3': { label: 'التمدد في Grid', link: '/css/grid/3' },
    'flex-1': { label: 'المحاذاة الأساسية', link: '/css/flexbox/1' },
    'flex-2': { label: 'الاتجاه والالتفاف', link: '/css/flexbox/2' },
    'flex-3': { label: 'التمدد في Flexbox', link: '/css/flexbox/3' },
    'shadow-1': { label: 'الظلال', link: '/css/shadows/1' },
    'units-1': { label: 'الوحدات', link: '/css/units/1' },
    'vars-1': { label: 'المتغيرات', link: '/css/variables/1' },
    'resp-1': { label: 'التجاوب', link: '/css/responsive/1' },
    'resp-2': { label: 'نصوص مرنة', link: '/css/responsive/2' },
    'resp-3': { label: 'تغيير التخطيط', link: '/css/responsive/3' },
    'pos-1': { label: 'التموضع المطلق', link: '/css/position/1' },
    'pos-2': { label: 'التثبيت', link: '/css/position/2' },
    'js-1': { label: 'المتغيرات وأنواع البيانات', link: '/js/1' },
    'js-2': { label: 'العمليات والمعاملات', link: '/js/2' },
    'js-3': { label: 'الجمل الشرطية', link: '/js/3' },
    'js-4': { label: 'الحلقات التكرارية', link: '/js/4' },
    'js-5': { label: 'الدوال', link: '/js/5' },
    'js-6': { label: 'المصفوفات', link: '/js/6' },
    'js-7': { label: 'الكائنات', link: '/js/7' },
    'js-8': { label: 'DOM والعناصر', link: '/js/8' },
    'js-9': { label: 'الأحداث', link: '/js/9' },
    'js-10': { label: 'النصوص', link: '/js/10' },
    'js-11': { label: 'دوال المصفوفات', link: '/js/11' },
    'js-12': { label: 'تصحيح الأخطاء', link: '/js/12' },
    'adv-js-1': { label: 'محرك JavaScript', link: '/js/advanced/1' },
    'adv-js-2': { label: 'بيئة المتصفح', link: '/js/advanced/2' },
    'adv-js-3': { label: 'الدوال المغلقة', link: '/js/advanced/3' },
    'adv-js-4': { label: 'أحداث DOM', link: '/js/advanced/4' },
    'adv-js-5': { label: 'النماذج الوراثية', link: '/js/advanced/5' },
    'adv-js-6': { label: 'فئات ES6', link: '/js/advanced/6' },
    'adv-js-7': { label: 'حلقة الأحداث', link: '/js/advanced/7' },
    'adv-js-8': { label: 'Promises و Fetch', link: '/js/advanced/8' },
    'adv-js-9': { label: 'Async Await', link: '/js/advanced/9' },
    'adv-js-10': { label: 'التخزين المحلي', link: '/js/advanced/10' },
    'adv-js-11': { label: 'وحدات ES6', link: '/js/advanced/11' },
    'adv-js-12': { label: 'المشروع النهائي', link: '/js/advanced/12' },
  };

interface UserRecord {
  id: number;
  username: string;
  name: string;
  role: string;
}

function verifyAdmin(adminId: string): boolean {
  try {
    const usersPath = path.join(process.cwd(), 'public', 'users.json');
    const usersData: UserRecord[] = JSON.parse(
      fs.readFileSync(usersPath, 'utf-8'),
    );
    return usersData.some(
      (u) => String(u.id) === adminId && u.role === 'admin',
    );
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const redis = getRedisClient();
  if (!redis) {
    return res.status(503).json({
      error: getRedisConfigurationErrorMessage(),
    });
  }

  try {
    /* ── GET /api/lessons-config — get locked lesson IDs ── */
    if (req.method === 'GET') {
      const locked = await redis.smembers(LOCKED_KEY);
      return res.json({ locked: locked ?? [] });
    }

    /* ── POST /api/lessons-config — lock or unlock a lesson (admin only) ── */
    if (req.method === 'POST') {
      const { adminId, lessonId, action } = req.body as {
        adminId: string;
        lessonId: string;
        action: 'lock' | 'unlock';
      };

      if (!adminId || !lessonId || !action) {
        return res
          .status(400)
          .json({ error: 'adminId, lessonId, and action required' });
      }

      if (!verifyAdmin(adminId)) {
        return res.status(403).json({ error: 'Admin access required' });
      }

      if (action === 'lock') {
        await redis.sadd(LOCKED_KEY, lessonId);
      } else {
        await redis.srem(LOCKED_KEY, lessonId);

        const lessonMeta = lessonNotificationMeta[lessonId] ?? {
          label: lessonId,
          link: '/',
        };

        try {
          await sendNotificationToRole(redis, 'student', {
            title: 'تم فتح درس جديد',
            body: `يمكنك الآن دخول درس ${lessonMeta.label}`,
            link: lessonMeta.link,
            data: {
              eventType: 'lesson-unlocked',
              lessonId,
            },
          });
        } catch (notificationError) {
          console.error('Lesson unlock notification error:', notificationError);
        }
      }

      const locked = await redis.smembers(LOCKED_KEY);
      return res.json({ locked: locked ?? [] });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Lessons-config API error:', err);
    if (err?.message?.includes('permission') || err?.code === 403) {
      return res.status(503).json({ error: 'Redis auth failed' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
