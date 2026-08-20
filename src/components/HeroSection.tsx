import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

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
      {/* Island Card 1: Sacred Inscription & Couple Hero with p-5 sm:p-7 padding */}
      <div className="relative p-5 sm:p-7 rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl bg-white/95 backdrop-blur-sm border-[1.5px] border-[#D4AF37]/50 shadow-[0_18px_45px_rgba(74,14,23,0.08)] text-center overflow-hidden">
        {/* Ornamental Gold Corner Filigree */}
        <div className="absolute top-4 left-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
          ✦ ✧ ✦
        </div>
        <div className="absolute top-4 right-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
          ✦ ✧ ✦
        </div>

        {/* Sacred Calligraphy Header */}
        <div className="pt-2 mb-4 space-y-1.5">
          <div className="font-arabic text-2xl sm:text-3xl text-[#4A0E17] font-bold tracking-wide select-none drop-shadow-[0_1px_2px_rgba(74,14,23,0.15)]">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#6D1A27] tracking-wide leading-relaxed">
            "In the name of Allah, the Most Gracious, the Most Merciful"
          </p>
        </div>

        {/* Ornate Gold Star Divider */}
        <div className="flex items-center justify-center gap-2 my-4 text-[#C89D2B]" aria-hidden="true">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-xs">✦ ✧ ✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Quranic Verse Box (Surah Ar-Rum 30:21) */}
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-[#FFF9F2] border border-[#D4AF37]/35 shadow-sm text-center space-y-2">
          <p className="font-arabic text-base sm:text-lg text-[#4A0E17] font-medium leading-loose" dir="rtl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="text-xs sm:text-sm font-normal text-[#241416] leading-relaxed italic">
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
          </p>
          <span className="block text-[10px] sm:text-[11px] uppercase tracking-widest text-[#C89D2B] font-sans font-bold pt-1">
            — Surah Ar-Rum [30:21]
          </span>
        </div>

        {/* Formal Invitation Line */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#6D1A27] font-sans font-bold mt-6 mb-3 leading-relaxed">
          Together with their families, cordially invite you to celebrate the joyous union of their wedding
        </p>

        {/* Couple Names with Ample Spatial Breathing Room (my-2 with py-1) */}
        <div className="my-2 py-1 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#4A0E17] text-gold-shimmer-sweep leading-tight">
            Sheima Baig
          </h1>

          <div className="flex items-center justify-center gap-3 my-2 text-[#D4AF37]" aria-hidden="true">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-7 h-7 rounded-full bg-[#4A0E17]/10 border border-[#D4AF37]/60 flex items-center justify-center shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            </div>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#4A0E17] text-gold-shimmer-sweep leading-tight">
            Sabir Baig
          </h1>
        </div>

        {/* Warm Blessings Note */}
        <p className="text-xs sm:text-sm font-normal text-[#241416] max-w-xs mx-auto leading-relaxed mt-4 mb-2 italic">
          "As they unite in sacred Nikah under the grace of the Almighty, surrounded by family, love, and prayers."
        </p>
      </div>
    </motion.section>
  );
};
