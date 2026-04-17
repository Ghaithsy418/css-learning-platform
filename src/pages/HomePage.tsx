import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { advancedJavaScriptSection } from '../config/courseSections';
import { useAuth } from '../features/auth/AuthContext';

/* ── Stat badge ── */
const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-2xl sm:text-3xl font-black text-white">{value}</span>
    <span className="text-xs sm:text-sm text-white/60 font-medium">
      {label}
    </span>
  </div>
);

/* ── Path Card ── */
const PathCard = ({
  path,
  emoji,
  title,
  subtitle,
  description,
  lessons,
  topics,
  gradientFrom,
  gradientTo,
  glowColor,
  badgeColor,
  codeSnippet,
  onClick,
  delay,
}: {
  path: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  lessons: string[];
  topics: { icon: string; label: string }[];
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  badgeColor: string;
  codeSnippet: string;
  onClick: () => void;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, scale: 1.02 }}
    onClick={onClick}
    className="relative cursor-pointer group w-full max-w-md"
  >
    {/* Glow effect */}
    <div
      className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-95"
      style={{ background: glowColor }}
    />

    {/* Card body */}
    <div
      className="relative rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
      style={{
        background: 'rgba(15,15,25,0.85)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Top gradient stripe */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
        }}
      />

      {/* Code snippet decoration */}
      <div className="absolute top-4 left-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
        <pre className="font-mono text-xs text-white leading-relaxed">
          {codeSnippet}
        </pre>
      </div>

      <div className="p-6 sm:p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl select-none"
          >
            {emoji}
          </motion.div>
          <div
            dir="rtl"
            className="text-right flex-1"
          >
            <div
              className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 tracking-wide"
              style={{ background: badgeColor, color: gradientFrom }}
            >
              {path}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {title}
            </h2>
            <p className="text-white/50 text-sm mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p
          dir="rtl"
          className="text-right text-white/70 text-sm sm:text-base leading-relaxed mb-6"
        >
          {description}
        </p>

        {/* Topic pills */}
        <div
          className="flex flex-wrap gap-2 mb-6 justify-end"
          dir="rtl"
        >
          {topics.map((t) => (
            <span
              key={t.label}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium border border-white/10 text-white/70"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </span>
          ))}
        </div>

        {/* Lessons preview */}
        <div
          className="mb-6 space-y-2"
          dir="rtl"
        >
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
            الدروس المتاحة
          </p>
          {lessons.map((lesson, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-right"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                {i + 1}
              </div>
              <span className="text-white/60 text-sm">{lesson}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-bold text-sm sm:text-base text-white relative overflow-hidden group/btn"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${gradientTo}, ${gradientFrom})`,
            }}
          />
          <span className="relative z-10">ابدأ التعلم ←</span>
        </motion.button>
      </div>
    </div>
  </motion.div>
);

/* ══════════════════════════════════════════
   MAIN HOME PAGE
══════════════════════════════════════════ */
export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  /** Navigate to lesson or redirect to login if not authenticated */
  const goToLesson = (lessonPath: string) => {
    if (user) {
      navigate(lessonPath);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(lessonPath)}`);
    }
  };

  const cssTopics = [
    { icon: '🎨', label: 'Grid' },
    { icon: '📐', label: 'Flexbox' },
    { icon: '🌊', label: 'Shadows' },
    { icon: '📏', label: 'Units' },
    { icon: '🔧', label: 'Variables' },
    { icon: '📱', label: 'Responsive' },
    { icon: '📍', label: 'Position' },
  ];

  const jsTopics = [
    { icon: '📦', label: 'المتغيرات' },
    { icon: '➕', label: 'العمليات' },
    { icon: '🔀', label: 'الشرطية' },
    { icon: '🔁', label: 'الحلقات' },
    { icon: '⚙️', label: 'الدوال' },
    { icon: '📋', label: 'المصفوفات' },
    { icon: '🔑', label: 'الكائنات' },
  ];

  const cssLessons = [
    'CSS Grid — الشبكة الأساسية والمتقدمة',
    'Flexbox — المحاذاة والاتجاه والتمدد',
    'الظلال والوحدات والمتغيرات',
    'التصميم المتجاوب (Responsive)',
    'التموضع (Position)',
  ];

  const jsLessons = [
    'المتغيرات وأنواع البيانات',
    'العمليات والمعاملات',
    'الجمل الشرطية (if / else)',
    'الحلقات التكرارية (for / while)',
    'الدوال (Functions)',
    'المصفوفات (Arrays)',
    'الكائنات (Objects)',
    'DOM والعناصر',
    'الأحداث (Events)',
    'النصوص (Strings)',
    'دوال المصفوفات المتقدمة',
    'تصحيح الأخطاء (Debugging)',
  ];

  const advancedJsLessons = advancedJavaScriptSection.lessons.map(
    (lesson) => lesson.title,
  );
  const advancedJsTopics = advancedJavaScriptSection.topics;

  const cssCode = `.container {\n  display: grid;\n  grid-template-columns:\n    repeat(3, 1fr);\n  gap: 1rem;\n}`;
  const jsCode = `const greet = (name) => {\n  return \`مرحباً، \${name}!\`;\n};\n\nconsole.log(greet('طالب'));`;
  const advancedJsCode = `const fetchProfile = async (id) => {\n  try {\n    const response = await fetch(\`/api/users/\${id}\`);\n    if (!response.ok) throw new Error('Request failed');\n    return await response.json();\n  } catch (error) {\n    console.error(error);\n    return null;\n  }\n};`;

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        background:
          'linear-gradient(135deg, #0a0a14 0%, #0f0f1e 40%, #0a0814 100%)',
      }}
    >
      {/* ── Background grid dots ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #d97706, transparent)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }}
      />

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5"
      >
        <div className="flex items-center gap-3">
          <Logo size="sm" />
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-xs text-white/40 hidden sm:block">
                أهلاً،{' '}
                <span className="text-white/70 font-medium">{user.name}</span>
              </span>
              {user.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all cursor-pointer"
                >
                  📊 لوحة التحكم
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all cursor-pointer"
            >
              تسجيل الدخول
            </button>
          )}
        </div>
      </motion.header>

      {/* ── Hero section ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm font-medium text-white/60"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🚀
          </motion.span>
          تعلّم البرمجة بالكتابة والتجربة
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-4"
          dir="rtl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            اختر{' '}
            <span className="relative inline-block">
              <span
                className="relative z-10"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #a78bfa, #7c3aed, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                مسارك
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                style={{
                  background: 'linear-gradient(90deg, #7c3aed, #f59e0b)',
                }}
              />
            </span>
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mt-1">
            وابدأ رحلتك
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/50 text-center text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
          dir="rtl"
        >
          تعلم CSS أو JavaScript بطريقة تفاعلية — اكتب الكود وشاهد النتيجة فوراً
        </motion.p>

        {/* ── Path Cards ── */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          <PathCard
            path="CSS"
            emoji="🎨"
            title="تعلم CSS"
            subtitle="من المبتدئ إلى المتقدم"
            description="أتقن تنسيق وتخطيط صفحات الويب. من الشبكات والمرونة إلى التصميم المتجاوب والمتغيرات."
            lessons={cssLessons}
            topics={cssTopics}
            gradientFrom="#7c3aed"
            gradientTo="#c084fc"
            glowColor="linear-gradient(135deg, rgba(124,58,237,0.6), rgba(192,132,252,0.3))"
            badgeColor="rgba(167,139,250,0.15)"
            codeSnippet={cssCode}
            onClick={() => goToLesson('/css/grid/1')}
            delay={0.5}
          />
          <PathCard
            path="JavaScript"
            emoji="⚡"
            title="تعلم JavaScript"
            subtitle="أحيِ صفحاتك بالتفاعل"
            description="تعلم أساسيات البرمجة بلغة الويب. من المتغيرات والدوال إلى التلاعب بـ DOM والأحداث."
            lessons={jsLessons}
            topics={jsTopics}
            gradientFrom="#d97706"
            gradientTo="#fbbf24"
            glowColor="linear-gradient(135deg, rgba(217,119,6,0.6), rgba(251,191,36,0.3))"
            badgeColor="rgba(251,191,36,0.15)"
            codeSnippet={jsCode}
            onClick={() => goToLesson('/js/1')}
            delay={0.65}
          />
          <PathCard
            path={advancedJavaScriptSection.title}
            emoji="🧠"
            title={advancedJavaScriptSection.title}
            subtitle={advancedJavaScriptSection.subtitle}
            description={advancedJavaScriptSection.description}
            lessons={advancedJsLessons}
            topics={advancedJsTopics}
            gradientFrom="#0284c7"
            gradientTo="#06b6d4"
            glowColor="linear-gradient(135deg, rgba(2,132,199,0.55), rgba(6,182,212,0.32))"
            badgeColor="rgba(6,182,212,0.18)"
            codeSnippet={advancedJsCode}
            onClick={() => goToLesson(advancedJavaScriptSection.startPath)}
            delay={0.8}
          />
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 w-full max-w-2xl rounded-2xl border border-white/10 px-6 py-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center justify-around gap-4 flex-wrap">
            <Stat
              value="27+"
              label="درس تفاعلي"
            />
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <Stat
              value="3"
              label="مسار تعليمي"
            />
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <Stat
              value="100%"
              label="مجاني"
            />
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <Stat
              value="∞"
              label="تمارين"
            />
          </div>
        </motion.div>

        {/* ── Feature pills ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-8 flex flex-wrap gap-3 justify-center"
          dir="rtl"
        >
          {[
            { icon: '✍️', text: 'اكتب مباشرة في الكود' },
            { icon: '👁️', text: 'شاهد النتيجة فوراً' },
            { icon: '💡', text: 'تلميحات ذكية' },
            { icon: '📱', text: 'يعمل على كل الأجهزة' },
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/50 border border-white/8"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </motion.div>
      </main>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="relative z-10 text-center py-5 text-white/20 text-xs"
        dir="rtl"
      >
        منصة تعلّم — تعليمية تفاعلية مفتوحة المصدر
      </motion.footer>
    </div>
  );
}
