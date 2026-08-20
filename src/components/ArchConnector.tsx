import React from 'react';
import { motion } from 'framer-motion';

export const ArchConnector: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.8 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center my-6 sm:my-8 select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Top Vertical Glowing Line */}
      <span className="w-[1.5px] h-7 sm:h-9 bg-gradient-to-b from-transparent via-[#D4AF37]/80 to-[#D4AF37]" />

      {/* Ornate Gold Star Medallion */}
      <div className="flex items-center gap-2 py-1 text-[#C89D2B]">
        <span className="text-[10px] text-[#D4AF37]/70">✦</span>
        <div className="w-5 h-5 rounded-full bg-white/90 border border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)] flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#4A0E17]">✧</span>
        </div>
        <span className="text-[10px] text-[#D4AF37]/70">✦</span>
      </div>

      {/* Bottom Vertical Glowing Line */}
      <span className="w-[1.5px] h-7 sm:h-9 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/80 to-transparent" />
    </motion.div>
  );
};
