import { useState } from 'react';
import toast from 'react-hot-toast';
import FreeCodeEditor from '../features/code/FreeCodeEditor';
import { runUserJavaScript } from '../features/code/runUserJavaScript';
import ConsoleOutput from '../features/js/ConsoleOutput';
import { useProgress } from '../features/progress/ProgressContext';

const starterCode =
  `const studentName = "طالب";

function greet(name) {
  console.log(` +
  '`' +
  `مرحباً يا ${name}` +
  '`' +
  `);
}

greet(studentName);`;

export default function JsHomeworkPage() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(starterCode);
  const [outputLines, setOutputLines] = useState(
    runUserJavaScript(starterCode),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitHomework, getHomeworkSubmissions } = useProgress();

  const submissions = getHomeworkSubmissions();

  const handleRun = () => {
    setOutputLines(runUserJavaScript(code));
  };

  const handleClearOutput = () => {
    setOutputLines([]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('اكتب عنواناً للواجب قبل الإرسال');
      return;
    }

    if (!code.trim()) {
      toast.error('اكتب الكود قبل الإرسال');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitHomework(title.trim(), code, outputLines);
      toast.success('تم إرسال الواجب إلى المعلم');
      setTitle('');
    } catch {
      toast.error('تعذر إرسال الواجب حالياً');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
        <div className="text-right">
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
            الواجب البرمجي
          </span>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            اكتب حلاً كاملاً، جرّبه داخل المحرر، ثم أرسله للمعلم مع عنوان من
            اختيارك.
          </p>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-right text-sm font-bold text-gray-700">
            عنوان الواجب
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="مثال: حل واجب الشروط والحلقات"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-sm outline-none transition focus:border-amber-400"
          />
        </div>

        <div className="mt-5">
          <FreeCodeEditor
            defaultCode={starterCode}
            onCodeChange={setCode}
            height={320}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={handleRun}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            ▶ جرّب الكود
          </button>
          <button
            onClick={handleClearOutput}
            disabled={outputLines.length === 0}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🧹 مسح النتائج
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? 'جارٍ الإرسال...' : '📨 إرسال للمعلم'}
          </button>
        </div>

        <ConsoleOutput
          lines={outputLines}
          label="👇 نتيجة تجربة الكود قبل الإرسال:"
        />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-800">
            آخر الواجبات المرسلة
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            هذه القائمة تعرض تاريخ إرسالاتك السابقة بالعنوان والكود.
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
            لم ترسل أي واجب بعد.
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {submissions.map((submission) => (
              <article
                key={submission.id}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    {new Date(submission.submittedAt).toLocaleString('ar-SA')}
                  </span>
                  <div className="text-right">
                    <h3 className="text-base font-bold text-gray-800">
                      {submission.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {submission.output?.length
                        ? `تم حفظ ${submission.output.length} سطر من ناتج التشغيل`
                        : 'لا يوجد ناتج تشغيل محفوظ'}
                    </p>
                  </div>
                </div>

                <pre
                  dir="ltr"
                  className="mt-4 overflow-x-auto rounded-xl bg-gray-950 p-4 text-sm leading-6 text-gray-100"
                >
                  {submission.code}
                </pre>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
