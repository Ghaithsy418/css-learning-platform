import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GridExercise1 from "./lessons/grid/GridExercise1";
import GridExercise2 from "./lessons/grid/GridExercise2";
import GridExercise3 from "./lessons/grid/GridExercise3";
import FlexboxExercise1 from "./lessons/flexbox/FlexboxExercise1";
import FlexboxExercise2 from "./lessons/flexbox/FlexboxExercise2";
import FlexboxExercise3 from "./lessons/flexbox/FlexboxExercise3";
import ShadowExercise1 from "./lessons/shadows/ShadowExercise1";
import UnitsExercise1 from "./lessons/units/UnitsExercise1";
import VariablesExercise1 from "./lessons/variables/VariablesExercise1";
import QuickReference from "./components/QuickRefrence";
import FlexboxReference from "./components/FlexboxReference";

// ... [Layout component code remains unchanged, assume it's here or handled by context if we were rewriting whole file, but we are doing chunk replacement]
// Actually, the user instruction suggests replacing content. I will target the imports and the MainContentWrapper specifically.
// Wait, replace_file_content target needs only the changed chunk.

// 1. Update Imports
// 2. Update MainContentWrapper

// Let's do imports first.

// Layout Component
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change on mobile
  if (isSidebarOpen) {
    // A simple effect to close sidebar would be better, but doing it in click handler of links is enough.
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" dir="rtl">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-purple-900 text-white z-50 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🚀</span>
          <span>تعلم CSS</span>
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded hover:bg-purple-800 transition-colors"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile: Fixed + Transform, Desktop: Relative + Visible */}
      <aside
        className={`
            fixed md:relative top-0 right-0 h-full w-64 bg-purple-900 text-white shadow-xl flex flex-col z-50 
            transform transition-transform duration-300 ease-in-out pt-16 md:pt-0
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
      `}
      >
        {/* Desktop Header (hidden on mobile) */}
        <div className="hidden md:block p-6 bg-purple-950">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span>🚀</span>
            <span>تعلم CSS</span>
          </h1>
          <p className="text-purple-300 text-xs mt-2 opacity-80">
            منصة تعليمية تفاعلية
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-bold text-purple-400 uppercase mb-2 px-3">
            Grid دروس
          </div>
          <SidebarLink
            to="/grid/1"
            label="1. الشبكة الأساسية"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/grid/2"
            label="2. أعمدة مختلطة"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/grid/3"
            label="3. التمدد (Spanning)"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="mt-6 text-xs font-bold text-purple-400 uppercase mb-2 px-3">
            Flexbox دروس
          </div>
          <SidebarLink
            to="/flexbox/1"
            label="1. المحاذاة الأساسية"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/flexbox/2"
            label="2. الاتجاه والالتفاف"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/flexbox/3"
            label="3. التمدد (Grow)"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="mt-6 text-xs font-bold text-purple-400 uppercase mb-2 px-3">
            دروس CSS المتقدمة
          </div>
          <SidebarLink
            to="/shadows/1"
            label="1. الظلال (Shadows)"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/units/1"
            label="2. الوحدات (px, rem, em)"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to="/variables/1"
            label="3. المتغيرات (Variables)"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="mt-6 border-t border-purple-800 pt-4">
            <div className="text-xs font-bold text-purple-400 uppercase mb-2 px-3">
              مراجع سريعة
            </div>
            <SidebarLink
              to="/reference/grid"
              label="مرجع Grid"
              onClick={() => setIsSidebarOpen(false)}
            />
            <SidebarLink
              to="/reference/flexbox"
              label="مرجع Flexbox"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
        </nav>

        <div className="p-4 bg-purple-950 text-center text-xs text-purple-400">
          v0.3.0 Responsive
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-linear-to-br from-gray-50 to-gray-100 mt-16 md:mt-0 w-full">
        <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
                    
                    body {
                      font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;
                    }
                    
                    /* Custom Scrollbar for the main area */
                    main::-webkit-scrollbar {
                        width: 8px;
                    }
                    main::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    main::-webkit-scrollbar-thumb {
                        background-color: #cbd5e1;
                        border-radius: 20px;
                    }
                    
                    .animate-fade-in {
                        animation: fadeIn 0.3s ease;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}</style>

        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <MainContentWrapper />
        </div>
      </main>
    </div>
  );
};

// Wrapper adding animation or consistent header
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

// Helper for Sidebar Links
const SidebarLink = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-purple-700 text-white shadow-md translate-x-1 font-semibold border-r-4 border-purple-300"
            : "text-purple-100 hover:bg-purple-800 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/grid/1" replace />} />

          {/* Grid Routes */}
          <Route
            path="grid/1"
            element={
              <>
                <LessonHeader
                  title="دليل CSS Grid التفاعلي"
                  description="اكتب إجاباتك مباشرة في الكود وشاهد الشبكة تتحدث!"
                  color="purple"
                />
                <GridExercise1 />
              </>
            }
          />
          <Route
            path="grid/2"
            element={
              <>
                <LessonHeader
                  title="أحجام أعمدة متقدمة"
                  description="استخدم fr و px و auto معًا."
                  color="purple"
                />
                <GridExercise2 />
              </>
            }
          />
          <Route
            path="grid/3"
            element={
              <>
                <LessonHeader
                  title="Grid Spanning"
                  description="تمدد عبر الأعمدة والصفوف (span)."
                  color="purple"
                />
                <GridExercise3 />
              </>
            }
          />

          {/* Flexbox Routes */}
          <Route
            path="flexbox/1"
            element={
              <>
                <LessonHeader
                  title="تعلم Flexbox: المحاذاة"
                  description="تحكم في محاذاة وتوزيع العناصر بمرونة."
                  color="blue"
                />
                <FlexboxExercise1 />
              </>
            }
          />
          <Route
            path="flexbox/2"
            element={
              <>
                <LessonHeader
                  title="Flexbox: الاتجاه والالتفاف"
                  description="بناء تخطيطات مرنة ومتجاوبة."
                  color="blue"
                />
                <FlexboxExercise2 />
              </>
            }
          />
          <Route
            path="flexbox/3"
            element={
              <>
                <LessonHeader
                  title="Flexbox: التمدد (Grow)"
                  description="كيف تملأ العناصر المساحة المتبقية."
                  color="blue"
                />
                <FlexboxExercise3 />
              </>
            }
          />

          {/* Advanced CSS Lessons Routes */}
          <Route
            path="shadows/1"
            element={
              <>
                <LessonHeader
                  title="الظلال في CSS"
                  description="تعلم استخدام box-shadow و text-shadow لإضافة عمق لتصميماتك."
                  color="purple"
                />
                <ShadowExercise1 />
              </>
            }
          />
          <Route
            path="units/1"
            element={
              <>
                <LessonHeader
                  title="الوحدات في CSS"
                  description="الفرق بين px و rem و em ومتى تستخدم كل منها."
                  color="purple"
                />
                <UnitsExercise1 />
              </>
            }
          />
          <Route
            path="variables/1"
            element={
              <>
                <LessonHeader
                  title="المتغيرات في CSS"
                  description="تعلم استخدام CSS Variables وأفضل الممارسات."
                  color="purple"
                />
                <VariablesExercise1 />
              </>
            }
          />

          {/* Reference Routes */}
          {/* Supporting old path for backward compatibility/bookmarks if any */}
          <Route
            path="reference"
            element={<Navigate to="/reference/grid" replace />}
          />

          <Route path="reference/grid" element={<QuickReference />} />
          <Route path="reference/flexbox" element={<FlexboxReference />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const LessonHeader = ({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: "purple" | "blue";
}) => (
  <div
    className={`mb-8 p-6 bg-white rounded-xl shadow-xs border-r-4 ${color === "purple" ? "border-purple-500" : "border-blue-500"}`}
  >
    <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default App;
