import { Link } from 'react-router-dom';
import ClassroomTree from '../components/ClassroomTree';
import StudentLeaderboard from '../components/StudentLeaderboard';
import { focusTopics, knowTopics } from '../config/jsClassroomTrees';

export default function JsClassroomPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-right">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              مساحة الصف
            </span>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
              هنا ستجد ترتيب الطلاب داخل المسار، وما الذي نركز عليه داخل الصف،
              وما الذي يكفي أن تعرفه وتفهمه جيداً.
            </p>
          </div>

          <Link
            to="/js/homework"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-600"
          >
            اذهب إلى الواجب البرمجي ←
          </Link>
        </div>
      </section>

      <StudentLeaderboard />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ClassroomTree
          title="الأشياء التي نركز عليها"
          description="هذه الموضوعات هي محور العمل داخل الحصة، وهي الأهم في الواجبات والتطبيقات العملية."
          accent="amber"
          topics={focusTopics}
        />
        <ClassroomTree
          title="الأشياء التي نعرفها ونفهمها"
          description="هذه الموضوعات مطلوبة للفهم والاستيعاب، حتى لو لم تكن محور التدريب الأول داخل الصف."
          accent="blue"
          topics={knowTopics}
        />
      </div>
    </div>
  );
}
