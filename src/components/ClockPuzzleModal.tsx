import React, { useState } from 'react';
import { X, Clock, ChevronUp, ChevronDown, CheckCircle, Unlock, Sparkles } from 'lucide-react';
import { ASSET_IMAGES } from '../data/gameData';
import { GameProgress } from '../types/game';
import { sound } from '../utils/audio';

interface ClockPuzzleModalProps {
  gameState: GameProgress;
  onClose: () => void;
  onSolveClock: () => void;
}

export const ClockPuzzleModal: React.FC<ClockPuzzleModalProps> = ({
  gameState,
  onClose,
  onSolveClock,
}) => {
  const [hours, setHours] = useState(gameState.parlorClockTime.hours || 12);
  const [minutes, setMinutes] = useState(gameState.parlorClockTime.minutes || 0);
  const [solved, setSolved] = useState(gameState.parlorClockSolved);

  const handleAdjustHours = (delta: number) => {
    sound.playClockTick();
    setHours((prev) => {
      const next = ((prev + delta - 1 + 12) % 12) + 1;
      checkSolved(next, minutes);
      return next;
    });
  };

  const handleAdjustMinutes = (delta: number) => {
    sound.playClockTick();
    setMinutes((prev) => {
      const next = (prev + delta + 60) % 60;
      checkSolved(hours, next);
      return next;
    });
  };

  const checkSolved = (h: number, m: number) => {
    // Target time: 03:45 (ساعة الرحيل في أوراق الطبيب)
    if (h === 3 && m === 45) {
      setTimeout(() => {
        sound.playUnlock();
        setSolved(true);
        onSolveClock();
      }, 200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#181411] border border-amber-900/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-stone-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-bold text-amber-200 font-serif-arabic">
              ساعة البندول الأثرية الكبرى
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clock Face & Controls */}
        <div className="p-4 md:p-6 flex flex-col items-center overflow-y-auto">
          {/* Real Macro Clock Photograph */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-amber-900/60 shadow-lg mb-4">
            <img
              src={ASSET_IMAGES.parlor_clock_zoom}
              alt="ميناء ساعة البندول النحاسي"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,8,7,0.7)_100%)]" />
          </div>
          
          {/* Ornate Inscription */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-amber-950/60 mb-6 text-center w-full">
            <span className="text-[11px] text-amber-500 block mb-1 font-serif-arabic">
              لوحة نحاسية محفورة تحت ميناء الساعة:
            </span>
            <p className="text-sm text-stone-300 font-serif-arabic leading-relaxed">
              «حين يتوقف الزمن عند الثالثة وخمس وأربعين دقيقة فجراً (03:45)... تنفتح خبيئة الصالون.»
            </p>
          </div>

          {/* Clock Dial Controls */}
          {!solved ? (
            <div className="flex items-center justify-center gap-6 mb-6" dir="ltr">
              {/* Hours */}
              <div className="flex flex-col items-center bg-stone-950 border border-amber-800/60 rounded-2xl p-3 w-24 shadow-inner">
                <span className="text-[10px] text-stone-400 mb-1">الساعات</span>
                <button
                  onClick={() => handleAdjustHours(1)}
                  className="p-1 rounded hover:bg-stone-800 text-amber-400 transition-colors cursor-pointer"
                  title="تقديم ساعة"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>

                <div className="my-2 text-4xl font-bold font-cinzel text-amber-200">
                  {hours.toString().padStart(2, '0')}
                </div>

                <button
                  onClick={() => handleAdjustHours(-1)}
                  className="p-1 rounded hover:bg-stone-800 text-amber-400 transition-colors cursor-pointer"
                  title="تأخير ساعة"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>

              <span className="text-3xl font-bold text-amber-500 animate-pulse">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center bg-stone-950 border border-amber-800/60 rounded-2xl p-3 w-24 shadow-inner">
                <span className="text-[10px] text-stone-400 mb-1">الدقائق</span>
                <button
                  onClick={() => handleAdjustMinutes(5)}
                  className="p-1 rounded hover:bg-stone-800 text-amber-400 transition-colors cursor-pointer"
                  title="تقديم 5 دقائق"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>

                <div className="my-2 text-4xl font-bold font-cinzel text-amber-200">
                  {minutes.toString().padStart(2, '0')}
                </div>

                <button
                  onClick={() => handleAdjustMinutes(-5)}
                  className="p-1 rounded hover:bg-stone-800 text-amber-400 transition-colors cursor-pointer"
                  title="تأخير 5 دقائق"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/50 w-full text-center space-y-3 animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold">
                <CheckCircle className="w-5 h-5" />
                <span>دقت الساعة 03:45! انزلق درج سري أسفل قاعدة البندول!</span>
              </div>
              <p className="text-xs text-stone-300 font-serif-arabic">
                عثرتِ على "شريط التسجيل السري (رقم 4)" الخاص باعترافات الدكتور برهان الكاظم، تمت إضافته إلى حقيبة الأدوات.
              </p>
            </div>
          )}

          <div className="text-xs text-stone-500 text-center">
            {solved ? 'تم حل لغز ساعة الصالون.' : 'اضبطي العقارب على 03:45 لفتح التجويف السري.'}
          </div>
        </div>
      </div>
    </div>
  );
};
