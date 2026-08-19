import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const FamilyBlessings: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="py-6 px-1 max-w-md mx-auto z-10 relative"
    >
      {/* Card 3: Family Honors & Heavenly Blessings */}
      <motion.div
        variants={itemVariants}
        className="p-6 sm:p-8 rounded-t-[48px] rounded-b-[28px] bg-white/95 backdrop-blur-md border border-gold/40 shadow-xl text-center space-y-7"
      >
        {/* Header Label */}
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-burgundy font-sans font-bold block mb-1">
            Family Honors & Lineage
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy">
            With Heavenly Blessings & Love
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-gold">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs">✦ ✧ ✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* Top: Late Wahid Baig (Dada Ji) */}
        <div className="p-5 rounded-2xl bg-pearl-light/75 border border-gold/30">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy/5 border border-gold/35 text-gold-dark text-[10px] sm:text-[11px] font-serif italic mb-2">
            <Sparkles className="w-3 h-3 text-gold" />
            Heavenly Blessings & In Everlasting Memory
            <Sparkles className="w-3 h-3 text-gold" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy mt-1">
            Late Wahid Baig <span className="text-base font-normal text-slateBurgundy">(Dada Ji)</span>
          </h3>
          <p className="text-xs font-serif italic text-slateBurgundy mt-2 leading-relaxed">
            Whose pious prayers, wisdom, and guiding light forever bless our lives and family.
          </p>
        </div>

        {/* Ornate Gold Divider */}
        <div className="flex items-center justify-center gap-3 text-gold opacity-80 my-2">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-sm">✦ ✧ ✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Middle: Parents Details */}
        <div className="space-y-4">
          {/* Bride's Parents */}
          <div className="p-5 rounded-2xl bg-white border border-gold/30 shadow-sm text-center">
            <span className="text-[10px] uppercase tracking-widest text-gold-dark font-sans font-bold mb-1 block">
              Bride's Parents
            </span>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-burgundy">
              Shaheen Baig & Shabnam Baig
            </h4>
            <p className="text-xs font-serif italic text-slateBurgundy mt-1.5 leading-relaxed">
              Cordially invite you to celebrate the wedding of their beloved daughter <strong className="text-burgundy">Sheima</strong>.
            </p>
          </div>

          {/* Groom's Parents */}
          <div className="p-5 rounded-2xl bg-white border border-gold/30 shadow-sm text-center">
            <span className="text-[10px] uppercase tracking-widest text-gold-dark font-sans font-bold mb-1 block">
              Groom's Parents
            </span>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-burgundy">
              Shahid Baig & Shahida Baig
            </h4>
            <p className="text-xs font-serif italic text-slateBurgundy mt-1.5 leading-relaxed">
              Cordially invite you to celebrate the wedding of their beloved son <strong className="text-burgundy">Sabir</strong>.
            </p>
          </div>
        </div>

        {/* Bottom: Best Compliments */}
        <div className="pt-1">
          <p className="text-xs font-serif italic text-slateBurgundy flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-gold-dark fill-gold-dark/40" />
            <span>
              Cordially invited with best compliments from the <strong className="text-burgundy font-semibold">Baig Family & Relatives</strong>.
            </span>
            <Heart className="w-3.5 h-3.5 text-gold-dark fill-gold-dark/40" />
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};
