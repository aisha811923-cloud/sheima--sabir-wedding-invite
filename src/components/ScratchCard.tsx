import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';

interface ScratchCardProps {
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ onRevealed }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const isRevealedRef = useRef(false);

  // Trigger celebratory confetti burst
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF0E4', '#4A0E17', '#7A1F2D', '#F5E08E'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.65 },
          colors: ['#D4AF37', '#FAF0E4', '#4A0E17'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.65 },
          colors: ['#D4AF37', '#FAF0E4', '#7A1F2D'],
        });
      }, 250);
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Multi-stop brushed metallic gold gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#AA7C11');
    gradient.addColorStop(0.25, '#D4AF37');
    gradient.addColorStop(0.5, '#FFF8D6');
    gradient.addColorStop(0.75, '#D4AF37');
    gradient.addColorStop(1, '#8C6005');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Inner gold border inside canvas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, rect.width - 16, rect.height - 16);

    ctx.strokeStyle = 'rgba(74, 14, 23, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, rect.width - 24, rect.height - 24);

    // Centered prompt text inside canvas
    ctx.fillStyle = '#4A0E17';
    ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Touch & Scratch Gold Foil ✨', rect.width / 2, rect.height / 2 - 5);

    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#3B0A11';
    ctx.fillText('(Drag to reveal wedding date)', rect.width / 2, rect.height / 2 + 15);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealedRef.current) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const checkScratchPercentage = useCallback(() => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width;
    const height = canvas.height;

    const step = Math.max(Math.floor(8 * dpr), 4);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let transparentCount = 0;
    let totalSampled = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        totalSampled++;
        if (alpha < 64) {
          transparentCount++;
        }
      }
    }

    const percentage = (transparentCount / totalSampled) * 100;

    if (percentage >= 50) {
      isRevealedRef.current = true;
      setIsRevealed(true);
      triggerConfetti();
      if (onRevealed) onRevealed();
    }
  }, [onRevealed, triggerConfetti]);

  const erase = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 44;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    checkScratchPercentage();
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    erase(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    erase(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      erase(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      erase(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div className="w-full mx-auto my-4">
      {/* Clean prompt above the canvas */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-center mb-3"
      >
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#6D1A27] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#C89D2B]" />
          Scratch with finger to reveal wedding date
          <Sparkles className="w-3.5 h-3.5 text-[#C89D2B]" />
        </span>
      </motion.div>

      {/* Main Scratch Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[155px] sm:h-[165px] rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(74,14,23,0.12)] border border-[#D4AF37]/50 select-none bg-gradient-to-br from-[#2C050B] via-[#4A0E17] to-[#7A1F2D] text-pearl flex flex-col items-center justify-center p-4 text-center"
      >
        {/* Revealed Content: Centered velvet burgundy box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={
            isRevealed
              ? { scale: 1, opacity: 1 }
              : { scale: 0.95, opacity: 0.9 }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative z-0 flex flex-col items-center justify-center w-full"
        >
          <div className="flex items-center gap-1.5 text-[#F5E08E] text-[10px] sm:text-[11px] uppercase tracking-widest font-sans font-bold mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#F5E08E]" />
            <span>Auspicious Wedding Day</span>
          </div>

          <div className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#2C050B]/95 border border-[#D4AF37]/80 shadow-[0_0_20px_rgba(212,175,55,0.35)] my-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF3B0] tracking-wide whitespace-nowrap">
              Saturday, 26 December 2026
            </h3>
          </div>

          <p className="text-[11px] sm:text-xs font-serif italic text-white/90 mt-1">
            Insha'Allah · Haldi (23 Dec), Barat (26 Dec) & Walima (28 Dec)
          </p>
        </motion.div>

        {/* Scratchable Canvas Overlay */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10 transition-opacity duration-600 ease-out"
            style={{
              opacity: isRevealed ? 0 : 1,
              pointerEvents: isRevealed ? 'none' : 'auto',
            }}
          />
        )}
      </div>
    </div>
  );
};
