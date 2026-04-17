export interface JavaScriptLessonMeta {
  id: string;
  lessonNum: number;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  objectives: [string, string, string];
}

export const javaScriptLessons: JavaScriptLessonMeta[] = [
  {
    id: 'js-1',
    lessonNum: 1,
    path: '/js/1',
    title: 'المتغيرات وأنواع البيانات',
    shortTitle: 'أساسيات المتغيرات',
    description: 'فهم let و const والفرق بين الأنواع الأساسية في JavaScript.',
    icon: '🧱',
    objectives: [
      'تعريف المتغيرات بالطريقة الحديثة.',
      'التمييز بين الأنواع الأساسية.',
      'كتابة قيم صالحة لكل نوع.',
    ],
  },
  {
    id: 'js-2',
    lessonNum: 2,
    path: '/js/2',
    title: 'العمليات والمعاملات',
    shortTitle: 'المعاملات الأساسية',
    description: 'تطبيق العمليات الحسابية والمنطقية والمقارنات داخل التعبيرات.',
    icon: '➗',
    objectives: [
      'استخدام العمليات الحسابية بثقة.',
      'فهم المقارنة الصارمة ===.',
      'تركيب شروط منطقية صحيحة.',
    ],
  },
  {
    id: 'js-3',
    lessonNum: 3,
    path: '/js/3',
    title: 'الجمل الشرطية',
    shortTitle: 'الشروط المنطقية',
    description: 'بناء تفرعات منطقية باستخدام if و else و else if.',
    icon: '🌿',
    objectives: [
      'كتابة if و else بشكل منظم.',
      'اختصار الحالات البسيطة بـ ternary.',
      'اختيار البنية الأنسب للقرار.',
    ],
  },
  {
    id: 'js-4',
    lessonNum: 4,
    path: '/js/4',
    title: 'الحلقات التكرارية',
    shortTitle: 'الحلقات التكرارية',
    description: 'تنفيذ منطق متكرر بكفاءة مع for و while.',
    icon: '🔁',
    objectives: [
      'فهم دورة التكرار خطوة بخطوة.',
      'اختيار for أو while حسب الحالة.',
      'تجنب الحلقات غير المنتهية.',
    ],
  },
  {
    id: 'js-5',
    lessonNum: 5,
    path: '/js/5',
    title: 'الدوال',
    shortTitle: 'إنشاء الدوال',
    description: 'تقسيم الكود إلى وحدات قابلة لإعادة الاستخدام وتحسين القراءة.',
    icon: '🧩',
    objectives: [
      'تعريف دوال واضحة بالمدخلات.',
      'استخدام return بشكل صحيح.',
      'تجربة الدوال السهمية الحديثة.',
    ],
  },
  {
    id: 'js-6',
    lessonNum: 6,
    path: '/js/6',
    title: 'المصفوفات',
    shortTitle: 'المصفوفات العملية',
    description: 'تنظيم البيانات داخل قوائم والتعامل معها بالفهارس والدوال.',
    icon: '📚',
    objectives: [
      'إنشاء مصفوفات بأكثر من طريقة.',
      'الوصول للعناصر وتعديلها.',
      'تطبيق عمليات البحث والإضافة.',
    ],
  },
  {
    id: 'js-7',
    lessonNum: 7,
    path: '/js/7',
    title: 'الكائنات',
    shortTitle: 'الكائنات العملية',
    description: 'نمذجة البيانات بالمفاتيح والقيم لتمثيل كيانات حقيقية.',
    icon: '🗂️',
    objectives: [
      'بناء كائنات منظمة للبيانات.',
      'الوصول للخصائص بأمان.',
      'تعديل البنية دون كسر الكود.',
    ],
  },
  {
    id: 'js-8',
    lessonNum: 8,
    path: '/js/8',
    title: 'DOM والعناصر',
    shortTitle: 'عناصر DOM',
    description: 'التحكم بعناصر الصفحة وتحديثها ديناميكيا عبر JavaScript.',
    icon: '🖥️',
    objectives: [
      'اختيار العناصر بدقة.',
      'تحديث النصوص والخصائص.',
      'ربط الكود بتفاعل الواجهة.',
    ],
  },
  {
    id: 'js-9',
    lessonNum: 9,
    path: '/js/9',
    title: 'الأحداث',
    shortTitle: 'إدارة الأحداث',
    description: 'بناء تفاعلات المستخدم وربط السلوك بأحداث الواجهة.',
    icon: '🖱️',
    objectives: [
      'التعامل مع click و input.',
      'إدارة event object بوضوح.',
      'منع الأخطاء الناتجة عن التكرار.',
    ],
  },
  {
    id: 'js-10',
    lessonNum: 10,
    path: '/js/10',
    title: 'النصوص',
    shortTitle: 'معالجة النصوص',
    description: 'تنسيق وتحليل النصوص باستخدام دوال String الأساسية.',
    icon: '✍️',
    objectives: [
      'تطبيق دوال String الأساسية.',
      'تنظيف النص قبل المعالجة.',
      'تجميع الرسائل بطريقة مرنة.',
    ],
  },
  {
    id: 'js-11',
    lessonNum: 11,
    path: '/js/11',
    title: 'دوال المصفوفات',
    shortTitle: 'دوال المصفوفة',
    description: 'استخدام map و filter و reduce لبناء منطق أوضح وأقصر.',
    icon: '⚙️',
    objectives: [
      'اختيار map أو filter بشكل صحيح.',
      'استخدام reduce لتجميع النتائج.',
      'كتابة callbacks واضحة وسهلة.',
    ],
  },
  {
    id: 'js-12',
    lessonNum: 12,
    path: '/js/12',
    title: 'تصحيح الأخطاء',
    shortTitle: 'تصحيح الأخطاء',
    description: 'تشخيص الأخطاء بسرعة وقراءة الرسائل البرمجية بثقة.',
    icon: '🛠️',
    objectives: [
      'قراءة stack trace بفعالية.',
      'تحديد سبب المشكلة بسرعة.',
      'إصلاح الأخطاء دون آثار جانبية.',
    ],
  },
];

export const javaScriptLessonById: Record<string, JavaScriptLessonMeta> =
  Object.fromEntries(javaScriptLessons.map((lesson) => [lesson.id, lesson]));

export const javaScriptLessonByNum: Record<string, JavaScriptLessonMeta> =
  Object.fromEntries(
    javaScriptLessons.map((lesson) => [String(lesson.lessonNum), lesson]),
  );
