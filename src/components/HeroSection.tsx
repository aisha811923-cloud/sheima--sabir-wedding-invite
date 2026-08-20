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
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={cardEntranceVariants}
      className="relative z-10 w-full"
    >
      {/* Video Hero Arch Card Container */}
      <div className="relative w-full min-h-[85vh] sm:min-h-[80vh] rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl overflow-hidden shadow-2xl border-[1.5px] border-[#D4AF37]/50 flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#1F1617]">
        {/* Background Looping Video Element */}
        <video
          src="/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.70] contrast-[1.05]"
        />

        {/* Dark Vignette Overlay for Maximum Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1617]/50 via-transparent to-[#1F1617]/85 z-0 pointer-events-none" />

        {/* Ornamental Gold Corner Filigree */}
        <div className="absolute top-4 left-4 text-[#D4AF37] text-xs select-none opacity-80 z-10" aria-hidden="true">
          ✦ ✧ ✦
        </div>
        <div className="absolute top-4 right-4 text-[#D4AF37] text-xs select-none opacity-80 z-10" aria-hidden="true">
          ✦ ✧ ✦
        </div>

        {/* Top Header Subtle Islamic Monogram */}
        <div className="relative z-10 pt-2 pointer-events-none">
          <span className="font-arabic text-xl sm:text-2xl text-[#F5E08E] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            ﷽
          </span>
        </div>

        {/* Frosted Dark-Glass Overlay Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-full max-w-[380px] backdrop-blur-md bg-[#1F1617]/80 border border-[#D4AF37]/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl my-auto text-white"
        >
          {/* Header Inscription */}
          <div className="mb-4">
            <div className="text-sm mb-1.5 select-none" aria-hidden="true">🤍</div>
            <p className="font-serif italic text-xs sm:text-sm text-[#FAF0E4]/90 tracking-wide leading-relaxed">
              "We are honored to welcome you to the Wedding ceremony of"
            </p>
          </div>

          {/* Groom Section */}
          <div className="space-y-1 my-3">
            <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-sans font-bold block">
              SABIR & SHEIMA
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide text-gold-shimmer-sweep leading-tight">
              Sabir Baig
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF0E4]/85 font-normal leading-relaxed">
              Son of Mr. Shahid Baig & Mrs. Shahida Baig
            </p>
          </div>

          {/* Ornate Gold Connector */}
          <div className="flex items-center justify-center gap-3 text-[#D4AF37] font-serif my-2.5" aria-hidden="true">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-xl sm:text-2xl font-bold italic">&</span>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          {/* Bride Section */}
          <div className="space-y-1 my-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide text-gold-shimmer-sweep leading-tight">
              Sheima Baig
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF0E4]/85 font-normal leading-relaxed">
              Daughter of Mr. Shaheen Baig & Mrs. Shabnam Baig
            </p>
            <p className="text-[11px] sm:text-xs text-[#D4AF37]/95 font-medium italic pt-0.5">
              Granddaughter of Late Wahid Baig
            </p>
          </div>
        </motion.div>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 mt-4 mb-1"
        >
          <div className="backdrop-blur-md bg-black/40 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-white flex items-center gap-1.5 shadow-lg">
            <span>Scroll Down</span>
            <span className="text-sm">↓</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
