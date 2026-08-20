import React from 'react';
import { motion } from 'framer-motion';
import { ScratchCard } from './ScratchCard';
import { CountdownTimer } from './CountdownTimer';
import { Sparkles } from 'lucide-react';
import { cardEntranceVariants } from './HeroSection';

export const DateCountdownSection: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={cardEntranceVariants}
      className="relative z-10 w-full"
    >
      {/* Island Card 2: Interactive Date Reveal & Countdown with p-5 sm:p-7 padding */}
      <div className="relative p-5 sm:p-7 rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl bg-white/95 backdrop-blur-sm border-[1.5px] border-[#D4AF37]/50 shadow-[0_18px_45px_rgba(74,14,23,0.08)] text-center overflow-hidden">
        {/* Ornamental Corner Stars */}
        <div className="absolute top-4 left-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
          ✦ ✧ ✦
        </div>
        <div className="absolute top-4 right-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
          ✦ ✧ ✦
        </div>

        {/* Section Header Badge */}
        <div className="pt-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A0E17]/5 border border-[#D4AF37]/50 text-[#4A0E17] text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.22em] sm:tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-[#C89D2B]" />
            Save The Blessed Date
            <Sparkles className="w-3 h-3 text-[#C89D2B]" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] mt-2 text-gold-shimmer-sweep">
            The Auspicious Union
          </h2>
        </div>

        {/* Ornate Gold Star Divider */}
        <div className="flex items-center justify-center gap-2 my-3 text-[#C89D2B]" aria-hidden="true">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-xs">✦ ✧ ✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Interactive Scratch Card */}
        <ScratchCard />

        {/* Real-time Countdown Timer */}
        <CountdownTimer />
      </div>
    </motion.section>
  );
};
