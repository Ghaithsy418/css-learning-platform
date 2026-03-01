import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useState } from 'react';
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
} from 'react-router-dom';
import FlexboxReference from './components/FlexboxReference';
import Logo from './components/Logo';
import QuickReference from './components/QuickRefrence';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import LoginPage from './features/auth/LoginPage';
import LessonGuard from './features/lessonLock/LessonGuard';
import {
  LessonLockProvider,
  useLessonLock,
} from './features/lessonLock/LessonLockContext';
import SmartIndexRedirect from './features/lessonLock/SmartIndexRedirect';
import TrackGuard from './features/lessonLock/TrackGuard';
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
import PositionExercise1 from './lessons/position/PositionExercise1';
import PositionExercise2 from './lessons/position/PositionExercise2';
import ResponsiveExercise1 from './lessons/responsive/ResponsiveExercise1';
import ResponsiveExercise2 from './lessons/responsive/ResponsiveExercise2';
import ResponsiveExercise3 from './lessons/responsive/ResponsiveExercise3';
import ShadowExercise1 from './lessons/shadows/ShadowExercise1';
import UnitsExercise1 from './lessons/units/UnitsExercise1';
import VariablesExercise1 from './lessons/variables/VariablesExercise1';
import HomePage from './pages/HomePage';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

/* ── Lazy-loaded JS lessons ── */
const JsOperatorsExercise1 = lazy(
  () => import('./lessons/javascript/JsOperatorsExercise1'),
);
const JsConditionalsExercise1 = lazy(
  () => import('./lessons/javascript/JsConditionalsExercise1'),
);
const JsLoopsExercise1 = lazy(
  () => import('./lessons/javascript/JsLoopsExercise1'),
);
const JsArraysExercise1 = lazy(
  () => import('./lessons/javascript/JsArraysExercise1'),
);
const JsObjectsExercise1 = lazy(
  () => import('./lessons/javascript/JsObjectsExercise1'),
);
const JsEventsExercise1 = lazy(
  () => import('./lessons/javascript/JsEventsExercise1'),
);
const JsStringsExercise1 = lazy(
  () => import('./lessons/javascript/JsStringsExercise1'),
);
const JsArrayMethodsExercise1 = lazy(
  () => import('./lessons/javascript/JsArrayMethodsExercise1'),
);
const JsDebuggingExercise1 = lazy(
  () => import('./lessons/javascript/JsDebuggingExercise1'),
);

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
    switchLabel: '⚡ مسار JavaScript',
  },
  js: {
    activeBorder: 'border-amber-400',
    sectionColor: 'text-amber-400',
    switchPath: '/css/grid/1',
    switchLabel: '🎨 مسار CSS',
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
      label="Grid 📐"
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
      label="3. التمدد (Spanning)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="grid-3"
    />

    <SidebarSection
      label="Flexbox 📦"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/css/flexbox/1"
      label="1. المحاذاة الأساسية"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="flex-1"
    />
    <SidebarLink
      to="/css/flexbox/2"
      label="2. الاتجاه والالتفاف"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="flex-2"
    />
    <SidebarLink
      to="/css/flexbox/3"
      label="3. التمدد (Grow)"
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
      label="1. الظلال (Shadows)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="shadow-1"
    />
    <SidebarLink
      to="/css/units/1"
      label="2. الوحدات (px, rem, em)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="units-1"
    />
    <SidebarLink
      to="/css/variables/1"
      label="3. المتغيرات (Variables)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="vars-1"
    />
    <SidebarLink
      to="/css/responsive/1"
      label="4. التجاوب (Responsive)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="resp-1"
    />
    <SidebarLink
      to="/css/responsive/2"
      label="5. نصوص مرنة (clamp)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="resp-2"
    />
    <SidebarLink
      to="/css/responsive/3"
      label="6. تغيير التخطيط"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="resp-3"
    />
    <SidebarLink
      to="/css/position/1"
      label="7. التموضع المطلق"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="pos-1"
    />
    <SidebarLink
      to="/css/position/2"
      label="8. التثبيت (Sticky)"
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
        label="مرجع Grid"
        onClick={close}
        accentBorder={accent.activeBorder}
      />
      <SidebarLink
        to="/css/reference/flexbox"
        label="مرجع Flexbox"
        onClick={close}
        accentBorder={accent.activeBorder}
      />
    </div>
  </nav>
);

/* ═══════════════════════════════════════════════
   JS Sidebar Navigation — 12 lessons in 4 groups
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
      label="الأساسيات 🧱"
      color={accent.sectionColor}
    />
    <SidebarLink
      to="/js/1"
      label="1. المتغيرات وأنواع البيانات"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-1"
    />
    <SidebarLink
      to="/js/2"
      label="2. العمليات والمعاملات"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-2"
    />
    <SidebarLink
      to="/js/3"
      label="3. الجمل الشرطية"
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
      label="5. الدوال (Functions)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-5"
    />
    <SidebarLink
      to="/js/6"
      label="6. المصفوفات (Arrays)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-6"
    />
    <SidebarLink
      to="/js/7"
      label="7. الكائنات (Objects)"
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
      label="9. الأحداث (Events)"
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
      label="10. النصوص (Strings)"
      onClick={close}
      accentBorder={accent.activeBorder}
      lessonId="js-10"
    />
    <SidebarLink
      to="/js/11"
      label="11. دوال المصفوفات"
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

                {/* الأساسيات */}
                <Route
                  path="1"
                  element={
                    <LessonGuard lessonId="js-1">
                      <LessonHeader
                        title="المتغيرات وأنواع البيانات"
                        description="تعلم let و const وأنواع البيانات في JavaScript."
                        color="amber"
                      />
                      <JsVariablesExercise1 />
                    </LessonGuard>
                  }
                />
                <Route
                  path="2"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-2">
                        <LessonHeader
                          title="العمليات والمعاملات"
                          description="العمليات الحسابية والمنطقية والمقارنة."
                          color="amber"
                        />
                        <JsOperatorsExercise1 />
                      </LessonGuard>
                    </Suspense>
                  }
                />
                <Route
                  path="3"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-3">
                        <LessonHeader
                          title="الجمل الشرطية"
                          description="if / else / else if وعامل التشغيل الشرطي."
                          color="amber"
                        />
                        <JsConditionalsExercise1 />
                      </LessonGuard>
                    </Suspense>
                  }
                />
                <Route
                  path="4"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-4">
                        <LessonHeader
                          title="الحلقات التكرارية"
                          description="for و while و do-while للتكرار."
                          color="amber"
                        />
                        <JsLoopsExercise1 />
                      </LessonGuard>
                    </Suspense>
                  }
                />

                {/* البناء */}
                <Route
                  path="5"
                  element={
                    <LessonGuard lessonId="js-5">
                      <LessonHeader
                        title="الدوال (Functions)"
                        description="من الدوال العادية إلى السهمية و Callbacks."
                        color="amber"
                      />
                      <JsFunctionsExercise1 />
                    </LessonGuard>
                  }
                />
                <Route
                  path="6"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-6">
                        <LessonHeader
                          title="المصفوفات (Arrays)"
                          description="إنشاء المصفوفات والوصول للعناصر والتعديل عليها."
                          color="amber"
                        />
                        <JsArraysExercise1 />
                      </LessonGuard>
                    </Suspense>
                  }
                />
                <Route
                  path="7"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-7">
                        <LessonHeader
                          title="الكائنات (Objects)"
                          description="إنشاء الكائنات والوصول للخصائص والتعامل معها."
                          color="amber"
                        />
                        <JsObjectsExercise1 />
                      </LessonGuard>
                    </Suspense>
                  }
                />

                {/* التفاعل */}
                <Route
                  path="8"
                  element={
                    <LessonGuard lessonId="js-8">
                      <LessonHeader
                        title="DOM والعناصر"
                        description="تلاعب بعناصر الصفحة وأضف تفاعلية بالأحداث."
                        color="amber"
                      />
                      <JsDomExercise1 />
                    </LessonGuard>
                  }
                />
                <Route
                  path="9"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-9">
                        <LessonHeader
                          title="الأحداث (Events)"
                          description="addEventListener وأنواع الأحداث المختلفة."
                          color="amber"
                        />
                        <JsEventsExercise1 />
                      </LessonGuard>
                    </Suspense>
                  }
                />

                {/* المتقدم */}
                <Route
                  path="10"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-10">
                        <LessonHeader
                          title="النصوص (Strings)"
                          description="دوال النصوص والبحث والاستبدال والتقسيم."
                          color="amber"
                        />
                        <JsStringsExercise1 />
                      </LessonGuard>
                    </Suspense>
                  }
                />
                <Route
                  path="11"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-11">
                        <LessonHeader
                          title="دوال المصفوفات"
                          description="map و filter و reduce و find وأكثر."
                          color="amber"
                        />
                        <JsArrayMethodsExercise1 />
                      </LessonGuard>
                    </Suspense>
                  }
                />
                <Route
                  path="12"
                  element={
                    <Suspense fallback={<LazyFallback />}>
                      <LessonGuard lessonId="js-12">
                        <LessonHeader
                          title="تصحيح الأخطاء"
                          description="أنواع الأخطاء وكيفية قراءتها وإصلاحها."
                          color="amber"
                        />
                        <JsDebuggingExercise1 />
                      </LessonGuard>
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
          </BrowserRouter>
        </LessonLockProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
