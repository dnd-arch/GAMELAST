import React, { useState } from 'react';
import { X, Key, Lock, Unlock, CheckCircle, ChevronUp, ChevronDown, Sparkles, BookOpen, AlertCircle, Wrench, ShieldAlert, Stamp } from 'lucide-react';
import { ASSET_IMAGES } from '../data/gameData';
import { InspectId, GameProgress } from '../types/game';
import { ParchmentNote } from './ParchmentNote';
import { sound } from '../utils/audio';

interface InspectionModalProps {
  inspectId: InspectId;
  gameState: GameProgress;
  onClose: () => void;
  onCollectBriefcaseItems: () => void;
  onCollectPorchKey: () => void;
  onUnlockPorchDoor?: () => void;
  onCollectBrassKey: () => void;
  onUnlockStudyDrawer: () => void;
  onReadClueNote: () => void;
  onSolveKitchenLock: () => void;
  onCollectBasementKey: () => void;
  onUnlockBasementDoor: () => void;
  onCompleteGame: () => void;
  onOpenJournal: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  inspectId,
  gameState,
  onClose,
  onCollectBriefcaseItems,
  onCollectPorchKey,
  onUnlockPorchDoor,
  onCollectBrassKey,
  onUnlockStudyDrawer,
  onReadClueNote,
  onSolveKitchenLock,
  onCollectBasementKey,
  onUnlockBasementDoor,
  onCompleteGame,
  onOpenJournal,
}) => {
  const [digits, setDigits] = useState<[number, number, number, number]>(gameState.kitchenLockCode);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const cycleDigit = (index: number, delta: number) => {
    sound.playRollerClick();
    setDigits((prev) => {
      const next = [...prev] as [number, number, number, number];
      next[index] = (next[index] + delta + 10) % 10;
      
      // Check if code solves to 1986
      if (next[0] === 1 && next[1] === 9 && next[2] === 8 && next[3] === 6) {
        setTimeout(() => {
          sound.playUnlock();
          onSolveKitchenLock();
        }, 150);
      }
      return next;
    });
  };

  const handleUseBrassKeyOnDrawer = () => {
    if (gameState.inventory.includes('brass_key')) {
      sound.playUnlock();
      onUnlockStudyDrawer();
      setShowFeedback('انفتح القفل النحاسي بسلاسة وسقطت وثيقة 1986!');
    } else {
      sound.playClick();
      setShowFeedback('أنتِ بحاجة إلى مفتاح نحاسي لفتح هذا القفل.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none font-cairo" dir="rtl">
      {/* Forensic Crime Case Folder Container */}
      <div className="relative w-full max-w-4xl bg-[#1b1510] border-2 border-[#5a3e26] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col max-h-[94vh]">
        
        {/* Leather & Brass Dossier Header Strip */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#120e0a] border-b-2 border-[#452e1b] shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#8b1e1b] border border-[#a82e2b] shadow-[0_0_8px_rgba(139,30,27,0.7)]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest text-amber-500/80 font-cinzel uppercase">
                  FORENSIC EVIDENCE DOSSIER · CASE #1986
                </span>
              </div>
              <h2 className="text-base font-bold text-[#f5ebd7] font-serif-arabic drop-shadow-sm">
                {inspectId === 'gate_briefcase' && 'معاينة ميدانية: حقيبة عمادو الجلدية في الوحل'}
                {inspectId === 'lantern_zoom' && 'معاينة مقربة: فانوس الشرفة النحاسي والمزلاج السري'}
                {inspectId === 'porch_door_lock' && 'معاينة مقربة: قفل الباب البلوطي المقوس للشرفة'}
                {inspectId === 'window_storm' && 'معاينة مقربة: النافذة القوطية ونقش ساعة البندول'}
                {inspectId === 'hallway_rug' && 'معاينة أرضية: السجادة الفارسية والمفتاح النحاسي'}
                {inspectId === 'hallway_table_ledger' && 'معاينة مكتبية: سجل الزوار وفانوس الزيت العتيق'}
                {inspectId === 'study_drawer' && 'معاينة مقربة: درج مكتب دكتور برهان المقفل'}
                {inspectId === 'clue_note' && 'وثيقة سرية: مخطوطة سنة الرحيل (1986)'}
                {inspectId === 'kitchen_lock' && 'معاينة ميكانيكية: قفل خزانة المطبخ الأسطواني'}
                {inspectId === 'cellar_padlock' && 'معاينة أمنية: قفل وسلاسل مدخل سرداب القبو'}
                {inspectId === 'basement_door_locked' && 'معاينة أمنية: باب القبو الحجري الموصد'}
                {inspectId === 'final_letter' && 'الوثيقة الختامية: التقرير الجنائي واعترافات القضية'}
                {inspectId === 'attic_surveillance' && 'غرفة المراقبة: شاشات CRT وسجل كاميرات التجسس'}
              </h2>
            </div>
          </div>

          {/* Stamped Wax Seal Close Tag */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#2e1d13] hover:bg-[#422919] text-[#e8d8be] hover:text-white border border-[#6b4728] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md font-serif-arabic"
            title="إغلاق ملف المعاينة"
          >
            <X className="w-4 h-4 text-amber-400" />
            <span>حفظ الدليل والرجوع [✕]</span>
          </button>
        </div>

        {/* Main Forensic Evidence Board */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,#241a13_0%,#120e0a_100%)]">
          
          {/* ==================== 0. GATE BRIEFCASE (LEGENDARY DIEGETIC DESIGN) ==================== */}
          {inspectId === 'gate_briefcase' && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              {/* Evidence Photograph Plate with Aged Brass Corners */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] group bg-stone-950">
                <img
                  src={ASSET_IMAGES.briefcase_mud}
                  alt="حقيبة عمادو المفتوحة في الوحل"
                  className="w-full h-full object-cover select-none"
                />

                {/* Rain droplets & Vignette */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,8,7,0.7)_100%)]" />

                {/* Antique Photo Plate Header Tag */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#1a120c]/90 border border-[#8b6534] rounded text-[11px] font-cinzel text-amber-200 tracking-wider flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                  <span>CRIME SCENE EVIDENCE · ITEM #102</span>
                </div>

                {/* Tactile Hotspot directly on Emado's Badge inside Bag */}
                {!gameState.briefcaseExamined && (
                  <button
                    onClick={() => {
                      sound.playKeyPickup();
                      onCollectBriefcaseItems();
                      setShowFeedback('تم استخراج شارة عمادو الجنائية وأداة النقر المعدنية!');
                    }}
                    className="absolute top-[32%] left-[24%] p-3.5 bg-amber-500/25 hover:bg-amber-500/40 border-2 border-amber-400 rounded-full animate-pulse transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                    title="التقاط شارة عمادو وأداة النقر المعدنية"
                  >
                    <Wrench className="w-6 h-6 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                  </button>
                )}
              </div>

              {/* Weathered Torn-Edge Evidence Parchment (NO digital gray box!) */}
              <div className="relative w-full mt-4 p-5 bg-[#f4ecd8] text-[#2c1d11] rounded-sm border-2 border-[#8b6534] shadow-[0_15px_35px_rgba(0,0,0,0.85)] font-serif-arabic transform -rotate-[0.5deg]">
                {/* Antique Paperclip / Wax Seal Pin on Top-Left */}
                <div className="absolute -top-3.5 left-6 w-7 h-7 rounded-full bg-[#8b1e1b] border-2 border-[#52100d] shadow-md flex items-center justify-center text-amber-200 text-xs font-bold">
                  ★
                </div>

                <div className="flex items-center justify-between border-b border-[#c8b293] pb-2 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-[#4a2e18]">محضر معاينة الحرز الميداني: حقيبة المحقق عمادو</h3>
                    <p className="text-[11px] text-[#7a5b3e] font-cinzel">EVIDENCE RETRIEVAL PROTOCOL · NO. 2209</p>
                  </div>
                  <div className="px-2.5 py-1 bg-[#8b1e1b]/10 border border-[#8b1e1b]/30 rounded text-xs text-[#8b1e1b] font-bold">
                    حالة عاجلة
                  </div>
                </div>

                <p className="text-sm md:text-base leading-relaxed text-[#3a2514]">
                  «عُثر على حقيبة عمادو ملقاة في الوحل تحت المطر الغزير أمام البوابة الحديدية. تعرض عمادو لمقاومة عنيفة وسحلٍ متعمد نحو رواق البيت الأخير. أداة النقر المعدنية (Lockpick) وشارة التحقيق لا تزالان بداخل جيب الحقيبة الجلدي.»
                </p>

                <div className="mt-4 pt-3 border-t border-[#c8b293] flex flex-wrap items-center justify-between gap-3">
                  {!gameState.briefcaseExamined ? (
                    <button
                      onClick={() => {
                        sound.playKeyPickup();
                        onCollectBriefcaseItems();
                        setShowFeedback('تمت استعادة شارة عمادو وأداة النقر بنجاح!');
                      }}
                      className="px-6 py-2.5 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs md:text-sm shadow-lg transition-all cursor-pointer flex items-center gap-2 border border-[#52100d]"
                    >
                      <Wrench className="w-4 h-4 text-amber-300" />
                      <span>التقاط شارة عمادو الجنائية وأداة النقر المعدنية</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs md:text-sm bg-emerald-100/80 px-3 py-1.5 rounded border border-emerald-400">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                      <span>تم تحريز الشارة وأداة النقر وإضافتهما لحقيبة المحققة إكرامو.</span>
                    </div>
                  )}

                  <span className="text-xs text-[#7a5b3e] italic">
                    المحققة إكرامو · مسرح الجريمة
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 1. LANTERN ZOOM INSPECTION ==================== */}
          {inspectId === 'lantern_zoom' && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 group bg-stone-950">
                <img
                  src={ASSET_IMAGES.lantern_zoom}
                  alt="فحص فانوس الشرفة النحاسي"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,8,7,0.7)_100%)]" />

                {/* Secret Key Mechanism under base */}
                {!gameState.porchKeyFound && (
                  <button
                    onClick={() => {
                      sound.playKeyPickup();
                      onCollectPorchKey();
                      setShowFeedback('عثرتِ على "مفتاح الفانوس السري" أسفل القاعدة!');
                    }}
                    className="absolute bottom-[10%] left-[46%] p-3.5 bg-amber-500/25 hover:bg-amber-500/40 border-2 border-amber-400 rounded-full animate-bounce cursor-pointer shadow-lg"
                    title="سحب المفتاح النحاسي السري"
                  >
                    <Key className="w-6 h-6 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                  </button>
                )}
              </div>

              {/* Weathered Parchment Note */}
              <ParchmentNote
                title="فانوس الشرفة النحاسي المقاوم للعواصف"
                subtitle="PORCH LANTERN · HIDDEN COMPARTMENT"
                className="w-full"
              >
                <p>
                  «فانوس كلاسيكي ثقيل يشتعل بزيت الكيروسين وسط صخب العاصفة. عند فحص الزخارف النحاسية المحفورة أسفل خزان الزيت، لوحظ وجود مزلاج دائري سري يخفي مفتاحاً نحاسياً صغيراً!»
                </p>

                <div className="mt-4 pt-2 border-t border-[#c8b293] flex items-center justify-between">
                  {!gameState.porchKeyFound ? (
                    <button
                      onClick={() => {
                        sound.playKeyPickup();
                        onCollectPorchKey();
                        setShowFeedback('عثرتِ على مفتاح الفانوس السري للباب الرئيسي!');
                      }}
                      className="px-6 py-2.5 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs md:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 border border-[#52100d]"
                    >
                      <Key className="w-4 h-4 text-amber-300" />
                      <span>سحب المفتاح النحاسي من قاعدة الفانوس</span>
                    </button>
                  ) : (
                    <span className="text-emerald-800 font-bold text-xs md:text-sm flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                      <span>تم استخراج مفتاح الفانوس السري! الباب البلوطي المقوس للشرفة جاهز للفتح.</span>
                    </span>
                  )}
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 1.1 PORCH OAK DOOR LOCK ZOOM ==================== */}
          {inspectId === 'porch_door_lock' && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 group bg-stone-950">
                <img
                  src={ASSET_IMAGES.porch_door_lock_zoom}
                  alt="قفل الباب البلوطي للشرفة"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,8,7,0.7)_100%)]" />
              </div>

              <ParchmentNote
                title="مزلاج وقفل الباب البلوطي المقوس"
                subtitle="HEAVY OAK ENTRANCE · LOCK MECHANISM"
                className="w-full"
              >
                <p>
                  «قطرات المطر تنزلق على خشب البلوط المعتق وحلقة الحديد المطروقة. ثقب المفتاح الحديدي القديم محمي بصفائح نحاسية مزخرفة، ويبدو محكم الإغلاق.»
                </p>

                <div className="mt-4 pt-3 border-t border-[#c8b293] flex flex-wrap items-center justify-between gap-3">
                  {gameState.porchDoorUnlocked ? (
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-800 font-bold text-sm flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-700" />
                        <span>تم فتح القفل البلوطي بنجاح! الباب مفتوح للدخول.</span>
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          if (onUnlockPorchDoor) onUnlockPorchDoor();
                        }}
                        className="px-5 py-2 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs cursor-pointer shadow"
                      >
                        دخول ردهة الاستقبال الآن
                      </button>
                    </div>
                  ) : gameState.inventory.includes('porch_key') ? (
                    <button
                      onClick={() => {
                        sound.playUnlock();
                        if (onUnlockPorchDoor) onUnlockPorchDoor();
                        setShowFeedback('أدرتِ مفتاح الفانوس السري وانفتح المزلاج البلوطي!');
                      }}
                      className="px-6 py-2.5 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs md:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 border border-[#52100d]"
                    >
                      <Unlock className="w-4 h-4 text-amber-300" />
                      <span>إدخال مفتاح الفانوس السري وفتح الباب البلوطي</span>
                    </button>
                  ) : gameState.inventory.includes('lockpick') ? (
                    <button
                      onClick={() => {
                        sound.playUnlock();
                        if (onUnlockPorchDoor) onUnlockPorchDoor();
                        setShowFeedback('استخدمتِ أداة النقر لفتح مزلاج الباب بنجاح!');
                      }}
                      className="px-6 py-2.5 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs md:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 border border-[#52100d]"
                    >
                      <Wrench className="w-4 h-4 text-amber-300" />
                      <span>نقر المزلاج بأداة النقر المعدنية وفتح الباب</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-[#8b1e1b] font-bold text-xs">
                      <AlertCircle className="w-4 h-4" />
                      <span>الباب موصد! تفحصي الفانوس المشتعل على جدار الشرفة للبحث عن المفتاح.</span>
                    </div>
                  )}
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 1.5 RAINY WINDOW ZOOM ==================== */}
          {inspectId === 'window_storm' && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 group bg-stone-950">
                <img
                  src={ASSET_IMAGES.rainy_window_closeup}
                  alt="نافذة الردهة القوطية تحت المطر"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,8,7,0.7)_100%)]" />
              </div>

              <ParchmentNote
                title="نقش مزلاج النافذة القوطية العاصفة"
                subtitle="GOTHIC ARCHED WINDOW · ENGRAVED CLUE"
                className="w-full"
              >
                <p>
                  «حبات المطر الغزيرة تنحدر على الزجاج المنقوش، وأضواء البرق تكشف حروفاً محفورة على المقبض النحاسي للنافذة: 
                  <strong className="text-[#8b1e1b] font-bold block mt-1 text-sm md:text-base">
                    "عندما تشير الساعة إلى 03:45 في صالون المدفأة، ينفتح الدرج السري للشريط المغناطيسي."
                  </strong>
                  هذا هو توقيت ضبط ساعة البندول الكبرى في الصالون!»
                </p>
                <div className="mt-4 pt-2 border-t border-[#c8b293] flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-lg bg-[#3a2514] text-[#f4ecd8] text-xs font-bold cursor-pointer"
                  >
                    تدوين اللغز والعودة للردهة
                  </button>
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 1.6 ATTIC SURVEILLANCE DESK ==================== */}
          {inspectId === 'attic_surveillance' && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 group bg-stone-950">
                <img
                  src={ASSET_IMAGES.attic}
                  alt="شاشات المراقبة في السندرة"
                  className="w-full h-full object-cover select-none"
                />
              </div>

              <ParchmentNote
                title="مذكرات كاميرات المراقبة السلكية"
                subtitle="SURVEILLANCE LOGBOOK · 1986 ARCHIVE"
                className="w-full"
              >
                <p>
                  «شاشات CRT القديمة تبث صوراً مشوشة لممرات الردهة وقفص الزنزانة في القبو! كُتب على ورقة ملصقة بجانب جهاز التحكم: 
                  <strong className="text-[#8b1e1b] font-bold block mt-1 text-sm md:text-base">
                    "الخزانة الجدارية في المطبخ تحتفظ بمفتاح القبو الثقيل، وقفلها الميكانيكي مبرمج على سنة تصفية الملفات 1986."
                  </strong>
                  عمادو لا يزال على قيد الحياة في قاع القبو الحجري!»
                </p>
                <div className="mt-4 pt-2 border-t border-[#c8b293] flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs cursor-pointer shadow"
                  >
                    العودة لغرفة السندرة
                  </button>
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 2. HALLWAY RUG INSPECTION ==================== */}
          {inspectId === 'hallway_rug' && (
            <div className="flex flex-col items-center w-full max-w-2xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 group bg-stone-950">
                <img
                  src={ASSET_IMAGES.hallway_rug_closeup}
                  alt="سجادة الردهة المزاحة"
                  className="w-full h-full object-cover select-none"
                />

                {!gameState.brassKeyFound && (
                  <button
                    onClick={() => {
                      onCollectBrassKey();
                      setShowFeedback('عثرتِ على مفتاح نحاسي قديم!');
                    }}
                    className="absolute bottom-[28%] left-[45%] md:left-[48%] transform -translate-x-1/2 p-3.5 bg-amber-500/25 hover:bg-amber-500/40 border-2 border-amber-400 rounded-full animate-pulse transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                    title="التقاط المفتاح النحاسي"
                  >
                    <Key className="w-7 h-7 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                  </button>
                )}
              </div>

              <ParchmentNote
                title="السجادة الفارسية المعتقة بردهة الاستقبال"
                subtitle="PERSIAN RUNNER RUG · HIDDEN CACHE"
                className="w-full"
              >
                <p>
                  «تحت ثنايا السجادة الفارسية المهترئة بين شقوق البلاط الحجري، يستقر مفتاح نحاسي أثري منقوش بزهرة الزنبق يخص درج مكتبة التحقيقات.»
                </p>

                <div className="mt-4 pt-2 border-t border-[#c8b293] flex items-center justify-between">
                  {!gameState.brassKeyFound ? (
                    <button
                      onClick={onCollectBrassKey}
                      className="px-6 py-2.5 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs md:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 border border-[#52100d]"
                    >
                      <Key className="w-4 h-4 text-amber-300" />
                      <span>التقاط المفتاح النحاسي المنقوش</span>
                    </button>
                  ) : (
                    <span className="text-emerald-800 font-bold text-xs md:text-sm flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                      <span>تمت إضافة المفتاح النحاسي إلى الحقيبة بنجاح.</span>
                    </span>
                  )}
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 2.5 HALLWAY TABLE LEDGER ZOOM ==================== */}
          {inspectId === 'hallway_table_ledger' && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 group bg-stone-950">
                <img
                  src={ASSET_IMAGES.hallway_table_ledger}
                  alt="سجل زوار الردهة وفانوس الزيت"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,8,7,0.7)_100%)]" />
              </div>

              <ParchmentNote
                title="سجل الزوار الخاص بالدكتور برهان الكاظم"
                subtitle="ESTATE VISITOR LOG · RESTRICTED ARCHIVE"
                className="w-full"
              >
                <p>
                  «صفحات السجل الجلدية القديمة تفوح برائحة الزيت والورق المعتق. كُتب بالحبر الأسود:
                  <br />
                  <strong className="text-[#8b1e1b] block mt-1 font-bold">
                    "29 أكتوبر: تم استدراج الباحث عمادو واحتجازه في زنزانة القبو السفلي قبل إرسال تقاريره. مفاتيح الزنزانة ومقص السلاسل في مكتبي بمختبر العمليات السري."
                  </strong>
                  ملاحظة أخرى: "القبو محكم بسلسلة ثقيلة وقفل Yale الصدئ، ومفتاحه الحديدي مخبأ في خزانة المطبخ الجدارية برمز سنة الرحيل 1986".»
                </p>
                <div className="mt-4 pt-2 border-t border-[#c8b293] flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs cursor-pointer shadow"
                  >
                    حفظ الدليل والعودة للردهة
                  </button>
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 3. STUDY DESK DRAWER ==================== */}
          {inspectId === 'study_drawer' && (
            <div className="flex flex-col items-center w-full max-w-2xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 group bg-stone-950">
                <img
                  src={ASSET_IMAGES.locked_desk_drawer}
                  alt="درج المكتب المقفل"
                  className="w-full h-full object-cover select-none"
                />

                <div
                  onClick={handleUseBrassKeyOnDrawer}
                  className="absolute top-[35%] left-[38%] w-[24%] h-[35%] rounded-full cursor-pointer hover:bg-amber-500/15 border border-transparent hover:border-amber-400/50 transition-all flex items-center justify-center"
                >
                  <Lock className="w-6 h-6 text-amber-400/70" />
                </div>
              </div>

              <ParchmentNote
                title="درج مكتب دكتور برهان الكاظم"
                subtitle="STUDY ROOM DESK · BRASS LOCK"
                className="w-full"
              >
                <p>
                  «درج خشبي من البلوط الداكن مقفل بقفل نحاسي عتيق مزخرف بزهرة الزنبق. صوت الأوراق والملفات يُسمع بداخله.»
                </p>

                <div className="mt-4 pt-2 border-t border-[#c8b293] flex items-center justify-between">
                  {gameState.inventory.includes('brass_key') ? (
                    <button
                      onClick={handleUseBrassKeyOnDrawer}
                      className="px-6 py-2.5 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs md:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 border border-[#52100d]"
                    >
                      <Unlock className="w-4 h-4 text-amber-300" />
                      <span>استخدام المفتاح النحاسي لفتح الدرج</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-[#8b1e1b] text-xs font-bold">
                      <AlertCircle className="w-4 h-4" />
                      <span>أنتِ بحاجة إلى "المفتاح النحاسي" (المخبأ تحت سجادة الردهة) لفتح هذا الدرج.</span>
                    </div>
                  )}
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 4. CLUE NOTE WITH PARCHMENT ==================== */}
          {inspectId === 'clue_note' && (
            <div className="flex flex-col items-center w-full max-w-2xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 bg-stone-950">
                <img
                  src={ASSET_IMAGES.handwritten_clue_note}
                  alt="ملاحظة خط اليد داخل الدرج"
                  className="w-full h-full object-cover select-none"
                />
              </div>

              <ParchmentNote
                title="مخطوطة سنة الرحيل · دكتور برهان الكاظم"
                subtitle="CONFIDENTIAL LAB NOTES · 1986"
                className="w-full"
              >
                <p className="text-center font-bold text-2xl md:text-3xl text-[#8b1e1b] py-2 tracking-wider">
                  "السر يكمن في سنة الرحيل 1986"
                </p>
                <p className="text-xs text-[#523d29] text-center">
                  أغلقت الأبواب على أسرار التجارب ووضعت الرمز في قفل خزانة المطبخ لحفظ مفتاح القبو الحديدي.
                </p>
                <div className="mt-4 pt-3 border-t border-[#c8b293] flex items-center justify-center gap-3">
                  <button
                    onClick={onReadClueNote}
                    className="px-5 py-2.5 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs shadow-md transition-all cursor-pointer font-serif-arabic flex items-center gap-2 border border-[#52100d]"
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>تدوين رمز 1986 في دفتر التحقيق</span>
                  </button>

                  <button
                    onClick={onOpenJournal}
                    className="px-4 py-2.5 rounded-lg bg-[#3a2514] text-[#f4ecd8] text-xs font-serif-arabic cursor-pointer font-bold"
                  >
                    فتح سجل التحقيق
                  </button>
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 5. KITCHEN COMBINATION ROLLER LOCK ==================== */}
          {inspectId === 'kitchen_lock' && (
            <div className="flex flex-col items-center w-full max-w-2xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 bg-stone-950">
                <img
                  src={ASSET_IMAGES.kitchen_cabinet_lock}
                  alt="قفل خزانة المطبخ الأسطواني"
                  className="w-full h-full object-cover select-none"
                />

                <div className="absolute top-3 right-3 px-3 py-1 bg-[#1a120c]/90 border border-[#8b6534] rounded text-xs text-amber-200 flex items-center gap-1.5 shadow">
                  {gameState.kitchenLockSolved ? (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">القفل مفتوح</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>قفل أسطواني رباعي الأرقام</span>
                    </>
                  )}
                </div>
              </div>

              {/* Roller Tumbler Controls on Aged Parchment */}
              <ParchmentNote
                title="القفل الميكانيكي لخزانة المطبخ الجدارية"
                subtitle="WALL CABINET · 4-DIGIT COMBINATION"
                className="w-full"
              >
                {!gameState.kitchenLockSolved ? (
                  <div className="flex flex-col items-center">
                    <p className="text-[#3a2514] text-xs md:text-sm mb-3 text-center font-bold">
                      أديري العجلات النحاسية الأربع لإدخال الرقم السري (سنة الرحيل 1986):
                    </p>

                    <div className="flex items-center justify-center gap-3 md:gap-4 my-2" dir="ltr">
                      {[0, 1, 2, 3].map((colIndex) => (
                        <div key={colIndex} className="flex flex-col items-center bg-[#241710] border-2 border-[#8b6534] rounded-lg p-1.5 w-14 md:w-16 shadow-inner">
                          <button
                            onClick={() => cycleDigit(colIndex, 1)}
                            className="p-1 rounded hover:bg-[#3c2518] text-amber-400 transition-colors cursor-pointer w-full flex justify-center"
                            title="زيادة الرقم"
                          >
                            <ChevronUp className="w-5 h-5" />
                          </button>

                          <div className="my-1 text-3xl md:text-4xl font-bold font-cinzel tabular-nums text-amber-200 bg-[#120a05] w-full py-1 text-center rounded border border-[#523d29] shadow-inner">
                            {digits[colIndex]}
                          </div>

                          <button
                            onClick={() => cycleDigit(colIndex, -1)}
                            className="p-1 rounded hover:bg-[#3c2518] text-amber-400 transition-colors cursor-pointer w-full flex justify-center"
                            title="إنقاص الرقم"
                          >
                            <ChevronDown className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-[#7a5b3e] italic mt-1">
                      الرمز السري مسجل في وثيقة الدكتور برهان بملف القضية: 1986
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm bg-emerald-100/90 px-4 py-1.5 rounded border border-emerald-400">
                      <CheckCircle className="w-5 h-5 text-emerald-700" />
                      <span>تطابق الرمز 1986! انفتح القفل الأسطواني وسقطت السلاسل.</span>
                    </div>

                    {!gameState.basementKeyFound ? (
                      <div className="p-3 bg-[#e8dac1] border border-[#8b6534] rounded-lg w-full flex flex-col items-center gap-2 mt-1">
                        <Key className="w-7 h-7 text-amber-700 animate-bounce" />
                        <span className="text-[#3a2514] text-xs md:text-sm font-bold font-serif-arabic">
                          وجدتِ "مفتاح القبو الثقيل" مخبأً داخل الخزانة!
                        </span>
                        <button
                          onClick={() => {
                            onCollectBasementKey();
                            setShowFeedback('حصلتِ على مفتاح القبو الثقيل!');
                          }}
                          className="px-6 py-2.5 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs md:text-sm transition-colors cursor-pointer flex items-center gap-2 shadow-lg border border-[#52100d]"
                        >
                          <Key className="w-4 h-4 text-amber-300" />
                          <span>التقاط مفتاح القبو وإضافته للحقيبة</span>
                        </button>
                      </div>
                    ) : (
                      <p className="text-[#7a5b3e] text-xs font-bold">
                        لقد أخذتِ مفتاح القبو الثقيل. الخزانة الآن مفتوحة.
                      </p>
                    )}
                  </div>
                )}
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 6. CELLAR PADLOCK & BASEMENT DOOR ZOOM ==================== */}
          {(inspectId === 'cellar_padlock' || inspectId === 'basement_door_locked') && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 group bg-stone-950">
                <img
                  src={ASSET_IMAGES.cellar_padlock_zoom}
                  alt="قفل وسلاسل القبو الحديدية"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,8,7,0.7)_100%)]" />
              </div>

              <ParchmentNote
                title="سلاسل وقفل بوابة سرداب القبو"
                subtitle="SUBTERRANEAN PASSAGE · YALE PADLOCK & CHAINS"
                className="w-full"
              >
                <p>
                  «قفل Yale الحديدي الصدئ وسلاسل فولاذية ثقيلة تلتف حول مدخل السرداب الحجري المؤدي لزنزانة عمادو. هواء رطب بارد وصوت أنين ضعيف يتصاعد من الأعماق.»
                </p>

                <div className="mt-4 pt-3 border-t border-[#c8b293] flex flex-wrap items-center justify-between gap-3">
                  {gameState.basementDoorUnlocked ? (
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-800 font-bold text-sm flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-700" />
                        <span>تم فك قفل القبو بنجاح! السرداب مفتوح الآن.</span>
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onUnlockBasementDoor();
                        }}
                        className="px-5 py-2 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs cursor-pointer shadow"
                      >
                        النزول إلى سرداب القبو الآن
                      </button>
                    </div>
                  ) : gameState.inventory.includes('basement_key') ? (
                    <button
                      onClick={() => {
                        sound.playUnlock();
                        onUnlockBasementDoor();
                        onClose();
                      }}
                      className="px-8 py-3 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-amber-100 font-bold text-xs md:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg border border-[#52100d]"
                    >
                      <Unlock className="w-4 h-4 text-amber-300" />
                      <span>إدخال مفتاح القبو الثقيل وفتح سلاسل السرداب</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-[#8b1e1b] text-xs font-bold">
                      <AlertCircle className="w-4 h-4" />
                      <span>السلاسل موصدة بقفل ثقيل! أنتِ بحاجة لمفتاح القبو (المخبأ في خزانة المطبخ برمز 1986).</span>
                    </div>
                  )}
                </div>
              </ParchmentNote>
            </div>
          )}

          {/* ==================== 7. FINAL LETTER DOSSIER ==================== */}
          {inspectId === 'final_letter' && (
            <div className="flex flex-col items-center w-full max-w-3xl">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-[#2c1d14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] mb-4 bg-stone-950">
                <img
                  src={ASSET_IMAGES.final_letter_desk}
                  alt="ملف القضية الأخير"
                  className="w-full h-full object-cover select-none"
                />
              </div>

              <ParchmentNote
                title="الملف الجنائي الختامي · منظمة البيت الأخير"
                subtitle="FINAL CRIMINAL TESTAMENT · DOSSIER #86"
                className="w-full"
              >
                <p>
                  «وثائق رسمية مدموغة بالشمع الأحمر تثبت تورط دكتور برهان الكاظم وسليمان الأعرج في استدراج الشهود وتصفية الباحثين منذ عام 1986. هذه الوثائق مع إفادة عمادو كافية لإسقاط المنظمة فور هروبنا عبر البوابة الكبرى.»
                </p>
                <div className="mt-4 pt-2 border-t border-[#c8b293] flex items-center justify-end">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg bg-[#8b1e1b] hover:bg-[#a72825] text-white text-xs cursor-pointer font-serif-arabic font-bold shadow-md"
                  >
                    إغلاق والعودة للقبو
                  </button>
                </div>
              </ParchmentNote>
            </div>
          )}

        </div>

        {/* Diegetic Parchment Status Feedback Strip */}
        {showFeedback && (
          <div className="px-5 py-2.5 bg-[#ecdcc0] text-[#2c1d11] border-t-2 border-[#8b6534] text-xs flex items-center justify-between font-serif-arabic shadow-md">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{showFeedback}</span>
            </span>
            <button
              onClick={() => setShowFeedback(null)}
              className="text-[#8b1e1b] hover:text-black cursor-pointer font-bold"
            >
              [إغلاق الإشعار]
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
