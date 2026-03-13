export interface ClassroomTreeTopic {
  id: string;
  title: string;
  summary: string;
  lessonIds: string[];
}

export const focusTopics: ClassroomTreeTopic[] = [
  {
    id: 'logic-core',
    title: 'المنطق البرمجي الأساسي',
    summary: 'هذا هو العمود الفقري للحصة. إذا ضعف هنا، ستصعب بقية الدروس.',
    lessonIds: ['js-1', 'js-2', 'js-3', 'js-4'],
  },
  {
    id: 'function-thinking',
    title: 'التفكير بالدوال',
    summary: 'نركز على تقسيم المشكلة وكتابة خطوات واضحة يمكن إعادة استخدامها.',
    lessonIds: ['js-5', 'js-10', 'js-11'],
  },
  {
    id: 'data-handling',
    title: 'التعامل مع البيانات',
    summary: 'المصفوفات والكائنات هي الأساس في أغلب التمارين والمشاريع.',
    lessonIds: ['js-6', 'js-7', 'js-11'],
  },
  {
    id: 'dom-practice',
    title: 'بناء التفاعل داخل الصفحة',
    summary: 'هذا الجزء نحتاجه عملياً في أي واجهة مستخدم تفاعلية.',
    lessonIds: ['js-8', 'js-9'],
  },
];

export const knowTopics: ClassroomTreeTopic[] = [
  {
    id: 'string-ops',
    title: 'فهم معالجة النصوص',
    summary:
      'نحتاج معرفتها وفهمها جيداً، حتى لو لم تكن محور التركيز الأول في الواجب.',
    lessonIds: ['js-10'],
  },
  {
    id: 'array-methods-overview',
    title: 'التعرف على دوال المصفوفات الحديثة',
    summary:
      'مهم أن تفهم map و filter و reduce، حتى لو لم تطلب جميعها في كل نشاط.',
    lessonIds: ['js-11'],
  },
  {
    id: 'debug-mindset',
    title: 'قراءة الخطأ والتشخيص',
    summary:
      'ليس المطلوب حفظ الأخطاء، بل القدرة على قراءتها والتعامل معها بهدوء.',
    lessonIds: ['js-12'],
  },
];
