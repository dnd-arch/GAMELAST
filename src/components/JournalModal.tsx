import React, { useState } from 'react';
import { X, BookOpen, Map, Key, Sparkles, CheckCircle, Clock, ShieldAlert, Paperclip, Stamp } from 'lucide-react';
import { JournalEntry, RoomId, GameProgress } from '../types/game';
import { sound } from '../utils/audio';

interface JournalModalProps {
  gameState: GameProgress;
  onClose: () => void;
  onNavigateRoom?: (room: RoomId) => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  gameState,
  onClose,
  onNavigateRoom,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'map'>('notes');

  const roomsList: { id: RoomId; name: string; unlocked: boolean; description: string }[] = [
    {
      id: 'gate',
      name: 'بوابة المزرعة والمدخل الخارجي',
      unlocked: true,
      description: 'موقع اختطاف عمادو وسقوط حقيبته وشارة تحقيقه في الوحل.',
    },
    {
      id: 'porch',
      name: 'شرفة البيت والباب الرئيسي',
      unlocked: true,
      description: 'مدخل القصر الحجري المقوس وفانوس المراقبة الزيتي.',
    },
    {
      id: 'hallway',
      name: 'ردهة الاستقبال الكبرى',
      unlocked: gameState.visitedRooms.includes('hallway'),
      description: 'ملتقى الممرات وبها السجادة الفارسية وسجل الزوار وسلالم السندرة والقبو.',
    },
    {
      id: 'parlor',
      name: 'صالون المدفأة وساعة البندول',
      unlocked: gameState.visitedRooms.includes('parlor'),
      description: 'لوحة الدكتور برهان الكاظم وساعة البندول الأثرية (03:45).',
    },
    {
      id: 'study',
      name: 'مكتبة التحقيقات والأرشيف',
      unlocked: gameState.visitedRooms.includes('study'),
      description: 'أرشيف التجارب ومكتب برهان المقفل المحتوي على وثيقة 1986.',
    },
    {
      id: 'kitchen',
      name: 'المطبخ العتيق وخزانة الأسرار',
      unlocked: gameState.visitedRooms.includes('kitchen'),
      description: 'خزانة الحائط المؤمنة بالقفل الأسطواني رباعي الأرقام (1986).',
    },
    {
      id: 'attic',
      name: 'غرفة المراقبة والسندرة',
      unlocked: gameState.visitedRooms.includes('attic'),
      description: 'شاشات المراقبة وكاميرات التجسس على ممرات القصر وزنزانة القبو.',
    },
    {
      id: 'crypt',
      name: 'سرداب الحجارة المغمور',
      unlocked: gameState.visitedRooms.includes('crypt') || gameState.basementDoorUnlocked,
      description: 'ممر مقوس غارق بمياه الأمطار ينحدر مباشرة إلى قبو الزنازين.',
    },
    {
      id: 'basement',
      name: 'القبو الحجري وزنزانة عمادو',
      unlocked: gameState.basementDoorUnlocked,
      description: 'أعماق باردة تحت الأرض تحتجز عمادو بالأغلال خلف قضبان حديدية.',
    },
    {
      id: 'sanctum',
      name: 'مختبر العمليات ومسجل الأشرطة',
      unlocked: gameState.visitedRooms.includes('sanctum'),
      description: 'مقر قيادة برهان وسليمان، به أجهزة التسجيل ومفاتيح الزنزانة ومقص السلاسل.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200 select-none font-cairo" dir="rtl">
      {/* Authentic Aged Leather Detective Case Dossier (دفتر تحريات جلدي قديم) */}
      <div 
        className="relative w-full max-w-4xl p-6 md:p-8 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-4 border-[#7a5833] text-[#2c1d10] flex flex-col max-h-[92vh] overflow-hidden"
        style={{
          backgroundColor: '#f5e7cd',
          backgroundImage: 'radial-gradient(#dec29b 1px, transparent 1px), radial-gradient(#ead0ad 1px, #f5e7cd 1px)',
          backgroundSize: '20px 20px',
          boxShadow: 'inset 0 0 45px rgba(100,65,30,0.35), 0 25px 60px rgba(0,0,0,0.9)',
        }}
      >
        {/* Leather Folio Header Strip */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#b0936f] mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8c2d19] text-amber-100 flex items-center justify-center font-bold shadow-inner">
              <BookOpen className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold font-serif-arabic text-[#3a200e]">
                  سجل التحريات الميداني · المحققة إكرامو
                </h2>
                <span className="px-2 py-0.5 rounded bg-red-900/20 border border-red-900/40 text-red-900 text-[10px] font-bold">
                  سري للغاية
                </span>
              </div>
              <p className="text-xs text-[#785b3b] font-serif-arabic">
                قضية اختطاف الباحث عمادو وكشف منظمة الدكتور برهان الكاظم (1986)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPaperRustle();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#dec39f] hover:bg-[#cfb18b] text-[#38200e] font-bold flex items-center justify-center cursor-pointer text-sm shadow transition-colors"
            title="إغلاق السجل"
          >
            ✕
          </button>
        </div>

        {/* Paper Tabs: Notes Dossier vs Blueprint Map */}
        <div className="flex items-center gap-3 mb-4 border-b border-[#c2a783] pb-2">
          <button
            onClick={() => {
              sound.playPaperRustle();
              setActiveTab('notes');
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer font-serif-arabic ${
              activeTab === 'notes'
                ? 'bg-[#8c2d19] text-amber-100 shadow-md ring-2 ring-[#521307]'
                : 'bg-[#ebd7b8] text-[#4d331d] hover:bg-[#dfc49f] border border-[#bfa27d]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>وقائع التحقيق والأدلة الموثقة ({gameState.journal.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playPaperRustle();
              setActiveTab('map');
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer font-serif-arabic ${
              activeTab === 'map'
                ? 'bg-[#8c2d19] text-amber-100 shadow-md ring-2 ring-[#521307]'
                : 'bg-[#ebd7b8] text-[#4d331d] hover:bg-[#dfc49f] border border-[#bfa27d]'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>مخطط القصر والمواقع المكتشفة ({roomsList.filter(r => r.unlocked).length} / {roomsList.length})</span>
          </button>
        </div>

        {/* Tab Content: Real Parchment Document Folios */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 pl-1">
          {activeTab === 'notes' ? (
            <div className="space-y-3">
              {gameState.journal.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-xl bg-[#ede0c9] border-2 border-[#bfa27d] shadow-sm relative overflow-hidden group hover:bg-[#e7d7be] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5 border-b border-[#d4bc99] pb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8c2d19]" />
                      <span className="font-bold text-[#351e0e] font-serif-arabic text-sm">
                        {entry.title}
                      </span>
                    </div>
                    <span className="text-[#785b3b] font-mono text-[11px] flex items-center gap-1 font-bold">
                      <Clock className="w-3 h-3 text-[#8c2d19]" />
                      <span>{entry.timestamp}</span>
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-[#412815] leading-relaxed font-serif-arabic">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roomsList.map((room) => {
                const isCurrent = gameState.currentRoom === room.id;

                return (
                  <div
                    key={room.id}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-[#ebd0ab] border-[#8c2d19] shadow-md ring-2 ring-red-900/30'
                        : room.unlocked
                        ? 'bg-[#ede0c9] border-[#bfa27d] hover:bg-[#e5d4b7]'
                        : 'bg-[#e4d4ba]/60 border-[#c4ab88] opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              isCurrent
                                ? 'bg-[#8c2d19] animate-ping'
                                : room.unlocked
                                ? 'bg-emerald-700'
                                : 'bg-stone-500'
                            }`}
                          />
                          <h4 className="font-bold text-[#381f0d] text-sm font-serif-arabic">
                            {room.name}
                          </h4>
                        </div>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-[#8c2d19] text-amber-100 text-[10px] font-bold font-serif-arabic">
                            أنتِ هنا الآن
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#523720] leading-relaxed font-serif-arabic mb-3">
                        {room.unlocked ? room.description : 'موقع غير مستكشف بعد...'}
                      </p>
                    </div>

                    {room.unlocked && onNavigateRoom && !isCurrent && (
                      <button
                        onClick={() => {
                          sound.playPaperRustle();
                          onNavigateRoom(room.id);
                          onClose();
                        }}
                        className="w-full py-1.5 px-3 rounded-lg bg-[#ded0b6] hover:bg-[#cebe9f] border border-[#ad8c65] text-[#38200d] font-bold text-xs transition-colors cursor-pointer font-serif-arabic mt-1"
                      >
                        الانتقال إلى هذا الموقع ➔
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Paper Bar */}
        <div className="mt-4 pt-3 border-t-2 border-[#b0936f] flex items-center justify-between text-[11px] text-[#6b4e31] font-serif-arabic">
          <span>سجل تحريات رسمي · القضية مسجلة في نيابة مكافحة الجريمة</span>
          <span className="font-mono text-[#8a6845]">CASE FILE: 1986-RETRIBUTION</span>
        </div>
      </div>
    </div>
  );
};
