import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import type { LeaderboardEntry } from '../types/progress';

function isLocalMode() {
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );
}

function shouldExcludeUser(user: { username?: string; name: string }) {
  return (
    user.username?.trim().toLowerCase() === 'ghaith' ||
    user.name.trim().toLowerCase() === 'ghaith' ||
    user.name.trim() === 'غيث'
  );
}

export default function StudentLeaderboard() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (isLocalMode()) {
          const usersRes = await fetch('/users.json');
          const users: {
            id: number;
            username: string;
            name: string;
            role: string;
          }[] = usersRes.ok ? await usersRes.json() : [];
          const progressMap = JSON.parse(
            localStorage.getItem('ta3allam_progress') ?? '{}',
          ) as Record<string, { totalPoints?: number }>;

          const localEntries = users
            .filter(
              (entry) => entry.role === 'student' && !shouldExcludeUser(entry),
            )
            .map((entry) => ({
              userId: entry.id,
              userName: entry.name,
              totalPoints: progressMap[String(entry.id)]?.totalPoints ?? 0,
            }))
            .sort((left, right) => {
              if (right.totalPoints !== left.totalPoints) {
                return right.totalPoints - left.totalPoints;
              }
              return left.userName.localeCompare(right.userName, 'ar');
            })
            .map((entry, index) => ({
              ...entry,
              rank: index + 1,
            }));

          setEntries(localEntries);
          setIsLoading(false);
          return;
        }

        const res = await fetch('/api/leaderboard');
        if (!res.ok) {
          throw new Error('تعذر تحميل لوحة الصدارة حالياً');
        }

        const data: LeaderboardEntry[] = await res.json();
        setEntries(data);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'حدث خطأ أثناء تحميل لوحة الصدارة',
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const currentUserId = user?.id;
  const currentUserRank = useMemo(
    () => entries.find((entry) => entry.userId === currentUserId)?.rank ?? null,
    [entries, currentUserId],
  );

  return (
    <section className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
      <div className="text-right">
        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
          ترتيب الطلاب
        </span>
        <p className="mt-3 text-sm leading-7 text-gray-600">
          الترتيب يظهر بالأسماء فقط بدون تفاصيل إضافية. تم استبعاد غيث من
          اللوحة.
        </p>
      </div>

      {currentUserRank && (
        <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-right text-sm text-amber-800">
          ترتيبك الحالي: <strong>#{currentUserRank}</strong>
        </div>
      )}

      {isLoading ? (
        <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
          جارٍ تحميل لوحة الصدارة...
        </div>
      ) : error ? (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-right text-sm text-red-700">
          {error}
        </div>
      ) : entries.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
          لا توجد بيانات كافية لإظهار الترتيب بعد.
        </div>
      ) : (
        <div className="mt-5 space-y-2">
          {entries.map((entry) => {
            const isCurrentUser = entry.userId === currentUserId;

            return (
              <div
                key={entry.userId}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                  isCurrentUser
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 text-gray-700">
                  {isCurrentUser && (
                    <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                      أنت
                    </span>
                  )}
                  <span className="font-semibold">{entry.userName}</span>
                </div>
                <span className="text-base font-black text-gray-800">
                  #{entry.rank}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
