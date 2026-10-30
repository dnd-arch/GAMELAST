import React, { useState } from 'react';
import { X, Lock, Unlock, Key, ShieldCheck, Heart, AlertTriangle, Sparkles, Scissors, ShieldAlert } from 'lucide-react';
import { ASSET_IMAGES } from '../data/gameData';
import { GameProgress } from '../types/game';
import { sound } from '../utils/audio';

interface DungeonCellModalProps {
  gameState: GameProgress;
  onClose: () => void;
  onUnlockCell: () => void;
  onFreeEmado: () => void;
  onCollectMasterKey: () => void;
}

export const DungeonCellModal: React.FC<DungeonCellModalProps> = ({
  gameState,
  onClose,
  onUnlockCell,
  onFreeEmado,
  onCollectMasterKey,
}) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUseDungeonKeys = () => {
    if (gameState.inventory.includes('dungeon_keys')) {
      sound.playUnlock();
      onUnlockCell();
      setFeedback('انفتحت بوابة الزنزانة الحديدية الثقيلة بصوت صرير مدوٍ!');
    } else {
      sound.playClick();
      setFeedback('أنتِ بحاجة إلى "طقم مفاتيح زنزانة القبو". ابحثي في مكتب دكتور برهان بمختبر العمليات!');
    }
  };

  const handleUseBoltCutter = () => {
    if (gameState.inventory.includes('bolt_cutter')) {
      sound.playChainRattle();
      onFreeEmado();
      setFeedback('انقطعت الأغلال الفولاذية وتحرر عمادو بالكامل!');
    } else {
      sound.playClick();
      setFeedback('السلاسل سميكة جداً! أنتِ بحاجة إلى "مقص الحديد الصناعي" (Bolt Cutter) من مكتب برهان.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200 select-none font-cairo" dir="rtl">
      {/* Authentic Subterranean Crime Scene Parchment Folio */}
      <div 
        className="relative w-full max-w-4xl p-6 md:p-8 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-4 border-[#7a5833] text-[#2c1d10] flex flex-col max-h-[92vh] overflow-hidden"
        style={{
          backgroundColor: '#f5e7cd',
          backgroundImage: 'radial-gradient(#dec29b 1px, transparent 1px), radial-gradient(#ead0ad 1px, #f5e7cd 1px)',
          backgroundSize: '20px 20px',
          boxShadow: 'inset 0 0 45px rgba(100,65,30,0.35), 0 25px 60px rgba(0,0,0,0.9)',
        }}
      >
        {/* Folio Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#b0936f] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8c2d19] text-amber-100 flex items-center justify-center font-bold shadow-inner">
              <ShieldAlert className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold font-serif-arabic text-[#3a200e]">
                زنزانة الاحتجاز السفلية · موقع احتجاز عمادو
              </h2>
              <p className="text-[11px] text-[#785b3b]">موقع الجريمة: قاع القبو الحجري تحت أسوار البيت الأخير</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPaperRustle();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#dec39f] hover:bg-[#cfb18b] text-[#38200e] font-bold flex items-center justify-center cursor-pointer text-sm shadow transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row gap-5 items-center justify-center pr-1 pl-1">
          
          {/* Dungeon Photographic Evidence */}
          <div className="relative w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border-2 border-[#8c6d48] shadow-inner bg-stone-900 group">
            <img
              src={ASSET_IMAGES.dungeon}
              alt="زنزانة عمادو"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,8,7,0.65)_100%)]" />

            {/* Status Stamp */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded bg-stone-950/85 border border-amber-900/60 text-xs flex items-center gap-1.5 text-amber-200 font-serif-arabic shadow-md">
              {gameState.emadoFreed ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">تم فك الأغلال بنجاح</span>
                </>
              ) : gameState.dungeonCellUnlocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300">الباب مفتوح · الأغلال مقيدة</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-300">البوابة الحديدية مقفلة</span>
                </>
              )}
            </div>
          </div>

          {/* Real Dialogue Transcript & Interactive Actions */}
          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-3.5">
            
            {/* Dialogue Card styled as an Investigation Transcript */}
            <div className="p-4 rounded-xl bg-[#ede0c9] border-2 border-[#bfa27d] shadow-sm">
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#d8be9a]">
                <div className="w-5 h-5 rounded-full bg-[#1e3a1f] text-emerald-100 flex items-center justify-center text-[10px] font-bold font-serif-arabic">
                  ع
                </div>
                <span className="text-xs font-bold text-[#351e0e] font-serif-arabic">
                  إفادة عمادو الحية من وراء القضبان:
                </span>
              </div>

              <p className="text-xs md:text-sm text-[#3b2311] leading-relaxed font-serif-arabic">
                {!gameState.dungeonCellUnlocked
                  ? '«إكرامو؟! لقد أتيتِ حقاً! احذري من "سليمان الأعرج"... لقد ضربني في الخارج وجرني إلى هنا بأمر من الدكتور "برهان الكاظم"! البوابة مقفلة بقفل ثقيل، مفاتيحه موجودة على طاولة برهان في مختبر العمليات!»'
                  : !gameState.emadoFreed
                  ? '«الحمد لله، فُتحت البوابة! لكن سلاسل الجدار غليظة وتدمي معصمي... لن تنكسر باليدين، ابحثي عن مقص الحديد (Bolt Cutter) في غرفة العمليات لقطعها فوراً!»'
                  : '«شكراً لكِ يا إكرامو... كنت أعلم أنكِ لن تتركيني لمصيري! قبل أن يفقدوني الوعي، تمكنت من سرقة "المفتاح الرئيسي للبوابة الكبرى" من معطف سليمان الأعرج وخبأته في بطانة حذائي... خذيه الآن، ولنهرب من هذا البيت الملعون قبل أن يعودوا!»'}
              </p>
            </div>

            {/* Tactical Actions styled as aged stamped tags */}
            <div className="space-y-2.5">
              {!gameState.dungeonCellUnlocked ? (
                <button
                  onClick={handleUseDungeonKeys}
                  className="w-full py-3 px-4 rounded-xl bg-[#8c2d19] hover:bg-[#6e1e0f] text-amber-100 font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md font-serif-arabic"
                >
                  <Unlock className="w-4 h-4" />
                  <span>فتح بوابة الزنزانة بمفاتيح القبو</span>
                </button>
              ) : !gameState.emadoFreed ? (
                <button
                  onClick={handleUseBoltCutter}
                  className="w-full py-3 px-4 rounded-xl bg-[#8c2d19] hover:bg-[#6e1e0f] text-amber-100 font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md font-serif-arabic"
                >
                  <Scissors className="w-4 h-4" />
                  <span>استخدام مقص الحديد لقطع سلاسل عمادو</span>
                </button>
              ) : !gameState.masterGateKeyFound ? (
                <button
                  onClick={() => {
                    sound.playKeyPickup();
                    onCollectMasterKey();
                    setFeedback('استلمتِ المفتاح الرئيسي للبوابة الكبرى من عمادو!');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#047857] hover:bg-[#065f46] text-amber-100 font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md font-serif-arabic"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>استلام المفتاح الذهبي للبوابة الكبرى من عمادو</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-[#d4ecd5] border-2 border-[#047857] text-[#065f46] text-xs text-center font-bold font-serif-arabic">
                  المفتاح الرئيسي بحوزتكما الآن! اصعدا عبر السرداب والردهة والشرفة نحو البوابة الكبرى للهروب وفضح الجناة.
                </div>
              )}
            </div>

            {/* Feedback notification banner */}
            {feedback && (
              <div className="p-2 rounded-lg bg-[#eddcc6] border border-[#a88760] text-[#4f321a] text-xs text-center font-serif-arabic">
                {feedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
