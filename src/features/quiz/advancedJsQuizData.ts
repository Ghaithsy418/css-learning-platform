import type { QuizQuestionData } from './QuizQuestion';

export interface AdvancedLessonQuizConfig {
  lessonId: string;
  lessonTitle: string;
  questions: QuizQuestionData[];
}

export const advancedJsQuizzes: Record<string, AdvancedLessonQuizConfig> = {
  'adv-js-1': {
    lessonId: 'adv-js-1',
    lessonTitle: 'How JavaScript Works Behind the Scenes',
    questions: [
      {
        question: 'في أي مرحلة يتم إنشاء bindings للمتغيرات والدوال؟',
        options: [
          'مرحلة التنفيذ فقط',
          'مرحلة إنشاء execution context',
          'بعد أول console.log',
          'داخل event loop',
        ],
        correctIndex: 1,
        explanation:
          'في creation phase يتم تجهيز bindings قبل التنفيذ الفعلي للأسطر.',
      },
      {
        question: 'ما سبب ظهور undefined عند قراءة var قبل التعيين؟',
        options: [
          'لأن var لا تُحفظ في الذاكرة',
          'لأن binding موجود ومهيأ مبدئيا بـ undefined',
          'لأن JavaScript تتجاهل السطر',
          'لأن stack ممتلئ',
        ],
        correctIndex: 1,
        explanation: 'var يتم hoisting له مع initialization إلى undefined.',
      },
      {
        question: 'ما الذي يحدث مع let/const قبل سطر التعريف؟',
        options: [
          'تُرجع null',
          'تُرجع undefined',
          'تسبب ReferenceError بسبب TDZ',
          'تسبب SyntaxError دائما',
        ],
        correctIndex: 2,
        explanation: 'binding موجود لكنه غير مهيأ داخل TDZ.',
      },
      {
        question: 'ما الوظيفة الأساسية للـ call stack؟',
        options: [
          'تخزين بيانات localStorage',
          'جدولة microtasks',
          'إدارة ترتيب استدعاء الدوال أثناء التنفيذ',
          'تحويل AST إلى bytecode',
        ],
        correctIndex: 2,
        explanation: 'الـ call stack يدير push/pop لإطارات الدوال.',
      },
      {
        question: 'أي تعريف يكون callable قبل سطره عادة؟',
        options: [
          'function declaration',
          'function expression بـ let',
          'arrow function في متغير const',
          'class expression',
        ],
        correctIndex: 0,
        explanation: 'function declaration يتم hoisting له بقيمته الدالية.',
      },
      {
        question: 'أي حالة تؤدي غالبا إلى stack overflow؟',
        options: [
          'حلقة for قصيرة',
          'Promise.then',
          'استدعاء recursive بدون شرط توقف',
          'استخدام const',
        ],
        correctIndex: 2,
        explanation: 'الاستدعاء التكراري غير المنتهي يكدس frames حتى الانهيار.',
      },
    ],
  },
  'adv-js-2': {
    lessonId: 'adv-js-2',
    lessonTitle: 'Closures + Timers',
    questions: [
      {
        question: 'أي كائن يمثل global object في browser main thread؟',
        options: ['process', 'window', 'module', 'fs'],
        correctIndex: 1,
        explanation: 'في المتصفح، window هو global object التقليدي.',
      },
      {
        question: 'أي من التالي هو Web API من المتصفح وليس من اللغة الأساسية؟',
        options: ['Array.map', 'Promise', 'setTimeout', 'Object.keys'],
        correctIndex: 2,
        explanation: 'setTimeout API مقدم من host environment (المتصفح).',
      },
      {
        question: 'ما الفرق الصحيح بين JavaScript engine و DOM؟',
        options: [
          'لا فرق',
          'DOM جزء من syntax اللغة',
          'المحرك ينفذ اللغة و DOM API من المتصفح',
          'DOM خاص بـ Node.js',
        ],
        correctIndex: 2,
        explanation:
          'DOM تمثيل مستند يقدمه المتصفح، وليس جزءا من core language.',
      },
      {
        question: 'في ESM، هل top-level const يصبح window property افتراضيا؟',
        options: [
          'نعم دائما',
          'لا في العادة',
          'فقط في strict mode',
          'فقط داخل React',
        ],
        correctIndex: 1,
        explanation: 'Bindings في modules تكون module-scoped غالبا.',
      },
      {
        question: 'ما خطر accidental globals؟',
        options: [
          'تحسن الأداء',
          'تزيد isolation',
          'تلوث namespace وتزيد الاقتران',
          'تمنع الأخطاء',
        ],
        correctIndex: 2,
        explanation: 'implicit globals تجعل الصيانة والاختبار أصعب.',
      },
      {
        question: 'أي نهج أفضل لبناء كود قابل للاختبار؟',
        options: [
          'خلط business logic مع DOM مباشرة',
          'عزل core logic عن window/document',
          'تخزين كل شيء في window',
          'استخدام alert كواجهة',
        ],
        correctIndex: 1,
        explanation: 'فصل المنطق عن host APIs يحسن الاختبار وإعادة الاستخدام.',
      },
    ],
  },
  'adv-js-3': {
    lessonId: 'adv-js-3',
    lessonTitle: 'Advanced Functions & Closures',
    questions: [
      {
        question: 'ما الذي يحدد lexical scope؟',
        options: [
          'مكان الاستدعاء',
          'مكان كتابة الدالة في الكود',
          'سرعة المتصفح',
          'نوع المتغير فقط',
        ],
        correctIndex: 1,
        explanation: 'lexical scope يعتمد على بنية الكود عند الكتابة.',
      },
      {
        question: 'ما هو closure بدقة؟',
        options: [
          'دالة بدون return',
          'دالة + مراجع لبيئتها الخارجية',
          'أي callback',
          'دالة داخل for فقط',
        ],
        correctIndex: 1,
        explanation:
          'closure يحتفظ بالوصول للـ outer bindings بعد عودة الدالة الخارجية.',
      },
      {
        question: 'ما فائدة currying؟',
        options: [
          'تقليل الذاكرة دائما',
          'تحويل دالة متعددة الوسائط لسلسلة دوال أحادية',
          'إلغاء الحاجة للمعاملات',
          'إيقاف async',
        ],
        correctIndex: 1,
        explanation: 'currying يساعد في composition وإعادة التخصيص.',
      },
      {
        question: 'debounce يُستخدم أساسا لـ:',
        options: [
          'تشغيل handler على كل keypress',
          'تأخير التنفيذ حتى فترة هدوء',
          'زيادة عدد requests',
          'إيقاف event loop',
        ],
        correctIndex: 1,
        explanation: 'debounce يقلل الاستدعاءات المتكررة السريعة.',
      },
      {
        question: 'أي خطر شائع مع closures طويلة العمر؟',
        options: [
          'SyntaxError',
          'Memory leaks بسبب مراجع محتفظ بها',
          'منع rendering نهائيا',
          'إلغاء hoisting',
        ],
        correctIndex: 1,
        explanation: 'الاحتفاظ بمراجع كبيرة دون cleanup قد يمنع GC.',
      },
      {
        question: 'أي خيار يصف partial application؟',
        options: [
          'استدعاء دالة بدون args',
          'تثبيت جزء من args لإنتاج دالة جديدة',
          'تحويل Promise إلى async',
          'حذف closure',
        ],
        correctIndex: 1,
        explanation: 'تثبيت بعض القيم يعطي function specialized.',
      },
    ],
  },
  'adv-js-4': {
    lessonId: 'adv-js-4',
    lessonTitle: 'Advanced DOM & Event Delegation',
    questions: [
      {
        question: 'ترتيب مراحل الحدث الصحيح غالبا هو:',
        options: [
          'bubble -> target -> capture',
          'capture -> target -> bubble',
          'target -> capture -> bubble',
          'target فقط',
        ],
        correctIndex: 1,
        explanation: 'الحدث يهبط capture ثم target ثم يصعد bubble.',
      },
      {
        question: 'الفائدة الأساسية من event delegation:',
        options: [
          'زيادة listeners على كل عنصر',
          'listener واحد على parent لعناصر ديناميكية',
          'منع bubbling',
          'استبدال CSS',
        ],
        correctIndex: 1,
        explanation: 'delegation أسهل في الصيانة وأكثر كفاءة مع DOM ديناميكي.',
      },
      {
        question: 'ما الفرق بين preventDefault و stopPropagation؟',
        options: [
          'لا فرق',
          'الأول يلغي default behavior والثاني يوقف الانتشار',
          'الأول يوقف stack والثاني يوقف network',
          'الأول للأحداث الكيبورد فقط',
        ],
        correctIndex: 1,
        explanation: 'لكل منهما وظيفة مختلفة ويجب استخدامهما بحذر.',
      },
      {
        question: 'أي أسلوب شائع مع delegation لتحديد العنصر المستهدف؟',
        options: [
          'event.find()',
          'event.target.closest(selector)',
          'document.all',
          'window.target',
        ],
        correctIndex: 1,
        explanation: 'closest مع event.target أسلوب قياسي.',
      },
      {
        question: 'أي حدث مشهور بعدم bubble التقليدي؟',
        options: ['click', 'focus', 'input', 'keydown'],
        correctIndex: 1,
        explanation: 'focus/blur يحتاجان تعاملا خاصا مثل focusin/focusout.',
      },
      {
        question: 'capture listener يُنفذ عادة:',
        options: [
          'بعد target دائما',
          'قبل bubble على طريق النزول',
          'خارج event loop',
          'مرة واحدة فقط',
        ],
        correctIndex: 1,
        explanation: 'capture phase تسبق target/bubble في المسار النازل.',
      },
    ],
  },
  'adv-js-5': {
    lessonId: 'adv-js-5',
    lessonTitle: 'Prototypes & Prototypal Inheritance',
    questions: [
      {
        question: 'عند عدم وجود خاصية على object نفسه، ماذا يحدث؟',
        options: [
          'يرجع null فورا',
          'يبحث في prototype chain',
          'يحصل SyntaxError',
          'يبحث في localStorage',
        ],
        correctIndex: 1,
        explanation: 'lookup يتجه للأعلى عبر [[Prototype]].',
      },
      {
        question: 'الفائدة من وضع method على Constructor.prototype:',
        options: [
          'نسخ method لكل instance',
          'مشاركة method بين كل instances',
          'منع this',
          'تسريع JSON',
        ],
        correctIndex: 1,
        explanation: 'method واحدة مشتركة بدلا من نسخ متعددة.',
      },
      {
        question: 'قاعدة this الصحيحة في JavaScript التقليدي:',
        options: [
          'يتحدد عند تعريف الدالة',
          'يتحدد من call-site غالبا',
          'دائما window',
          'دائما undefined',
        ],
        correctIndex: 1,
        explanation: 'طريقة الاستدعاء هي العامل الحاسم في this.',
      },
      {
        question: 'bind يفعل ماذا؟',
        options: [
          'يشغل الدالة فورا',
          'يربط this بقيمة ثابتة ويرجع دالة جديدة',
          'يحذف prototype',
          'يحول الدالة لسهميّة',
        ],
        correctIndex: 1,
        explanation: 'bind ينشئ نسخة مرتبطة بـ this محدد.',
      },
      {
        question: 'أي عبارة صحيحة حول arrow function و this؟',
        options: [
          'لها this ديناميكي',
          'تورث this lexically من النطاق الخارجي',
          'this فيها = window دائما',
          'لا يمكن استخدامها مع callbacks',
        ],
        correctIndex: 1,
        explanation: 'arrow لا تنشئ this خاصا بها.',
      },
      {
        question: 'new Fn() يؤدي إلى:',
        options: [
          'تجاهل this',
          'this يشير لـ object جديد مرتبط بـ Fn.prototype',
          'SyntaxError دائما',
          'إرجاع null',
        ],
        correctIndex: 1,
        explanation: 'هذا جوهر constructor call behavior.',
      },
    ],
  },
  'adv-js-6': {
    lessonId: 'adv-js-6',
    lessonTitle: 'Modern OOP with ES6 Classes',
    questions: [
      {
        question: 'class في JavaScript هي غالبا:',
        options: [
          'نظام مختلف كليا عن prototypes',
          'واجهة نحوية فوق النموذج prototypal',
          'غير مدعومة في ES6',
          'خاصة بـ TypeScript فقط',
        ],
        correctIndex: 1,
        explanation: 'class syntax أسهل لكنها تعتمد على prototypes تحت الغطاء.',
      },
      {
        question: 'ما فائدة private field مثل #balance؟',
        options: [
          'تسريع loops',
          'منع الوصول المباشر من خارج class body',
          'جعل القيمة global',
          'منع inheritance',
        ],
        correctIndex: 1,
        explanation: '# fields توفر encapsulation أقوى.',
      },
      {
        question: 'داخل subclass constructor، super() يجب أن يُستدعى:',
        options: [
          'بعد استخدام this',
          'قبل استخدام this',
          'ليس ضروريا',
          'فقط مع static methods',
        ],
        correctIndex: 1,
        explanation: 'في classes المشتقة يجب استدعاء super قبل this.',
      },
      {
        question: 'static method تُستدعى عادة عبر:',
        options: [
          'instance.method()',
          'ClassName.method()',
          'window.method()',
          'constructor.prototype مباشرة',
        ],
        correctIndex: 1,
        explanation: 'static methods مرتبطة بالكلاس نفسه.',
      },
      {
        question: 'متى composition غالبا أفضل من inheritance؟',
        options: [
          'عندما نحتاج سلوك مرن قابل للتركيب',
          'دائما inheritance أفضل',
          'في classes الصغيرة فقط',
          'composition لا يعمل في JS',
        ],
        correctIndex: 0,
        explanation:
          'composition يقلل الاقتران خاصة مع سلوك قابل لإعادة الدمج.',
      },
      {
        question: 'أين توضع mutable instance state عادة؟',
        options: [
          'على prototype مباشرة',
          'داخل constructor أو private fields',
          'في static property عامة',
          'في global variable',
        ],
        correctIndex: 1,
        explanation: 'تجنب وضع state mutable مشتركة على prototype.',
      },
    ],
  },
  'adv-js-7': {
    lessonId: 'adv-js-7',
    lessonTitle: 'The Event Loop & Callbacks',
    questions: [
      {
        question: 'متى يمكن callback من task queue أن ينفذ؟',
        options: [
          'فورا مهما كان stack',
          'عندما يصبح call stack فارغا',
          'قبل sync code',
          'بعد كل repaint فقط',
        ],
        correctIndex: 1,
        explanation: 'الشرط الأساسي: stack يجب أن يكون فارغا.',
      },
      {
        question: 'لماذا يتأخر click handler أحيانا؟',
        options: [
          'لأن DOM بطيء فقط',
          'وجود long synchronous task يحجب main thread',
          'لأن setTimeout معطل',
          'بسبب hoisting',
        ],
        correctIndex: 1,
        explanation: 'long tasks تمنع event handling مؤقتا.',
      },
      {
        question: 'single-threaded في main JS يعني:',
        options: [
          'لا يوجد async أبدا',
          'frame واحد ينفذ تعليمات JS في كل لحظة',
          'لا توجد Web APIs',
          'لا توجد queues',
        ],
        correctIndex: 1,
        explanation:
          'تنفيذ JS نفسه وحيد المسار لكن البيئة تدعم async عبر queues.',
      },
      {
        question: 'أفضل حل لتقليل تجميد واجهة في عمل CPU كثيف:',
        options: [
          'زيادة console.log',
          'chunking أو Web Worker',
          'استخدام var بدلا من let',
          'إزالة try/catch',
        ],
        correctIndex: 1,
        explanation: 'تقسيم العمل أو نقله off-main-thread يحسن responsiveness.',
      },
      {
        question: 'setTimeout(fn, 0) يعني:',
        options: [
          'ينفذ قبل أي شيء',
          'ينفذ بعد انتهاء stack الحالي وفي أقرب task ممكن',
          'ينفذ في microtask',
          'يلغي event loop',
        ],
        correctIndex: 1,
        explanation: '0 لا يعني فوري؛ ما زال ينتظر queue/stack.',
      },
      {
        question: 'ما المقصود بـ long task غالبا؟',
        options: [
          'مهمة > 50ms تقريبا قد تؤثر على التفاعل',
          'أي Promise',
          'أي DOM query',
          'أي function recursive',
        ],
        correctIndex: 0,
        explanation: 'مهام طويلة على main thread تؤثر على input/render.',
      },
    ],
  },
  'adv-js-8': {
    lessonId: 'adv-js-8',
    lessonTitle: 'Promises & The Fetch API',
    questions: [
      {
        question: 'أي queue تنفذ فيها then callbacks عادة؟',
        options: [
          'task queue',
          'microtask queue',
          'render queue',
          'stack مباشرة',
        ],
        correctIndex: 1,
        explanation: 'promise reactions تتم في microtasks.',
      },
      {
        question: 'هل fetch يرفض Promise عند HTTP 404 تلقائيا؟',
        options: [
          'نعم',
          'لا، يجب فحص response.ok',
          'فقط في Chrome',
          'فقط مع JSON',
        ],
        correctIndex: 1,
        explanation:
          'fetch يرفض غالبا على network failure/abort، لا status codes فقط.',
      },
      {
        question: 'Promise.all behavior:',
        options: [
          'ينجح دائما',
          'يفشل فور أول rejection',
          'ينتظر فقط أول promise',
          'يرجع object فقط',
        ],
        correctIndex: 1,
        explanation: 'Promise.all fail-fast عند أول رفض.',
      },
      {
        question: 'Promise.allSettled مفيد عندما:',
        options: [
          'نحتاج الفشل الفوري',
          'نريد نتائج كل العمليات حتى الفاشلة',
          'نحتاج أول نجاح فقط',
          'نمنع microtasks',
        ],
        correctIndex: 1,
        explanation: 'allSettled يرجع outcomes لكل promises.',
      },
      {
        question: 'نسيان return داخل then قد يؤدي إلى:',
        options: [
          'SyntaxError',
          'سلسلة نتائج undefined أو غير متوقعة',
          'إلغاء promise',
          'تحويلها sync',
        ],
        correctIndex: 1,
        explanation: 'return مهم لاستمرار data flow في chain.',
      },
      {
        question: 'الترتيب الصحيح غالبا بعد stack الحالي:',
        options: [
          'tasks ثم microtasks',
          'microtasks ثم tasks',
          'render ثم stack',
          'random',
        ],
        correctIndex: 1,
        explanation: 'microtasks تُصرف قبل الانتقال للـ task التالي.',
      },
    ],
  },
  'adv-js-9': {
    lessonId: 'adv-js-9',
    lessonTitle: 'Async/Await & Error Handling',
    questions: [
      {
        question: 'async function ترجع:',
        options: [
          'قيمة عادية دائما',
          'Promise دائما',
          'undefined دائما',
          'callback',
        ],
        correctIndex: 1,
        explanation: 'الـ async function تلتف نتيجتها في Promise.',
      },
      {
        question: 'أفضل نمط لطلبات مستقلة متعددة:',
        options: [
          'await بالتسلسل دائما',
          'تشغيلها معا ثم await Promise.all',
          'setTimeout لكل طلب',
          'for..in فقط',
        ],
        correctIndex: 1,
        explanation:
          'parallel dispatch يقلل latency إذا لا يوجد اعتماد متبادل.',
      },
      {
        question: 'وظيفة finally في try/catch/finally:',
        options: [
          'يعمل فقط عند النجاح',
          'يعمل فقط عند الخطأ',
          'يعمل في الحالتين غالبا',
          'يلغي الخطأ',
        ],
        correctIndex: 2,
        explanation: 'finally مناسب للتنظيف وتحديث حالات loading.',
      },
      {
        question: 'Domain error wrapping مفيد لـ:',
        options: [
          'إخفاء كل تفاصيل الأخطاء',
          'إضافة سياق وظيفي فوق أخطاء منخفضة المستوى',
          'منع throw',
          'زيادة عدد catches',
        ],
        correctIndex: 1,
        explanation: 'لف الأخطاء يعطي رسائل أدق على مستوى المنتج/اليوزر.',
      },
      {
        question: 'عدم await أو catch لPromise مرفوض قد يسبب:',
        options: [
          'Automatic retry',
          'Unhandled rejection',
          'تحسين الأداء',
          'Static typing',
        ],
        correctIndex: 1,
        explanation: 'ينتج unhandled rejection ويجب منعه.',
      },
      {
        question: 'AbortController مفيد عندما:',
        options: [
          'نريد تضخيم payload',
          'نحتاج إلغاء requests القديمة/stale',
          'نريد sync fetch',
          'نريد منع caching',
        ],
        correctIndex: 1,
        explanation: 'يساعد في إلغاء الطلبات غير المرغوبة عند تغيّر السياق.',
      },
    ],
  },
  'adv-js-10': {
    lessonId: 'adv-js-10',
    lessonTitle: 'Web APIs & Local Storage',
    questions: [
      {
        question: 'localStorage يخزن القيم بصيغة:',
        options: ['objects مباشرة', 'strings', 'numbers فقط', 'binary only'],
        correctIndex: 1,
        explanation: 'أي قيمة يجب تحويلها إلى string غالبا عبر JSON.',
      },
      {
        question: 'أي عملية مطلوبة قبل حفظ object في localStorage؟',
        options: [
          'Object.keys',
          'JSON.stringify',
          'Array.map',
          'encodeURI فقط',
        ],
        correctIndex: 1,
        explanation: 'نستخدم JSON.stringify قبل setItem.',
      },
      {
        question: 'عند القراءة نحتاج عادة:',
        options: ['JSON.parse', 'parseInt دائما', 'split only', 'eval'],
        correctIndex: 0,
        explanation: 'القيمة المخزنة كنص تحتاج parse للتحويل لكائن.',
      },
      {
        question: 'أهم قيد أداء في localStorage:',
        options: [
          'async جدا',
          'synchronous وقد يحجب main thread',
          'لا يعمل مع strings',
          'غير دائم',
        ],
        correctIndex: 1,
        explanation: 'عمليات كبيرة قد تسبب jank لأنها sync.',
      },
      {
        question: 'لماذا نستخدم versioning في persisted data؟',
        options: [
          'لإبطاء التطبيق',
          'لدعم migrations عند تغير schema',
          'لمنع JSON',
          'لتقليل الأمن',
        ],
        correctIndex: 1,
        explanation: 'يسهل ترقية صيغة البيانات بأمان.',
      },
      {
        question: 'أي عبارة أمنية صحيحة عن localStorage؟',
        options: [
          'آمن لتخزين الأسرار دائما',
          'أي script على origin قد يقرأه',
          'مشفر تلقائيا end-to-end',
          'لا يتأثر بـ XSS',
        ],
        correctIndex: 1,
        explanation: 'لا تخزن secrets الحساسة في localStorage.',
      },
    ],
  },
  'adv-js-11': {
    lessonId: 'adv-js-11',
    lessonTitle: 'ES6 Modules & Code Organization',
    questions: [
      {
        question: 'ميزة أساسية لـ ESM:',
        options: [
          'لا يمكن تحليلها statically',
          'قابلة للتحليل الساكن وتحسين bundle',
          'لا تدعم imports',
          'تعمل فقط في Node',
        ],
        correctIndex: 1,
        explanation: 'ESM static graph يفيد tree-shaking والأدوات.',
      },
      {
        question: 'متى نستخدم dynamic import غالبا؟',
        options: [
          'لكل ملف صغير',
          'للتحميل الكسول عند الطلب',
          'لمنع code splitting',
          'بديل عن export',
        ],
        correctIndex: 1,
        explanation: 'dynamic import ممتاز للميزات الثقيلة النادرة.',
      },
      {
        question: 'المشكلة الشائعة مع circular dependencies:',
        options: [
          'تحسن initialization',
          'bindings جزئية/غير مهيأة وقت التقييم',
          'لا أي أثر',
          'تمنع linting',
        ],
        correctIndex: 1,
        explanation: 'circular imports قد تسبب undefined behavior وقت التحميل.',
      },
      {
        question: 'أفضل مكان للside effects:',
        options: [
          'أي utility file',
          'bootstrap/entry modules واضحة',
          'داخل type files',
          'داخل constants',
        ],
        correctIndex: 1,
        explanation: 'اجعل side effects صريحة ومتمركزة في entry points.',
      },
      {
        question: 'named exports مفيدة غالبا لأنها:',
        options: [
          'تمنع إعادة التسمية',
          'أوضح في API surface وأسهل refactor',
          'أبطأ من default',
          'لا تدعم IDE',
        ],
        correctIndex: 1,
        explanation: 'named exports تعزز الوضوح والدعم الأداتي.',
      },
      {
        question: 'تقسيم الطبقات الصحي غالبا يكون:',
        options: [
          'UI -> domain/infrastructure بعلاقات واضحة',
          'domain يعتمد على UI',
          'كل شيء في ملف واحد',
          'random imports',
        ],
        correctIndex: 0,
        explanation: 'keep dependency direction clean toward core logic.',
      },
    ],
  },
  'adv-js-12': {
    lessonId: 'adv-js-12',
    lessonTitle: 'Capstone Integration Project',
    questions: [
      {
        question: 'هدف المشروع النهائي الرئيسي هو:',
        options: [
          'إظهار CSS فقط',
          'دمج المفاهيم المتقدمة في SPA متماسكة',
          'حفظ أكواد عشوائية',
          'منع async تماما',
        ],
        correctIndex: 1,
        explanation: 'الهدف هو synthesis عملي لمفاهيم المسار كله.',
      },
      {
        question: 'أي مكون معماري مهم في SPA منتجية؟',
        options: [
          'API layer مع error normalization',
          'console.log فقط',
          'global mutable state بلا ضوابط',
          'ملف واحد لكل شيء',
        ],
        correctIndex: 0,
        explanation: 'فصل طبقة API وتحويل الأخطاء معيار مهم للجودة.',
      },
      {
        question: 'مؤشر جودة أساسي في capstone:',
        options: [
          'عدم وجود loading states',
          'حدود واضحة بين layers',
          'حذف try/catch',
          'منع lazy loading',
        ],
        correctIndex: 1,
        explanation: 'المشروع القوي يحتاج architecture boundaries واضحة.',
      },
      {
        question: 'أفضل ممارسة للبحث في قائمة كبيرة:',
        options: [
          'request لكل keystroke دون تحكم',
          'debounce input',
          'busy loop',
          'setInterval دائم',
        ],
        correctIndex: 1,
        explanation: 'debounce يحسن الأداء ويخفض الضغط على APIs.',
      },
      {
        question: 'لماذا نحتاج persistence versioning في SPA؟',
        options: [
          'لإفساد البيانات القديمة',
          'لدعم تغير schema بأمان',
          'لمنع refresh',
          'لزيادة حجم bundle',
        ],
        correctIndex: 1,
        explanation: 'يسمح بترقية الحالة المخزنة دون كسر المستخدم.',
      },
      {
        question: 'ماذا يعني capstone portfolio-grade؟',
        options: [
          'واجهة فقط بدون هندسة',
          'حل متكامل موثق مع tradeoffs واضحة',
          'كود بدون اختبارات',
          'نسخ template جاهز',
        ],
        correctIndex: 1,
        explanation: 'التركيز على الجودة الهندسية والتبرير التقني للحلول.',
      },
    ],
  },
};
