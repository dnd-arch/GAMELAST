import React from 'react';
import { Eye, BookOpen, Volume2, VolumeX, RotateCcw, Clock, CloudLightning, Compass } from 'lucide-react';
import { ROOMS } from '../data/gameData';
import { RoomId } from '../types/game';
import { sound } from '../utils/audio';

interface GameHUDProps {
  currentRoom: RoomId;
  elapsedSeconds: number;
  highlightHotspots: boolean;
  unreadJournalCount: number;
  isMuted: boolean;
  isWeatherActive: boolean;
  onToggleHighlightHotspots: () => void;
  onOpenJournal: () => void;
  onToggleSound: () => void;
  onToggleWeather: () => void;
  onReturnTitle: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  currentRoom,
  elapsedSeconds,
  highlightHotspots,
  unreadJournalCount,
  isMuted,
  isWeatherActive,
  onToggleHighlightHotspots,
  onOpenJournal,
  onToggleSound,
  onToggleWeather,
  onReturnTitle,
}) => {
  const roomConfig = ROOMS[currentRoom];

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header 
      className="w-full border-b-2 border-[#7a5833] px-3 md:px-6 py-2 flex items-center justify-between text-xs z-30 select-none shadow-xl font-cairo"
      dir="rtl"
      style={{
        backgroundColor: '#f3e5cb',
        backgroundImage: 'radial-gradient(#dec29b 1px, transparent 1px), radial-gradient(#e9cfab 1px, #f3e5cb 1px)',
        backgroundSize: '20px 20px',
        boxShadow: 'inset 0 -2px 10px rgba(110,75,40,0.25), 0 4px 15px rgba(0,0,0,0.5)',
      }}
    >
      
      {/* Zone 1: Current Room Title & Objective (Parchment Ink Stamp) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#8c2d19] text-amber-100 flex items-center justify-center font-bold text-xs shadow-inner">
            <Compass className="w-4 h-4 text-amber-200" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#351e0f] font-serif-arabic text-sm md:text-base leading-tight">
                {roomConfig.name}
              </span>
            </div>
            <span className="text-[10px] text-[#6b4c2b] font-cinzel font-semibold">
              {roomConfig.nameEn}
            </span>
          </div>
        </div>

        {/* Vintage Tabular Stopwatch Stamp */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#e8d5b5] border border-[#a6825a] text-[#3d2512] font-mono tabular-nums text-xs shadow-inner">
          <Clock className="w-3.5 h-3.5 text-[#8c2d19]" />
          <span>{formatTimer(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Zone 2: Weather & Atmospheric Investigation Indicator */}
      <div className="hidden lg:flex items-center gap-3 px-3.5 py-1 rounded-full bg-[#e8d4b2] border border-[#a68157] text-[#412711] text-xs font-serif-arabic shadow-inner">
        <button
          onClick={() => {
            sound.playPaperRustle();
            onToggleWeather();
          }}
          className="flex items-center gap-1.5 hover:text-[#8c2d19] transition-colors cursor-pointer"
          title="تبديل مؤثرات الطقس الديناميكي (المطر والبرق)"
        >
          <CloudLightning className="w-3.5 h-3.5 text-[#8c2d19] animate-pulse" />
          <span>عاصفة منتصف الليل {isWeatherActive ? '(نشطة)' : '(موقوفة)'}</span>
        </button>
        <span className="text-[#a07c55]">·</span>
        <span className="font-bold text-[#8c2d19]">المحققة إكرامو</span> ➔ <span>إنقاذ عمادو</span>
      </div>

      {/* Zone 3: Interactive Affordances (Antique Parchment Stamped Buttons) */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Detective Eye Toggle (عين المحقق بستايل ورقي قديم) */}
        <button
          onClick={() => {
            sound.playPaperRustle();
            onToggleHighlightHotspots();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer font-serif-arabic font-bold text-xs ${
            highlightHotspots
              ? 'bg-[#7c2d12] text-amber-100 border-[#450a0a] shadow-md ring-2 ring-amber-700/50'
              : 'bg-[#ebd7b7] hover:bg-[#dec49e] text-[#38210f] border-[#a07c54]'
          }`}
          title="عين المحقق: إبراز نقاط التفاعل والآثار الخفية"
        >
          <Eye className={`w-4 h-4 ${highlightHotspots ? 'text-amber-300 animate-pulse' : 'text-[#7c2d12]'}`} />
          <span className="hidden md:inline">عين المحقق</span>
        </button>

        {/* Journal Button (سجل التحقيق) */}
        <button
          onClick={() => {
            sound.playPaperRustle();
            onOpenJournal();
          }}
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ebd7b7] hover:bg-[#dec49e] border-2 border-[#a07c54] text-[#38210f] font-serif-arabic font-bold text-xs transition-colors cursor-pointer shadow-sm"
          title="سجل التحقيق والملاحظات الجنائية"
        >
          <BookOpen className="w-4 h-4 text-[#7c2d12]" />
          <span className="hidden md:inline">سجل التحقيق</span>
          {unreadJournalCount > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-[#8c2d19] animate-ping" />
          )}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={() => {
            sound.playPaperRustle();
            onToggleSound();
          }}
          className="p-1.5 rounded-lg bg-[#ebd7b7] hover:bg-[#dec49e] border-2 border-[#a07c54] text-[#422914] transition-colors cursor-pointer"
          title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#8a6845]" /> : <Volume2 className="w-4 h-4 text-[#7c2d12]" />}
        </button>

        {/* Return to Title */}
        <button
          onClick={() => {
            sound.playPaperRustle();
            onReturnTitle();
          }}
          className="p-1.5 rounded-lg bg-[#ebd7b7] hover:bg-[#dec49e] border-2 border-[#a07c54] text-[#422914] transition-colors cursor-pointer"
          title="العودة إلى القائمة الرئيسية"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
