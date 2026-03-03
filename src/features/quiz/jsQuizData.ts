/**
 * jsQuizData — بيانات اختبارات JavaScript لكل درس
 * 8 أسئلة لكل درس (6-10 range) لضمان فهم الطالب
 */

import type { QuizQuestionData } from './QuizQuestion';

export interface LessonQuizConfig {
  lessonId: string;
  lessonTitle: string;
  questions: QuizQuestionData[];
}

export const jsQuizzes: Record<string, LessonQuizConfig> = {
  /* ══════ js-1: المتغيرات وأنواع البيانات ══════ */
  'js-1': {
    lessonId: 'js-1',
    lessonTitle: 'المتغيرات وأنواع البيانات',
    questions: [
      {
        question: 'ما الفرق الرئيسي بين let و const؟',
        options: [
          'let أسرع من const',
          'const لا يمكن تغيير قيمته بعد التعريف',
          'let للأرقام و const للنصوص',
          'لا فرق بينهما',
        ],
        correctIndex: 1,
        explanation:
          'const (ثابت) لا يمكن إعادة تعيين قيمته، بينما let يمكن تغيير قيمته.',
      },
      {
        question: 'أي من التالي يُعتبر نوع بيانات String؟',
        options: ['42', 'true', '"مرحبا"', 'null'],
        correctIndex: 2,
        explanation:
          'النصوص (String) تُكتب بين علامات تنصيص مزدوجة أو مفردة أو backtick.',
      },
      {
        question: 'ما هو الرمز المُستخدم لتضمين متغير في Template Literal؟',
        options: ['#{variable}', '${variable}', '@{variable}', '%{variable}'],
        correctIndex: 1,
        explanation:
          'نستخدم ${} داخل backtick ` لتضمين المتغيرات في القوالب النصية.',
      },
      {
        question: 'ما نوع القيمة undefined في JavaScript؟',
        options: ['string', 'number', 'undefined', 'null'],
        correctIndex: 2,
        explanation:
          'undefined هو نوع بيانات مستقل يعني أن المتغير تم تعريفه بدون إعطائه قيمة.',
      },
      {
        question: 'ما نتيجة typeof null ؟',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctIndex: 2,
        explanation:
          'هذا خطأ تاريخي في JavaScript — typeof null يُرجع "object" رغم أن null ليست كائناً.',
      },
      {
        question: 'أي من التالي طريقة صحيحة لتعريف متغير؟',
        options: [
          'variable name = 5;',
          'let my-name = "أحمد";',
          'const age = 20;',
          'var 1name = "علي";',
        ],
        correctIndex: 2,
        explanation:
          'أسماء المتغيرات لا تبدأ برقم ولا تحتوي شرطات. const age = 20 هي الصيغة الصحيحة.',
      },
      {
        question: 'ما الفرق بين null و undefined؟',
        options: [
          'لا فرق بينهما',
          'null تعني "لا قيمة عمداً" و undefined تعني "لم تُعطَ قيمة"',
          'null للنصوص و undefined للأرقام',
          'undefined أحدث من null',
        ],
        correctIndex: 1,
        explanation:
          'null يضعها المبرمج عمداً للدلالة على "لا شيء"، بينما undefined تظهر تلقائياً عند عدم تعيين قيمة.',
      },
      {
        question: 'ماذا يحدث عند محاولة تغيير قيمة const؟',
        options: [
          'يتم تغيير القيمة بنجاح',
          'يظهر تحذير فقط',
          'يحدث خطأ TypeError',
          'يتم تجاهل التغيير بصمت',
        ],
        correctIndex: 2,
        explanation:
          'محاولة إعادة تعيين قيمة const تُسبب خطأ TypeError: Assignment to constant variable.',
      },
    ],
  },

  /* ══════ js-2: العمليات والمعاملات ══════ */
  'js-2': {
    lessonId: 'js-2',
    lessonTitle: 'العمليات والمعاملات',
    questions: [
      {
        question: 'ما نتيجة 10 % 3 ؟',
        options: ['3', '1', '3.33', '0'],
        correctIndex: 1,
        explanation: '% تُرجع باقي القسمة: 10 ÷ 3 = 3 والباقي 1.',
      },
      {
        question: 'ما الفرق بين == و === ؟',
        options: [
          'لا فرق',
          '=== تقارن القيمة فقط',
          '=== تقارن القيمة والنوع معاً',
          '== أحدث من ===',
        ],
        correctIndex: 2,
        explanation: '=== (strict equality) تتحقق من تطابق القيمة والنوع معاً.',
      },
      {
        question: 'ما نتيجة true && false ؟',
        options: ['true', 'false', 'undefined', 'null'],
        correctIndex: 1,
        explanation: '&& تُرجع true فقط إذا كان كلا الطرفين true.',
      },
      {
        question: 'ما نتيجة 2 ** 4 ؟',
        options: ['8', '6', '16', '24'],
        correctIndex: 2,
        explanation: '** عملية الأس: 2⁴ = 16.',
      },
      {
        question: 'ما نتيجة "5" + 3 ؟',
        options: ['8', '"53"', 'NaN', 'خطأ'],
        correctIndex: 1,
        explanation:
          'عند جمع نص مع رقم، يتم تحويل الرقم لنص ودمجهما: "5" + "3" = "53".',
      },
      {
        question: 'ما نتيجة "10" - 5 ؟',
        options: ['"105"', '5', 'NaN', 'خطأ'],
        correctIndex: 1,
        explanation: 'عامل الطرح يُحوّل النص لرقم تلقائياً: 10 - 5 = 5.',
      },
      {
        question: 'ما نتيجة !true ؟',
        options: ['true', 'false', '0', 'null'],
        correctIndex: 1,
        explanation: '! (NOT) يعكس القيمة المنطقية: !true = false.',
      },
      {
        question: 'ما نتيجة 5 > 3 || 2 > 10 ؟',
        options: ['true', 'false', 'undefined', 'خطأ'],
        correctIndex: 0,
        explanation:
          '|| (OR) تُرجع true إذا كان أحد الطرفين true. 5 > 3 هو true لذلك النتيجة true.',
      },
    ],
  },

  /* ══════ js-3: الجمل الشرطية ══════ */
  'js-3': {
    lessonId: 'js-3',
    lessonTitle: 'الجمل الشرطية',
    questions: [
      {
        question:
          'ماذا يطبع هذا الكود؟ if (5 > 10) { console.log("A") } else { console.log("B") }',
        options: ['A', 'B', 'undefined', 'خطأ'],
        correctIndex: 1,
        explanation: 'الشرط 5 > 10 هو false، لذلك يُنفذ كود else ويطبع "B".',
      },
      {
        question: 'ما هو العامل الشرطي (ternary operator)؟',
        options: [
          'if...else',
          'condition ? a : b',
          'switch...case',
          'for...of',
        ],
        correctIndex: 1,
        explanation:
          'العامل الشرطي: condition ? valueIfTrue : valueIfFalse — اختصار if/else.',
      },
      {
        question: 'ما نتيجة: const x = true ? "نعم" : "لا";',
        options: ['"نعم"', '"لا"', 'true', 'خطأ'],
        correctIndex: 0,
        explanation: 'الشرط true محقق، لذلك يُختار القيمة الأولى "نعم".',
      },
      {
        question: 'متى نستخدم else if؟',
        options: [
          'عندما يكون لدينا شرط واحد فقط',
          'عندما نريد فحص شروط متعددة بالترتيب',
          'فقط مع الأرقام',
          'بدل switch دائماً',
        ],
        correctIndex: 1,
        explanation:
          'else if تُستخدم لفحص عدة شروط بالترتيب — إذا لم يتحقق الأول يُفحص الثاني وهكذا.',
      },
      {
        question: 'أي القيم التالية تُعتبر falsy في JavaScript؟',
        options: ['"hello"', '1', '0', '[]'],
        correctIndex: 2,
        explanation: '0 و "" و null و undefined و NaN و false كلها قيم falsy.',
      },
      {
        question: 'ما نتيجة: if ("") { "yes" } else { "no" } ؟',
        options: ['"yes"', '"no"', '""', 'خطأ'],
        correctIndex: 1,
        explanation: 'النص الفارغ "" هو قيمة falsy، لذلك يُنفذ else.',
      },
      {
        question: 'ما الفرق بين switch و if/else؟',
        options: [
          'switch أسرع دائماً',
          'switch تقارن قيمة واحدة مع عدة حالات، if/else أكثر مرونة',
          'if/else لا تعمل مع النصوص',
          'لا فرق بينهما',
        ],
        correctIndex: 1,
        explanation:
          'switch مناسبة لمقارنة متغير واحد بقيم محددة، بينما if/else تدعم شروطاً معقدة.',
      },
      {
        question: 'ماذا يحدث إذا نسيت break في switch؟',
        options: [
          'خطأ في الصياغة',
          'يتوقف البرنامج',
          'يستمر التنفيذ للحالات التالية (fall-through)',
          'يتم تجاهل switch كلياً',
        ],
        correctIndex: 2,
        explanation:
          'بدون break، يستمر التنفيذ في الحالات التالية حتى يصل لـ break أو نهاية switch.',
      },
    ],
  },

  /* ══════ js-4: الحلقات التكرارية ══════ */
  'js-4': {
    lessonId: 'js-4',
    lessonTitle: 'الحلقات التكرارية',
    questions: [
      {
        question: 'كم مرة تتكرر هذه الحلقة؟ for (let i = 0; i < 3; i++)',
        options: ['2 مرات', '3 مرات', '4 مرات', 'لا نهائية'],
        correctIndex: 1,
        explanation: 'تبدأ من 0 وتتوقف عند 3 (غير شاملة): 0، 1، 2 = 3 مرات.',
      },
      {
        question: 'ما الفرق بين for...of و for...in؟',
        options: [
          'لا فرق',
          'for...of للقيم و for...in للمفاتيح',
          'for...in أحدث',
          'for...of أبطأ',
        ],
        correctIndex: 1,
        explanation:
          'for...of تعطيك القيم مباشرة، for...in تعطيك المفاتيح (الفهارس).',
      },
      {
        question: 'ماذا يحدث إذا نسيت i++ في حلقة while؟',
        options: [
          'الحلقة لا تعمل',
          'تطبع مرة واحدة',
          'حلقة لا نهائية (infinite loop)',
          'خطأ في الصياغة',
        ],
        correctIndex: 2,
        explanation:
          'بدون تحديث المتغير، يبقى الشرط true دائماً مما يسبب حلقة لا نهائية.',
      },
      {
        question: 'ما الفرق بين while و do...while؟',
        options: [
          'لا فرق',
          'do...while تُنفذ مرة واحدة على الأقل',
          'while أسرع',
          'do...while لا تدعم break',
        ],
        correctIndex: 1,
        explanation:
          'do...while تفحص الشرط بعد التنفيذ، لذلك الكود يُنفذ مرة واحدة على الأقل.',
      },
      {
        question: 'ماذا يفعل break في الحلقة؟',
        options: [
          'يتخطى التكرار الحالي',
          'يوقف الحلقة نهائياً',
          'يُعيد الحلقة من البداية',
          'يطبع رسالة خطأ',
        ],
        correctIndex: 1,
        explanation: 'break يوقف الحلقة فوراً وينتقل للكود بعدها.',
      },
      {
        question: 'ماذا يفعل continue في الحلقة؟',
        options: [
          'يوقف الحلقة',
          'يتخطى التكرار الحالي وينتقل للتالي',
          'يُعيد الحلقة من البداية',
          'يطبع قيمة المتغير',
        ],
        correctIndex: 1,
        explanation:
          'continue يتخطى باقي كود التكرار الحالي وينتقل للتكرار التالي.',
      },
      {
        question: 'ما نتيجة: for (let i = 5; i > 0; i--) — كم مرة تتكرر؟',
        options: ['4 مرات', '5 مرات', '6 مرات', 'لا نهائية'],
        correctIndex: 1,
        explanation:
          'تبدأ من 5 وتنقص حتى تصل لـ 0 (غير شاملة): 5، 4، 3، 2، 1 = 5 مرات.',
      },
      {
        question: 'أي حلقة الأنسب لقراءة عناصر مصفوفة؟',
        options: ['while', 'do...while', 'for...of', 'for...in'],
        correctIndex: 2,
        explanation:
          'for...of مصممة للمرور على القيم في المصفوفات والمجموعات بطريقة سهلة.',
      },
    ],
  },

  /* ══════ js-5: الدوال (Functions) ══════ */
  'js-5': {
    lessonId: 'js-5',
    lessonTitle: 'الدوال (Functions)',
    questions: [
      {
        question: 'ماذا تُرجع الدالة التي لا تحتوي على return؟',
        options: ['null', 'undefined', '0', 'false'],
        correctIndex: 1,
        explanation: 'الدوال التي لا تحتوي return تُرجع undefined تلقائياً.',
      },
      {
        question: 'ما الفرق بين function و arrow function؟',
        options: [
          'لا فرق',
          'Arrow function أسرع',
          'Arrow function لا تملك this خاص بها',
          'function لا تقبل معاملات',
        ],
        correctIndex: 2,
        explanation:
          'الدوال السهمية ترث this من النطاق الخارجي بدلاً من إنشاء نطاق خاص.',
      },
      {
        question:
          'ماذا يطبع هذا الكود؟ const add = (a, b) => a + b; console.log(add(3, 7));',
        options: ['37', '10', 'undefined', 'خطأ'],
        correctIndex: 1,
        explanation: 'الدالة تجمع 3 + 7 = 10 وتُرجعها.',
      },
      {
        question: 'ما هو الـ default parameter؟',
        options: [
          'معامل لا يمكن تغييره',
          'قيمة افتراضية للمعامل إذا لم يُمرر',
          'أول معامل في الدالة دائماً',
          'معامل يجب أن يكون رقماً',
        ],
        correctIndex: 1,
        explanation:
          'function greet(name = "زائر") — إذا لم يُمرر name، يُستخدم "زائر".',
      },
      {
        question: 'ما هو الـ callback function؟',
        options: [
          'دالة تُستدعى تلقائياً',
          'دالة تُمرر كمعامل لدالة أخرى',
          'دالة بدون اسم',
          'دالة تُرجع true أو false',
        ],
        correctIndex: 1,
        explanation:
          'callback هي دالة تُمرر لدالة أخرى لتُنفذ لاحقاً (مثل addEventListener).',
      },
      {
        question: 'ما الفرق بين return و console.log في الدالة؟',
        options: [
          'لا فرق',
          'return يُرجع قيمة للمُستدعي، console.log يطبع فقط',
          'console.log يوقف الدالة',
          'return للأرقام فقط',
        ],
        correctIndex: 1,
        explanation:
          'return يُنهي الدالة ويُرسل قيمة للكود الذي استدعاها، console.log يطبع في وحدة التحكم فقط.',
      },
      {
        question: 'ماذا يعني scope (النطاق) في JavaScript؟',
        options: [
          'سرعة تنفيذ الكود',
          'المنطقة التي يكون فيها المتغير متاحاً',
          'عدد الدوال في الملف',
          'حجم الذاكرة المُستخدمة',
        ],
        correctIndex: 1,
        explanation:
          'scope يُحدد أين يمكن الوصول للمتغيرات — داخل دالة، كتلة، أو عالمياً.',
      },
      {
        question: 'هل يمكن تخزين دالة في متغير؟',
        options: [
          'لا، الدوال ليست قيماً',
          'نعم، الدوال في JavaScript هي قيم من الدرجة الأولى',
          'فقط مع var',
          'فقط الدوال السهمية',
        ],
        correctIndex: 1,
        explanation:
          'JavaScript تعامل الدوال كقيم يمكن تخزينها في متغيرات وتمريرها كمعاملات.',
      },
    ],
  },

  /* ══════ js-6: المصفوفات (Arrays) ══════ */
  'js-6': {
    lessonId: 'js-6',
    lessonTitle: 'المصفوفات (Arrays)',
    questions: [
      {
        question: 'ما فهرس أول عنصر في المصفوفة؟',
        options: ['1', '0', '-1', 'أول حرف من الاسم'],
        correctIndex: 1,
        explanation: 'المصفوفات في JavaScript تبدأ من الفهرس 0.',
      },
      {
        question: 'ماذا يفعل push()؟',
        options: [
          'يحذف أول عنصر',
          'يضيف عنصراً في البداية',
          'يضيف عنصراً في النهاية',
          'يُرتب المصفوفة',
        ],
        correctIndex: 2,
        explanation: 'push() يضيف عنصراً (أو أكثر) في نهاية المصفوفة.',
      },
      {
        question: 'ماذا يُرجع [1, 2, 3].length ؟',
        options: ['2', '3', '4', 'undefined'],
        correctIndex: 1,
        explanation: '.length يُرجع عدد العناصر في المصفوفة = 3.',
      },
      {
        question: 'ماذا يفعل pop()؟',
        options: [
          'يضيف عنصراً في النهاية',
          'يحذف آخر عنصر ويُرجعه',
          'يحذف أول عنصر',
          'يُفرّغ المصفوفة',
        ],
        correctIndex: 1,
        explanation: 'pop() يحذف آخر عنصر من المصفوفة ويُرجعه.',
      },
      {
        question: 'ما الفرق بين unshift و push؟',
        options: [
          'لا فرق',
          'unshift يضيف في البداية، push في النهاية',
          'push أسرع دائماً',
          'unshift يحذف عنصراً',
        ],
        correctIndex: 1,
        explanation: 'unshift يضيف عناصر في بداية المصفوفة، push في النهاية.',
      },
      {
        question: 'ماذا يُرجع [1, 2, 3].indexOf(2)؟',
        options: ['1', '2', '0', '-1'],
        correctIndex: 0,
        explanation: 'indexOf تُرجع فهرس أول ظهور للقيمة. العدد 2 في الفهرس 1.',
      },
      {
        question: 'ماذا يفعل splice(1, 2) على المصفوفة [a, b, c, d]؟',
        options: [
          'يحذف العنصر الأول',
          'يحذف عنصرين بدءاً من الفهرس 1 (b و c)',
          'يضيف عنصرين',
          'يُرجع أول عنصرين',
        ],
        correctIndex: 1,
        explanation:
          'splice(start, count) يحذف count عنصراً بدءاً من الفهرس start.',
      },
      {
        question: 'هل يمكن أن تحتوي المصفوفة على أنواع بيانات مختلفة؟',
        options: [
          'لا، نوع واحد فقط',
          'نعم، يمكن خلط الأرقام والنصوص والكائنات',
          'فقط أرقام ونصوص',
          'فقط إذا استخدمت let',
        ],
        correctIndex: 1,
        explanation:
          'المصفوفات في JavaScript مرنة ويمكن أن تحتوي على أي خليط من أنواع البيانات.',
      },
    ],
  },

  /* ══════ js-7: الكائنات (Objects) ══════ */
  'js-7': {
    lessonId: 'js-7',
    lessonTitle: 'الكائنات (Objects)',
    questions: [
      {
        question: 'كيف تصل لخاصية "name" من كائن person؟',
        options: [
          'person(name)',
          'person.name',
          'person->name',
          'person::name',
        ],
        correctIndex: 1,
        explanation: 'نستخدم النقطة (dot notation): person.name',
      },
      {
        question: 'ما الفرق بين المصفوفة والكائن؟',
        options: [
          'لا فرق',
          'المصفوفة تستخدم فهارس رقمية، الكائن يستخدم مفاتيح نصية',
          'الكائن أسرع دائماً',
          'المصفوفة للنصوص فقط',
        ],
        correctIndex: 1,
        explanation:
          'المصفوفة تُرتب بأرقام [0, 1, 2]، الكائن بأسماء { name, age }.',
      },
      {
        question: 'هل يمكن إضافة خاصية جديدة لكائن بعد إنشائه بـ const؟',
        options: [
          'لا، const يمنع أي تعديل',
          'نعم، const يمنع إعادة التعيين لكن يسمح بتعديل المحتوى',
          'فقط إذا استخدمت let',
          'نعم لكن فقط بـ bracket notation',
        ],
        correctIndex: 1,
        explanation:
          'const يمنع person = {} جديد، لكن يسمح بتعديل person.name أو إضافة person.email.',
      },
      {
        question: 'ما الفرق بين dot notation و bracket notation؟',
        options: [
          'لا فرق',
          'bracket notation تدعم مفاتيح ديناميكية ومسافات',
          'dot notation أحدث',
          'bracket notation للأرقام فقط',
        ],
        correctIndex: 1,
        explanation:
          'person["full name"] تعمل مع مفاتيح بمسافات أو متغيرات، بينما person.name للمفاتيح البسيطة.',
      },
      {
        question: 'ماذا يفعل Object.keys(obj)؟',
        options: [
          'يحذف جميع المفاتيح',
          'يُرجع مصفوفة بأسماء خصائص الكائن',
          'يُقفل الكائن',
          'يحسب عدد الخصائص',
        ],
        correctIndex: 1,
        explanation: 'Object.keys يُرجع مصفوفة تحتوي أسماء جميع خصائص الكائن.',
      },
      {
        question: 'ماذا يُرجع Object.values({a: 1, b: 2})؟',
        options: ['["a", "b"]', '[1, 2]', '{a: 1, b: 2}', '3'],
        correctIndex: 1,
        explanation: 'Object.values يُرجع مصفوفة بجميع قيم خصائص الكائن.',
      },
      {
        question: 'كيف تحذف خاصية من كائن؟',
        options: [
          'obj.remove("key")',
          'delete obj.key',
          'obj.key = remove',
          'obj.pop("key")',
        ],
        correctIndex: 1,
        explanation: 'الكلمة المفتاحية delete تحذف خاصية: delete person.age',
      },
      {
        question: 'ما هو الـ destructuring في الكائنات؟',
        options: [
          'حذف الكائن',
          'استخراج الخصائص في متغيرات مستقلة',
          'دمج كائنين',
          'تحويل الكائن لمصفوفة',
        ],
        correctIndex: 1,
        explanation:
          'const { name, age } = person; يستخرج name و age مباشرة من الكائن.',
      },
    ],
  },

  /* ══════ js-8: DOM والعناصر ══════ */
  'js-8': {
    lessonId: 'js-8',
    lessonTitle: 'DOM والعناصر',
    questions: [
      {
        question: 'ما هي الدالة المُستخدمة لاختيار عنصر واحد في DOM؟',
        options: [
          'document.getElement()',
          'document.querySelector()',
          'document.findElement()',
          'document.select()',
        ],
        correctIndex: 1,
        explanation:
          'querySelector تختار أول عنصر يطابق المُحدد (CSS Selector).',
      },
      {
        question: 'ما الفرق بين textContent و innerHTML؟',
        options: [
          'لا فرق',
          'textContent يُدخل نص فقط، innerHTML يُدخل HTML',
          'innerHTML أسرع',
          'textContent للأرقام فقط',
        ],
        correctIndex: 1,
        explanation:
          'textContent يتعامل مع النص فقط، بينما innerHTML يُحلل HTML ويعرضه.',
      },
      {
        question: 'ماذا يفعل addEventListener؟',
        options: [
          'يحذف عنصراً من الصفحة',
          'يُضيف CSS جديد',
          'يربط دالة تُنفذ عند حدوث حدث معين',
          'يُنشئ عنصراً جديداً',
        ],
        correctIndex: 2,
        explanation:
          'addEventListener يربط دالة (callback) بحدث مثل click أو input.',
      },
      {
        question: 'ما الفرق بين querySelector و querySelectorAll؟',
        options: [
          'لا فرق',
          'querySelector يُرجع أول عنصر، querySelectorAll يُرجع كل العناصر',
          'querySelectorAll أقدم',
          'querySelector أسرع دائماً',
        ],
        correctIndex: 1,
        explanation:
          'querySelector يُرجع أول عنصر مطابق، querySelectorAll يُرجع NodeList بكل العناصر المطابقة.',
      },
      {
        question: 'كيف تُنشئ عنصر HTML جديد بـ JavaScript؟',
        options: [
          'document.querySelector("div")',
          'document.createElement("div")',
          'document.newElement("div")',
          'document.addElement("div")',
        ],
        correctIndex: 1,
        explanation:
          'createElement يُنشئ عنصراً جديداً (لكن لا يُضيفه للصفحة حتى تستخدم appendChild).',
      },
      {
        question: 'ماذا يفعل appendChild()؟',
        options: [
          'يحذف عنصراً',
          'يُضيف عنصراً كآخر ابن للعنصر الأب',
          'يُنشئ عنصراً',
          'يغير نص العنصر',
        ],
        correctIndex: 1,
        explanation:
          'appendChild يُضيف عنصراً (node) كآخر عنصر فرعي للعنصر الأب.',
      },
      {
        question: 'كيف تُغيّر لون خلفية عنصر عبر JavaScript؟',
        options: [
          'element.color = "red"',
          'element.style.backgroundColor = "red"',
          'element.css("background", "red")',
          'element.setStyle("background-color", "red")',
        ],
        correctIndex: 1,
        explanation:
          'نستخدم element.style.backgroundColor (camelCase) للتحكم في CSS عبر JavaScript.',
      },
      {
        question: 'ما هو DOM اختصاراً؟',
        options: [
          'Document Object Method',
          'Document Object Model',
          'Data Object Manager',
          'Document Oriented Markup',
        ],
        correctIndex: 1,
        explanation:
          'DOM = Document Object Model — التمثيل الشجري لصفحة HTML الذي يسمح لـ JavaScript بالتعامل معها.',
      },
    ],
  },

  /* ══════ js-9: الأحداث (Events) ══════ */
  'js-9': {
    lessonId: 'js-9',
    lessonTitle: 'الأحداث (Events)',
    questions: [
      {
        question: 'ما الحدث الذي ينطلق عند كل حرف يُكتب في حقل إدخال؟',
        options: ['change', 'click', 'input', 'keypress'],
        correctIndex: 2,
        explanation:
          '"input" ينطلق فوراً مع كل تغيير. "change" ينتظر فقدان التركيز.',
      },
      {
        question: 'كيف تحصل على قيمة حقل إدخال عند استماعك لحدث input؟',
        options: [
          'event.value',
          'event.target.value',
          'event.input',
          'this.value',
        ],
        correctIndex: 1,
        explanation:
          'event.target يشير للعنصر المُستهدف، و.value يعطيك محتواه.',
      },
      {
        question: 'ما الفرق بين mouseover و mouseenter؟',
        options: [
          'لا فرق',
          'mouseover يتفعل على العناصر الأبناء أيضاً',
          'mouseenter أقدم',
          'mouseover للموبايل فقط',
        ],
        correctIndex: 1,
        explanation:
          'mouseover ينطلق على العنصر وأبنائه (bubbles)، mouseenter فقط على العنصر نفسه.',
      },
      {
        question: 'ما هو event.preventDefault()؟',
        options: [
          'يحذف الحدث',
          'يمنع السلوك الافتراضي (مثل تحميل الصفحة عند submit)',
          'يوقف البرنامج',
          'يُضيف حدثاً جديداً',
        ],
        correctIndex: 1,
        explanation:
          'preventDefault يمنع السلوك الافتراضي للمتصفح مثل إرسال النموذج أو فتح رابط.',
      },
      {
        question: 'ما هو event bubbling؟',
        options: [
          'الحدث ينطلق مرتين',
          'الحدث ينتقل من العنصر الداخلي للخارجي',
          'الحدث يختفي',
          'الحدث ينتقل من الأب للابن',
        ],
        correctIndex: 1,
        explanation:
          'bubbling: الحدث يبدأ من العنصر المُستهدف وينتقل لأعلى للعناصر الأبوية.',
      },
      {
        question: 'كيف توقف event bubbling؟',
        options: [
          'event.preventDefault()',
          'event.stopPropagation()',
          'event.stop()',
          'event.cancel()',
        ],
        correctIndex: 1,
        explanation:
          'stopPropagation() يمنع الحدث من الانتقال للعناصر الأبوية.',
      },
      {
        question: 'ما الفرق بين click و dblclick؟',
        options: [
          'لا فرق',
          'click لنقرة واحدة و dblclick لنقرتين متتاليتين',
          'dblclick أسرع',
          'click للموبايل فقط',
        ],
        correctIndex: 1,
        explanation:
          'click ينطلق عند نقرة واحدة، dblclick عند نقرتين سريعتين متتاليتين.',
      },
      {
        question: 'ما هو event delegation؟',
        options: [
          'إضافة حدث لكل عنصر',
          'إضافة حدث للعنصر الأب ليلتقط أحداث الأبناء',
          'حذف جميع الأحداث',
          'نقل الأحداث بين الصفحات',
        ],
        correctIndex: 1,
        explanation:
          'event delegation: نضع مستمع واحد على الأب بدل إضافة مستمع لكل ابن، ونستخدم event.target لمعرفة من أُنقر.',
      },
    ],
  },

  /* ══════ js-10: النصوص (Strings) ══════ */
  'js-10': {
    lessonId: 'js-10',
    lessonTitle: 'النصوص (Strings)',
    questions: [
      {
        question: 'ماذا يُرجع "Hello".toUpperCase()؟',
        options: ['"hello"', '"HELLO"', '"Hello"', 'خطأ'],
        correctIndex: 1,
        explanation: 'toUpperCase() تحوّل كل الأحرف لأحرف كبيرة.',
      },
      {
        question: 'ماذا يُرجع "abc".indexOf("z")؟',
        options: ['0', 'false', '-1', 'null'],
        correctIndex: 2,
        explanation: 'indexOf تُرجع -1 عندما لا تجد النص المطلوب.',
      },
      {
        question: 'ماذا يُرجع "a-b-c".split("-")؟',
        options: ['"abc"', '["a", "b", "c"]', '["a-b-c"]', '3'],
        correctIndex: 1,
        explanation: 'split("-") تقسم النص عند كل شرطة وتُرجع مصفوفة.',
      },
      {
        question: 'ماذا يفعل trim()؟',
        options: [
          'يحذف كل المسافات',
          'يحذف المسافات من بداية ونهاية النص فقط',
          'يحذف الأرقام',
          'يحول لأحرف صغيرة',
        ],
        correctIndex: 1,
        explanation:
          'trim() يحذف المسافات البيضاء من بداية ونهاية النص فقط، وليس من الوسط.',
      },
      {
        question: 'ماذا يُرجع "Hello World".slice(0, 5)؟',
        options: ['"Hello World"', '"Hello"', '"World"', '"Hello "'],
        correctIndex: 1,
        explanation:
          'slice(start, end) يقص النص من الفهرس start إلى end (غير شاملة): الأحرف 0-4 = "Hello".',
      },
      {
        question: 'ماذا يُرجع "hello".includes("ell")؟',
        options: ['true', 'false', '1', '"ell"'],
        correctIndex: 0,
        explanation: 'includes تفحص وجود نص فرعي وتُرجع true إذا وُجد.',
      },
      {
        question: 'ماذا يفعل replace()؟',
        options: [
          'يحذف النص',
          'يستبدل أول ظهور لنص بنص آخر',
          'يُضيف نصاً في البداية',
          'يعكس النص',
        ],
        correctIndex: 1,
        explanation:
          '"hello world".replace("world", "JS") يُرجع "hello JS" — يستبدل أول ظهور.',
      },
      {
        question: 'كيف تحصل على طول (عدد أحرف) نص؟',
        options: ['text.size()', 'text.length', 'text.count()', 'len(text)'],
        correctIndex: 1,
        explanation: '.length خاصية (وليست دالة) تُرجع عدد أحرف النص.',
      },
    ],
  },

  /* ══════ js-11: دوال المصفوفات ══════ */
  'js-11': {
    lessonId: 'js-11',
    lessonTitle: 'دوال المصفوفات',
    questions: [
      {
        question: 'ماذا يُرجع [1,2,3].map(n => n + 10)؟',
        options: ['[1, 2, 3]', '[11, 12, 13]', '36', '[10, 20, 30]'],
        correctIndex: 1,
        explanation: 'map تطبق الدالة على كل عنصر: 1+10=11, 2+10=12, 3+10=13.',
      },
      {
        question: 'ما الفرق بين find و filter؟',
        options: [
          'لا فرق بينهما',
          'find تُرجع أول تطابق، filter تُرجع كل التطابقات',
          'filter أسرع من find',
          'find تُرجع مصفوفة، filter تُرجع عنصر واحد',
        ],
        correctIndex: 1,
        explanation:
          'find تتوقف عند أول عنصر يحقق الشرط، بينما filter تمر على كل العناصر.',
      },
      {
        question: 'ماذا يُرجع [5,10,15].reduce((a,b) => a + b, 0)؟',
        options: ['[5, 10, 15]', '15', '30', '0'],
        correctIndex: 2,
        explanation: 'reduce تجمع: 0+5=5, 5+10=15, 15+15=30.',
      },
      {
        question: 'هل map تغير المصفوفة الأصلية؟',
        options: ['نعم', 'لا، تُرجع مصفوفة جديدة', 'أحياناً', 'فقط مع الأعداد'],
        correctIndex: 1,
        explanation: 'map, filter, find, reduce كلها لا تغير المصفوفة الأصلية.',
      },
      {
        question: 'ماذا يفعل some()؟',
        options: [
          'تفحص كل العناصر',
          'تُرجع true إذا حقق عنصر واحد على الأقل الشرط',
          'تُرجع مصفوفة جديدة',
          'تجمع كل العناصر',
        ],
        correctIndex: 1,
        explanation: 'some تتوقف وتُرجع true فور إيجاد أول عنصر يحقق الشرط.',
      },
      {
        question: 'ما الفرق بين some و every؟',
        options: [
          'لا فرق',
          'some: عنصر واحد يكفي، every: جميع العناصر يجب أن تحقق الشرط',
          'every أسرع',
          'some للأرقام فقط',
        ],
        correctIndex: 1,
        explanation:
          'some تُرجع true إذا حقق أي عنصر الشرط، every تُرجع true فقط إذا حققت جميع العناصر الشرط.',
      },
      {
        question: 'ماذا يُرجع [3,1,2].sort()؟',
        options: ['[1, 2, 3]', '[3, 2, 1]', '[3, 1, 2]', 'خطأ'],
        correctIndex: 0,
        explanation:
          'sort() ترتب العناصر تصاعدياً (افتراضياً كنصوص، لكن للأرقام البسيطة يعمل صحيحاً).',
      },
      {
        question: 'ماذا يفعل forEach()؟',
        options: [
          'يُرجع مصفوفة جديدة',
          'ينفذ دالة على كل عنصر بدون إرجاع مصفوفة',
          'يحذف العناصر',
          'يُرتب المصفوفة',
        ],
        correctIndex: 1,
        explanation:
          'forEach تمر على كل عنصر وتنفذ الدالة، لكن لا تُرجع شيئاً (undefined) — استخدم map إذا أردت مصفوفة جديدة.',
      },
    ],
  },

  /* ══════ js-12: تصحيح الأخطاء ══════ */
  'js-12': {
    lessonId: 'js-12',
    lessonTitle: 'تصحيح الأخطاء',
    questions: [
      {
        question: 'ما نوع الخطأ عند كتابة console.log("hi" بدون قوس إغلاق؟',
        options: ['TypeError', 'ReferenceError', 'SyntaxError', 'LogicError'],
        correctIndex: 2,
        explanation:
          'SyntaxError يحدث عند وجود أخطاء في كتابة الكود مثل أقواس ناقصة.',
      },
      {
        question: 'ماذا يحدث للكود بعد try/catch إذا حدث خطأ في try؟',
        options: [
          'يتوقف البرنامج',
          'ينتقل لـ catch ثم يكمل',
          'يتجاهل الخطأ',
          'يعيد تشغيل try',
        ],
        correctIndex: 1,
        explanation:
          'catch يلتقط الخطأ ويتعامل معه، ثم يستمر البرنامج بشكل طبيعي.',
      },
      {
        question: 'ما الفرق بين = و === ؟',
        options: [
          'لا فرق',
          '= مقارنة و === تعيين',
          '= تعيين و === مقارنة صارمة',
          'كلاهما مقارنة',
        ],
        correctIndex: 2,
        explanation: '= لتعيين القيم (x = 5)، === للمقارنة الصارمة (x === 5).',
      },
      {
        question: 'ما هو ReferenceError؟',
        options: [
          'خطأ في الصياغة',
          'استخدام متغير غير مُعرّف',
          'قسمة على صفر',
          'خطأ في الشبكة',
        ],
        correctIndex: 1,
        explanation:
          'ReferenceError يحدث عند محاولة استخدام متغير لم يتم تعريفه.',
      },
      {
        question: 'ما هو TypeError؟',
        options: [
          'خطأ في كتابة الكود',
          'العملية مستحيلة على هذا النوع من البيانات',
          'الملف غير موجود',
          'خطأ في الشبكة',
        ],
        correctIndex: 1,
        explanation:
          'TypeError يحدث عند محاولة تنفيذ عملية غير مدعومة على نوع بيانات معين (مثل null.property).',
      },
      {
        question: 'ما فائدة console.log في تصحيح الأخطاء؟',
        options: [
          'يُصلح الأخطاء تلقائياً',
          'يعرض قيم المتغيرات لفحص تدفق البرنامج',
          'يحذف الأخطاء',
          'يوقف البرنامج',
        ],
        correctIndex: 1,
        explanation:
          'console.log يُساعد في تتبع قيم المتغيرات في نقاط مختلفة لفهم سلوك البرنامج.',
      },
      {
        question: 'ما هو finally في try/catch/finally؟',
        options: [
          'يُنفذ فقط عند حدوث خطأ',
          'يُنفذ دائماً سواء حدث خطأ أو لا',
          'يُعيد تشغيل try',
          'يُلغي catch',
        ],
        correctIndex: 1,
        explanation:
          'finally يُنفذ دائماً بعد try/catch — مفيد لتنظيف الموارد.',
      },
      {
        question: 'كيف ترمي خطأ مخصص في JavaScript؟',
        options: [
          'error("رسالة")',
          'throw new Error("رسالة")',
          'console.error("رسالة")',
          'catch("رسالة")',
        ],
        correctIndex: 1,
        explanation:
          'throw new Error("رسالة") يرمي خطأ مخصص يمكن التقاطه بـ try/catch.',
      },
    ],
  },
};
