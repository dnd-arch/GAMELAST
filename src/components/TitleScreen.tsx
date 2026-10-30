import React, { useState } from 'react';
import { Play, Volume2, VolumeX, RotateCcw, Users, ShieldAlert, Sparkles, Compass, Eye, ScrollText } from 'lucide-react';
import { ASSET_IMAGES } from '../data/gameData';
import { sound } from '../utils/audio';
import { WeatherOverlay } from './WeatherOverlay';

interface TitleScreenProps {
  onStartGame: () => void;
  onResumeGame?: () => void;
  hasSavedGame: boolean;
  onResetSave: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onResumeGame,
  hasSavedGame,
  onResetSave,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [showCharactersModal, setShowCharactersModal] = useState(false);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleStart = () => {
    sound.playPaperRustle();
    sound.startAmbience();
    onStartGame();
  };

  const handleResume = () => {
    sound.playPaperRustle();
    sound.startAmbience();
    if (onResumeGame) onResumeGame();
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-stone-950 flex items-center justify-center p-3 md:p-6 text-stone-100 select-none overflow-hidden font-cairo" dir="rtl">
      
      {/* 1. CINEMATIC BACKGROUND: Ikramo & Emado seen from behind facing the gothic mansion */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.title_screen_rain}
          alt="إكرامو وعمادو أمام البيت الأخير في ليلة العاصفة"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-120 saturate-110"
        />
        {/* Dark moody atmospheric vignettes */}
        <div className="absolute inset-0 bg-gradient-to-l from-stone-950/90 via-stone-950/40 to-stone-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_0%,rgba(10,8,7,0.7)_100%)]" />
      </div>

      {/* 2. DYNAMIC WEATHER OVERLAY (Real Canvas Rain & Thunder Lightning Flashes) */}
      <WeatherOverlay isOutside={true} intensity="storm" />

      {/* 3. WIDESCREEN CINEMATIC HUD / SIDE-PARCHMENT LAYOUT */}
      <div className="relative z-30 w-full max-w-7xl h-full flex flex-col justify-between py-2 md:py-4">
        
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/80 border border-amber-900/40 backdrop-blur-md shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs text-amber-300/90 font-medium tracking-wide">
              قضية ليلة 29 أكتوبر · عاصفة البحر المتوسط
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playPaperRustle();
                setShowCharactersModal(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a1e14]/90 border border-amber-800/60 hover:border-amber-500 text-amber-200 transition-all text-xs cursor-pointer shadow-md backdrop-blur-sm"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>أطراف القضية</span>
            </button>

            <button
              onClick={handleToggleSound}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-stone-600 text-stone-300 transition-colors text-xs cursor-pointer shadow-md backdrop-blur-sm"
              title={isMuted ? 'تشغيل المؤثرات الصوتية والمطر' : 'كتم الصوت'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
              <span className="hidden sm:inline">{isMuted ? 'الصوت صامت' : 'مطر ورعد 100%'}</span>
            </button>
          </div>
        </div>

        {/* Main Split: Left Atmospheric Title / Right Vintage Parchment Dossier */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 my-auto py-2">
          
          {/* Atmospheric Title Lockup (Left/Center in visual flow) */}
          <div className="flex-1 text-right max-w-xl px-4 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-950/70 border border-amber-700/50 text-amber-400 text-xs font-mono mb-2 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>لعبة هروب واستنتاج جنائي واقعية</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#faf2e4] mb-1 font-serif-arabic drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] tracking-tight leading-tight">
              البيت الأخير
            </h1>
            <p className="font-cinzel text-amber-500 text-sm md:text-lg tracking-[0.25em] font-bold uppercase drop-shadow mb-4">
              THE LAST HOUSE · RETRIBUTION
            </p>

            <div className="relative p-4 rounded-xl bg-stone-950/75 border border-stone-800/80 backdrop-blur-md max-w-lg shadow-2xl text-xs md:text-sm text-stone-300 leading-relaxed font-serif-arabic">
              <p>
                «في منتصف الليل الممطر، استدرج "سليمان الأعرج" الباحث الجنائي "عمادو" وضربه غدراً ليحتجزه في سراديب القبو بأمر من "الدكتور برهان الكاظم". تصل زميلته المحققة "إكرامو" مقتفية آثار الطين، متسلحة بمصباحها وموهبتها لكشف الأقفال وفك شفرات سنة 1986.»
              </p>
            </div>
          </div>

          {/* SIDE PANEL: ANTIQUE AGED PARCHMENT CASE DOSSIER (ازرار البداية بستايل ورقي قديم) */}
          <div className="w-full max-w-md">
            <div 
              className="relative p-6 md:p-8 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-4 border-[#785b3b] overflow-hidden"
              style={{
                backgroundColor: '#f5e7cc',
                backgroundImage: 'radial-gradient(#d8be96 1px, transparent 1px), radial-gradient(#e5cca4 1px, #f5e7cc 1px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
                boxShadow: 'inset 0 0 40px rgba(110,75,40,0.35), 0 20px 50px rgba(0,0,0,0.9)',
              }}
            >
              {/* Aged burnt paper edges & texture */}
              <div className="absolute inset-0 pointer-events-none border-2 border-[#5c4028]/25 rounded-xl m-1" />
              
              {/* Top Red Investigation Stamp */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#b0936f]/60 mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#7a5832] font-bold">
                    ملف التحقيق الجنائي الميداني
                  </div>
                  <div className="text-base font-bold text-[#3a2211] font-serif-arabic">
                    قضية اختفاء عمادو (1986)
                  </div>
                </div>

                {/* Wax seal & stamp badge */}
                <div className="border-2 border-red-800/70 text-red-800 px-2.5 py-1 rounded rotate-[-6deg] text-[11px] font-bold tracking-wider uppercase bg-red-100/40">
                  سري للغاية
                </div>
              </div>

              {/* Action Buttons styled like antique paper stamped files */}
              <div className="space-y-3.5">
                {hasSavedGame && (
                  <button
                    onClick={handleResume}
                    className="w-full group relative px-5 py-3.5 rounded-xl bg-[#e3cdab] hover:bg-[#d8be96] text-[#2d1b0d] font-bold text-sm md:text-base border-2 border-[#8d6943] shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#b89569] flex items-center justify-center text-stone-900 group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-serif-arabic">استئناف التحقيق</div>
                        <div className="text-[10px] text-[#634527]">متابعة القضية من آخر نقطة تفتيش</div>
                      </div>
                    </div>
                    <span className="text-xs text-[#8d6943] font-mono">▶</span>
                  </button>
                )}

                <button
                  onClick={handleStart}
                  className={`w-full group relative px-5 py-3.5 rounded-xl text-sm md:text-base font-bold border-2 transition-all transform hover:-translate-y-0.5 flex items-center justify-between cursor-pointer ${
                    hasSavedGame
                      ? 'bg-[#edd9bd] hover:bg-[#dfc49f] text-[#3d2714] border-[#a07c55] shadow-sm'
                      : 'bg-[#7c2d12] hover:bg-[#991b1b] text-amber-100 border-[#450a0a] shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${hasSavedGame ? 'bg-[#c7a477] text-stone-900' : 'bg-amber-900/80 text-amber-300'}`}>
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-serif-arabic">
                        {hasSavedGame ? 'بدء تحقيق جديد (الكات سين)' : 'بدء المغامرة وعرض الكات سين'}
                      </div>
                      <div className={`text-[10px] ${hasSavedGame ? 'text-[#6d4d2b]' : 'text-amber-200/80'}`}>
                        مشهد الهجوم واقتفاء إكرامو للأثر
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono">▶</span>
                </button>

                <button
                  onClick={() => {
                    sound.playPaperRustle();
                    setShowCharactersModal(true);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#eedec5] hover:bg-[#e4cea9] text-[#412b18] text-xs font-bold border border-[#b2946f] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ScrollText className="w-4 h-4 text-[#785b3b]" />
                  <span>معاينة وثائق أطراف القضية (إكرامو وعمادو وبرهان)</span>
                </button>

                {hasSavedGame && (
                  <button
                    onClick={onResetSave}
                    className="w-full text-center text-[11px] text-[#8c5e3c] hover:text-rose-700 transition-colors flex items-center justify-center gap-1.5 pt-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>مسح ملف التحقيق المحفوظ للبدء من الصفر</span>
                  </button>
                )}
              </div>

              {/* Bottom ledger stamp note */}
              <div className="mt-5 pt-3 border-t border-[#bfa583]/50 flex items-center justify-between text-[10px] text-[#63482d] font-serif-arabic">
                <span>تنبيه: الألغاز تعتمد على الملاحظة الدقيقة دون تسهيل</span>
                <span className="font-mono text-[#8a6845]">NO SPOONS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Widescreen Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 px-3 pt-2 border-t border-stone-800/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-amber-400">❖ تجربة لعب سينمائية بعرض الشاشة</span>
            <span>·</span>
            <span>عالم مترابط: البوابة، الشرفة، الردهة، الصالون، المكتبة، المطبخ، السندرة، السرداب، القبو</span>
          </div>
          <div className="text-stone-500 font-mono text-[10px]">
            THE LAST HOUSE v3.5 · FULL DIEGETIC ARABIC THRILLER
          </div>
        </div>
      </div>

      {/* 4. CHARACTER DOSSIERS MODAL (AUTHENTIC DETECTIVE ARCHIVE) */}
      {showCharactersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-4xl p-6 md:p-8 rounded-2xl shadow-2xl border-4 border-[#785b3b] text-[#2b1f14] max-h-[92vh] overflow-y-auto"
            style={{
              backgroundColor: '#f6ebd3',
              backgroundImage: 'radial-gradient(#dec59f 1px, transparent 1px), radial-gradient(#ead3b2 1px, #f6ebd3 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#b0936f] mb-6">
              <div className="flex items-center gap-3">
                <ScrollText className="w-6 h-6 text-[#7c2d12]" />
                <div>
                  <h3 className="font-bold text-xl text-[#3d2411] font-serif-arabic">
                    سجل التحريات وأطراف قضية البيت الأخير
                  </h3>
                  <p className="text-xs text-[#705234]">ملفات المخابرات الجنائية لسنة 1986</p>
                </div>
              </div>
              <button
                onClick={() => setShowCharactersModal(false)}
                className="w-8 h-8 rounded-full bg-[#dfc6a3] hover:bg-[#cfaf85] text-[#3d2411] font-bold flex items-center justify-center cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ikramo */}
              <div className="p-4 rounded-xl bg-[#ecd8ba] border-2 border-[#a68661] shadow-inner flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#8a6845] shrink-0 bg-stone-900">
                  <img src={ASSET_IMAGES.cutscene_ikramo_search} alt="إكرامو" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#38200e] font-serif-arabic">المحققة إكرامو (Ikramo)</h4>
                    <span className="px-2 py-0.5 rounded bg-[#4a1506] text-amber-100 text-[10px] font-bold">البطلة</span>
                  </div>
                  <p className="text-[11px] text-[#4d3521] leading-relaxed font-serif-arabic">
                    ترتدي حجابها الأسود وسترتها الرسمية الأنيقة وربطة العنق فوق قميص نبيذي داكن. خبيرة في المنطق الجنائي وفتح الأقفال الكلاسيكية، جاءت لإنقاذ عمادو دون تردد.
                  </p>
                </div>
              </div>

              {/* Emado */}
              <div className="p-4 rounded-xl bg-[#ecd8ba] border-2 border-[#a68661] shadow-inner flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#8a6845] shrink-0 bg-stone-900">
                  <img src={ASSET_IMAGES.cutscene_emado_stalked} alt="عمادو" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#38200e] font-serif-arabic">الباحث عمادو (Emado)</h4>
                    <span className="px-2 py-0.5 rounded bg-[#1e3a1f] text-emerald-100 text-[10px] font-bold">الضحية</span>
                  </div>
                  <p className="text-[11px] text-[#4d3521] leading-relaxed font-serif-arabic">
                    شاب بشعر مموج داكن ونظارة طبية دائرية وسترة خضراء زيتية. كشف تقارير تجارب 1986 واختُطف غدراً في المطر بعد معركة شجاعة مع سليمان.
                  </p>
                </div>
              </div>

              {/* Dr. Borhan */}
              <div className="p-4 rounded-xl bg-[#ecd8ba] border-2 border-[#803322] shadow-inner flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-red-900 shrink-0 bg-stone-900">
                  <img src={ASSET_IMAGES.sanctum} alt="د. برهان" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#450a0a] font-serif-arabic">د. برهان الكاظم</h4>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-200 text-[10px] font-bold">العقل المدبر</span>
                  </div>
                  <p className="text-[11px] text-[#4d3521] leading-relaxed font-serif-arabic">
                    طبيب باثولوجي أجرى تجارب غامضة سنة 1986. يحتفظ بأشرطة اعترافاته في مكتب العمليات، وصاحب فكرة الزنزانة الحجرية في قاع القبو.
                  </p>
                </div>
              </div>

              {/* Suleiman The Lame */}
              <div className="p-4 rounded-xl bg-[#ecd8ba] border-2 border-[#803322] shadow-inner flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-red-900 shrink-0 bg-stone-900">
                  <img src={ASSET_IMAGES.cutscene_suleiman_capture} alt="سليمان" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#450a0a] font-serif-arabic">سليمان الأعرج</h4>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-200 text-[10px] font-bold">المنفذ العنيف</span>
                  </div>
                  <p className="text-[11px] text-[#4d3521] leading-relaxed font-serif-arabic">
                    حارس ضخم يرتدي معطفاً وقبعة كلاسيكية. باغت عمادو وسحبه إلى القبو، ويحرس مفاتيح الزنازين والأبواب السرية.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowCharactersModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#7c2d12] hover:bg-[#991b1b] text-amber-100 font-bold text-xs cursor-pointer shadow-md"
              >
                إغلاق والعودة إلى القائمة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
