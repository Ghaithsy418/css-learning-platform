/**
 * Logo — شعار "تعلّم" (Ta'allam)
 * Emoji-based code symbol + Arabic brand text
 */

interface LogoProps {
  /** 'sm' for sidebar / header, 'lg' for homepage hero */
  size?: 'sm' | 'lg';
  /** Show the subtitle tagline */
  showTagline?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 'sm',
  showTagline = false,
  className = '',
}) => {
  const isLarge = size === 'lg';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Code symbol */}
      <div
        className={`rounded-xl flex items-center justify-center font-black text-white select-none ${
          isLarge ? 'w-14 h-14 text-2xl' : 'w-9 h-9 text-base'
        }`}
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        }}
      >
        {'</>'}
      </div>

      {/* Text */}
      <div>
        <h1
          className={`font-black text-white leading-tight tracking-tight ${
            isLarge ? 'text-4xl' : 'text-xl'
          }`}
        >
          تعلّم
        </h1>
        {showTagline && (
          <p className="text-white/50 text-xs mt-0.5">منصة تعليمية تفاعلية</p>
        )}
      </div>
    </div>
  );
};

export default Logo;
