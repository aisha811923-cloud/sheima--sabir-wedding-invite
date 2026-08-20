import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { cardEntranceVariants } from './HeroSection';

export const FamilyBlessings: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={cardEntranceVariants}
      className="relative z-10 w-full"
    >
      {/* Island Card 3: Family Honors & Heavenly Blessings */}
      <div className="relative p-6 sm:p-8 rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl bg-white/95 backdrop-blur-sm border-[1.5px] border-[#D4AF37]/50 shadow-[0_18px_45px_rgba(74,14,23,0.08)] text-center space-y-6 overflow-hidden">
        {/* Ornamental Gold Corner Accents */}
        <div className="absolute top-4 left-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
          ✦ ✧ ✦
        </div>
        <div className="absolute top-4 right-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
          ✦ ✧ ✦
        </div>

        {/* Section Header */}
        <div className="pt-2">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#6D1A27] font-sans font-bold block mb-1">
            Family Honors & Lineage
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
            With Heavenly Blessings & Love
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-[#C89D2B]" aria-hidden="true">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-xs">✦ ✧ ✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* Top Feature: Late Wahid Baig (Dada Ji) */}
        <div className="p-5 rounded-2xl bg-[#FFF9F2] border border-[#D4AF37]/40 shadow-sm text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A0E17]/5 border border-[#D4AF37]/40 text-[#4A0E17] text-[10px] sm:text-[11px] font-serif italic mb-2">
            <Sparkles className="w-3 h-3 text-[#C89D2B]" />
            Heavenly Blessings & In Loving Memory
            <Sparkles className="w-3 h-3 text-[#C89D2B]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] mt-1">
            Late Wahid Baig <span className="text-sm sm:text-base font-normal text-[#6D1A27]">(Dada Ji)</span>
          </h3>
          <p className="text-xs sm:text-sm font-normal text-[#241416] mt-2 leading-relaxed italic">
            "Whose pious prayers, wisdom, and guiding light forever bless our lives and family."
          </p>
        </div>

        {/* Ornate Star Divider */}
        <div className="flex items-center justify-center gap-3 text-[#C89D2B] opacity-85 my-2" aria-hidden="true">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-sm">✦ ✧ ✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Parents Honors */}
        <div className="space-y-4">
          {/* Bride's Parents */}
          <div className="p-5 rounded-2xl bg-white border border-[#D4AF37]/35 shadow-sm text-center">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6D1A27] font-sans font-bold mb-1 block">
              Bride's Parents
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#4A0E17]">
              Shaheen Baig & Shabnam Baig
            </h4>
            <p className="text-xs sm:text-sm font-normal text-[#241416] mt-1.5 leading-relaxed">
              Cordially invite you to celebrate the wedding of their beloved daughter <strong className="text-[#4A0E17] font-bold">Sheima</strong>.
            </p>
          </div>

          {/* Groom's Parents */}
          <div className="p-5 rounded-2xl bg-white border border-[#D4AF37]/35 shadow-sm text-center">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6D1A27] font-sans font-bold mb-1 block">
              Groom's Parents
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#4A0E17]">
              Shahid Baig & Shahida Baig
            </h4>
            <p className="text-xs sm:text-sm font-normal text-[#241416] mt-1.5 leading-relaxed">
              Cordially invite you to celebrate the wedding of their beloved son <strong className="text-[#4A0E17] font-bold">Sabir</strong>.
            </p>
          </div>
        </div>

        {/* Bottom Closing Compliments */}
        <div className="pt-2">
          <p className="text-xs sm:text-sm font-normal text-[#241416] flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#C89D2B] fill-[#C89D2B]/40" />
            <span>
              With best compliments from the <strong className="text-[#4A0E17] font-bold">Baig Family & Relatives</strong>.
            </span>
            <Heart className="w-3.5 h-3.5 text-[#C89D2B] fill-[#C89D2B]/40" />
          </p>
        </div>
      </div>
    </motion.section>
  );
};
