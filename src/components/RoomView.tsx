import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Search, DoorOpen, Eye, ShieldAlert, Sparkles, Tv, Compass } from 'lucide-react';
import { ROOMS } from '../data/gameData';
import { RoomId, InspectId, GameProgress } from '../types/game';
import { WeatherOverlay } from './WeatherOverlay';
import { sound } from '../utils/audio';

interface RoomViewProps {
  currentRoom: RoomId;
  gameState: GameProgress;
  highlightHotspots: boolean;
  onNavigate: (room: RoomId) => void;
  onInspect: (inspectId: InspectId) => void;
  onShowMessage: (msg: string) => void;
}

export const RoomView: React.FC<RoomViewProps> = ({
  currentRoom,
  gameState,
  highlightHotspots,
  onNavigate,
  onInspect,
  onShowMessage,
}) => {
  const roomConfig = ROOMS[currentRoom];
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSmoothNavigate = (room: RoomId) => {
    setIsTransitioning(true);
    sound.playFootsteps();
    setTimeout(() => {
      onNavigate(room);
      setIsTransitioning(false);
    }, 240);
  };

  const handlePorchDoorClick = () => {
    if (gameState.porchDoorUnlocked) {
      handleSmoothNavigate('hallway');
    } else {
      sound.playClick();
      onInspect('porch_door_lock');
    }
  };

  // Horror hotspot styling class generator
  const getHotspotClass = (extra: string = '') => {
    const base = 'absolute rounded-lg cursor-pointer transition-all duration-300 group';
    if (highlightHotspots) {
      return `${base} border border-amber-300/40 bg-amber-950/20 shadow-[0_0_15px_rgba(217,119,6,0.3)] animate-pulse ${extra}`;
    }
    return `${base} hover:border hover:border-amber-400/50 hover:bg-stone-900/30 hover:shadow-[0_0_20px_rgba(217,119,6,0.25)] ${extra}`;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-stone-950 overflow-hidden select-none font-cairo" dir="rtl">
      {/* 16:9 Master Landscape Playfield Container */}
      <div className="relative w-full max-w-[1440px] aspect-video max-h-full overflow-hidden shadow-2xl bg-stone-950 border-2 border-[#543b24]/50">
        
        {/* Background Room Photograph with Cinematic Push-In */}
        <img
          src={roomConfig.image}
          alt={roomConfig.name}
          className={`w-full h-full object-cover object-center select-none pointer-events-none transition-all duration-500 ease-out ${
            isTransitioning ? 'scale-[1.04] brightness-90 blur-[0.5px]' : 'scale-100 brightness-100 blur-0'
          }`}
        />

        {/* Dynamic Real-time Weather Layer (Rain & Lightning) */}
        {gameState.isWeatherActive && (
          <WeatherOverlay isOutside={roomConfig.isOutside} />
        )}

        {/* Cinematic Horror Vignettes & Shadowed Atmosphere */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(8,6,5,0.7)_100%)]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40" />

        {/* ==================== 1. THE GATE (NIGHT RAIN) ==================== */}
        {currentRoom === 'gate' && (
          <>
            {/* Emado's dropped briefcase in the mud */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('gate_briefcase');
              }}
              onMouseEnter={() => setHoveredHotspot('حقيبة عمادو الجلدية الملقاة في الوحل (معاينة مقربة)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('bottom-[8%] left-[16%] w-[22%] h-[24%] rounded-2xl')}
              title="فحص حقيبة عمادو"
            >
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>معاينة حقيبة عمادو المفتوحة في المطر</span>
              </div>
            </button>

            {/* Advance forward through the gates to the Porch */}
            <button
              onClick={() => handleSmoothNavigate('porch')}
              onMouseEnter={() => setHoveredHotspot('التقدم نحو شرفة البيت الأخير')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[35%] left-[45%] w-[18%] h-[40%]')}
              title="التقدم للشرفة"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <ArrowUp className="w-4 h-4 text-amber-400" />
                <span>التقدم نحو شرفة البيت</span>
              </div>
            </button>
          </>
        )}

        {/* ==================== 2. RAINY FRONT PORCH ==================== */}
        {currentRoom === 'porch' && (
          <>
            {/* Arched front door */}
            <button
              onClick={handlePorchDoorClick}
              onMouseEnter={() =>
                setHoveredHotspot(
                  gameState.porchDoorUnlocked
                    ? 'الباب البلوطي المقوس (مفتوح - دخول الردهة)'
                    : 'الباب الخشبي المقوس (موصد بمزلاج - معاينة القفل)'
                )
              }
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[22%] left-[47%] w-[18%] h-[58%] rounded-t-full')}
              title={gameState.porchDoorUnlocked ? 'دخول ردهة الاستقبال' : 'معاينة قفل الباب البلوطي'}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 flex items-center gap-1.5 whitespace-nowrap shadow-xl font-serif-arabic">
                <DoorOpen className="w-4 h-4 text-amber-400" />
                <span>{gameState.porchDoorUnlocked ? 'دخول ردهة الاستقبال' : 'معاينة قفل الباب البلوطي'}</span>
              </div>
            </button>

            {/* Glowing lantern - Click zooms in! */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('lantern_zoom');
              }}
              onMouseEnter={() => setHoveredHotspot('فحص الفانوس النحاسي (تكبير والبحث عن مفتاح)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[17%] left-[67%] w-[9%] h-[26%]')}
              title="تكبير وفحص الفانوس"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1 rounded text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1 font-serif-arabic">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>تكبير وفحص الفانوس</span>
              </div>
            </button>

            {/* Return back to Gates */}
            <button
              onClick={() => handleSmoothNavigate('gate')}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-900/40 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xl font-serif-arabic"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة نحو البوابة الخارجية</span>
            </button>
          </>
        )}

        {/* ==================== 3. GRAND HALLWAY (REALISTIC ARCHITECTURE) ==================== */}
        {currentRoom === 'hallway' && (
          <>
            {/* 1. Open Arched Wooden Door on Left (The Entrance from the Porch) */}
            <button
              onClick={() => handleSmoothNavigate('porch')}
              onMouseEnter={() => setHoveredHotspot('الباب الخشبي المقوس المفتوح (الخروج للشرفة في المطر)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[2%] left-[2%] w-[22%] h-[85%] rounded-t-full')}
              title="الخروج إلى الشرفة الخارجية"
            >
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <ArrowRight className="w-4 h-4 text-amber-400" />
                <span>الخروج إلى الشرفة والباب الخارجي</span>
              </div>
            </button>

            {/* 2. Center Stone Archway directly into the Vintage Kitchen */}
            <button
              onClick={() => handleSmoothNavigate('kitchen')}
              onMouseEnter={() => setHoveredHotspot('القوس الحجري الأوسط (دخول المطبخ العتيق)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[15%] left-[37%] w-[20%] h-[56%] rounded-t-full')}
              title="دخول المطبخ العتيق"
            >
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <DoorOpen className="w-4 h-4 text-amber-400" />
                <span>دخول المطبخ العتيق وخزانة الأسرار</span>
              </div>
            </button>

            {/* 3. Door to Study Room (Left Arch Wall) */}
            <button
              onClick={() => handleSmoothNavigate('study')}
              onMouseEnter={() => setHoveredHotspot('ممر مكتبة التحقيقات ومكتب د. برهان')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[26%] left-[24%] w-[12%] h-[50%] rounded-lg')}
              title="مكتبة التحقيقات"
            >
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-2.5 py-1 rounded text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1 font-serif-arabic">
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>مكتبة التحقيقات</span>
              </div>
            </button>

            {/* 4. Wooden Staircase on the Right leading Up to Attic Surveillance Room */}
            <button
              onClick={() => handleSmoothNavigate('attic')}
              onMouseEnter={() => setHoveredHotspot('السلالم الخشبية (الصعود إلى السندرة وغرفة المراقبة)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[4%] left-[60%] w-[18%] h-[65%]')}
              title="الصعود إلى غرفة المراقبة والسندرة"
            >
              <div className="absolute top-[30%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <ArrowUp className="w-4 h-4 text-amber-400" />
                <span>الصعود لغرفة المراقبة (السندرة)</span>
              </div>
            </button>

            {/* 5. Dark Stone Cellar Opening in Floor descending to Basement / Crypt */}
            <button
              onClick={() => {
                if (gameState.basementDoorUnlocked) {
                  handleSmoothNavigate('crypt');
                } else {
                  sound.playPaperRustle();
                  onInspect('cellar_padlock');
                }
              }}
              onMouseEnter={() =>
                setHoveredHotspot(
                  gameState.basementDoorUnlocked
                    ? 'النزول عبر الفتحة الحجرية إلى سرداب القبو'
                    : 'فتحة سلالم القبو (موصدة بقفل وسلاسل - معاينة مقربة)'
                )
              }
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[73%] left-[63%] w-[16%] h-[24%]')}
              title="سلالم القبو والسرداب"
            >
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-2.5 py-1 rounded text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1 font-serif-arabic">
                <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
                <span>{gameState.basementDoorUnlocked ? 'النزول إلى سرداب القبو' : 'معاينة قفل وسلاسل القبو'}</span>
              </div>
            </button>

            {/* 6. Door to Parlor (Fireplace and Clock) on right wall */}
            <button
              onClick={() => handleSmoothNavigate('parlor')}
              onMouseEnter={() => setHoveredHotspot('صالون المدفأة وساعة البندول')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[16%] left-[86%] w-[12%] h-[45%] rounded-lg')}
              title="صالون المدفأة وساعة البندول"
            >
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-2.5 py-1 rounded text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1 font-serif-arabic">
                <span>صالون المدفأة</span>
              </div>
            </button>

            {/* 7. Persian Runner Rug on Floor (Key hidden underneath) */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('hallway_rug');
              }}
              onMouseEnter={() => setHoveredHotspot('السجادة الفارسية على الأرض (رفع الطرف والبحث)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[69%] left-[34%] w-[27%] h-[31%]')}
              title="فحص السجادة الفارسية"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>فحص السجادة الفارسية</span>
              </div>
            </button>

            {/* 8. Antique Table with Glowing Oil Lamp & Journal */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('hallway_table_ledger');
              }}
              onMouseEnter={() => setHoveredHotspot('فانوس الزيت وسجل زوار الردهة (معاينة مقربة)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[66%] left-[77%] w-[21%] h-[32%]')}
              title="فحص طاولة الردهة"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-2.5 py-1 rounded text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1 font-serif-arabic">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>معاينة فانوس الزيت وسجل الردهة</span>
              </div>
            </button>

            {/* 9. Gothic Arched Stormy Window */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('window_storm');
              }}
              onMouseEnter={() => setHoveredHotspot('النافذة القوطية العاصفة (نقش مزلاج الساعة)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[8%] left-[78%] w-[8%] h-[24%] rounded-t-full')}
              title="فحص النافذة العاصفة"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-2 py-1 rounded text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1 font-serif-arabic">
                <Search className="w-3 h-3 text-amber-400" />
                <span>النافذة العاصفة</span>
              </div>
            </button>
          </>
        )}

        {/* ==================== 4. ATTIC SURVEILLANCE ROOM ==================== */}
        {currentRoom === 'attic' && (
          <>
            {/* CRT Monitor Bank & Peepholes */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('attic_surveillance');
              }}
              onMouseEnter={() => setHoveredHotspot('شاشات المراقبة ومذكرات كاميرات التجسس')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[28%] left-[32%] w-[42%] h-[46%]')}
              title="فحص شاشات المراقبة"
            >
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <Tv className="w-4 h-4 text-amber-400" />
                <span>فحص شاشات المراقبة وكاميرات القبو</span>
              </div>
            </button>

            {/* Return downstairs to Hallway */}
            <button
              onClick={() => handleSmoothNavigate('hallway')}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-900/40 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xl font-serif-arabic"
            >
              <ArrowDown className="w-4 h-4" />
              <span>النزول إلى الردهة الرئيسية</span>
            </button>
          </>
        )}

        {/* ==================== 5. THE PARLOR (CLOCK & FIREPLACE) ==================== */}
        {currentRoom === 'parlor' && (
          <>
            {/* Grandfather Clock */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('parlor_clock');
              }}
              onMouseEnter={() => setHoveredHotspot('ساعة البندول الأثرية الكبرى')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[6%] left-[10%] w-[18%] h-[88%]')}
              title="فحص ساعة البندول"
            >
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>ضبط عقارب ساعة البندول</span>
              </div>
            </button>

            {/* Dr. Borhan's Portrait above Fireplace */}
            <button
              onClick={() =>
                onShowMessage('صورة زيتية مهيبة للدكتور "برهان الكاظم" تعلو المدفأة، نظراته ثاقبة وقاسية تخفي أسراراً مظلمة.')
              }
              onMouseEnter={() => setHoveredHotspot('لوحة الدكتور برهان الكاظم')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[10%] left-[42%] w-[18%] h-[34%]')}
            />

            {/* Return back to Hallway */}
            <button
              onClick={() => handleSmoothNavigate('hallway')}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-900/40 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xl font-serif-arabic"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى الردهة</span>
            </button>
          </>
        )}

        {/* ==================== 6. STUDY ROOM ==================== */}
        {currentRoom === 'study' && (
          <>
            {/* Center carved oak desk and drawer */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                if (gameState.studyDrawerUnlocked) {
                  onInspect('clue_note');
                } else {
                  onInspect('study_drawer');
                }
              }}
              onMouseEnter={() =>
                setHoveredHotspot(
                  gameState.studyDrawerUnlocked ? 'درج المكتب المفتوح (وثيقة 1986)' : 'درج المكتب المقفل'
                )
              }
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[58%] left-[30%] w-[49%] h-[40%]')}
              title="فحص درج المكتب"
            >
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>{gameState.studyDrawerUnlocked ? 'فحص وثيقة 1986 بالدرج' : 'فحص درج المكتب المقفل'}</span>
              </div>
            </button>

            {/* Return back to Hallway */}
            <button
              onClick={() => handleSmoothNavigate('hallway')}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-900/40 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xl font-serif-arabic"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى الردهة</span>
            </button>
          </>
        )}

        {/* ==================== 7. VINTAGE KITCHEN ==================== */}
        {currentRoom === 'kitchen' && (
          <>
            {/* Locked wooden wall cabinet */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('kitchen_lock');
              }}
              onMouseEnter={() =>
                setHoveredHotspot(
                  gameState.kitchenLockSolved ? 'خزانة الحائط المفتوحة' : 'قفل خزانة الحائط الأسطواني'
                )
              }
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[8%] left-[52%] w-[27%] h-[44%]')}
              title="فحص خزانة الحائط"
            >
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>{gameState.kitchenLockSolved ? 'خزانة الحائط (مفتوحة)' : 'قفل خزانة الحائط الأسطواني'}</span>
              </div>
            </button>

            {/* Return back to Hallway */}
            <button
              onClick={() => handleSmoothNavigate('hallway')}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-900/40 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xl font-serif-arabic"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى الردهة</span>
            </button>
          </>
        )}

        {/* ==================== 8. FLOODED CRYPT PASSAGE ==================== */}
        {currentRoom === 'crypt' && (
          <>
            {/* Advance into Underground Basement */}
            <button
              onClick={() => handleSmoothNavigate('basement')}
              onMouseEnter={() => setHoveredHotspot('النزول عبر المياه نحو قبو الزنازين')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[35%] left-[40%] w-[20%] h-[45%]')}
              title="متابعة النزول نحو القبو"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <ArrowDown className="w-4 h-4 text-amber-400" />
                <span>النزول لقبو الاحتجاز</span>
              </div>
            </button>

            {/* Return up stairs to Hallway */}
            <button
              onClick={() => handleSmoothNavigate('hallway')}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-900/40 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xl font-serif-arabic"
            >
              <ArrowUp className="w-4 h-4" />
              <span>الصعود إلى الردهة</span>
            </button>
          </>
        )}

        {/* ==================== 9. UNDERGROUND BASEMENT ==================== */}
        {currentRoom === 'basement' && (
          <>
            {/* Archway to the Dungeon / Emado's Cell */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('dungeon_cell');
              }}
              onMouseEnter={() => setHoveredHotspot('زنزانة احتجاز عمادو (تسمعين صوته!)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[20%] left-[8%] w-[18%] h-[68%]')}
              title="زنزانة عمادو"
            >
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 border border-rose-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>زنزانة احتجاز عمادو!</span>
              </div>
            </button>

            {/* Passage to the Syndicate Sanctum */}
            <button
              onClick={() => handleSmoothNavigate('sanctum')}
              onMouseEnter={() => setHoveredHotspot('مختبر ومكتب الدكتور برهان السري')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[28%] left-[34%] w-[15%] h-[50%]')}
              title="مختبر العمليات السري"
            >
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-2.5 py-1 rounded text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1 font-serif-arabic">
                <span>مختبر العمليات السري</span>
              </div>
            </button>

            {/* Candlelit Table */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('final_letter');
              }}
              onMouseEnter={() => setHoveredHotspot('طاولة القبو (ملف القضية الأخير)')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[52%] left-[35%] w-[14%] h-[26%]')}
            />

            {/* Return up to Crypt / Hallway */}
            <button
              onClick={() => handleSmoothNavigate('crypt')}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-900/40 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xl font-serif-arabic"
            >
              <ArrowUp className="w-4 h-4" />
              <span>الرجوع عبر السرداب المائي</span>
            </button>
          </>
        )}

        {/* ==================== 10. SYNDICATE SANCTUM ==================== */}
        {currentRoom === 'sanctum' && (
          <>
            {/* Dr. Borhan's desk */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onInspect('sanctum_desk');
              }}
              onMouseEnter={() => setHoveredHotspot('طاولة مكتب برهان وأجهزة التسجيل')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className={getHotspotClass('top-[40%] left-[25%] w-[55%] h-[55%]')}
              title="فحص مكتب دكتور برهان"
            >
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-200 border border-amber-900/60 whitespace-nowrap shadow-xl flex items-center gap-1.5 font-serif-arabic">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>فحص أشرطة الاعتراف وأدوات الزنزانة</span>
              </div>
            </button>

            {/* Return back to Basement */}
            <button
              onClick={() => handleSmoothNavigate('basement')}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-900/40 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shadow-xl font-serif-arabic"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى القبو الحجري</span>
            </button>
          </>
        )}

        {/* Diegetic Evidence Tag on Hover (Aged Parchment Tag) */}
        {hoveredHotspot && (
          <div className="absolute bottom-4 left-4 pointer-events-none px-4 py-2 rounded-xs bg-[#ecdcc0] text-[#2c1d11] border-2 border-[#8b6534] shadow-[0_12px_28px_rgba(0,0,0,0.85)] flex items-center gap-2.5 z-40 font-serif-arabic animate-in fade-in duration-150 rotate-[-1deg]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8b251a] shrink-0 border border-[#4a140f] shadow-xs" />
            <span className="text-xs font-bold tracking-wide">{hoveredHotspot}</span>
          </div>
        )}
      </div>
    </div>
  );
};
