import React, { useState } from 'react';
import { X, Play, Volume2, Key, Scissors, Check, FileText, AlertCircle, CassetteTape } from 'lucide-react';
import { ASSET_IMAGES } from '../data/gameData';
import { GameProgress } from '../types/game';
import { sound } from '../utils/audio';

interface SanctumModalProps {
  gameState: GameProgress;
  onClose: () => void;
  onListenTape: () => void;
  onCollectDungeonKeys: () => void;
  onCollectBoltCutter: () => void;
}

export const SanctumModal: React.FC<SanctumModalProps> = ({
  gameState,
  onClose,
  onListenTape,
  onCollectDungeonKeys,
  onCollectBoltCutter,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handlePlayTape = () => {
    sound.playTapeRecorderHum();
    setIsPlayingAudio(true);
    onListenTape();
    setFeedback('يعمل مسجل الأشرطة التناظري... صوت الدكتور برهان الكاظم يتردد في أرجاء المختبر!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200 select-none font-cairo" dir="rtl">
      {/* Authentic Classified Case File Folio */}
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
              <FileText className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold font-serif-arabic text-[#3a200e]">
                مقر العمليات السري ومكتب د. برهان الكاظم
              </h2>
              <p className="text-[11px] text-[#785b3b]">الأرشيف الصوتي ووثائق العمليات الجنائية لعام 1986</p>
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row gap-5 items-center justify-center pr-1 pl-1">
          
          {/* Photographic Desk Visual */}
          <div className="relative w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border-2 border-[#8c6d48] shadow-inner bg-stone-900 group">
            <img
              src={ASSET_IMAGES.sanctum}
              alt="مكتب دكتور برهان الكاظم"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,8,7,0.65)_100%)]" />
          </div>

          {/* Interactive Inspection Desk */}
          <div className="w-full md:w-1/2 flex flex-col space-y-3.5">
            
            {/* Reel-to-Reel Tape Card */}
            <div className="p-4 rounded-xl bg-[#ede0c9] border-2 border-[#bfa27d] shadow-sm">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#d8be9a]">
                <div className="flex items-center gap-2">
                  <CassetteTape className="w-4 h-4 text-[#8c2d19]" />
                  <span className="text-xs font-bold text-[#351e0e] font-serif-arabic">
                    جهاز التسجيل الصوتي التناظري (الشريط رقم 4):
                  </span>
                </div>
                <span className="text-[10px] text-[#785b3b] font-mono">REEL 1986</span>
              </div>

              {!isPlayingAudio ? (
                <button
                  onClick={handlePlayTape}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#ded0b6] hover:bg-[#cfbf9e] border border-[#a8885f] text-[#381f0d] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors font-serif-arabic shadow-sm"
                >
                  <Play className="w-4 h-4 fill-current text-[#8c2d19]" />
                  <span>تشغيل شريط اعترافات الدكتور برهان بصوته</span>
                </button>
              ) : (
                <div className="space-y-2 animate-in fade-in">
                  <div className="p-3 rounded-lg bg-[#f3e7d0] border border-[#c4a984] text-xs text-[#381f0c] font-serif-arabic leading-relaxed text-justify shadow-inner">
                    «صوت الدكتور برهان الكاظم:
                    "لقد استدرجنا الباحث عمادو في هذه الليلة الماطرة قبل أن يبلغ النيابة بتفاصيل تجارب عام 1986. سليمان الأعرج حبسه في زنزانة القبو بالأغلال حتى نغلق البوابات نهائياً.
                    مفاتيح الزنزانة ومقص السلاسل تركتها هنا فوق مكتبي."»
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#047857] font-bold font-serif-arabic">
                    <Volume2 className="w-3.5 h-3.5 text-[#047857]" />
                    <span>تم تحديد موقع مفاتيح الزنزانة ومقص الحديد على المكتب!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Evidence & Tools Pickup */}
            <div className="space-y-2.5">
              {/* Dungeon Keys */}
              {!gameState.dungeonKeysFound ? (
                <button
                  onClick={() => {
                    sound.playKeyPickup();
                    onCollectDungeonKeys();
                    setFeedback('عثرتِ على طقم مفاتيح زنزانة القبو من على طاولة برهان!');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#8c2d19] hover:bg-[#6e1e0f] text-amber-100 font-bold text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer shadow-md font-serif-arabic"
                >
                  <span className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    <span>التقاط طقم مفاتيح زنزانة القبو</span>
                  </span>
                  <span className="text-[10px] bg-[#6e1e0f] px-2 py-0.5 rounded text-amber-200">أداة حاسمة</span>
                </button>
              ) : (
                <div className="p-2.5 rounded-lg bg-[#ded0b6] border border-[#a8885f] text-xs text-[#523720] flex items-center gap-2 font-serif-arabic">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>طقم مفاتيح الزنزانة في حقيبتكِ الآن.</span>
                </div>
              )}

              {/* Bolt Cutter */}
              {!gameState.boltCutterFound ? (
                <button
                  onClick={() => {
                    sound.playKeyPickup();
                    onCollectBoltCutter();
                    setFeedback('حصلتِ على مقص الحديد الثقيل (Bolt Cutter) لقطع الأغلال!');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#8c2d19] hover:bg-[#6e1e0f] text-amber-100 font-bold text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer shadow-md font-serif-arabic"
                >
                  <span className="flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    <span>التقاط مقص الحديد الثقيل (لقطع سلاسل عمادو)</span>
                  </span>
                  <span className="text-[10px] bg-[#6e1e0f] px-2 py-0.5 rounded text-amber-200">أداة حاسمة</span>
                </button>
              ) : (
                <div className="p-2.5 rounded-lg bg-[#ded0b6] border border-[#a8885f] text-xs text-[#523720] flex items-center gap-2 font-serif-arabic">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>مقص الحديد الثقيل في حقيبتكِ الآن.</span>
                </div>
              )}
            </div>

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
