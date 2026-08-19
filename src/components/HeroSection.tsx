import React from 'react';
import { motion } from 'framer-motion';
import { ScratchCard } from './ScratchCard';
import { CountdownTimer } from './CountdownTimer';
import { Heart } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSection: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="relative pt-8 sm:pt-12 pb-6 px-1 max-w-md mx-auto text-center z-10"
    >
      {/* Card 1: Sacred Inscription & Couple Hero + Date & Countdown */}
      <motion.div
        variants={itemVariants}
        className="relative p-6 sm:p-8 rounded-t-[48px] rounded-b-[28px] bg-white/95 backdrop-blur-md border border-gold/45 shadow-card-royal overflow-hidden"
      >
        {/* Subtle Ornamental Corner Accents */}
        <div className="absolute top-4 left-4 text-gold text-xs select-none opacity-75">✦ ✧ ✦</div>
        <div className="absolute top-4 right-4 text-gold text-xs select-none opacity-75">✦ ✧ ✦</div>

        {/* Sacred Calligraphy Header */}
        <motion.div
          variants={itemVariants}
          className="mb-6 pt-2"
          style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }}
        >
          <div className="font-arabic text-3xl sm:text-4xl text-burgundy font-bold tracking-wide select-none">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <p className="text-xs font-serif italic text-slateBurgundy mt-2 tracking-wide">
            "In the name of Allah, the Most Gracious, the Most Merciful"
          </p>
        </motion.div>

        {/* Quranic Marriage Blessing Card */}
        <motion.div
          variants={itemVariants}
          className="my-5 py-3.5 px-4 rounded-2xl bg-pearl-light/70 border border-gold/25 shadow-sm"
        >
          <p className="text-xs font-serif italic text-slateBurgundy leading-relaxed">
            "And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them; and He placed between you affection and mercy."
          </p>
          <span className="block text-[10px] uppercase tracking-widest text-gold-dark font-sans mt-2 font-bold">
            — Surah Ar-Rum [30:21]
          </span>
        </motion.div>

        {/* Formal Invitation Line */}
        <motion.p
          variants={itemVariants}
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-burgundy-secondary font-sans font-bold mt-7 mb-3"
        >
          Cordially Request The Honor Of Your Presence At The Wedding Of
        </motion.p>

        {/* Couple Names with Generous Breathing Space */}
        <motion.div variants={itemVariants} className="my-6 space-y-2.5">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-gold-shimmer-sweep">
            Sheima Baig
          </h1>

          <div className="flex items-center justify-center gap-3 my-2 text-gold">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-gold" />
            <div className="w-6 h-6 rounded-full bg-burgundy/10 border border-gold/50 flex items-center justify-center shadow-sm">
              <Heart className="w-3 h-3 fill-gold text-gold" />
            </div>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-gold-shimmer-sweep">
            Sabir Baig
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xs font-serif italic text-slateBurgundy max-w-xs mx-auto mb-6 leading-relaxed"
        >
          As they unite in sacred Nikah under the grace of the Almighty, surrounded by family, love, and prayers.
        </motion.p>

        {/* Card 2 Embedded: Clean Isolated Scratch Card */}
        <motion.div variants={itemVariants}>
          <ScratchCard />
        </motion.div>

        {/* Independent Live Countdown Timer */}
        <motion.div variants={itemVariants}>
          <CountdownTimer />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
