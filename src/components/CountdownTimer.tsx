import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date('2026-12-26T18:00:00+05:30').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const units = [
    { label: 'Days', value: formatNumber(timeLeft.days) },
    { label: 'Hours', value: formatNumber(timeLeft.hours) },
    { label: 'Minutes', value: formatNumber(timeLeft.minutes) },
    { label: 'Seconds', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="w-full mx-auto mt-6 mb-2">
      <div className="text-center mb-3">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#6D1A27] font-sans font-bold">
          Counting Down to 26 December 2026
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-3.5 px-1 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-[0_4px_15px_rgba(74,14,23,0.06)] relative overflow-hidden animate-breathing-glow"
          >
            {/* Sliding Numbers */}
            <div className="h-8 sm:h-9 flex items-center justify-center overflow-hidden relative">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={unit.value}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] tracking-tight block"
                >
                  {unit.value}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-widest text-[#6D1A27] mt-1">
              {unit.label}
            </div>

            {/* Corner Star Motif */}
            <div className="absolute top-1 right-1.5 text-[8px] text-[#D4AF37]/70 select-none" aria-hidden="true">
              ✧
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
