import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const AudioPlayer: React.FC = () => {
  const { isPlaying, isMuted, toggleMute, togglePlay } = useAudio();

  const isAudioActive = isPlaying && !isMuted;

  const handleToggle = () => {
    if (!isPlaying) {
      togglePlay();
    } else {
      toggleMute();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 select-none">
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="backdrop-blur-md bg-white/85 border border-[#D4AF37]/50 shadow-md px-3 py-1.5 rounded-full flex items-center gap-2 text-burgundy hover:bg-white hover:border-[#D4AF37] transition-all duration-300 group cursor-pointer"
        aria-label={isAudioActive ? 'Mute Background Music' : 'Play Background Music'}
        title={isAudioActive ? 'Mute Music' : 'Play Music'}
      >
        {isAudioActive ? (
          <Volume2 className="w-4 h-4 text-gold-dark group-hover:text-burgundy transition-colors" />
        ) : (
          <VolumeX className="w-4 h-4 text-slateBurgundy/70 group-hover:text-burgundy transition-colors" />
        )}

        {/* 4-bar Animated Equalizer Wave */}
        <div className="flex items-end gap-[2px] h-3.5 w-3.5" aria-hidden="true">
          <span
            className={`w-[2px] bg-gradient-to-t from-gold-dark to-gold-light rounded-full transition-all duration-300 ${
              isAudioActive ? 'animate-pulse h-3' : 'h-1 opacity-40'
            }`}
            style={{ animationDelay: '0ms' }}
          />
          <span
            className={`w-[2px] bg-gradient-to-t from-gold-dark to-gold-light rounded-full transition-all duration-300 ${
              isAudioActive ? 'animate-pulse h-3.5' : 'h-1.5 opacity-40'
            }`}
            style={{ animationDelay: '150ms' }}
          />
          <span
            className={`w-[2px] bg-gradient-to-t from-gold-dark to-gold-light rounded-full transition-all duration-300 ${
              isAudioActive ? 'animate-pulse h-2' : 'h-1 opacity-40'
            }`}
            style={{ animationDelay: '300ms' }}
          />
          <span
            className={`w-[2px] bg-gradient-to-t from-gold-dark to-gold-light rounded-full transition-all duration-300 ${
              isAudioActive ? 'animate-pulse h-3' : 'h-1.5 opacity-40'
            }`}
            style={{ animationDelay: '200ms' }}
          />
        </div>

        <span className="text-[11px] font-serif font-bold tracking-wider text-burgundy pr-0.5">
          {isAudioActive ? 'Music On' : 'Music Off'}
        </span>
      </motion.button>
    </div>
  );
};
