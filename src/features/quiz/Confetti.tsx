/**
 * Confetti — تأثير احتفالي (CSS-only, no dependencies)
 * Pure CSS confetti explosion effect
 */

import { useEffect, useState } from 'react';

const CONFETTI_COLORS = [
  '#f94144',
  '#f3722c',
  '#f8961e',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#577590',
  '#6a4c93',
  '#e63946',
  '#457b9d',
  '#2a9d8f',
  '#e9c46a',
  '#264653',
  '#ff006e',
  '#fb5607',
  '#ffbe0b',
  '#8338ec',
  '#3a86ff',
];

const SHAPES = ['square', 'rectangle', 'circle'] as const;

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: (typeof SHAPES)[number];
  rotation: number;
  delay: number;
  duration: number;
  drift: number;
}

function generatePieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -(Math.random() * 20 + 5),
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 8 + 4,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    rotation: Math.random() * 360,
    delay: Math.random() * 1.5,
    duration: Math.random() * 2 + 2,
    drift: (Math.random() - 0.5) * 60,
  }));
}

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

export default function Confetti({ active, duration = 4000 }: ConfettiProps) {
  const [show, setShow] = useState(false);
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      setPieces(generatePieces(80));
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0.3);
            opacity: 0;
          }
        }
        @keyframes confettiWiggle {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(var(--drift)); }
          75% { transform: translateX(calc(var(--drift) * -1)); }
        }
      `}</style>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={
            {
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              '--drift': `${p.drift}px`,
              animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards, confettiWiggle ${p.duration * 0.5}s ease-in-out ${p.delay}s infinite`,
            } as React.CSSProperties
          }
        >
          <div
            style={{
              width: p.shape === 'rectangle' ? p.size * 1.5 : p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
              transform: `rotate(${p.rotation}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
