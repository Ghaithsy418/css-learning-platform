import { AnimatePresence, motion } from 'framer-motion';
import type { ErrorInfo, ReactNode } from 'react';
import { Component, lazy, Suspense, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useOutlet,
  useParams,
} from 'react-router-dom';
import FlexboxReference from './components/FlexboxReference';
import Logo from './components/Logo';
import QuickReference from './components/QuickRefrence';
import { advancedJavaScriptLessonsArabic } from './config/courseSections';
import { javaScriptLessonByNum } from './config/javascriptLessons';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import LoginPage from './features/auth/LoginPage';
import LessonGuard from './features/lessonLock/LessonGuard';
import {
  LessonLockProvider,
  useLessonLock,
} from './features/lessonLock/LessonLockContext';
import SmartIndexRedirect from './features/lessonLock/SmartIndexRedirect';
import TrackGuard from './features/lessonLock/TrackGuard';
import NotificationManager from './features/notifications/NotificationManager';
import { ProgressProvider } from './features/progress/ProgressContext';
import FlexboxExercise1 from './lessons/flexbox/FlexboxExercise1';
import FlexboxExercise2 from './lessons/flexbox/FlexboxExercise2';
import FlexboxExercise3 from './lessons/flexbox/FlexboxExercise3';
import GridExercise1 from './lessons/grid/GridExercise1';
import GridExercise2 from './lessons/grid/GridExercise2';
import GridExercise3 from './lessons/grid/GridExercise3';
import JsDomExercise1 from './lessons/javascript/JsDomExercise1';
import JsFunctionsExercise1 from './lessons/javascript/JsFunctionsExercise1';
import JsVariablesExercise1 from './lessons/javascript/JsVariablesExercise1';
import JavaScriptLessonTemplate from './lessons/javascript/JavaScriptLessonTemplate';
import PositionExercise1 from './lessons/position/PositionExercise1';
import PositionExercise2 from './lessons/position/PositionExercise2';
import ResponsiveExercise1 from './lessons/responsive/ResponsiveExercise1';
import ResponsiveExercise2 from './lessons/responsive/ResponsiveExercise2';
import ResponsiveExercise3 from './lessons/responsive/ResponsiveExercise3';
import ShadowExercise1 from './lessons/shadows/ShadowExercise1';
import UnitsExercise1 from './lessons/units/UnitsExercise1';
import VariablesExercise1 from './lessons/variables/VariablesExercise1';
import HomePage from './pages/HomePage';

/* ── Retry wrapper for lazy imports (handles stale chunk errors after redeployment) ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyRetry<T extends { default: React.ComponentType<any> }>(
  importFn: () => Promise<T>,
): React.LazyExoticComponent<T['default']> {
  return lazy(() =>
    importFn().catch(() => {
      // If the chunk fetch fails (e.g. after a new deploy), hard-reload once
      const key = 'chunk-reload';
      const hasReloaded = sessionStorage.getItem(key);
      if (!hasReloaded) {
        sessionStorage.setItem(key, '1');
        window.location.reload();
        // Return a never-resolving promise so React doesn't render before reload
        return new Promise<T>(() => {});
      }
      sessionStorage.removeItem(key);
      // If we already reloaded once and it still fails, surface the error
      return importFn();
    }),
  );
}

/* ── Error Boundary for chunk load failures ── */
class ChunkErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ChunkErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-white">
          <p className="text-lg">A new version is available.</p>
          <button
            onClick={() => {
              sessionStorage.removeItem('chunk-reload');
              window.location.reload();
            }}
            className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AdminDashboard = lazyRetry(() => import('./pages/AdminDashboard'));

/* ── Lazy-loaded JS lessons ── */
const JsOperatorsExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsOperatorsExercise1'),
);
const JsConditionalsExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsConditionalsExercise1'),
);
const JsLoopsExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsLoopsExercise1'),
);
const JsArraysExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsArraysExercise1'),
);
const JsObjectsExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsObjectsExercise1'),
);
const JsEventsExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsEventsExercise1'),
);
const JsStringsExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsStringsExercise1'),
);
const JsArrayMethodsExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsArrayMethodsExercise1'),
);
const JsDebuggingExercise1 = lazyRetry(
  () => import('./lessons/javascript/JsDebuggingExercise1'),
);
const AdvancedJavaScriptPage = lazyRetry(
  () => import('./pages/AdvancedJavaScriptPage'),
);
const JavaScriptLessonsPage = lazyRetry(
  () => import('./pages/JavaScriptLessonsPage'),
);
const AdvancedJsLesson1 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson1'),
);
const AdvancedJsLesson2 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson2'),
);
const AdvancedJsLesson3 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson3'),
);
const AdvancedJsLesson4 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson4'),
);
const AdvancedJsLesson5 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson5'),
);
const AdvancedJsLesson6 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson6'),
);
const AdvancedJsLesson7 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson7'),
);
const AdvancedJsLesson8 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson8'),
);
const AdvancedJsLesson9 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson9'),
);
const AdvancedJsLesson10 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson10'),
);
const AdvancedJsLesson11 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson11'),
);
const AdvancedJsLesson12 = lazyRetry(
  () => import('./lessons/advanced-js/AdvancedJsLesson12'),
);
const JsClassroomPage = lazyRetry(() => import('./pages/JsClassroomPage'));
const JsHomeworkPage = lazyRetry(() => import('./pages/JsHomeworkPage'));
const QuizPage = lazyRetry(() => import('./features/quiz/QuizPage'));

const advancedLessonComponents: Record<string, React.ComponentType> = {
  '1': AdvancedJsLesson1,
  '2': AdvancedJsLesson2,
  '3': AdvancedJsLesson3,
  '4': AdvancedJsLesson4,
  '5': AdvancedJsLesson5,
  '6': AdvancedJsLesson6,
  '7': AdvancedJsLesson7,
  '8': AdvancedJsLesson8,
  '9': AdvancedJsLesson9,
  '10': AdvancedJsLesson10,
  '11': AdvancedJsLesson11,
  '12': AdvancedJsLesson12,
};

const jsLessonComponents: Record<string, React.ComponentType> = {
  '1': JsVariablesExercise1,
  '2': JsOperatorsExercise1,
  '3': JsConditionalsExercise1,
  '4': JsLoopsExercise1,
  '5': JsFunctionsExercise1,
  '6': JsArraysExercise1,
  '7': JsObjectsExercise1,
  '8': JsDomExercise1,
  '9': JsEventsExercise1,
  '10': JsStringsExercise1,
  '11': JsArrayMethodsExercise1,
  '12': JsDebuggingExercise1,
};

/* ── Loader for lazy components ── */
const LazyFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
  </div>
);

/* ── Protected route — redirects to /login if not authenticated ── */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0a0a14' }}
      >
        <div className="w-8 h-8 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user)
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}
        replace
      />
    );
  return <>{children}</>;
};

/* ═══════════════════════════════════════════════
   Accent colors per track (thin accents only)
═══════════════════════════════════════════════ */
interface TrackAccent {
  activeBorder: string;
  sectionColor: string;
  switchPath: string;
  switchLabel: string;
}

const trackAccents: Record<'css' | 'js', TrackAccent> = {
  css: {
    activeBorder: 'border-purple-400',
    sectionColor: 'text-purple-400',
    switchPath: '/js/1',
    switchLabel: '⚡ مسار جافاسكريبت',
  },
  js: {
    activeBorder: 'border-amber-400',
    sectionColor: 'text-amber-400',
    switchPath: '/css/grid/1',
    switchLabel: '🎨 مسار سي إس إس',
  },
};

/* ═══════════════════════════════════════════════
   Sidebar Link — unified dark, colored accent
═══════════════════════════════════════════════ */
const SidebarLink = ({
  to,
  label,
  onClick,
  accentBorder,
  lessonId,
}: {
  to: string;
  label: string;
  onClick?: () => void;
  accentBorder: string;
  lessonId?: string;
}) => {
  const { isLocked } = useLessonLock();
  const locked = lessonId ? isLocked(lessonId) : false;

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
          locked
            ? 'text-gray-600 cursor-not-allowed opacity-50'
            : isActive
              ? `bg-white/10 text-white font-semibold border-r-3 ${accentBorder}`
              : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
        }`
      }
    >
      {locked ? `🔒 ${label}` : label}
    </NavLink>
  );
};

const normalizeAdvancedLessonNum = (raw: string | undefined): string | null => {
  if (!raw) return null;
  if (/^\d+$/.test(raw)) {
    const numeric = Number(raw);
    return numeric >= 1 && numeric <= 12 ? String(numeric) : null;
  }
  if (/^adv-js-\d+$/.test(raw)) {
    const numeric = Number(raw.replace('adv-js-', ''));
    return numeric >= 1 && numeric <= 12 ? String(numeric) : null;
  }
  return null;
};

const normalizeJsLessonNum = (raw: string | undefined): string | null => {
  if (!raw) return null;
  if (!/^\d+$/.test(raw)) return null;
  const numeric = Number(raw);
  return numeric >= 1 && numeric <= 12 ? String(numeric) : null;
};

const advancedSidebarShortNames: Record<string, string> = {
  'adv-js-1': 'محرك JavaScript',
  'adv-js-2': 'بيئة المتصفح',
  'adv-js-3': 'الدوال المغلقة',
  'adv-js-4': 'أحداث DOM',
  'adv-js-5': 'النماذج الوراثية',
  'adv-js-6': 'فئات ES6',
  'adv-js-7': 'حلقة الأحداث',
  'adv-js-8': 'وعود Fetch',
  'adv-js-9': 'Async Await',
  'adv-js-10': 'تخزين محلي',
  'adv-js-11': 'وحدات ES6',
  'adv-js-12': 'مشروع تكاملي',
};

const AdvancedJsLessonRoute = () => {
  const { lessonNum } = useParams<{ lessonNum: string }>();
  const normalized = normalizeAdvancedLessonNum(lessonNum);

  if (!normalized) {
    return (
      <Navigate
        to="/js/advanced"
        replace
      />
    );
  }

  const LessonComponent = advancedLessonComponents[normalized];
  if (!LessonComponent) {
    return (
      <Navigate
        to="/js/advanced"
        replace
      />
    );
  }

  return (
    <LessonGuard lessonId={`adv-js-${normalized}`}>
      <LessonComponent />
    </LessonGuard>
  );
};

const JsLessonRoute = () => {
  const { lessonNum } = useParams<{ lessonNum: string }>();
  const normalized = normalizeJsLessonNum(lessonNum);

  if (!normalized) {
    return (
      <Navigate
        to="/js/lessons"
        replace
      />
    );
  }

  const LessonComponent = jsLessonComponents[normalized];
  const lessonMeta = javaScriptLessonByNum[normalized];

  if (!LessonComponent || !lessonMeta) {
    return (
      <Navigate
        to="/js/lessons"
        replace
      />
    );
  }

  return (
    <LessonGuard lessonId={lessonMeta.id}>
      <JavaScriptLessonTemplate lesson={lessonMeta}>
        <LessonComponent />
      </JavaScriptLessonTemplate>
    </LessonGuard>
  );
};
/* ── Section divider ── */
const SidebarSection = ({ label, color }: { label: string; color: string }) => (
  <div
    className={`mt-5 mb-2 px-3 text-[11px] font-bold uppercase tracking-wider ${color}`}
  >
    {label}
  </div>
);

/* ═══════════════════════════════════════════════
   CSS Sidebar Navigation
═══════════════════════════════════════════════ */
const CssSidebar = ({
  close,
  accent,
}: {
  close: () => void;
  accent: TrackAccent;
}) => (
  <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 sidebar-scroll">
    <SidebarSection
      label="الشبكات 📐"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/css/grid/1"
      label="1. الشبكة الأساسية"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="grid-1"
    />
    <SidebarLink
      to="/css/grid/2"
      label="2. أعمدة مختلطة"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="grid-2"
    />
    <SidebarLink
      to="/css/grid/3"
      label="3. تمدد المسارات"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="grid-3"
    />

    <SidebarSection
      label="فليكس بوكس 📦"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/css/flexbox/1"
      label="1. محاذاة مرنة"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="flex-1"
    />
    <SidebarLink
      to="/css/flexbox/2"
      label="2. اتجاه والتفاف"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="flex-2"
    />
    <SidebarLink
      to="/css/flexbox/3"
      label="3. نمو العناصر"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="flex-3"
    />

    <SidebarSection
      label="متقدم 🔧"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/css/shadows/1"
      label="1. تأثير الظلال"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="shadow-1"
    />
    <SidebarLink
      to="/css/units/1"
      label="2. وحدات القياس"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="units-1"
    />
    <SidebarLink
      to="/css/variables/1"
      label="3. متغيرات CSS"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="vars-1"
    />
    <SidebarLink
      to="/css/responsive/1"
      label="4. تصميم متجاوب"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="resp-1"
    />
    <SidebarLink
      to="/css/responsive/2"
      label="5. نصوص مرنة"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="resp-2"
    />
    <SidebarLink
      to="/css/responsive/3"
      label="6. تبديل التخطيط"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="resp-3"
    />
    <SidebarLink
      to="/css/position/1"
      label="7. تموضع مطلق"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="pos-1"
    />
    <SidebarLink
      to="/css/position/2"
      label="8. تثبيت لاصق"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="pos-2"
    />

    <div className="mt-4 pt-3 border-t border-white/5">
      <SidebarSection
        label="مراجع 📚"
        color={accent.sectionColor}
      />
      <SidebarLink
        to="/css/reference/grid"
        label="مرجع الشبكات"
        onClick={close}
        accentBorder={accent.activeBorder}
      />
      <SidebarLink
        to="/css/reference/flexbox"
        label="مرجع فليكس بوكس"
        onClick={close}
        accentBorder={accent.activeBorder}
      />
    </div>
  </nav>
);

/* ═══════════════════════════════════════════════
  JS Sidebar Navigation
═══════════════════════════════════════════════ */
const JsSidebar = ({
  close,
  accent,
}: {
  close: () => void;
  accent: TrackAccent;
}) => (
  <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 sidebar-scroll">
    <SidebarSection
      label="المساحة الصفية 🏫"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/js/classroom"
      label="الخطة الصفية"
      onClick={close}
      accentBorder={accent.activeBorder}
    />
    <SidebarLink
      to="/js/homework"
      label="الواجب البرمجي"
      onClick={close}
      accentBorder={accent.activeBorder}
    />
    <SidebarLink
      to="/js/lessons"
      label="خريطة الدروس"
      onClick={close}
      accentBorder={accent.activeBorder}
    />

    <SidebarSection
      label="الأساسيات 🧱"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/js/1"
      label="1. أساسيات المتغيرات"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-1"
    />
    <SidebarLink
      to="/js/2"
      label="2. المعاملات الأساسية"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-2"
    />
    <SidebarLink
      to="/js/3"
      label="3. الشروط المنطقية"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-3"
    />
    <SidebarLink
      to="/js/4"
      label="4. الحلقات التكرارية"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-4"
    />

    <SidebarSection
      label="البناء 🏗️"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/js/5"
      label="5. إنشاء الدوال"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-5"
    />
    <SidebarLink
      to="/js/6"
      label="6. المصفوفات العملية"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-6"
    />
    <SidebarLink
      to="/js/7"
      label="7. الكائنات العملية"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-7"
    />

    <SidebarSection
      label="التفاعل 🌐"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/js/8"
      label="8. DOM والعناصر"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-8"
    />
    <SidebarLink
      to="/js/9"
      label="9. إدارة الأحداث"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-9"
    />

    <SidebarSection
      label="المتقدم 🚀"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/js/10"
      label="10. معالجة النصوص"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-10"
    />
    <SidebarLink
      to="/js/11"
      label="11. دوال المصفوفة"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-11"
    />
    <SidebarLink
      to="/js/12"
      label="12. تصحيح الأخطاء"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-12"
    />

    <SidebarSection
      label="جافاسكريبت المتقدم 🧠"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/js/advanced"
      label="المسار المتقدم"
      onClick={close}
      accentBorder={accent.activeBorder}
    />
    {advancedJavaScriptLessonsArabic.map((lesson, index) => (
      <SidebarLink
        key={lesson.id}
        to={`/js/advanced/${index + 1}`}
        label={`${index + 1}. ${advancedSidebarShortNames[lesson.id] ?? lesson.title}`}
        onClick={close}
        accentBorder={accent.activeBorder}
        lessonId={lesson.id}
      />
    ))}
  </nav>
);

/* ═══════════════════════════════════════════════
   Layout — unified dark sidebar for both tracks
═══════════════════════════════════════════════ */
const LessonLayout = ({ track }: { track: 'css' | 'js' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const accent = trackAccents[track];
  const close = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };
  return (
    <div
      className="flex h-screen bg-gray-50 overflow-hidden"
      dir="rtl"
    >
      {/* ── Mobile Header ── */}
      <div className="md:hidden fixed top-0 w-full bg-gray-950 text-white z-50 p-4 flex justify-between items-center shadow-md">
        <div
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Logo size="sm" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded hover:bg-white/10 transition-colors text-sm"
            title="الرئيسية"
          >
            🏠
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ── Overlay ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={close}
        />
      )}

      {/* ── Sidebar — dark gradient ── */}
      <aside
        className={`
          fixed md:relative top-0 right-0 h-full w-64 text-white shadow-xl flex flex-col z-50
          transform transition-transform duration-300 ease-in-out pt-16 md:pt-0
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}
        style={{
          background:
            'linear-gradient(180deg, #0c0c18 0%, #0a0a14 50%, #0d0b1a 100%)',
        }}
      >
        {/* Desktop Header — Logo + home button */}
        <div className="hidden md:block p-5 border-b border-white/8">
          <div
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <Logo
              size="sm"
              showTagline
            />
          </div>
          <button
            onClick={() => navigate('/')}
            className="mt-3 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all w-full justify-center"
          >
            🏠 الصفحة الرئيسية
          </button>
        </div>

        {track === 'css' ? (
          <CssSidebar
            close={close}
            accent={accent}
          />
        ) : (
          <JsSidebar
            close={close}
            accent={accent}
          />
        )}

        {/* Footer — user info + switch track + logout */}
        <div className="p-3 border-t border-white/8 space-y-2">
          {user && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
              <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-300 font-bold shrink-0">
                {user.name.charAt(0)}
              </div>
              <span className="text-xs text-gray-400 truncate flex-1">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-[10px] text-gray-500 hover:text-red-400 transition-colors"
                title="تسجيل الخروج"
              >
                خروج
              </button>
            </div>
          )}
          {user && user.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-500/10 border border-indigo-500/20 transition-all"
            >
              📊 لوحة تحكم المعلم
            </button>
          )}
          <button
            onClick={() => navigate(accent.switchPath)}
            className="w-full flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            {accent.switchLabel}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto relative bg-gray-50 mt-16 md:mt-0 w-full">
        <style>{`
          .animate-fade-in { animation: fadeIn 0.3s ease; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <MainContentWrapper />
        </div>
      </main>
    </div>
  );
};

/* ── Page transition wrapper ── */
const MainContentWrapper = () => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Lesson Header ── */
const LessonHeader = ({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: 'purple' | 'blue' | 'amber';
}) => {
  const borderMap = {
    purple: 'border-purple-400',
    blue: 'border-blue-400',
    amber: 'border-amber-400',
  };
  return (
    <div
      className={`mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100 border-r-4 ${borderMap[color]}`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        {title}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   APP — Root routing
═══════════════════════════════════════════════ */
function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <LessonLockProvider>
          <BrowserRouter>
            <ChunkErrorBoundary>
              <NotificationManager />
              <Toaster position="top-center" />
              <Routes>
                {/* ── Login ── */}
                <Route
                  path="/login"
                  element={<LoginPage />}
                />

                {/* ── Home Page (path chooser) — public ── */}
                <Route
                  path="/"
                  element={<HomePage />}
                />

                {/* ── Admin Dashboard ── */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<LazyFallback />}>
                        <AdminDashboard />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />

                {/* ═══ CSS Track ═══ */}
                <Route
                  path="/css"
                  element={
                    <ProtectedRoute>
                      <TrackGuard track="css">
                        <LessonLayout track="css" />
                      </TrackGuard>
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<SmartIndexRedirect track="css" />}
                  />

                  {/* Grid */}
                  <Route
                    path="grid/1"
                    element={
                      <LessonGuard lessonId="grid-1">
                        <LessonHeader
                          title="دليل CSS Grid التفاعلي"
                          description="اكتب إجاباتك مباشرة في الكود وشاهد الشبكة تتحدث!"
                          color="purple"
                        />
                        <GridExercise1 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="grid/2"
                    element={
                      <LessonGuard lessonId="grid-2">
                        <LessonHeader
                          title="أحجام أعمدة متقدمة"
                          description="استخدم fr و px و auto معًا."
                          color="purple"
                        />
                        <GridExercise2 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="grid/3"
                    element={
                      <LessonGuard lessonId="grid-3">
                        <LessonHeader
                          title="Grid Spanning"
                          description="تمدد عبر الأعمدة والصفوف (span)."
                          color="purple"
                        />
                        <GridExercise3 />
                      </LessonGuard>
                    }
                  />

                  {/* Flexbox */}
                  <Route
                    path="flexbox/1"
                    element={
                      <LessonGuard lessonId="flex-1">
                        <LessonHeader
                          title="تعلم Flexbox: المحاذاة"
                          description="تحكم في محاذاة وتوزيع العناصر بمرونة."
                          color="blue"
                        />
                        <FlexboxExercise1 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="flexbox/2"
                    element={
                      <LessonGuard lessonId="flex-2">
                        <LessonHeader
                          title="Flexbox: الاتجاه والالتفاف"
                          description="بناء تخطيطات مرنة ومتجاوبة."
                          color="blue"
                        />
                        <FlexboxExercise2 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="flexbox/3"
                    element={
                      <LessonGuard lessonId="flex-3">
                        <LessonHeader
                          title="Flexbox: التمدد (Grow)"
                          description="كيف تملأ العناصر المساحة المتبقية."
                          color="blue"
                        />
                        <FlexboxExercise3 />
                      </LessonGuard>
                    }
                  />

                  {/* Advanced CSS */}
                  <Route
                    path="shadows/1"
                    element={
                      <LessonGuard lessonId="shadow-1">
                        <LessonHeader
                          title="الظلال في CSS"
                          description="تعلم استخدام box-shadow و text-shadow لإضافة عمق لتصميماتك."
                          color="purple"
                        />
                        <ShadowExercise1 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="units/1"
                    element={
                      <LessonGuard lessonId="units-1">
                        <LessonHeader
                          title="الوحدات في CSS"
                          description="الفرق بين px و rem و em ومتى تستخدم كل منها."
                          color="purple"
                        />
                        <UnitsExercise1 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="variables/1"
                    element={
                      <LessonGuard lessonId="vars-1">
                        <LessonHeader
                          title="المتغيرات في CSS"
                          description="تعلم استخدام CSS Variables وأفضل الممارسات."
                          color="purple"
                        />
                        <VariablesExercise1 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="responsive/1"
                    element={
                      <LessonGuard lessonId="resp-1">
                        <LessonHeader
                          title="التصميم المتجاوب"
                          description="كيف تجعل تصميمك يعمل على كل الشاشات."
                          color="purple"
                        />
                        <ResponsiveExercise1 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="responsive/2"
                    element={
                      <LessonGuard lessonId="resp-2">
                        <LessonHeader
                          title="Responsive: نصوص مرنة"
                          description="استخدام clamp لتغيير أحجام الخطوط بذكاء."
                          color="purple"
                        />
                        <ResponsiveExercise2 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="responsive/3"
                    element={
                      <LessonGuard lessonId="resp-3">
                        <LessonHeader
                          title="تغيير التخطيط المتجاوب"
                          description="كيفية تحويل الصفوف إلى أعمدة في الشاشات الصغيرة."
                          color="purple"
                        />
                        <ResponsiveExercise3 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="position/1"
                    element={
                      <LessonGuard lessonId="pos-1">
                        <LessonHeader
                          title="خاصية Position"
                          description="تحريك العناصر بدقة في الصفحة."
                          color="purple"
                        />
                        <PositionExercise1 />
                      </LessonGuard>
                    }
                  />
                  <Route
                    path="position/2"
                    element={
                      <LessonGuard lessonId="pos-2">
                        <LessonHeader
                          title="Position: التثبيت (Sticky)"
                          description="كيفية تثبيت العناصر عند التمرير."
                          color="purple"
                        />
                        <PositionExercise2 />
                      </LessonGuard>
                    }
                  />

                  {/* References */}
                  <Route
                    path="reference"
                    element={
                      <Navigate
                        to="/css/reference/grid"
                        replace
                      />
                    }
                  />
                  <Route
                    path="reference/grid"
                    element={<QuickReference />}
                  />
                  <Route
                    path="reference/flexbox"
                    element={<FlexboxReference />}
                  />
                </Route>

                {/* ═══ JavaScript Track ═══ */}
                <Route
                  path="/js"
                  element={
                    <ProtectedRoute>
                      <TrackGuard track="js">
                        <LessonLayout track="js" />
                      </TrackGuard>
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<SmartIndexRedirect track="js" />}
                  />

                  <Route
                    path="classroom"
                    element={
                      <Suspense fallback={<LazyFallback />}>
                        <LessonHeader
                          title="المساحة الصفية في JavaScript"
                          description="الترتيب بين الطلاب، شجرة التركيز داخل الصف، وشجرة الموضوعات التي نحتاج فهمها جيداً."
                          color="amber"
                        />
                        <JsClassroomPage />
                      </Suspense>
                    }
                  />

                  <Route
                    path="homework"
                    element={
                      <Suspense fallback={<LazyFallback />}>
                        <LessonHeader
                          title="الواجب البرمجي"
                          description="اكتب الكود، اختبره داخل المحرر، ثم أرسله إلى المعلم بعنوان تختاره أنت."
                          color="amber"
                        />
                        <JsHomeworkPage />
                      </Suspense>
                    }
                  />

                  <Route
                    path="lessons"
                    element={
                      <Suspense fallback={<LazyFallback />}>
                        <JavaScriptLessonsPage />
                      </Suspense>
                    }
                  />

                  <Route
                    path="advanced"
                    element={
                      <Suspense fallback={<LazyFallback />}>
                        <AdvancedJavaScriptPage />
                      </Suspense>
                    }
                  />

                  <Route
                    path="advanced/:lessonNum/quiz"
                    element={
                      <Suspense fallback={<LazyFallback />}>
                        <QuizPage />
                      </Suspense>
                    }
                  />

                  <Route
                    path="advanced/:lessonNum"
                    element={
                      <Suspense fallback={<LazyFallback />}>
                        <AdvancedJsLessonRoute />
                      </Suspense>
                    }
                  />

                  {/* دروس JavaScript الأساسية (بنفس نمط المسار المتقدم) */}
                  <Route
                    path=":lessonNum"
                    element={
                      <Suspense fallback={<LazyFallback />}>
                        <JsLessonRoute />
                      </Suspense>
                    }
                  />

                  {/* Quiz pages */}
                  <Route
                    path=":lessonNum/quiz"
                    element={
                      <Suspense fallback={<LazyFallback />}>
                        <QuizPage />
                      </Suspense>
                    }
                  />

                  {/* Legacy routes */}
                  <Route
                    path="variables/1"
                    element={
                      <Navigate
                        to="/js/1"
                        replace
                      />
                    }
                  />
                  <Route
                    path="functions/1"
                    element={
                      <Navigate
                        to="/js/5"
                        replace
                      />
                    }
                  />
                  <Route
                    path="dom/1"
                    element={
                      <Navigate
                        to="/js/8"
                        replace
                      />
                    }
                  />
                </Route>

                {/* ── Legacy redirect: old routes without /css prefix ── */}
                <Route
                  path="/grid/*"
                  element={
                    <Navigate
                      to="/css/grid/1"
                      replace
                    />
                  }
                />
                <Route
                  path="/flexbox/*"
                  element={
                    <Navigate
                      to="/css/flexbox/1"
                      replace
                    />
                  }
                />
                <Route
                  path="/shadows/*"
                  element={
                    <Navigate
                      to="/css/shadows/1"
                      replace
                    />
                  }
                />
                <Route
                  path="/units/*"
                  element={
                    <Navigate
                      to="/css/units/1"
                      replace
                    />
                  }
                />
                <Route
                  path="/variables/*"
                  element={
                    <Navigate
                      to="/css/variables/1"
                      replace
                    />
                  }
                />
                <Route
                  path="/responsive/*"
                  element={
                    <Navigate
                      to="/css/responsive/1"
                      replace
                    />
                  }
                />
                <Route
                  path="/position/*"
                  element={
                    <Navigate
                      to="/css/position/1"
                      replace
                    />
                  }
                />
                <Route
                  path="/reference/*"
                  element={
                    <Navigate
                      to="/css/reference/grid"
                      replace
                    />
                  }
                />
              </Routes>
            </ChunkErrorBoundary>
          </BrowserRouter>
        </LessonLockProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
