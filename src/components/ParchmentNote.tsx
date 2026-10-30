import React from 'react';
import { Sparkles } from 'lucide-react';

interface ParchmentNoteProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  waxSeal?: boolean;
  className?: string;
}

export const ParchmentNote: React.FC<ParchmentNoteProps> = ({
  title,
  subtitle,
  children,
  waxSeal = true,
  className = '',
}) => {
  return (
    <div
      className={`relative p-6 md:p-8 text-[#2b2118] shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-[#8f6e4a]/60 select-none ${className}`}
      style={{
        background:
          'radial-gradient(circle at 50% 50%, #f6e8d0 0%, #ecd4b3 55%, #dfbe93 85%, #b99263 100%)',
        clipPath:
          'polygon(0% 1%, 3% 0%, 7% 1.5%, 12% 0.5%, 19% 1.8%, 26% 0.2%, 35% 1.2%, 44% 0%, 53% 1.5%, 62% 0.4%, 73% 1.8%, 84% 0.2%, 93% 1.5%, 98% 0.4%, 100% 2%, 99.2% 10%, 100% 21%, 98.8% 32%, 100% 45%, 99.1% 58%, 100% 70%, 98.5% 82%, 100% 93%, 99% 99%, 94% 98.2%, 85% 99.6%, 76% 98.5%, 67% 100%, 55% 98.4%, 44% 99.5%, 32% 98%, 21% 99.8%, 11% 98.2%, 3% 99.5%, 0% 98%, 1.2% 87%, 0% 75%, 1.5% 62%, 0.2% 48%, 1.8% 35%, 0.4% 22%, 1.5% 11%)',
        filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.7))',
      }}
    >
      {/* Subtle aged paper grain & burn marks */}
      <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply bg-[radial-gradient(circle_at_20%_20%,transparent_0%,rgba(60,35,10,0.4)_100%)]" />

      {/* Wax Seal Monogram */}
      {waxSeal && (
        <div className="absolute -top-3 left-6 w-12 h-12 rounded-full bg-[#8b1e1b] border-2 border-[#5a110f] shadow-lg flex items-center justify-center transform -rotate-12 select-none z-10">
          <div className="w-9 h-9 rounded-full border border-[#b23936] flex items-center justify-center text-[#f8d7da] font-cinzel font-bold text-xs shadow-inner">
            1986
          </div>
        </div>
      )}

      {/* Header */}
      {title && (
        <div className="text-center mb-4 border-b border-[#a8825c]/50 pb-2.5">
          <h3 className="text-xl md:text-2xl font-bold font-serif-arabic text-[#382618] tracking-wide">
            {title}
          </h3>
          {subtitle && (
            <span className="text-[11px] font-cinzel tracking-widest text-[#725337] uppercase block mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Main Body */}
      <div className="font-serif-arabic text-sm md:text-base leading-relaxed text-[#2c1d11] text-justify space-y-2">
        {children}
      </div>

      {/* Antique Stamp Watermark */}
      <div className="mt-4 pt-3 border-t border-[#a8825c]/40 flex items-center justify-between text-[11px] text-[#6d4f33] font-cinzel">
        <span className="flex items-center gap-1 font-serif-arabic">
          <Sparkles className="w-3 h-3 text-[#9b3a1a]" />
          أرشيف البيت الأخير · وثيقة أصلية
        </span>
        <span className="font-bold tracking-widest">DR. BORHAN AL-KAZIM</span>
      </div>
    </div>
  );
};
