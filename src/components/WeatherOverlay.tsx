import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';

interface WeatherOverlayProps {
  isOutside: boolean;
  intensity?: 'storm' | 'moderate';
  onLightningTrigger?: () => void;
}

export const WeatherOverlay: React.FC<WeatherOverlayProps> = ({
  isOutside,
  intensity = 'storm',
  onLightningTrigger,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lightningActive, setLightningActive] = useState<boolean>(false);

  // Setup animated canvas rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Raindrop particles pool
    const dropCount = isOutside ? 120 : 40;
    const drops = Array.from({ length: dropCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: Math.random() * 25 + 15,
      speed: Math.random() * 12 + 18,
      opacity: Math.random() * 0.4 + 0.2,
      thickness: Math.random() * 1.5 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render rain drops
      ctx.strokeStyle = isOutside ? 'rgba(215, 230, 255, 0.45)' : 'rgba(200, 220, 245, 0.2)';
      ctx.lineCap = 'round';

      drops.forEach((drop) => {
        ctx.lineWidth = drop.thickness;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 3, drop.y + drop.len);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= 2;

        if (drop.y > height) {
          drop.y = -drop.len;
          drop.x = Math.random() * (width + 100);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOutside]);

  // Periodic atmospheric lightning system
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const scheduleNextLightning = () => {
      // Random interval between 12 to 24 seconds
      const delay = Math.random() * 12000 + 12000;
      timer = setTimeout(() => {
        triggerLightningFlash();
        scheduleNextLightning();
      }, delay);
    };

    const triggerLightningFlash = () => {
      setLightningActive(true);
      sound.playThunder();
      if (onLightningTrigger) onLightningTrigger();

      // Double pulse flash
      setTimeout(() => {
        setLightningActive(false);
        setTimeout(() => {
          setLightningActive(true);
          setTimeout(() => {
            setLightningActive(false);
          }, 80);
        }, 120);
      }, 90);
    };

    scheduleNextLightning();

    return () => clearTimeout(timer);
  }, [onLightningTrigger]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Canvas Rain Particles */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Atmospheric Mist & Fog Waves */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-900/40 via-stone-900/15 to-transparent animate-dust mix-blend-screen opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_60%,rgba(10,12,18,0.45)_100%)]" />

      {/* Lightning Flash Overlay */}
      {lightningActive && (
        <div className="absolute inset-0 bg-cyan-100/35 backdrop-brightness-150 animate-in fade-in duration-75" />
      )}
    </div>
  );
};
