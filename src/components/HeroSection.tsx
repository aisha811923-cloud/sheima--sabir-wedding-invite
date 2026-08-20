import React from 'react';
import { motion } from 'framer-motion';

export const cardEntranceVariants = {
  hidden: { opacity: 0, y: 45, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-[430px] mx-auto hero-viewport overflow-hidden flex flex-col justify-between items-center text-center bg-[#1F1617] select-none">
      {/* 9:16 Mobile Portrait Background Video */}
      <video
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 filter brightness-[0.92] contrast-[1.05]"
      />

      {/* Ambient Top and Bottom Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#FAF6F0] z-0 pointer-events-none" />

      {/* Floating Content Wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center px-5 safe-top safe-bottom">
        {/* Top Sacred Inscription */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-2 space-y-1.5"
        >
          <div className="text-xl sm:text-2xl font-serif font-bold text-[#F3E5AB] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <p className="font-serif italic text-xs sm:text-[13px] text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] max-w-[300px] mx-auto leading-relaxed">
            "We are honored to welcome you to the Wedding ceremony of"
          </p>
        </motion.div>

        {/* Center Couple Lineage Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.35 }}
          className="w-full my-auto py-5 px-4 rounded-3xl bg-black/30 backdrop-blur-[3px] border border-white/15 shadow-2xl space-y-3.5 text-center"
        >
          {/* Groom Section */}
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#E5C158] uppercase font-sans font-bold drop-shadow-md">
              SABIR & SHEIMA
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide mt-0.5 drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
              Sabir Baig
            </h1>
            <p className="text-xs sm:text-[13px] text-[#FAF0E4]/90 font-medium mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Son of Mr. Shahid Baig & Mrs. Shahida Baig
            </p>
          </div>

          {/* Ornate Gold Divider */}
          <div className="text-xl sm:text-2xl text-[#E5C158] font-serif flex items-center justify-center gap-3 drop-shadow-md" aria-hidden="true">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#E5C158]" />
            <span className="italic font-bold">&</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#E5C158]" />
          </div>

          {/* Bride Section */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
              Sheima Baig
            </h1>
            <p className="text-xs sm:text-[13px] text-[#FAF0E4]/90 font-medium mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Daughter of Mr. Shaheen Baig & Mrs. Shabnam Baig
            </p>
            <p className="text-[11px] sm:text-xs text-[#E5C158] font-medium italic mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Granddaughter of Late Wahid Baig
            </p>
          </div>
        </motion.div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="pb-2 cursor-pointer text-center"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 text-[11px] uppercase tracking-[0.2em] font-semibold text-white shadow-xl hover:bg-black/60 transition-colors">
            <span>Scroll Down</span>
            <span className="text-xs">↓</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
