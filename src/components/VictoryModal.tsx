import React from 'react';
import { Trophy, Clock, BookOpen, RotateCcw, Sparkles, ShieldCheck, Users } from 'lucide-react';
import { GameProgress } from '../types/game';
import { ASSET_IMAGES } from '../data/gameData';
import { sound } from '../utils/audio';

interface VictoryModalProps {
  gameState: GameProgress;
  onRestart: () => void;
  onReviewJournal: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  gameState,
  onRestart,
  onReviewJournal,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} دقيقة و ${secs} ثانية`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-md animate-in fade-in duration-300 select-none overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#221c17] via-[#171411] to-[#120f0d] border border-amber-600/50 rounded-3xl p-6 md:p-8 shadow-2xl text-center text-stone-100 flex flex-col items-center">
        
        {/* Cinematic Header Image */}
        <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-amber-900/60 shadow-lg">
          <img
            src={ASSET_IMAGES.ikramo_arrival}
            alt="الهروب الكبير لإكرامو وعمادو"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>تمت مهمة الإنقاذ والهروب بنجاح ساحق</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black font-serif-arabic text-amber-200 mb-2">
          تحرير عمادو وسقوط البيت الأخير!
        </h2>

        <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-lg mb-6 font-light font-serif-arabic text-balance">
          بشجاعة وفطنة عالية، اخترقت المحققة <strong className="text-amber-400">إكرامو</strong> قصر الرعب، وفككت شفرات <strong className="text-stone-200">الدكتور برهان الكاظم</strong>، وكسرت شوكة <strong className="text-stone-200">سليمان الأعرج</strong>. حررت زميلها <strong className="text-amber-400">عمادو</strong> من أغلال الزنزانة السفلية، وخرجا معاً بأشرطة التسجيل وملفات 1986 لإسقاط المنظمة إلى الأبد!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md bg-stone-950/80 border border-stone-800 rounded-2xl p-4 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-stone-400 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              زمن التحقيق
            </span>
            <span className="font-bold text-sm md:text-base text-amber-200 font-mono tabular-nums">
              {formatTime(gameState.elapsedSeconds)}
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-stone-800">
            <span className="text-[11px] text-stone-400 mb-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-amber-500" />
              الأدلة المكتشفة
            </span>
            <span className="font-bold text-sm md:text-base text-amber-200 font-cinzel tabular-nums">
              {gameState.journal.length}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[11px] text-stone-400 mb-1 flex items-center gap-1">
              <Users className="w-3 h-3 text-amber-500" />
              الأبطال
            </span>
            <span className="font-bold text-xs text-emerald-300 font-serif-arabic">
              إكرامو وعمادو
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950/50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>لعب المغامرة مرة أخرى</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onReviewJournal();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>استعراض سجل التحقيق</span>
          </button>
        </div>
      </div>
    </div>
  );
};
