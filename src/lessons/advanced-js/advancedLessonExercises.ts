export interface AdvancedLessonExerciseConfig {
  revisionTitle: string;
  revisionPrompt: string;
  keyTerms: [string, string, string];
  keyHints: [string, string, string];
  miniCodeTitle: string;
  miniCodeExpected: string;
  miniCodeHint: string;
  freeCodeTitle: string;
  freeCodeInstructions: string;
  freeCodeStarter: string;
  freeCodeAnswer: string;
  freeCodeHint: string;
}

export const advancedLessonExercises: Record<
  string,
  AdvancedLessonExerciseConfig
> = {
  'adv-js-1': {
    revisionTitle: 'مراجعة: Pipeline المحرك',
    revisionPrompt:
      'أكمل المصطلحات الأساسية التي تصف كيف ينتقل الكود من النص إلى التنفيذ داخل المحرك.',
    keyTerms: ['parsing', 'execution context', 'call stack'],
    keyHints: ['مرحلة التحليل', 'بيئة التنفيذ', 'مكدس الاستدعاء'],
    miniCodeTitle: 'تحدي سريع: TDZ و Hoisting',
    miniCodeExpected: 'ReferenceError',
    miniCodeHint: 'ما نوع الخطأ قبل تعريف let؟',
    freeCodeTitle: 'Runtime Trace Sandbox',
    freeCodeInstructions:
      'اكتب كودا يتعقب ترتيب استدعاءات 3 دوال متداخلة، ثم أضف مثالا يوضح الفرق بين var و let قبل التعريف.',
    freeCodeStarter: `function first() {
  console.log('enter first');
  second();
  console.log('exit first');
}

function second() {
  console.log('enter second');
  third();
  console.log('exit second');
}

function third() {
  console.log('enter third');
  console.log('exit third');
}

first();

// TODO: أضف مثال var/let قبل التعريف
`,
    freeCodeAnswer: `function first() {
  console.log('enter first');
  second();
  console.log('exit first');
}

function second() {
  console.log('enter second');
  third();
  console.log('exit second');
}

function third() {
  console.log('enter third');
  console.log('exit third');
}

first();

console.log(value); // undefined
var value = 10;

try {
  console.log(rate); // ReferenceError
} catch (error) {
  console.log(error.name);
}
let rate = 0.2;
`,
    freeCodeHint:
      'وثق ترتيب الدخول والخروج من الدوال، ثم اختبر var و let قبل سطر التعريف.',
  },
  'adv-js-2': {
    revisionTitle: 'مراجعة: Language vs Host',
    revisionPrompt:
      'أكمل الكلمات التي تميز بين محرك اللغة وواجهات المتصفح المضيفة.',
    keyTerms: ['window', 'document', 'Web APIs'],
    keyHints: ['global object', 'DOM root', 'Host features'],
    miniCodeTitle: 'تحدي سريع: Global Access',
    miniCodeExpected: 'globalThis',
    miniCodeHint: 'الاسم الموحد للـ global عبر البيئات',
    freeCodeTitle: 'Browser Boundary Lab',
    freeCodeInstructions:
      'اكتب دالة pure لتحويل أسماء الطلاب، ثم اكتب جزءا منفصلا يتعامل مع DOM ويعرض النتائج في قائمة.',
    freeCodeStarter: `function formatStudent(name) {
  // TODO: pure formatting
  return name;
}

const names = ['ali', 'sara', 'nour'];
// TODO: render to DOM container
`,
    freeCodeAnswer: `function formatStudent(name) {
  return name.trim().toUpperCase();
}

const names = ['ali', 'sara', 'nour'];
const container = document.querySelector('#students');

if (container) {
  container.innerHTML = names
    .map((name) => '<li>' + formatStudent(name) + '</li>')
    .join('');
}

console.log(window.location.href);
console.log(globalThis === window);
`,
    freeCodeHint: 'افصل التحويل المنطقي عن التعامل المباشر مع document/window.',
  },
  'adv-js-3': {
    revisionTitle: 'مراجعة: Closures عمليًا',
    revisionPrompt:
      'أكمل المفاهيم الأساسية التي تجعل closures قوية في بناء abstractions.',
    keyTerms: ['lexical scope', 'closure', 'debounce'],
    keyHints: ['نطاق كتابي', 'احتفاظ بالبيئة', 'تقليل الاستدعاءات'],
    miniCodeTitle: 'تحدي سريع: Currying',
    miniCodeExpected: 'partial application',
    miniCodeHint: 'مفهوم تثبيت جزء من المعاملات',
    freeCodeTitle: 'Debounced Search Handler',
    freeCodeInstructions:
      'ابن debounce utility ثم استخدمها مع input listener لطباعة آخر قيمة بعد 300ms من التوقف عن الكتابة.',
    freeCodeStarter: `function debounce(fn, delayMs) {
  // TODO
}

const handler = debounce(function (value) {
  console.log('query:', value);
}, 300);

handler('ja');
handler('jav');
handler('javascript');
`,
    freeCodeAnswer: `function debounce(fn, delayMs) {
  let timerId = null;

  return function () {
    const args = arguments;
    const context = this;

    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(function () {
      fn.apply(context, args);
    }, delayMs);
  };
}

const handler = debounce(function (value) {
  console.log('query:', value);
}, 300);

handler('ja');
handler('jav');
handler('javascript');
`,
    freeCodeHint:
      'احتفظ timerId داخل closure وألغِ الموعد السابق قبل جدولة الجديد.',
  },
  'adv-js-4': {
    revisionTitle: 'مراجعة: Propagation Model',
    revisionPrompt: 'أكمل المراحل الثلاث لدورة انتشار الحدث في DOM.',
    keyTerms: ['capturing', 'target', 'bubbling'],
    keyHints: ['نزول', 'العنصر الهدف', 'صعود'],
    miniCodeTitle: 'تحدي سريع: Delegation API',
    miniCodeExpected: 'closest',
    miniCodeHint: 'الدالة المستخدمة لاكتشاف أقرب عنصر مطابق',
    freeCodeTitle: 'Delegated Action Router',
    freeCodeInstructions:
      'اكتب listener واحد على parent ويحوّل data-action إلى سلوك: toggle أو remove.',
    freeCodeStarter: `const list = document.querySelector('[data-list]');

list?.addEventListener('click', function (event) {
  // TODO: delegated routing
});
`,
    freeCodeAnswer: `const list = document.querySelector('[data-list]');

list?.addEventListener('click', function (event) {
  const button = event.target.closest('[data-action]');
  if (!button || !list.contains(button)) return;

  const item = button.closest('[data-item-id]');
  if (!item) return;

  const action = button.dataset.action;
  if (action === 'toggle') item.classList.toggle('is-done');
  if (action === 'remove') item.remove();
});
`,
    freeCodeHint: 'ابدأ بـ event.target.closest ثم تحقق أن العنصر داخل parent.',
  },
  'adv-js-5': {
    revisionTitle: 'مراجعة: Prototype Chain',
    revisionPrompt:
      'أكمل العناصر التي تشرح كيف يتم البحث عن الخصائص في prototypal model.',
    keyTerms: ['prototype', 'constructor', 'this'],
    keyHints: ['سلسلة الوراثة', 'منشئ الكائن', 'سياق الاستدعاء'],
    miniCodeTitle: 'تحدي سريع: Shared Methods',
    miniCodeExpected: 'User.prototype',
    miniCodeHint: 'أين نضع method مشتركة لكل instances؟',
    freeCodeTitle: 'Constructor + Prototype Practice',
    freeCodeInstructions:
      'أنشئ constructor باسم Student مع method مشتركة describe على prototype.',
    freeCodeStarter: `function Student(name) {
  // TODO: assign name
}

// TODO: shared method on prototype

const s = new Student('Lina');
console.log(s.describe());
`,
    freeCodeAnswer: `function Student(name) {
  this.name = name;
}

Student.prototype.describe = function () {
  return 'Student(' + this.name + ')';
};

const s = new Student('Lina');
console.log(s.describe());
`,
    freeCodeHint: 'ضع الدالة على Student.prototype وليس داخل constructor.',
  },
  'adv-js-6': {
    revisionTitle: 'مراجعة: ES6 Classes',
    revisionPrompt: 'أكمل المصطلحات المرتبطة بالـ classes الحديثة والوراثة.',
    keyTerms: ['encapsulation', 'extends', 'super'],
    keyHints: ['عزل الحالة', 'توريث', 'استدعاء parent'],
    miniCodeTitle: 'تحدي سريع: Private Fields',
    miniCodeExpected: '#balance',
    miniCodeHint: 'صيغة private field في class',
    freeCodeTitle: 'Class Inheritance Drill',
    freeCodeInstructions:
      'اكتب Base class Channel و Subclass EmailChannel مع override لطريقة send.',
    freeCodeStarter: `class Channel {
  send(message) {
    // TODO
  }
}

class EmailChannel extends Channel {
  // TODO: override send
}
`,
    freeCodeAnswer: `class Channel {
  send(message) {
    return 'Base send: ' + message;
  }
}

class EmailChannel extends Channel {
  send(message) {
    return 'Email sent: ' + message;
  }
}

const email = new EmailChannel();
console.log(email.send('Hello'));
`,
    freeCodeHint: 'استخدم extends ثم override method بالاسم نفسه في subclass.',
  },
  'adv-js-7': {
    revisionTitle: 'مراجعة: Event Loop',
    revisionPrompt: 'أكمل الأجزاء الأساسية التي تحكم جدولة تنفيذ callbacks.',
    keyTerms: ['event loop', 'task queue', 'call stack'],
    keyHints: ['حلقة الجدولة', 'قائمة المهام', 'مكدس التنفيذ'],
    miniCodeTitle: 'تحدي سريع: Queue Priority',
    miniCodeExpected: 'stack empty',
    miniCodeHint: 'متى ينفذ callback من queue؟',
    freeCodeTitle: 'Chunking Large Workload',
    freeCodeInstructions:
      'قسم معالجة مصفوفة كبيرة إلى دفعات باستخدام setTimeout للحفاظ على responsiveness.',
    freeCodeStarter: `function processLargeList(items) {
  // TODO: chunking logic
}

const items = Array.from({ length: 5000 }, (_, i) => i);
processLargeList(items);
`,
    freeCodeAnswer: `function processLargeList(items) {
  let index = 0;
  const chunkSize = 250;

  function runChunk() {
    const end = Math.min(index + chunkSize, items.length);
    while (index < end) {
      items[index] = items[index] * 2;
      index += 1;
    }

    if (index < items.length) {
      setTimeout(runChunk, 0);
    }
  }

  runChunk();
}

const items = Array.from({ length: 5000 }, (_, i) => i);
processLargeList(items);
`,
    freeCodeHint: 'نفذ جزءا صغيرا ثم yield عبر setTimeout(runChunk, 0).',
  },
  'adv-js-8': {
    revisionTitle: 'مراجعة: Promises و Fetch',
    revisionPrompt: 'أكمل المفاهيم التي تفسر ترتيب التنفيذ في promises وfetch.',
    keyTerms: ['Promise', 'microtask', 'response.ok'],
    keyHints: ['قيمة مستقبلية', 'أولوية then', 'فحص HTTP status'],
    miniCodeTitle: 'تحدي سريع: Promise Ordering',
    miniCodeExpected: 'microtask before task',
    miniCodeHint: 'أيهما أولا عادة: then أم setTimeout؟',
    freeCodeTitle: 'Robust fetchJSON Wrapper',
    freeCodeInstructions:
      'اكتب دالة fetchJSON ترمي خطأ عند !response.ok وتعيد JSON عند النجاح.',
    freeCodeStarter: `function fetchJSON(url) {
  // TODO
}
`,
    freeCodeAnswer: `function fetchJSON(url) {
  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    return response.json();
  });
}
`,
    freeCodeHint: 'تذكر أن fetch لا يرمي تلقائيا عند 404/500.',
  },
  'adv-js-9': {
    revisionTitle: 'مراجعة: Async/Await',
    revisionPrompt: 'أكمل المفاهيم الرئيسية لإدارة async flows والأخطاء.',
    keyTerms: ['async function', 'try/catch', 'AbortController'],
    keyHints: ['ترجع Promise', 'التقاط الأخطاء', 'إلغاء الطلبات'],
    miniCodeTitle: 'تحدي سريع: Parallel Await',
    miniCodeExpected: 'Promise.all',
    miniCodeHint: 'أفضل نمط لانتظار طلبين مستقلين معا',
    freeCodeTitle: 'Resilient Async Loader',
    freeCodeInstructions:
      'اكتب دالة async تحمل user وcourses بالتوازي مع try/catch/finally.',
    freeCodeStarter: `async function loadDashboard(api) {
  // TODO
}
`,
    freeCodeAnswer: `async function loadDashboard(api) {
  try {
    const userPromise = api.getUser();
    const coursesPromise = api.getCourses();
    const [user, courses] = await Promise.all([userPromise, coursesPromise]);
    return { user, courses };
  } catch (error) {
    console.error('Load failed:', error);
    throw error;
  } finally {
    console.log('loadDashboard completed');
  }
}
`,
    freeCodeHint: 'ابدأ الطلبات أولا ثم await Promise.all داخل try.',
  },
  'adv-js-10': {
    revisionTitle: 'مراجعة: Local Storage',
    revisionPrompt:
      'أكمل المفاهيم الأساسية لتخزين بيانات العميل بأمان واستقرار.',
    keyTerms: ['localStorage', 'JSON.stringify', 'migration'],
    keyHints: ['persistent store', 'serialize object', 'schema upgrade'],
    miniCodeTitle: 'تحدي سريع: Parse Safety',
    miniCodeExpected: 'try/catch',
    miniCodeHint: 'كيف تحمي JSON.parse من القيم الفاسدة؟',
    freeCodeTitle: 'Versioned Preferences Store',
    freeCodeInstructions:
      'احفظ إعدادات المستخدم مع version ثم اقرأها مع fallback آمن.',
    freeCodeStarter: `const KEY = 'prefs:v1';

function savePrefs(prefs) {
  // TODO
}

function loadPrefs() {
  // TODO
}
`,
    freeCodeAnswer: `const KEY = 'prefs:v2';

function savePrefs(prefs) {
  const payload = {
    version: 2,
    updatedAt: Date.now(),
    data: prefs,
  };
  localStorage.setItem(KEY, JSON.stringify(payload));
}

function loadPrefs() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  try {
    const payload = JSON.parse(raw);
    if (!payload || payload.version !== 2) return null;
    return payload.data;
  } catch {
    return null;
  }
}
`,
    freeCodeHint: 'لا تحفظ object مباشرة بدون JSON.stringify.',
  },
  'adv-js-11': {
    revisionTitle: 'مراجعة: ES Modules',
    revisionPrompt: 'أكمل المصطلحات التي تصف تنظيم الكود الحديث وتقسيم الحِزم.',
    keyTerms: ['import/export', 'dynamic import', 'circular dependency'],
    keyHints: ['واجهة الوحدة', 'lazy loading', 'اعتماد دائري'],
    miniCodeTitle: 'تحدي سريع: Lazy Loading',
    miniCodeExpected: 'import()',
    miniCodeHint: 'الصيغة الديناميكية لتحميل وحدة عند الطلب',
    freeCodeTitle: 'Module Boundary Practice',
    freeCodeInstructions:
      'أنشئ وحدة math بصادرات named واستخدمها في ملف consumer.',
    freeCodeStarter: `// math.js
// TODO: export function sum and multiply

// consumer.js
// TODO: import and use
`,
    freeCodeAnswer: `// math.js
export function sum(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// consumer.js
import { sum, multiply } from './math.js';

console.log(sum(2, 3));
console.log(multiply(4, 5));
`,
    freeCodeHint: 'استخدم named exports ثم استوردها بنفس الأسماء أو مع alias.',
  },
  'adv-js-12': {
    revisionTitle: 'مراجعة: Capstone Architecture',
    revisionPrompt: 'أكمل الركائز الرئيسية لبناء SPA احترافية قابلة للصيانة.',
    keyTerms: ['router', 'state management', 'API layer'],
    keyHints: ['navigation', 'single source of truth', 'network boundary'],
    miniCodeTitle: 'تحدي سريع: Bootstrap Flow',
    miniCodeExpected: 'hydrate',
    miniCodeHint: 'الخطوة التي تعيد الحالة المحفوظة عند بدء التطبيق',
    freeCodeTitle: 'SPA Bootstrap Challenge',
    freeCodeInstructions:
      'اكتب bootstrap مبدئي يربط router/store/api/persistence ثم يبدأ التطبيق.',
    freeCodeStarter: `export async function bootstrap() {
  // TODO: initialize layers
}
`,
    freeCodeAnswer: `export async function bootstrap() {
  const api = createApiClient({ baseUrl: '/api' });
  const persistence = createPersistence({ key: 'spa:state:v1' });
  const initialState = persistence.load() || { user: null, lessons: [] };
  const store = createStore(initialState);
  const router = createRouter(function (route) {
    renderApp({ route, store, api });
  });

  store.subscribe(function (state) {
    persistence.save(state);
  });

  router.start();
}
`,
    freeCodeHint: 'فكّر في bootstrap كمنسق orchestration لكل طبقات التطبيق.',
  },
};
