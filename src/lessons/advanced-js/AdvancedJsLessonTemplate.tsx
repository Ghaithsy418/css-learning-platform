import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PhotoRenderer from '../../components/PhotoRenderer';
import {
  advancedJavaScriptLessonsDetailed,
  type AdvancedJavaScriptLesson,
} from '../../config/advancedJavaScriptLessons';
import { advancedJavaScriptLessonsArabic } from '../../config/advancedJavaScriptLessonsArabic';
import { AnswerKey } from '../../features/code/AnswerKey';
import CodeEditor from '../../features/code/CodeEditor';
import CodeInput from '../../features/code/CodeInput';
import CodeLine from '../../features/code/CodeLine';
import { ExerciseSection } from '../../features/code/ExerciseSection';
import { Explanation } from '../../features/code/Explanation';
import FreeCodeExercise from '../../features/code/FreeCodeExercise';
import { HintBox } from '../../features/code/HintBox';
import JsComment from '../../features/jsSyntax/JsComment';
import JsKeyword from '../../features/jsSyntax/JsKeyword';
import JsString from '../../features/jsSyntax/JsString';
import StartQuizButton from '../../features/quiz/StartQuizButton';
import { advancedJsQuizzes } from '../../features/quiz/advancedJsQuizData';
import {
  advancedLessonExercises,
  type AdvancedLessonExerciseConfig,
} from './advancedLessonExercises';

function parseTagAttributes(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const attrRegex = /(\w+)="([^"]*)"/g;
  let match: RegExpExecArray | null = attrRegex.exec(tag);

  while (match) {
    attrs[match[1]] = match[2];
    match = attrRegex.exec(tag);
  }

  return attrs;
}

function renderInlineMarkdown(text: string, keyPrefix: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={`${keyPrefix}-strong-${index}`}
          className="font-bold text-gray-800"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={`${keyPrefix}-code-${index}`}
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
  });
}

function renderMarkdownSegment(source: string, keyPrefix: string) {
  const lines = source.replace(/\r/g, '').split('\n');
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      nodes.push(
        <h3
          key={`${keyPrefix}-h3-${index}`}
          className="mt-7 mb-3 text-xl font-black text-gray-800"
        >
          {renderInlineMarkdown(
            line.replace(/^###\s+/, ''),
            `${keyPrefix}-h3-text-${index}`,
          )}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      nodes.push(
        <h2
          key={`${keyPrefix}-h2-${index}`}
          className="mt-8 mb-3 text-2xl font-black text-gray-800"
        >
          {renderInlineMarkdown(
            line.replace(/^##\s+/, ''),
            `${keyPrefix}-h2-text-${index}`,
          )}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      let listIndex = index;

      while (
        listIndex < lines.length &&
        /^\d+\.\s+/.test(lines[listIndex].trim())
      ) {
        items.push(lines[listIndex].trim().replace(/^\d+\.\s+/, ''));
        listIndex += 1;
      }

      nodes.push(
        <ol
          key={`${keyPrefix}-ol-${index}`}
          className="my-4 list-decimal space-y-2 ps-6 text-gray-700"
        >
          {items.map((item, itemIndex) => (
            <li key={`${keyPrefix}-ol-item-${index}-${itemIndex}`}>
              {renderInlineMarkdown(
                item,
                `${keyPrefix}-ol-item-text-${index}-${itemIndex}`,
              )}
            </li>
          ))}
        </ol>,
      );

      index = listIndex;
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      let listIndex = index;

      while (
        listIndex < lines.length &&
        /^-\s+/.test(lines[listIndex].trim())
      ) {
        items.push(lines[listIndex].trim().replace(/^-\s+/, ''));
        listIndex += 1;
      }

      nodes.push(
        <ul
          key={`${keyPrefix}-ul-${index}`}
          className="my-4 list-disc space-y-2 ps-6 text-gray-700"
        >
          {items.map((item, itemIndex) => (
            <li key={`${keyPrefix}-ul-item-${index}-${itemIndex}`}>
              {renderInlineMarkdown(
                item,
                `${keyPrefix}-ul-item-text-${index}-${itemIndex}`,
              )}
            </li>
          ))}
        </ul>,
      );

      index = listIndex;
      continue;
    }

    const paragraphLines: string[] = [line];
    let nextIndex = index + 1;

    while (nextIndex < lines.length) {
      const candidate = lines[nextIndex].trim();
      if (
        !candidate ||
        candidate.startsWith('#') ||
        /^\d+\.\s+/.test(candidate) ||
        /^-\s+/.test(candidate)
      ) {
        break;
      }
      paragraphLines.push(candidate);
      nextIndex += 1;
    }

    nodes.push(
      <p
        key={`${keyPrefix}-p-${index}`}
        className="my-3 leading-8 text-gray-700"
      >
        {renderInlineMarkdown(
          paragraphLines.join(' '),
          `${keyPrefix}-p-text-${index}`,
        )}
      </p>,
    );

    index = nextIndex;
  }

  return nodes;
}

function renderTheory(source: string, keyPrefix: string) {
  const blocks: ReactNode[] = [];
  let cursor = 0;
  let index = 0;

  const pushMarkdown = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    blocks.push(
      <Explanation key={`${keyPrefix}-md-${index}`}>
        {renderMarkdownSegment(trimmed, `${keyPrefix}-md-${index}`)}
      </Explanation>,
    );
    index += 1;
  };

  while (cursor < source.length) {
    const photoIndex = source.indexOf('<PhotoRenderer', cursor);
    const codeIndex = source.indexOf('<CodeBlock', cursor);
    const calloutIndex = source.indexOf('<InfoCallout', cursor);

    const candidateIndexes = [photoIndex, codeIndex, calloutIndex].filter(
      (value) => value >= 0,
    );

    if (candidateIndexes.length === 0) {
      pushMarkdown(source.slice(cursor));
      break;
    }

    const nextIndex = Math.min(...candidateIndexes);

    if (nextIndex > cursor) {
      pushMarkdown(source.slice(cursor, nextIndex));
    }

    if (nextIndex === photoIndex) {
      const close = source.indexOf('/>', photoIndex);
      if (close === -1) {
        pushMarkdown(source.slice(photoIndex));
        break;
      }

      const tag = source.slice(photoIndex, close + 2);
      const attrs = parseTagAttributes(tag);

      blocks.push(
        <div
          key={`${keyPrefix}-photo-${index}`}
          className="my-5"
        >
          <PhotoRenderer
            imageUrl={attrs.imageUrl ?? ''}
            altText={attrs.altText ?? 'Lesson visual'}
            caption={attrs.caption}
          />
        </div>,
      );
      index += 1;
      cursor = close + 2;
      continue;
    }

    if (nextIndex === codeIndex) {
      const startTagEnd = source.indexOf('>', codeIndex);
      const endTag = source.indexOf('</CodeBlock>', startTagEnd + 1);
      if (startTagEnd === -1 || endTag === -1) {
        pushMarkdown(source.slice(codeIndex));
        break;
      }

      const codeText = source.slice(startTagEnd + 1, endTag).trim();
      const codeLines = codeText.replace(/\r/g, '').split('\n');

      blocks.push(
        <CodeEditor key={`${keyPrefix}-code-${index}`}>
          {codeLines.map((line, lineIndex) => (
            <CodeLine key={`${keyPrefix}-code-line-${index}-${lineIndex}`}>
              <span className="text-gray-100">{line || ' '}</span>
            </CodeLine>
          ))}
        </CodeEditor>,
      );
      index += 1;
      cursor = endTag + '</CodeBlock>'.length;
      continue;
    }

    if (nextIndex === calloutIndex) {
      const startTagEnd = source.indexOf('>', calloutIndex);
      const endTag = source.indexOf('</InfoCallout>', startTagEnd + 1);
      if (startTagEnd === -1 || endTag === -1) {
        pushMarkdown(source.slice(calloutIndex));
        break;
      }

      const startTag = source.slice(calloutIndex, startTagEnd + 1);
      const attrs = parseTagAttributes(startTag);
      const body = source.slice(startTagEnd + 1, endTag).trim();

      blocks.push(
        <HintBox
          key={`${keyPrefix}-callout-${index}`}
          title={`${attrs.type === 'warning' ? '⚠️' : 'ℹ️'} ${attrs.title ?? 'Note'}`}
        >
          {renderMarkdownSegment(body, `${keyPrefix}-callout-body-${index}`)}
        </HintBox>,
      );
      index += 1;
      cursor = endTag + '</InfoCallout>'.length;
    }
  }

  return blocks;
}

interface AdvancedJsLessonTemplateProps {
  lessonId: string;
  lessonNum: number;
  accent: 'cyan' | 'amber' | 'violet' | 'emerald';
}

const accentClassMap = {
  cyan: {
    badge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    card: 'from-cyan-50 via-sky-50 to-blue-50 border-cyan-200',
    glowOne: 'bg-cyan-300/35',
    glowTwo: 'bg-blue-300/30',
    stripe: 'from-cyan-500 to-blue-500',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    card: 'from-amber-50 via-yellow-50 to-orange-50 border-amber-200',
    glowOne: 'bg-amber-300/35',
    glowTwo: 'bg-orange-300/30',
    stripe: 'from-amber-500 to-orange-500',
  },
  violet: {
    badge: 'bg-violet-100 text-violet-800 border-violet-200',
    card: 'from-violet-50 via-fuchsia-50 to-purple-50 border-violet-200',
    glowOne: 'bg-violet-300/35',
    glowTwo: 'bg-fuchsia-300/30',
    stripe: 'from-violet-500 to-fuchsia-500',
  },
  emerald: {
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    card: 'from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200',
    glowOne: 'bg-emerald-300/35',
    glowTwo: 'bg-cyan-300/30',
    stripe: 'from-emerald-500 to-cyan-500',
  },
};

function getLessonLocale(): 'en' | 'ar' {
  if (typeof window === 'undefined') return 'en';
  const cached = localStorage.getItem('advanced_js_locale');
  return cached === 'ar' ? 'ar' : 'en';
}

export default function AdvancedJsLessonTemplate({
  lessonId,
  lessonNum,
  accent,
}: AdvancedJsLessonTemplateProps) {
  const locale = getLessonLocale();

  const englishMap = useMemo(
    () =>
      Object.fromEntries(
        advancedJavaScriptLessonsDetailed.map((lesson) => [lesson.id, lesson]),
      ) as Record<string, AdvancedJavaScriptLesson>,
    [],
  );

  const arabicMap = useMemo(
    () =>
      Object.fromEntries(
        advancedJavaScriptLessonsArabic.map((lesson) => [lesson.id, lesson]),
      ) as Record<string, AdvancedJavaScriptLesson>,
    [],
  );

  const lesson =
    (locale === 'ar' ? arabicMap[lessonId] : englishMap[lessonId]) ??
    englishMap[lessonId];

  const exerciseConfig: AdvancedLessonExerciseConfig =
    advancedLessonExercises[lessonId] ?? advancedLessonExercises['adv-js-1'];

  const [termOne, setTermOne] = useState('');
  const [termTwo, setTermTwo] = useState('');
  const [termThree, setTermThree] = useState('');
  const [miniAnswer, setMiniAnswer] = useState('');
  const [showRevisionAnswer, setShowRevisionAnswer] = useState(false);
  const [showMiniAnswer, setShowMiniAnswer] = useState(false);

  const accentClasses = accentClassMap[accent];
  const quizQuestionCount = advancedJsQuizzes[lessonId]?.questions.length ?? 6;

  return (
    <div
      className="space-y-6"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <section
        className={`relative isolate overflow-hidden rounded-3xl border bg-linear-to-br p-6 shadow-sm ${accentClasses.card}`}
      >
        <div
          className={`pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full blur-3xl ${accentClasses.glowOne}`}
        />
        <div
          className={`pointer-events-none absolute -bottom-12 -right-10 h-40 w-40 rounded-full blur-3xl ${accentClasses.glowTwo}`}
        />
        <div
          className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${accentClasses.stripe}`}
        />

        <div className="relative z-10">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${accentClasses.badge}`}
            >
              Advanced JavaScript • Lesson {lessonNum}
            </span>
            <Link
              to="/js/advanced"
              className="rounded-lg border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-white"
            >
              {locale === 'ar' ? '📚 فهرس المسار' : '📚 Module Map'}
            </Link>
          </div>

          <h2 className="text-2xl font-black leading-tight text-gray-900">
            {lesson.title}
          </h2>
          <p className="mt-3 leading-8 text-gray-700">{lesson.description}</p>

          <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
            {lesson.objectives.map((objective, index) => (
              <div
                key={`${lessonId}-objective-${index}`}
                className="rounded-xl border border-white/70 bg-white/70 p-3 text-sm leading-7 text-gray-700"
              >
                <span className="font-bold text-gray-900">
                  هدف {index + 1}:
                </span>{' '}
                {objective}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-xl font-black text-gray-800">Deep Dive Theory</h3>
        <div>{renderTheory(lesson.deepDiveTheory, `${lessonId}-theory`)}</div>
      </section>

      <ExerciseSection
        title={exerciseConfig.revisionTitle}
        borderColor="blue"
        lessonId={lessonId}
        exerciseId="ex1"
        maxPoints={10}
        inputCount={3}
      >
        <Explanation>
          <p>{exerciseConfig.revisionPrompt}</p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsKeyword>const</JsKeyword> checklist = [
          </CodeLine>
          <CodeLine indent={1}>
            <JsString>"</JsString>
            <CodeInput
              value={termOne}
              onChange={setTermOne}
              width="w-36"
              hint={exerciseConfig.keyHints[0]}
              correctValue={exerciseConfig.keyTerms[0]}
            />
            <JsString>"</JsString>,
          </CodeLine>
          <CodeLine indent={1}>
            <JsString>"</JsString>
            <CodeInput
              value={termTwo}
              onChange={setTermTwo}
              width="w-36"
              hint={exerciseConfig.keyHints[1]}
              correctValue={exerciseConfig.keyTerms[1]}
            />
            <JsString>"</JsString>,
          </CodeLine>
          <CodeLine indent={1}>
            <JsString>"</JsString>
            <CodeInput
              value={termThree}
              onChange={setTermThree}
              width="w-36"
              hint={exerciseConfig.keyHints[2]}
              correctValue={exerciseConfig.keyTerms[2]}
            />
            <JsString>"</JsString>,
          </CodeLine>
          <CodeLine>];</CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.log(checklist);
          </CodeLine>
        </CodeEditor>

        <AnswerKey
          show={showRevisionAnswer}
          onToggle={() => setShowRevisionAnswer((prev) => !prev)}
        >
          <pre className="rounded bg-gray-200 px-3 py-2 text-sm font-mono">
            {`${exerciseConfig.keyTerms[0]}
${exerciseConfig.keyTerms[1]}
${exerciseConfig.keyTerms[2]}`}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      <ExerciseSection
        title={exerciseConfig.miniCodeTitle}
        borderColor="amber"
        lessonId={lessonId}
        exerciseId="ex2"
        maxPoints={5}
        inputCount={1}
      >
        <Explanation>
          <p>اكتب الإجابة المختصرة داخل السطر التالي:</p>
        </Explanation>

        <CodeEditor>
          <CodeLine>
            <JsComment>// {exerciseConfig.miniCodeHint}</JsComment>
          </CodeLine>
          <CodeLine>
            <JsKeyword>const</JsKeyword> quickAnswer = <JsString>"</JsString>
            <CodeInput
              value={miniAnswer}
              onChange={setMiniAnswer}
              width="w-52"
              hint={exerciseConfig.miniCodeHint}
              correctValue={exerciseConfig.miniCodeExpected}
            />
            <JsString>"</JsString>;
          </CodeLine>
          <CodeLine>
            <JsKeyword>console</JsKeyword>.log(quickAnswer);
          </CodeLine>
        </CodeEditor>

        <HintBox>
          اربط الإجابة بالمفهوم المركزي للدرس، وليس بتفصيل فرعي.
        </HintBox>

        <AnswerKey
          show={showMiniAnswer}
          onToggle={() => setShowMiniAnswer((prev) => !prev)}
        >
          <pre className="rounded bg-gray-200 px-3 py-2 text-sm font-mono">
            {exerciseConfig.miniCodeExpected}
          </pre>
        </AnswerKey>
      </ExerciseSection>

      <section className="space-y-2">
        <h3 className="text-xl font-black text-gray-800">
          Practical Exercise Brief
        </h3>
        <div>
          {renderTheory(lesson.practicalExercise, `${lessonId}-practice-brief`)}
        </div>
      </section>

      <FreeCodeExercise
        title={exerciseConfig.freeCodeTitle}
        instructions={exerciseConfig.freeCodeInstructions}
        starterCode={exerciseConfig.freeCodeStarter}
        answerCode={exerciseConfig.freeCodeAnswer}
        hint={exerciseConfig.freeCodeHint}
        lessonId={lessonId}
        exerciseId="free-code"
        maxPoints={15}
      />

      <section className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-900">
        <p className="font-bold">🎯 قبل الاختبار</p>
        <p className="mt-1 leading-7">
          راجع المصطلحات، جرّب تعديل الكود الحر، ثم ابدأ الاختبار. يمكنك إعادة
          المحاولة لتحسين الدرجة.
        </p>
      </section>

      <StartQuizButton
        lessonId={lessonId}
        lessonNum={String(lessonNum)}
        totalQuestions={quizQuestionCount}
        quizPath={`/js/advanced/${lessonNum}/quiz`}
      />
    </div>
  );
}
