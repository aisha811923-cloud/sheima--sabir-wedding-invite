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
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col justify-between items-center text-center select-none">
      {/* Full-bleed background video */}
      <video
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.92] contrast-[1.05]"
      />

      {/* Delicate top and bottom gradient fades for text legibility and smooth page transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-[#FAF6F0] z-0 pointer-events-none" />

      {/* Direct Floating Typography Container */}
      <div className="relative z-10 w-full max-w-[430px] mx-auto px-6 py-12 flex flex-col justify-between min-h-[100dvh]">
        {/* Top Calligraphy & Inscription */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2 pt-6"
        >
          <div className="text-xl sm:text-2xl font-arabic font-bold text-[#F3E5AB] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <p className="font-serif italic text-xs sm:text-sm text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] leading-relaxed">
            "We are honored to welcome you to the Wedding ceremony of"
          </p>
        </motion.div>

        {/* Center Couple Lineage (Floating with Glass Accent) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="my-auto py-6 px-4 rounded-3xl bg-black/25 backdrop-blur-[2px] border border-white/10 shadow-2xl space-y-4 text-center"
        >
          {/* Groom */}
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#E5C158] uppercase font-sans font-bold drop-shadow-md">
              SABIR & SHEIMA
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide mt-1 drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
              Sabir Baig
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF0E4]/90 font-medium mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Son of Mr. Shahid Baig & Mrs. Shahida Baig
            </p>
          </div>

          {/* Gold Glyph */}
          <div className="text-xl sm:text-2xl text-[#E5C158] font-serif flex items-center justify-center gap-3 drop-shadow-md" aria-hidden="true">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#E5C158]" />
            <span className="italic font-bold">&</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#E5C158]" />
          </div>

          {/* Bride */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
              Sheima Baig
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF0E4]/90 font-medium mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Daughter of Mr. Shaheen Baig & Mrs. Shabnam Baig
            </p>
            <p className="text-[11px] sm:text-xs text-[#E5C158] font-medium italic mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Granddaughter of Late Wahid Baig
            </p>
          </div>
        </motion.div>

        {/* Bottom Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="pb-6 text-center"
        >
          <div
            onClick={scrollToNext}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 text-[11px] uppercase tracking-[0.2em] font-semibold text-white shadow-xl cursor-pointer hover:bg-black/60 transition-colors"
          >
            <span>Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
