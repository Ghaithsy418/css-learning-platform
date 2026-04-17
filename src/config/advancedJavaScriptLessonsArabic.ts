import type { AdvancedJavaScriptLesson } from './advancedJavaScriptLessons';

export const advancedJavaScriptLessonsArabic: AdvancedJavaScriptLesson[] = [
  {
    id: 'adv-js-1',
    title: 'كيف يعمل JavaScript خلف الكواليس (المحرك، Call Stack، Hoisting)',
    description:
      'فهم دورة تنفيذ الكود داخل المحرك: من التحليل إلى التنفيذ، وكيف تؤثر بيئات التنفيذ ورفع التعريفات على النتائج.',
    objectives: [
      'شرح مراحل عمل المحرك من parsing حتى التنفيذ الفعلي.',
      'تتبع إنشاء Execution Contexts وانتقالها داخل Call Stack.',
      'التنبؤ بسلوك hoisting مع var و let و const ودوال التصريح.',
    ],
    deepDiveTheory: `
### لماذا هذا الدرس أساسي؟
المشاكل الصعبة في JavaScript غالبا لا تكون أخطاء كتابة، بل أخطاء فهم النموذج الذهني للتنفيذ. عندما تعرف ما الذي يحدث قبل تنفيذ أول سطر، تصبح قادرا على تفسير الأخطاء الغامضة بدقة.

### ماذا يفعل المحرك فعليا؟
محرك JavaScript الحديث يمر بعدة مراحل:
1. **Parsing**: تحويل النص إلى Tokens ثم AST.
2. **Compilation**: تحويل AST إلى تمثيل قابل للتنفيذ.
3. **Optimization**: تحسين المسارات الساخنة عند تكرار التنفيذ.
4. **Execution**: تشغيل التعليمات داخل Execution Context على Call Stack.

<PhotoRenderer imageUrl="/images/advanced-js/engine-pipeline.png" altText="مراحل عمل محرك جافاسكربت" caption="من نص الكود إلى التنفيذ الفعلي داخل المحرك." />

### Creation Phase و Execution Phase
قبل التنفيذ، يتم تجهيز البيئات:
- تسجيل تعريفات الدوال.
- إنشاء bindings للمتغيرات.
- تعيين var إلى undefined مبدئيا.
- وضع let و const في TDZ حتى سطر التعريف.

<CodeBlock language="javascript">
// الخطوة 1: global context تم إنشاؤه.
console.log(total); // undefined لأن var تم تسجيله مسبقا.

// console.log(rate); // ReferenceError لأن let داخل TDZ قبل التعريف.

var total = 100; // الخطوة 2: التعيين يحدث أثناء التنفيذ.
let rate = 0.15; // الخطوة 3: خرجت من TDZ.

function calcTax() {
  // الخطوة 4: إنشاء function execution context جديد.
  const tax = total * rate;
  return tax;
}

console.log(calcTax()); // الخطوة 5: push ثم pop من الـ stack.
</CodeBlock>

<InfoCallout type="warning" title="خطأ شائع">
Hoisting لا يعني نقل السطر للأعلى. المقصود هو إنشاء binding مبكرا في مرحلة التهيئة. الفرق الحقيقي في حالة binding: هل هو initialized أم لا.
</InfoCallout>
`,
    practicalExercise: `
ابن أداة صغيرة اسمها Runtime Trace:
- اكتب 5 دوال تستدعي بعضها.
- دوّن توقعك لترتيب stack frame قبل التنفيذ.
- أضف أمثلة var و let و const و function declaration و function expression.
- صنّف كل سطر: قيمة، undefined، ReferenceError، TypeError.

معيار النجاح:
- تتطابق التوقعات مع النتائج.
- تشرح أي فرق باستخدام creation phase و TDZ.
`,
  },
  {
    id: 'adv-js-2',
    title: 'بيئة المتصفح و Window Object (DOM و Web APIs)',
    description:
      'فهم الحدود بين لغة JavaScript نفسها وبين APIs التي يوفرها المتصفح.',
    objectives: [
      'التفريق بين اللغة الأساسية وBrowser Host APIs.',
      'شرح دور window و document في تطبيقات الويب.',
      'كتابة كود أقل اقترانا بالمتصفح وأكثر قابلية للاختبار.',
    ],
    deepDiveTheory: `
### JavaScript ليست DOM
لغة JavaScript لا تحتوي document أو fetch بحد ذاتها. هذه تأتي من البيئة المضيفة (المتصفح). لذلك يجب التفريق بين منطق اللغة ومنطق المنصة.

<PhotoRenderer imageUrl="/images/advanced-js/browser-host-model.png" altText="علاقة المحرك بواجهات المتصفح" caption="المحرك ينفذ اللغة، والمتصفح يضيف Web APIs مثل DOM و fetch." />

### دور window
الكائن window يمثل:
- الglobal object في المتصفح.
- بوابة الوصول إلى APIs مثل history و location و timers.
- مساحة خطرة إذا لوثتها بمتغيرات عامة كثيرة.

<CodeBlock language="javascript">
// الخطوة 1: قراءة معلومات من host APIs.
console.log(window.location.href);
console.log(document.title);

// الخطوة 2: globalThis يوفر نقطة موحدة عبر البيئات.
console.log(globalThis === window); // true في browser main thread

// الخطوة 3: تجنب تلويث الـ global scope.
const appConfig = { apiBase: '/api' };
</CodeBlock>

### لماذا هذا مهم في هندسة المشروع؟
عزل منطق الأعمال عن DOM يجعل الاختبار أسهل وإعادة الاستخدام أعلى. يمكنك تشغيل المنطق نفسه في Node أو اختبارات unit بدون متصفح كامل.

<InfoCallout type="info" title="ملاحظة هندسية">
اكتب core logic كدوال pure قدر الإمكان، واجعل التعامل مع window/document في طبقة adapter منفصلة.
</InfoCallout>
`,
    practicalExercise: `
أنشئ mini app من طبقتين:
- طبقة logic: تحويل بيانات الطلاب (بدون DOM).
- طبقة browser adapter: fetch + render داخل الصفحة.

المطلوب:
- listener واحد delegated.
- logging واضح لكل async boundary.
`,
  },
  {
    id: 'adv-js-3',
    title: 'الدوال المتقدمة و Closures (Lexical Scope, Currying, Debouncing)',
    description:
      'توظيف closures لبناء abstractions قوية مع التحكم في الأداء وإدارة الذاكرة.',
    objectives: [
      'فهم lexical scope كقانون ربط المتغيرات.',
      'استخدام currying لبناء دوال قابلة لإعادة التخصيص.',
      'بناء debounce عملي وتفسير أثره على الأداء.',
    ],
    deepDiveTheory: `
### Lexical Scope
الوصول للمتغيرات يعتمد على مكان كتابة الدالة، لا مكان استدعائها. لذلك closure يمكنه الاحتفاظ بمرجع لمتغيرات خارجية حتى بعد انتهاء الدالة الخارجية.

<PhotoRenderer imageUrl="/images/advanced-js/closure-scope-chain.png" altText="سلسلة النطاقات في closures" caption="الدالة الداخلية تحتفظ بمراجع للنطاق الخارجي." />

<CodeBlock language="javascript">
function createCounter(start) {
  // الخطوة 1: متغير محلي سيبقى بسبب closure.
  let value = start;

  return function increment() {
    // الخطوة 2: كل نداء يقرأ ويعدّل القيمة المحتفظ بها.
    value += 1;
    return value;
  };
}

const inc = createCounter(0);
console.log(inc()); // 1
console.log(inc()); // 2
</CodeBlock>

### Currying
يسمح لك بتحويل دالة متعددة الوسائط إلى سلسلة دوال أحادية، مما يسهل التكوين وإعادة الاستخدام.

<CodeBlock language="javascript">
function multiply(a) {
  // الخطوة 1: نثبت العامل الأول.
  return function (b) {
    // الخطوة 2: نستخدمه لاحقا.
    return a * b;
  };
}

const double = multiply(2);
console.log(double(21)); // 42
</CodeBlock>

### Debounce
يمنع تشغيل handler في كل keypress، وينتظر فترة هدوء.

<CodeBlock language="javascript">
function debounce(fn, delayMs) {
  let timerId = null; // الخطوة 1: محفوظ في closure.

  return function () {
    const args = arguments;
    const context = this;

    if (timerId !== null) {
      clearTimeout(timerId); // الخطوة 2: إلغاء الموعد السابق.
    }

    timerId = setTimeout(function () {
      // الخطوة 3: تنفيذ آخر نداء فقط.
      fn.apply(context, args);
    }, delayMs);
  };
}
</CodeBlock>

<InfoCallout type="warning" title="خطر تسريب الذاكرة">
إذا احتفظ closure بعناصر DOM ضخمة داخل listeners طويلة العمر، فقد لا تتحرر الذاكرة. نظّف listeners عند unmount أو teardown.
</InfoCallout>
`,
    practicalExercise: `
ابن Search Box احترافي:
- debounce من الصفر.
- تجاهل الاستجابات القديمة stale responses.
- حالات UI واضحة: typing/loading/success/error.
`,
  },
  {
    id: 'adv-js-4',
    title: 'DOM متقدم و Event Delegation (Bubbling, Capturing)',
    description:
      'بناء نظام أحداث قابل للتوسع باستخدام فهم عميق لمسار propagation.',
    objectives: [
      'شرح مراحل capture و target و bubble بدقة.',
      'تطبيق event delegation في واجهات ديناميكية.',
      'استخدام stopPropagation و preventDefault بحذر.',
    ],
    deepDiveTheory: `
### نموذج انتشار الأحداث
الحدث غالبا يمر بثلاث مراحل:
1. Capture من الجذر إلى الهدف.
2. Target عند العنصر المستهدف.
3. Bubble صعودا إلى الأسلاف.

<PhotoRenderer imageUrl="/images/advanced-js/event-propagation-phases.png" altText="مراحل انتشار الحدث" caption="المتصفح يمرر الحدث نزولا ثم صعودا حول العنصر الهدف." />

### Event Delegation
بدلا من listener لكل عنصر، نضع listener واحد على parent ثابت ونحدد action عبر data attributes.

<CodeBlock language="javascript">
const list = document.querySelector('[data-list]');

list.addEventListener('click', function (event) {
  // الخطوة 1: التقاط العنصر الفعلي صاحب الإجراء.
  const button = event.target.closest('[data-action]');
  if (!button || !list.contains(button)) return;

  const action = button.dataset.action;
  const item = button.closest('[data-item-id]');
  if (!item) return;

  // الخطوة 2: routing حسب نوع الإجراء.
  if (action === 'delete') {
    item.remove();
  } else if (action === 'toggle') {
    item.classList.toggle('is-active');
  }
});
</CodeBlock>

<InfoCallout type="warning" title="تفصيلة مهمة">
بعض الأحداث لا bubble بالطريقة المعتادة مثل focus/blur. استخدم focusin/focusout أو capture listeners حسب الحالة.
</InfoCallout>
`,
    practicalExercise: `
نفذ لوحة مهام Kanban:
- إضافة/حذف بطاقات ديناميكيا.
- listener واحد لكل عمود.
- أزرار أفعال متعددة عبر data-action.
`,
  },
  {
    id: 'adv-js-5',
    title: 'Prototypes و Prototypal Inheritance (Constructor functions, this)',
    description:
      'فهم وراثة JavaScript الحقيقية عبر prototype chain وقواعد this في الاستدعاء.',
    objectives: [
      'شرح آلية property lookup عبر prototype chain.',
      'استخدام constructor functions بطريقة صحيحة.',
      'التحكم في this عبر call/apply/bind وأنماط الاستدعاء.',
    ],
    deepDiveTheory: `
### الوراثة في JavaScript
لا يوجد نسخ خصائص بطريقة class التقليدية؛ يوجد delegation عبر سلسلة prototype.

<PhotoRenderer imageUrl="/images/advanced-js/prototype-chain-map.png" altText="خريطة prototype chain" caption="إذا لم توجد الخاصية على الكائن الحالي، يبحث المحرك للأعلى في السلسلة." />

<CodeBlock language="javascript">
function User(name) {
  // الخطوة 1: مع new يصبح this كائنا جديدا.
  this.name = name;
}

// الخطوة 2: method مشتركة على prototype.
User.prototype.describe = function () {
  return 'User: ' + this.name;
};

const u1 = new User('Ali');
const u2 = new User('Sara');

console.log(u1.describe());
console.log(u1.describe === u2.describe); // true
</CodeBlock>

### this يعتمد على call-site
- obj.fn() => this = obj
- fn() => this = undefined في strict mode
- new Fn() => this = instance جديد
- bind() => this مثبت

<InfoCallout type="info" title="قاعدة ذهبية">
لا تسأل: أين كُتبت الدالة؟ اسأل: كيف تم استدعاؤها؟ هذا يحدد this.
</InfoCallout>
`,
    practicalExercise: `
ابن model layer بدون classes:
- User و Teacher و Student عبر constructor/prototype.
- methods مشتركة على prototype.
- معالجة this عند تمرير methods كـ callbacks.
`,
  },
  {
    id: 'adv-js-6',
    title: 'OOP الحديثة بـ ES6 Classes (Encapsulation, Extends)',
    description:
      'استخدام class syntax بوعي مع فهم أنها واجهة نحوية فوق prototype system.',
    objectives: [
      'تصميم classes بحدود مسؤولية واضحة.',
      'استخدام private fields و static methods بشكل صحيح.',
      'تطبيق extends/super وتقييم متى composition أفضل.',
    ],
    deepDiveTheory: `
### Classes ليست سحرا جديدا
class تمنح syntax أنظف، لكن المشاركة السلوكية ما زالت عبر prototype.

<PhotoRenderer imageUrl="/images/advanced-js/class-to-prototype.png" altText="تحويل class إلى constructor/prototype" caption="class syntax تنظيمي أكثر، لكن الأساس ما زال prototypal." />

<CodeBlock language="javascript">
class Account {
  #balance;

  constructor(owner, initial) {
    this.owner = owner;
    this.#balance = initial;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Invalid amount');
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }

  static fromJSON(data) {
    return new Account(data.owner, data.balance);
  }
}
</CodeBlock>

<CodeBlock language="javascript">
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + ' makes a sound';
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return super.speak() + ' - woof';
  }
}
</CodeBlock>

<InfoCallout type="warning" title="متى لا تستخدم الوراثة؟">
إذا كانت العلاقة ليست "is-a" بشكل واضح، غالبا composition أفضل لتقليل الاقتران.
</InfoCallout>
`,
    practicalExercise: `
ابن Notification System:
- Base class + قنوات متخصصة Email/SMS/Push.
- private queue لكل instance.
- static factory من إعدادات JSON.
`,
  },
  {
    id: 'adv-js-7',
    title: 'Event Loop و Callbacks (Task Queue, Single-threaded Execution)',
    description:
      'فهم جدولة تنفيذ callbacks وتأثير الكود المتزامن الثقيل على استجابة الواجهة.',
    objectives: [
      'شرح العلاقة بين call stack و task queue و event loop.',
      'تحليل سبب تأخر callbacks عند وجود blocking work.',
      'تطبيق chunking لتقليل تجميد الواجهة.',
    ],
    deepDiveTheory: `
### القاعدة الأساسية
callback لا ينفذ إلا عندما يصبح call stack فارغا. أي عملية synchronous ثقيلة تؤخر كل شيء خلفها.

<PhotoRenderer imageUrl="/images/advanced-js/event-loop-callback-cycle.png" altText="دورة event loop" caption="الـ event loop لا يدفع callback للتنفيذ قبل فراغ الـ stack." />

<CodeBlock language="javascript">
console.log('A start');

setTimeout(function () {
  // الخطوة 4: task queue callback
  console.log('D timeout');
}, 0);

// الخطوة 2: عمل متزامن ثقيل
const t = Date.now();
while (Date.now() - t < 250) {
  // busy wait (للتوضيح فقط)
}

console.log('C end sync'); // الخطوة 3
</CodeBlock>

### Chunking
قسّم الأعمال الثقيلة إلى دفعات صغيرة مع yield بين الدفعات.

<CodeBlock language="javascript">
function processInChunks(items, chunkSize) {
  let index = 0;

  function run() {
    const end = Math.min(index + chunkSize, items.length);
    while (index < end) {
      items[index] *= 2;
      index += 1;
    }

    if (index < items.length) {
      setTimeout(run, 0); // yield للمتصفح
    }
  }

  run();
}
</CodeBlock>

<InfoCallout type="warning" title="Long Task">
أي مهمة طويلة على main thread قد تؤخر input والrender وتسبب lag ملحوظ للمستخدم.
</InfoCallout>
`,
    practicalExercise: `
ابن صفحة مقارنة:
- زر يشغل blocking loop.
- زر يشغل نفس العمل بنمط chunking.
- سجل timeline لترتيب التنفيذ.
`,
  },
  {
    id: 'adv-js-8',
    title: 'Promises و Fetch API (Microtask Queue, API Requests)',
    description:
      'بناء تدفقات async قوية عبر promises مع فهم ترتيب microtasks مقابل tasks.',
    objectives: [
      'شرح حالات promise وسلوك then/catch/finally.',
      'فهم أولوية microtask queue مقارنة بـ task queue.',
      'كتابة fetch wrapper يعالج أخطاء HTTP بشكل صريح.',
    ],
    deepDiveTheory: `
### Promise كممثل لقيمة مستقبلية
promise تمر بحالات: pending ثم fulfilled أو rejected. مع then/catch نبني pipeline واضحا.

<PhotoRenderer imageUrl="/images/advanced-js/microtask-vs-task.png" altText="microtask مقابل task" caption="ردود promises تنفذ في microtask قبل callbacks الموجودة في task queue." />

<CodeBlock language="javascript">
console.log('1 sync start');

setTimeout(function () {
  console.log('4 timeout task');
}, 0);

Promise.resolve().then(function () {
  console.log('3 promise microtask');
});

console.log('2 sync end');
</CodeBlock>

### fetch لا يرفض دائما
fetch يرفض عند network failure، لكنه لا يرفض تلقائيا عند HTTP 404/500. يجب فحص response.ok.

<CodeBlock language="javascript">
function fetchJSON(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        const err = new Error('HTTP ' + response.status);
        err.status = response.status;
        throw err;
      }
      return response.json();
    });
}
</CodeBlock>

<InfoCallout type="info" title="قاعدة chaining">
داخل then، أعد return للقيم أو promises دائما. نسيان return يخلق تدفقات undefined صعبة التتبع.
</InfoCallout>
`,
    practicalExercise: `
ابن Dashboard loader:
- تحميل 3 endpoints بالتوازي.
- استخدام Promise.allSettled لعرض النتائج الجزئية.
- retry بسيط مع backoff للأخطاء المؤقتة.
`,
  },
  {
    id: 'adv-js-9',
    title: 'Async/Await و Error Handling (try/catch)',
    description:
      'تحويل تدفقات promise إلى async/await مع إدارة أخطاء طبقية واضحة.',
    objectives: [
      'التمييز بين sequential await و parallel await.',
      'تطبيق try/catch/finally بنمط domain errors.',
      'منع unhandled rejections في المسارات الحرجة.',
    ],
    deepDiveTheory: `
### async/await = syntax فوق promises
الدالة async تعيد Promise دائما. await يوقف الدالة async نفسها مؤقتا حتى settle.

<PhotoRenderer imageUrl="/images/advanced-js/async-await-flow.png" altText="مسار await المتسلسل مقابل المتوازي" caption="تشغيل طلبات مستقلة بالتوازي يخفض زمن الاستجابة الكلي." />

<CodeBlock language="javascript">
async function loadParallel(api) {
  // الخطوة 1: بدء الطلبات معا.
  const userPromise = api.getUser();
  const coursesPromise = api.getCourses();

  // الخطوة 2: انتظار النتيجتين.
  const [user, courses] = await Promise.all([userPromise, coursesPromise]);
  return { user, courses };
}
</CodeBlock>

<CodeBlock language="javascript">
class DataLoadError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'DataLoadError';
    this.cause = cause;
  }
}

async function fetchProfile(id) {
  try {
    const response = await fetch('/api/profile/' + id);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } catch (error) {
    throw new DataLoadError('Failed to load profile', error);
  } finally {
    console.log('fetchProfile done');
  }
}
</CodeBlock>

<InfoCallout type="warning" title="Unhandled Rejections">
استدعاء async function بدون await أو catch قد يولد unhandled rejection يسبب سلوكا غير متوقع.
</InfoCallout>
`,
    practicalExercise: `
ابن شاشة ملف شخصي:
- تحميل profile + activity + notifications.
- إلغاء الطلبات القديمة عند تغيير المستخدم.
- رسائل خطأ مفهومة للمستخدم مع logging تقني مفصل.
`,
  },
  {
    id: 'adv-js-10',
    title: 'Web APIs و Local Storage (Persistence, JSON Serialization)',
    description:
      'تصميم تخزين عميل موثوق مع versioning و migration واسترداد آمن للبيانات.',
    objectives: [
      'استخدام localStorage بشكل صحيح مع serialization واضح.',
      'تصميم schema versioning ومجرى migration.',
      'معرفة القيود الأمنية والأدائية للتخزين المحلي.',
    ],
    deepDiveTheory: `
### خصائص localStorage
- تخزين نصي فقط.
- synchronous (قد يحجب main thread عند البيانات الكبيرة).
- دائم على مستوى origin.

<PhotoRenderer imageUrl="/images/advanced-js/storage-lifecycle.png" altText="دورة التخزين المحلي" caption="التخزين الموثوق يمر عبر serialize ثم validate ثم migrate عند اللزوم." />

<CodeBlock language="javascript">
const KEY = 'app:prefs:v2';

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
</CodeBlock>

<InfoCallout type="warning" title="حدود أمنية">
لا تخزن أسرارا حساسة في localStorage. أي script يعمل على origin يمكنه قراءة القيم، خاصة في حالة XSS.
</InfoCallout>
`,
    practicalExercise: `
ابن persistent progress cache:
- تخزين تقدم الدروس مع timestamp.
- migration من v1 إلى v2.
- fallback آمن عند JSON فاسد.
`,
  },
  {
    id: 'adv-js-11',
    title: 'ES6 Modules وتنظيم الكود (import/export, file splitting)',
    description:
      'تقسيم المشروع إلى وحدات واضحة بعلاقات اعتماد صحية وقابلة للتوسع.',
    objectives: [
      'استخدام named/default exports بطريقة منضبطة.',
      'تطبيق dynamic import للتحميل الكسول.',
      'تجنب circular dependencies وتأثيراتها وقت التشغيل.',
    ],
    deepDiveTheory: `
### قيمة ESM
الوحدات في JavaScript الحديثة تمنحك dependency graph واضح، وتسمح للأدوات بتحسين bundle والتحقق الساكن.

<PhotoRenderer imageUrl="/images/advanced-js/module-graph.png" altText="رسم بياني لاعتماد الوحدات" caption="الاتجاه الصحي: UI تعتمد على application/domain وليس العكس." />

<CodeBlock language="javascript">
// math.js
export function sum(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// formatter.js
export default function formatCurrency(value) {
  return '$' + value.toFixed(2);
}

// consumer.js
import formatCurrency from './formatter.js';
import { sum } from './math.js';

console.log(formatCurrency(sum(10, 5)));
</CodeBlock>

<CodeBlock language="javascript">
async function openAnalytics() {
  // تحميل كسول عند الطلب فقط.
  const module = await import('./analyticsPanel.js');
  module.renderAnalyticsPanel();
}
</CodeBlock>

<InfoCallout type="warning" title="Circular Imports">
الدوران بين الملفات قد ينتج bindings غير مهيأة وقت التقييم. اكسر الدورة بنقل العقود المشتركة إلى طبقة أدنى.
</InfoCallout>
`,
    practicalExercise: `
أعد هيكلة feature كبيرة:
- فصلها إلى 5 وحدات على الأقل.
- إضافة lazy-loaded module.
- منع أي side effects في utilities.
`,
  },
  {
    id: 'adv-js-12',
    title: 'مشروع تكاملي نهائي (بناء SPA كاملة)',
    description:
      'دمج كل المفاهيم المتقدمة في تطبيق واحد قابل للصيانة وسريع الاستجابة.',
    objectives: [
      'تطبيق مفاهيم runtime وasync وmodules في بنية SPA حقيقية.',
      'تصميم تدفق بيانات مع معالجة أخطاء وpersistence موثوقين.',
      'تقييم الأداء والجودة وفق معايير هندسية واضحة.',
    ],
    deepDiveTheory: `
### هدف المشروع النهائي
بناء SPA تعليمية تجمع:
- routing واضح.
- state management منظم.
- API client resilient.
- persistence مع schema versioning.
- UI تفاعلية بدون اختناقات.

<PhotoRenderer imageUrl="/images/advanced-js/spa-architecture-capstone.png" altText="معمارية مشروع SPA" caption="معمارية طبقية تفصل بين العرض والمنطق والبنية التحتية." />

<CodeBlock language="javascript">
import { createRouter } from './router.js';
import { createStore } from './store.js';
import { createApiClient } from './apiClient.js';
import { createPersistence } from './persistence.js';
import { renderApp } from './ui/renderApp.js';

export async function bootstrap() {
  // الخطوة 1: تهيئة طبقات البنية.
  const api = createApiClient({ baseUrl: '/api' });
  const persistence = createPersistence({ key: 'spa:state:v1' });

  // الخطوة 2: hydration للحالة المحفوظة.
  const initialState = persistence.load() || { user: null, lessons: [] };

  // الخطوة 3: إنشاء store.
  const store = createStore(initialState);

  // الخطوة 4: ربط التوجيه بالرندر.
  const router = createRouter(function (route) {
    renderApp({ route, store, api });
  });

  // الخطوة 5: حفظ الحالة تلقائيا.
  store.subscribe(function (state) {
    persistence.save(state);
  });

  router.start();
}
</CodeBlock>

<InfoCallout type="info" title="معيار الجودة النهائي">
اعتبر المشروع Portfolio-grade: حدود واضحة بين الطبقات، أخطاء مُدارة بوضوح، وتجربة مستخدم سريعة حتى تحت الضغط.
</InfoCallout>
`,
    practicalExercise: `
ابن Learning Tracker SPA كاملة تتضمن:
- تسجيل دخول mock.
- قائمة دروس مع بحث debounced.
- صفحة تفاصيل درس بتحميل async.
- حفظ التقدم في localStorage مع migration.
- Dashboard محمّل lazy.
- Error banner عالمي مع retry.
`,
  },
];
