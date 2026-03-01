/**
 * BrowserPreview — معاينة متصفح وهمية
 * Mini browser chrome wrapper for DOM exercise previews
 */

interface BrowserPreviewProps {
  children: React.ReactNode;
  label?: string;
}

const BrowserPreview: React.FC<BrowserPreviewProps> = ({
  children,
  label = '👇 معاينة المتصفح:',
}) => (
  <div className="my-6">
    <p className="text-sm text-gray-600 mb-3 font-medium">{label}</p>
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg bg-white">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
        <div className="flex-1 mx-3 bg-white rounded-full px-3 py-1 text-xs text-gray-400 font-mono border border-gray-200">
          localhost:3000
        </div>
      </div>
      {/* Content */}
      <div className="p-6 min-h-40">{children}</div>
    </div>
  </div>
);

export default BrowserPreview;
