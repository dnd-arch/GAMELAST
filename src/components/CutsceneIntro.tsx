import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, FastForward, ShieldAlert } from 'lucide-react';
import { CUTSCENE_SLIDES } from '../data/gameData';
import { WeatherOverlay } from './WeatherOverlay';
import { sound } from '../utils/audio';

interface CutsceneIntroProps {
  onComplete: () => void;
}

export const CutsceneIntro: React.FC<CutsceneIntroProps> = ({ onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slide = CUTSCENE_SLIDES[currentSlideIndex];

  useEffect(() => {
    // Play suspenseful sound on slide transition
    if (currentSlideIndex === 0 || currentSlideIndex === 1 || currentSlideIndex === 4) {
      sound.playThunder();
    } else if (currentSlideIndex === 2) {
      sound.playHeartbeat();
    }
  }, [currentSlideIndex]);

  const handleNext = () => {
    sound.playClick();
    if (currentSlideIndex < CUTSCENE_SLIDES.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-between p-4 md:p-8 select-none text-stone-100 overflow-hidden">
      
      {/* Dynamic Rain & Thunder Weather Layer in Cutscene */}
      <WeatherOverlay isOutside={true} />

      {/* Top Bar with Skip CTA */}
      <div className="w-full max-w-5xl flex items-center justify-between z-30">
        <div className="flex items-center gap-2 text-xs font-cinzel text-amber-500 tracking-widest">
          <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
          <span>PROLOGUE · THE ABDUCTION OF EMADO</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onComplete();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors text-xs cursor-pointer font-serif-arabic"
        >
          <span>تخطي المشهد</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center 16:9 Cinematic Video-Game Frame */}
      <div className="relative w-full max-w-5xl aspect-video max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/60 bg-stone-900 my-auto z-20">
        <img
          src={slide.image}
          alt={slide.speaker}
          className="w-full h-full object-cover object-center filter contrast-110 brightness-90 transition-all duration-1000 transform scale-100"
        />

        {/* Cinematic Letterbox Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-transparent to-transparent" />

        {/* Narrative Subtitle Box */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-12 md:right-12 p-4 md:p-6 rounded-2xl bg-stone-950/85 border border-amber-900/40 backdrop-blur-md shadow-2xl text-right">
          {slide.speaker && (
            <div className="inline-block px-3 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 font-bold text-xs mb-2 font-serif-arabic">
              {slide.speaker}
            </div>
          )}

          <p className="text-base md:text-xl font-bold font-serif-arabic text-stone-100 leading-relaxed mb-1.5">
            {slide.text}
          </p>

          {slide.subtext && (
            <p className="text-xs md:text-sm text-stone-400 font-light leading-relaxed font-serif-arabic">
              {slide.subtext}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Nav Controllers */}
      <div className="w-full max-w-5xl flex items-center justify-between z-30 pt-2">
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {CUTSCENE_SLIDES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlideIndex ? 'w-8 bg-amber-500' : 'w-2 bg-stone-700'
              }`}
            />
          ))}
        </div>

        {/* Action Next/Prev */}
        <div className="flex items-center gap-3">
          {currentSlideIndex > 0 && (
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold cursor-pointer flex items-center gap-2 font-serif-arabic"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-950/50 cursor-pointer flex items-center gap-2 font-serif-arabic"
          >
            <span>
              {currentSlideIndex === CUTSCENE_SLIDES.length - 1
                ? 'ابدأ التحقيق والإنقاذ'
                : 'التالي'}
            </span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
