import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { useLessonLock } from '../features/lessonLock/LessonLockContext';
import type {
  HomeworkReaction,
  HomeworkSubmission,
  HomeworkTeacherMessage,
  UserProgress,
} from '../types/progress';

/* ── Lesson name mapping ── */
const lessonNames: Record<string, string> = {
  'grid-1': 'Grid: الشبكة الأساسية',
  'grid-2': 'Grid: أعمدة مختلطة',
  'grid-3': 'Grid: التمدد (Spanning)',
  'flex-1': 'Flexbox: المحاذاة',
  'flex-2': 'Flexbox: الاتجاه والالتفاف',
  'flex-3': 'Flexbox: التمدد (Grow)',
  'shadow-1': 'الظلال (Shadows)',
  'units-1': 'الوحدات (Units)',
  'vars-1': 'المتغيرات (Variables)',
  'resp-1': 'التجاوب (Responsive)',
  'resp-2': 'نصوص مرنة (clamp)',
  'resp-3': 'تغيير التخطيط',
  'pos-1': 'التموضع المطلق',
  'pos-2': 'التثبيت (Sticky)',
  'js-1': 'JS: المتغيرات وأنواع البيانات',
  'js-2': 'JS: العمليات والمعاملات',
  'js-3': 'JS: الجمل الشرطية',
  'js-4': 'JS: الحلقات التكرارية',
  'js-5': 'JS: الدوال (Functions)',
  'js-6': 'JS: المصفوفات (Arrays)',
  'js-7': 'JS: الكائنات (Objects)',
  'js-8': 'JS: DOM والعناصر',
  'js-9': 'JS: الأحداث (Events)',
  'js-10': 'JS: النصوص (Strings)',
  'js-11': 'JS: دوال المصفوفات',
  'js-12': 'JS: تصحيح الأخطاء',
};

const exerciseNames: Record<string, string> = {
  ex1: 'التمرين الأول',
  ex2: 'التمرين الثاني',
  ex3: 'التمرين الثالث',
  ex4: 'التمرين الرابع',
  quiz: 'الاختبار',
  'free-code': 'تمرين الكتابة',
};

const TRACKED_LESSON_IDS = new Set(Object.keys(lessonNames));
const HOMEWORK_LESSON_ID = 'js-homework';
const HOMEWORK_EXERCISE_ID = 'submission-history';

function getTrackedLessonEntries(progress: UserProgress) {
  return Object.entries(progress.lessonResults ?? {}).filter(([lessonId]) =>
    TRACKED_LESSON_IDS.has(lessonId),
  );
}

function getHomeworkSubmissionsForStudent(progress: UserProgress) {
  return (
    progress.lessonResults?.[HOMEWORK_LESSON_ID]?.exercises?.[
      HOMEWORK_EXERCISE_ID
    ]?.submissions ?? []
  );
}

function createReaction(
  emoji: string,
  reactorId: number,
  reactorName: string,
): HomeworkReaction {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    emoji,
    reactorId,
    reactorName,
    createdAt: new Date().toISOString(),
  };
}

function mapHomeworkSubmissions(
  progress: UserProgress,
  mapper: (submission: HomeworkSubmission) => HomeworkSubmission,
): UserProgress {
  const lesson = progress.lessonResults?.[HOMEWORK_LESSON_ID];
  const exercise = lesson?.exercises?.[HOMEWORK_EXERCISE_ID];
  if (!exercise) return progress;

  return {
    ...progress,
    lessonResults: {
      ...progress.lessonResults,
      [HOMEWORK_LESSON_ID]: {
        ...lesson,
        exercises: {
          ...lesson.exercises,
          [HOMEWORK_EXERCISE_ID]: {
            ...exercise,
            submissions: (exercise.submissions ?? []).map(mapper),
            completedAt: new Date().toISOString(),
          },
        },
      },
    },
    lastUpdated: new Date().toISOString(),
  };
}

function addTeacherMessageLocal(
  progress: UserProgress,
  submissionId: string,
  teacherId: number,
  teacherName: string,
  message: string,
): UserProgress {
  const teacherMessage: HomeworkTeacherMessage = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    teacherId,
    teacherName,
    message,
    createdAt: new Date().toISOString(),
    reactions: [],
  };

  return mapHomeworkSubmissions(progress, (submission) =>
    submission.id === submissionId
      ? {
          ...submission,
          teacherMessages: [
            ...(submission.teacherMessages ?? []),
            teacherMessage,
          ],
        }
      : submission,
  );
}

function addSubmissionReactionLocal(
  progress: UserProgress,
  submissionId: string,
  emoji: string,
  reactorId: number,
  reactorName: string,
): UserProgress {
  const reaction = createReaction(emoji, reactorId, reactorName);

  return mapHomeworkSubmissions(progress, (submission) =>
    submission.id === submissionId
      ? {
          ...submission,
          reactions: [...(submission.reactions ?? []), reaction],
        }
      : submission,
  );
}

function addTeacherMessageReactionLocal(
  progress: UserProgress,
  submissionId: string,
  messageId: string,
  emoji: string,
  reactorId: number,
  reactorName: string,
): UserProgress {
  const reaction = createReaction(emoji, reactorId, reactorName);

  return mapHomeworkSubmissions(progress, (submission) =>
    submission.id === submissionId
      ? {
          ...submission,
          teacherMessages: (submission.teacherMessages ?? []).map((message) =>
            message.id === messageId
              ? {
                  ...message,
                  reactions: [...(message.reactions ?? []), reaction],
                }
              : message,
          ),
        }
      : submission,
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refreshLocks: refreshContextLocks } = useLessonLock();
  const [allProgress, setAllProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'students' | 'lessons' | 'homework'
  >('students');
  const [lockedLessons, setLockedLessons] = useState<string[]>([]);
  const [lockLoading, setLockLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/', { replace: true });
      return;
    }

    const fetchProgress = async () => {
      try {
        const isLocal =
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1';

        if (isLocal) {
          // Local dev — read from localStorage, cross-ref with users.json
          const stored = JSON.parse(
            localStorage.getItem('ta3allam_progress') ?? '{}',
          );
          // Fetch users.json to get all student names
          const usersRes = await fetch('/users.json');
          const users: {
            id: number;
            name: string;
            role: string;
          }[] = usersRes.ok ? await usersRes.json() : [];
          const students = users.filter((u) => u.role === 'student');

          const list = students.map((u) => {
            const existing = stored[u.id];
            return {
              userId: u.id,
              userName: u.name,
              lessonResults: existing?.lessonResults ?? {},
              totalPoints: existing?.totalPoints ?? 0,
              lastUpdated: existing?.lastUpdated ?? '',
            };
          });
          setAllProgress(list);
        } else {
          const res = await fetch(`/api/progress-all?adminId=${user.id}`);
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.error || `HTTP ${res.status}`);
          }
          const data = await res.json();
          setAllProgress(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'خطأ غير متوقع');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();

    // Fetch lesson locks
    const fetchLocks = async () => {
      try {
        const isLocal =
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1';
        if (isLocal) {
          const stored = JSON.parse(
            localStorage.getItem('ta3allam_locked_lessons') ?? '[]',
          );
          setLockedLessons(stored);
        } else {
          const res = await fetch('/api/lessons-config');
          if (res.ok) {
            const data = await res.json();
            setLockedLessons(data.locked ?? []);
          }
        }
      } catch {
        /* ignore — treat as all unlocked */
      }
    };
    fetchLocks();
  }, [user, navigate]);

  const toggleLessonLock = async (lessonId: string) => {
    if (!user) return;
    const isLocked = lockedLessons.includes(lessonId);
    const action = isLocked ? 'unlock' : 'lock';
    setLockLoading(lessonId);

    try {
      const isLocal =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      if (isLocal) {
        const newLocked = isLocked
          ? lockedLessons.filter((l) => l !== lessonId)
          : [...lockedLessons, lessonId];
        setLockedLessons(newLocked);
        localStorage.setItem(
          'ta3allam_locked_lessons',
          JSON.stringify(newLocked),
        );
      } else {
        const res = await fetch('/api/lessons-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            adminId: String(user.id),
            lessonId,
            action,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setLockedLessons(data.locked ?? []);
        }
      }
      // Sync the app-wide lock context so all guards update immediately
      refreshContextLocks();
    } catch {
      /* ignore */
    } finally {
      setLockLoading(null);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0a0a14' }}
        dir="rtl"
      >
        <div className="w-10 h-10 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  const totalLessons = Object.keys(lessonNames).length;
  const homeworkSubmissions = allProgress
    .flatMap((student) =>
      getHomeworkSubmissionsForStudent(student).map((submission) => ({
        studentId: student.userId,
        studentName: student.userName,
        submission,
      })),
    )
    .sort(
      (left, right) =>
        new Date(right.submission.submittedAt).getTime() -
        new Date(left.submission.submittedAt).getTime(),
    );

  const applyHomeworkAction = async (
    studentId: number,
    action:
      | {
          type: 'homework-message';
          submissionId: string;
          message: string;
        }
      | {
          type: 'homework-reaction';
          submissionId: string;
          emoji: string;
        }
      | {
          type: 'homework-message-reaction';
          submissionId: string;
          messageId: string;
          emoji: string;
        },
  ) => {
    if (!user) return;

    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isLocal) {
      const stored = JSON.parse(
        localStorage.getItem('ta3allam_progress') ?? '{}',
      );
      const existing = stored[studentId];
      if (!existing) return;

      let updated: UserProgress = existing;
      if (action.type === 'homework-message') {
        updated = addTeacherMessageLocal(
          existing,
          action.submissionId,
          user.id,
          user.name,
          action.message,
        );
      }
      if (action.type === 'homework-reaction') {
        updated = addSubmissionReactionLocal(
          existing,
          action.submissionId,
          action.emoji,
          user.id,
          user.name,
        );
      }
      if (action.type === 'homework-message-reaction') {
        updated = addTeacherMessageReactionLocal(
          existing,
          action.submissionId,
          action.messageId,
          action.emoji,
          user.id,
          user.name,
        );
      }

      stored[studentId] = updated;
      localStorage.setItem('ta3allam_progress', JSON.stringify(stored));
      setAllProgress((prev) =>
        prev.map((entry) =>
          entry.userId === studentId
            ? {
                ...entry,
                lessonResults: updated.lessonResults,
                totalPoints: updated.totalPoints,
                lastUpdated: updated.lastUpdated,
              }
            : entry,
        ),
      );
      return;
    }

    const body =
      action.type === 'homework-message'
        ? {
            type: 'homework-message' as const,
            userId: studentId,
            submissionId: action.submissionId,
            teacherId: user.id,
            teacherName: user.name,
            message: action.message,
          }
        : action.type === 'homework-reaction'
          ? {
              type: 'homework-reaction' as const,
              userId: studentId,
              submissionId: action.submissionId,
              reactorId: user.id,
              reactorName: user.name,
              emoji: action.emoji,
            }
          : {
              type: 'homework-message-reaction' as const,
              userId: studentId,
              submissionId: action.submissionId,
              messageId: action.messageId,
              reactorId: user.id,
              reactorName: user.name,
              emoji: action.emoji,
            };

    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Failed to update homework interaction');
    }
    const updated: UserProgress = await response.json();
    setAllProgress((prev) =>
      prev.map((entry) =>
        entry.userId === studentId
          ? {
              ...entry,
              lessonResults: updated.lessonResults,
              totalPoints: updated.totalPoints,
              lastUpdated: updated.lastUpdated,
            }
          : entry,
      ),
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: '#0a0a14' }}
      dir="rtl"
    >
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              📊 لوحة تحكم المعلم
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              متابعة تقدم الطلاب ونتائجهم
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all"
          >
            🏠 الرئيسية
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-white/10 pb-0">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === 'students'
                ? 'bg-white/10 text-white border-b-2 border-indigo-500'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            👥 متابعة الطلاب
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === 'lessons'
                ? 'bg-white/10 text-white border-b-2 border-amber-500'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            🔐 إدارة الدروس
          </button>
        </div>
        <button
          onClick={() => setActiveTab('homework')}
          className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
            activeTab === 'homework'
              ? 'bg-white/10 text-white border-b-2 border-emerald-500'
              : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          📨 الواجبات البرمجية
        </button>

        {/* ═══ LESSONS TAB ═══ */}
        {activeTab === 'lessons' && (
          <LessonManager
            lockedLessons={lockedLessons}
            lockLoading={lockLoading}
            onToggle={toggleLessonLock}
          />
        )}

        {activeTab === 'homework' && (
          <HomeworkTab
            submissions={homeworkSubmissions}
            onSendTeacherMessage={(studentId, submissionId, message) =>
              applyHomeworkAction(studentId, {
                type: 'homework-message',
                submissionId,
                message,
              })
            }
            onReactToHomework={(studentId, submissionId, emoji) =>
              applyHomeworkAction(studentId, {
                type: 'homework-reaction',
                submissionId,
                emoji,
              })
            }
            onReactToTeacherMessage={(
              studentId,
              submissionId,
              messageId,
              emoji,
            ) =>
              applyHomeworkAction(studentId, {
                type: 'homework-message-reaction',
                submissionId,
                messageId,
                emoji,
              })
            }
          />
        )}

        {/* ═══ STUDENTS TAB ═══ */}
        {activeTab === 'students' && allProgress.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-lg">لا توجد بيانات تقدم بعد</p>
            <p className="text-sm mt-2">
              سيظهر تقدم الطلاب هنا بعد أن يبدأوا حل التمارين
            </p>
          </div>
        ) : activeTab === 'students' ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard
                label="عدد الطلاب"
                value={allProgress.length}
                icon="👥"
                color="indigo"
              />
              <SummaryCard
                label="إجمالي النقاط"
                value={allProgress.reduce((s, p) => s + p.totalPoints, 0)}
                icon="⭐"
                color="amber"
              />
              <SummaryCard
                label="متوسط الدروس المكتملة"
                value={
                  allProgress.length > 0
                    ? Math.round(
                        allProgress.reduce(
                          (s, p) => s + getTrackedLessonEntries(p).length,
                          0,
                        ) / allProgress.length,
                      )
                    : 0
                }
                suffix={` / ${totalLessons}`}
                icon="📚"
                color="emerald"
              />
            </div>

            {/* Students Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="text-right px-5 py-3 font-medium">الطالب</th>
                    <th className="text-center px-5 py-3 font-medium">
                      النقاط
                    </th>
                    <th className="text-center px-5 py-3 font-medium">
                      الدروس
                    </th>
                    <th className="text-center px-5 py-3 font-medium">
                      نسبة الإنجاز
                    </th>
                    <th className="text-center px-5 py-3 font-medium">
                      آخر نشاط
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {allProgress
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .map((student) => {
                      const lessonsCompleted =
                        getTrackedLessonEntries(student).length;
                      const pct = Math.round(
                        (lessonsCompleted / totalLessons) * 100,
                      );
                      const isExpanded = expandedUser === student.userId;

                      return (
                        <StudentRow
                          key={student.userId}
                          student={student}
                          lessonsCompleted={lessonsCompleted}
                          totalLessons={totalLessons}
                          pct={pct}
                          isExpanded={isExpanded}
                          onToggle={() =>
                            setExpandedUser(isExpanded ? null : student.userId)
                          }
                          expandedLesson={expandedLesson}
                          onToggleLesson={(lid) =>
                            setExpandedLesson(
                              expandedLesson === lid ? null : lid,
                            )
                          }
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}

/* ── Summary Card ── */
function SummaryCard({
  label,
  value,
  icon,
  color,
  suffix = '',
}: {
  label: string;
  value: number;
  icon: string;
  color: 'indigo' | 'amber' | 'emerald';
  suffix?: string;
}) {
  const bgMap = {
    indigo: 'bg-indigo-500/10 border-indigo-500/20',
    amber: 'bg-amber-500/10 border-amber-500/20',
    emerald: 'bg-emerald-500/10 border-emerald-500/20',
  };
  const textMap = {
    indigo: 'text-indigo-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
  };

  return (
    <div className={`${bgMap[color]} border rounded-xl p-5`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`text-3xl font-bold ${textMap[color]}`}>
          {value}
          {suffix && <span className="text-lg text-gray-500">{suffix}</span>}
        </span>
      </div>
      <p className="text-gray-400 text-xs mt-2">{label}</p>
    </div>
  );
}

/* ── Student Row ── */
function StudentRow({
  student,
  lessonsCompleted,
  totalLessons,
  pct,
  isExpanded,
  onToggle,
  expandedLesson,
  onToggleLesson,
}: {
  student: UserProgress;
  lessonsCompleted: number;
  totalLessons: number;
  pct: number;
  isExpanded: boolean;
  onToggle: () => void;
  expandedLesson: string | null;
  onToggleLesson: (lid: string) => void;
}) {
  const trackedLessons = getTrackedLessonEntries(student);
  const lastActive = student.lastUpdated
    ? new Date(student.lastUpdated).toLocaleDateString('ar-SA', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  return (
    <>
      <tr
        className={`border-b border-white/5 cursor-pointer transition-colors ${isExpanded ? 'bg-white/5' : 'hover:bg-white/3'}`}
        onClick={onToggle}
      >
        <td className="px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-sm font-bold text-indigo-300">
              {(student.userName || '?').charAt(0)}
            </div>
            <span className="text-white font-medium">
              {student.userName || 'مستخدم'}
            </span>
          </div>
        </td>
        <td className="text-center px-5 py-3">
          <span className="text-amber-400 font-bold">
            {student.totalPoints}
          </span>
        </td>
        <td className="text-center px-5 py-3 text-gray-300">
          {lessonsCompleted} / {totalLessons}
        </td>
        <td className="text-center px-5 py-3">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  pct >= 70
                    ? 'bg-emerald-500'
                    : pct >= 40
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs">{pct}%</span>
          </div>
        </td>
        <td className="text-center px-5 py-3 text-gray-500 text-xs">
          {lastActive}
        </td>
        <td className="px-5 py-3 text-gray-500">
          <span
            className={`transition-transform inline-block ${isExpanded ? 'rotate-90' : ''}`}
          >
            ◂
          </span>
        </td>
      </tr>

      {/* Expanded — lesson details */}
      {isExpanded && (
        <tr>
          <td
            colSpan={6}
            className="px-5 py-4 bg-white/2"
          >
            <div className="space-y-2 max-w-3xl mr-10">
              {trackedLessons.length === 0 ? (
                <p className="text-gray-500 text-sm">لم يبدأ أي درس بعد</p>
              ) : (
                trackedLessons.map(([lessonId, lesson]) => {
                  const lessonLabel = lessonNames[lessonId] || lessonId;
                  const lessonPct =
                    lesson.maxTotalScore > 0
                      ? Math.round(
                          (lesson.totalScore / lesson.maxTotalScore) * 100,
                        )
                      : 0;
                  const isLessonExpanded =
                    expandedLesson === `${student.userId}-${lessonId}`;
                  const wrongExercises = Object.entries(
                    lesson.exercises,
                  ).filter(([, ex]) => ex.wrong && ex.wrong.length > 0);

                  return (
                    <div
                      key={lessonId}
                      className="bg-white/5 rounded-lg border border-white/5"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLesson(`${student.userId}-${lessonId}`);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-white/5 transition-colors rounded-lg"
                      >
                        <span className="text-gray-200 font-medium">
                          {lessonLabel}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-amber-400 text-xs font-bold">
                            {lesson.totalScore} / {lesson.maxTotalScore}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              lessonPct >= 80
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : lessonPct >= 50
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {lessonPct}%
                          </span>
                          {wrongExercises.length > 0 && (
                            <span className="text-red-400 text-xs">
                              ⚠️ {wrongExercises.length} أخطاء
                            </span>
                          )}
                          <span
                            className={`text-gray-500 transition-transform inline-block text-xs ${isLessonExpanded ? 'rotate-90' : ''}`}
                          >
                            ◂
                          </span>
                        </div>
                      </button>

                      {isLessonExpanded && (
                        <div className="px-4 pb-3 space-y-1.5 border-t border-white/5 pt-2">
                          {Object.entries(lesson.exercises).map(
                            ([exId, ex]) => (
                              <div
                                key={exId}
                                className="rounded bg-white/3 overflow-hidden"
                              >
                                <div className="flex items-center justify-between text-xs py-1.5 px-3">
                                  <span className="text-gray-400">
                                    {exerciseNames[exId] || exId}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <span
                                      className={`font-bold ${ex.score === ex.maxScore ? 'text-emerald-400' : 'text-amber-400'}`}
                                    >
                                      {ex.score} / {ex.maxScore}
                                    </span>
                                    {ex.wrong && ex.wrong.length > 0 && (
                                      <span className="text-red-400/80">
                                        ❌{' '}
                                        {ex.wrong
                                          .map((w) => `"${w}"`)
                                          .join('، ')}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {/* Show exact answers */}
                                {ex.answers &&
                                  Object.keys(ex.answers).length > 0 && (
                                    <div className="px-3 pb-2 space-y-1">
                                      {Object.entries(ex.answers).map(
                                        ([key, val]) => (
                                          <div
                                            key={key}
                                            className="flex items-center gap-2 text-[11px] py-0.5 px-2 rounded bg-white/3"
                                          >
                                            <span className="text-gray-600 font-mono shrink-0">
                                              {key}:
                                            </span>
                                            <span className="text-gray-300 font-mono font-medium">
                                              {val}
                                            </span>
                                            {ex.wrong?.includes(key) ? (
                                              <span className="text-red-400 text-[10px]">
                                                ✗
                                              </span>
                                            ) : (
                                              <span className="text-emerald-400 text-[10px]">
                                                ✓
                                              </span>
                                            )}
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  )}
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function HomeworkTab({
  submissions,
  onSendTeacherMessage,
  onReactToHomework,
  onReactToTeacherMessage,
}: {
  submissions: {
    studentId: number;
    studentName: string;
    submission: HomeworkSubmission;
  }[];
  onSendTeacherMessage: (
    studentId: number,
    submissionId: string,
    message: string,
  ) => Promise<void>;
  onReactToHomework: (
    studentId: number,
    submissionId: string,
    emoji: string,
  ) => Promise<void>;
  onReactToTeacherMessage: (
    studentId: number,
    submissionId: string,
    messageId: string,
    emoji: string,
  ) => Promise<void>;
}) {
  const [messageDrafts, setMessageDrafts] = useState<Record<string, string>>(
    {},
  );
  const reactionOptions = ['❤️', '👏', '🔥', '✅', '💡'];

  const countByEmoji = (items: { emoji: string }[] = []) => {
    return items.reduce<Record<string, number>>((acc, item) => {
      acc[item.emoji] = (acc[item.emoji] ?? 0) + 1;
      return acc;
    }, {});
  };

  const handleSendMessage = async (studentId: number, submissionId: string) => {
    const draft = messageDrafts[submissionId]?.trim();
    if (!draft) return;

    try {
      await onSendTeacherMessage(studentId, submissionId, draft);
      setMessageDrafts((prev) => ({ ...prev, [submissionId]: '' }));
    } catch {
      /* ignore transient update errors */
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-4xl mb-4">📭</p>
        <p className="text-lg">لا توجد واجبات مرسلة بعد</p>
        <p className="text-sm mt-2">
          ستظهر هنا كل الإرسالات البرمجية من الطلاب
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map(({ studentId, studentName, submission }) => (
        <article
          key={submission.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-right">
              <h3 className="text-lg font-bold text-white">
                {submission.title}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                بواسطة {studentName} · رقم الطالب {studentId}
              </p>
            </div>
            <span className="self-start rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
              {new Date(submission.submittedAt).toLocaleString('ar-SA')}
            </span>
          </div>

          <pre
            dir="ltr"
            className="mt-4 overflow-x-auto rounded-xl bg-gray-950 p-4 text-sm leading-6 text-gray-100"
          >
            {submission.code}
          </pre>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-right text-xs font-bold text-gray-400">
              التفاعل على الواجب
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {reactionOptions.map((emoji) => (
                <button
                  key={`${submission.id}-${emoji}`}
                  onClick={() => {
                    void onReactToHomework(studentId, submission.id, emoji);
                  }}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white hover:bg-white/10"
                >
                  {emoji}
                </button>
              ))}
            </div>
            {submission.reactions && submission.reactions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(countByEmoji(submission.reactions)).map(
                  ([emoji, count]) => (
                    <span
                      key={`${submission.id}-reaction-${emoji}`}
                      className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-200"
                    >
                      {emoji} {count}
                    </span>
                  ),
                )}
              </div>
            )}
          </div>

          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-right text-sm font-bold text-emerald-200">
              رسالة مخصصة لهذا الواجب
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <textarea
                value={messageDrafts[submission.id] ?? ''}
                onChange={(event) =>
                  setMessageDrafts((prev) => ({
                    ...prev,
                    [submission.id]: event.target.value,
                  }))
                }
                rows={3}
                placeholder="اكتب رسالة تشجيعية أو ملاحظة مفيدة للطالب"
                className="w-full rounded-lg border border-emerald-400/30 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-emerald-400"
              />
              <button
                onClick={() => handleSendMessage(studentId, submission.id)}
                className="self-start rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-black hover:bg-emerald-400"
              >
                إرسال رسالة للطالب
              </button>
            </div>
          </div>

          {submission.teacherMessages &&
            submission.teacherMessages.length > 0 && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-right text-xs font-bold text-gray-400">
                  سجل رسائل المعلم
                </p>
                <div className="mt-3 space-y-3">
                  {submission.teacherMessages.map((message) => (
                    <div
                      key={message.id}
                      className="rounded-lg border border-white/10 bg-black/20 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleString('ar-SA')}
                        </span>
                        <p className="text-sm font-bold text-emerald-300">
                          {message.teacherName}
                        </p>
                      </div>
                      <p className="mt-2 text-right text-sm text-gray-200">
                        {message.message}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {reactionOptions.map((emoji) => (
                          <button
                            key={`${message.id}-${emoji}`}
                            onClick={() => {
                              void onReactToTeacherMessage(
                                studentId,
                                submission.id,
                                message.id,
                                emoji,
                              );
                            }}
                            className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200 hover:bg-emerald-500/20"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>

                      {message.reactions && message.reactions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {Object.entries(countByEmoji(message.reactions)).map(
                            ([emoji, count]) => (
                              <span
                                key={`${message.id}-reaction-${emoji}`}
                                className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-100"
                              >
                                {emoji} {count}
                              </span>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {submission.output && submission.output.length > 0 && (
            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-right text-xs font-bold text-gray-400">
                ناتج التجربة قبل الإرسال
              </p>
              <div className="space-y-1 font-mono text-xs">
                {submission.output.map((line, index) => (
                  <div
                    key={`${submission.id}-${index}`}
                    className="flex items-start gap-2 text-gray-200"
                  >
                    <span className="text-gray-500">•</span>
                    <span>{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

/* ── Lesson categories for the lock manager ── */
const lessonCategories: {
  title: string;
  emoji: string;
  color: string;
  lessons: { id: string; label: string }[];
}[] = [
  {
    title: 'CSS Grid',
    emoji: '📐',
    color: 'text-purple-400',
    lessons: [
      { id: 'grid-1', label: 'الشبكة الأساسية' },
      { id: 'grid-2', label: 'أعمدة مختلطة' },
      { id: 'grid-3', label: 'التمدد (Spanning)' },
    ],
  },
  {
    title: 'Flexbox',
    emoji: '📦',
    color: 'text-purple-400',
    lessons: [
      { id: 'flex-1', label: 'المحاذاة الأساسية' },
      { id: 'flex-2', label: 'الاتجاه والالتفاف' },
      { id: 'flex-3', label: 'التمدد (Grow)' },
    ],
  },
  {
    title: 'CSS متقدم',
    emoji: '🔧',
    color: 'text-purple-400',
    lessons: [
      { id: 'shadow-1', label: 'الظلال (Shadows)' },
      { id: 'units-1', label: 'الوحدات (Units)' },
      { id: 'vars-1', label: 'المتغيرات (Variables)' },
      { id: 'resp-1', label: 'التجاوب (Responsive)' },
      { id: 'resp-2', label: 'نصوص مرنة (clamp)' },
      { id: 'resp-3', label: 'تغيير التخطيط' },
      { id: 'pos-1', label: 'التموضع المطلق' },
      { id: 'pos-2', label: 'التثبيت (Sticky)' },
    ],
  },
  {
    title: 'JS الأساسيات',
    emoji: '🧱',
    color: 'text-amber-400',
    lessons: [
      { id: 'js-1', label: 'المتغيرات وأنواع البيانات' },
      { id: 'js-2', label: 'العمليات والمعاملات' },
      { id: 'js-3', label: 'الجمل الشرطية' },
      { id: 'js-4', label: 'الحلقات التكرارية' },
    ],
  },
  {
    title: 'JS البناء',
    emoji: '🏗️',
    color: 'text-amber-400',
    lessons: [
      { id: 'js-5', label: 'الدوال (Functions)' },
      { id: 'js-6', label: 'المصفوفات (Arrays)' },
      { id: 'js-7', label: 'الكائنات (Objects)' },
    ],
  },
  {
    title: 'JS التفاعل',
    emoji: '🌐',
    color: 'text-amber-400',
    lessons: [
      { id: 'js-8', label: 'DOM والعناصر' },
      { id: 'js-9', label: 'الأحداث (Events)' },
    ],
  },
  {
    title: 'JS المتقدم',
    emoji: '🚀',
    color: 'text-amber-400',
    lessons: [
      { id: 'js-10', label: 'النصوص (Strings)' },
      { id: 'js-11', label: 'دوال المصفوفات' },
      { id: 'js-12', label: 'تصحيح الأخطاء' },
    ],
  },
];

/* ── Lesson Manager ── */
function LessonManager({
  lockedLessons,
  lockLoading,
  onToggle,
}: {
  lockedLessons: string[];
  lockLoading: string | null;
  onToggle: (lessonId: string) => void;
}) {
  const totalLocked = lockedLessons.length;
  const totalAll = lessonCategories.reduce((s, c) => s + c.lessons.length, 0);

  return (
    <div className="space-y-4">
      {/* Lock summary */}
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>
          🔓 مفتوح:{' '}
          <strong className="text-emerald-400">{totalAll - totalLocked}</strong>
        </span>
        <span>
          🔒 مقفل: <strong className="text-red-400">{totalLocked}</strong>
        </span>
      </div>

      {lessonCategories.map((cat) => (
        <div
          key={cat.title}
          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
            <span>{cat.emoji}</span>
            <span className={`text-sm font-bold ${cat.color}`}>
              {cat.title}
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {cat.lessons.map((lesson) => {
              const isLocked = lockedLessons.includes(lesson.id);
              const isLoading = lockLoading === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${isLocked ? 'opacity-50' : ''}`}>
                      {isLocked ? '🔒' : '🔓'}
                    </span>
                    <span
                      className={`text-sm ${isLocked ? 'text-gray-600 line-through' : 'text-gray-300'}`}
                    >
                      {lesson.label}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono">
                      {lesson.id}
                    </span>
                  </div>
                  <button
                    onClick={() => onToggle(lesson.id)}
                    disabled={isLoading}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isLocked
                        ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/20'
                        : 'bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/20'
                    } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {isLoading ? '...' : isLocked ? '🔓 فتح' : '🔒 قفل'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
