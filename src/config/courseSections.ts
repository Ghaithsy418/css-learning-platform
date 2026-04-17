import { advancedJavaScriptLessonsDetailed } from './advancedJavaScriptLessons';
import { advancedJavaScriptLessonsArabic } from './advancedJavaScriptLessonsArabic';

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
}

export interface CourseSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startPath: string;
  lessons: CourseLesson[];
  topics: { icon: string; label: string }[];
}

export const courseNavigationSections: Pick<
  CourseSection,
  'id' | 'title' | 'startPath'
>[] = [
  { id: 'css', title: 'CSS', startPath: '/css/grid/1' },
  { id: 'javascript', title: 'JavaScript', startPath: '/js/1' },
  {
    id: 'advanced-javascript',
    title: 'Advanced JavaScript',
    startPath: '/js/advanced/1',
  },
];

export const advancedJavaScriptSection: CourseSection = {
  id: 'advanced-javascript',
  title: 'Advanced JavaScript',
  subtitle: 'Deep runtime concepts and modern architecture',
  description:
    'Go beyond fundamentals to understand how JavaScript runs, scales, and integrates inside modern web applications.',
  startPath: '/js/advanced/1',
  topics: [
    { icon: '🧠', label: 'Runtime internals' },
    { icon: '🌐', label: 'Browser APIs' },
    { icon: '⚡', label: 'Async patterns' },
    { icon: '🏗️', label: 'Architecture' },
    { icon: '🔒', label: 'Closures & scope' },
    { icon: '🧩', label: 'Modules' },
  ],
  lessons: advancedJavaScriptLessonsDetailed.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
  })),
};

export const advancedJavaScriptModule = {
  section: advancedJavaScriptSection,
  lessons: advancedJavaScriptLessonsDetailed,
  locales: {
    ar: advancedJavaScriptLessonsArabic,
  },
};

export { advancedJavaScriptLessonsArabic, advancedJavaScriptLessonsDetailed };
