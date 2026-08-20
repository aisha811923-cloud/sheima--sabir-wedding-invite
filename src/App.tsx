import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import { ParticleCanvas } from './components/ParticleCanvas';
import { LatkanTassels } from './components/LatkanTassels';
import { AudioPlayer } from './components/AudioPlayer';
import { EntryGateModal } from './components/EntryGateModal';
import { HeroSection } from './components/HeroSection';
import { DateCountdownSection } from './components/DateCountdownSection';
import { FamilyBlessings } from './components/FamilyBlessings';
import { EventCard } from './components/EventCard';
import { RsvpForm } from './components/RsvpForm';
import { ArchConnector } from './components/ArchConnector';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const AppContent: React.FC = () => {
  const [hasOpenedGate, setHasOpenedGate] = useState(false);

  return (
    <div className="relative min-h-screen text-[#1F1617] overflow-x-hidden font-sans selection:bg-[#4A0E17] selection:text-[#FAF0E4]">
      {/* Fixed Fullscreen 60fps Ambient Particles (Petals & Gold Sparkles over cards) */}
      <ParticleCanvas />

      {/* Swaying Hanging Gold Latkan Tassels in Top Corners */}
      <LatkanTassels />

      {/* Screen 0: Opening Unboxing Envelope Video Gate Modal */}
      {!hasOpenedGate && (
        <EntryGateModal onOpen={() => setHasOpenedGate(true)} />
      )}

      {/* Top-Right Floating Frosted Glass Audio Pill */}
      <AudioPlayer />

      {/* Main Mughal Mihrab Arch Island Suite Layout (max-w-[440px] mx-auto px-4 sm:px-6) */}
      <main className="relative z-10 w-full max-w-[440px] mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Island Card 1: Sacred Inscription & Couple Hero */}
        <HeroSection />

        <ArchConnector />

        {/* Island Card 2: Interactive Date Reveal & Countdown */}
        <DateCountdownSection />

        <ArchConnector />

        {/* Island Card 3: Family Honors & Heavenly Blessings */}
        <FamilyBlessings />

        <ArchConnector />

        {/* Island Cards 4A (Haldi) & 4B (Barat with GPS Pin) */}
        <EventCard />

        <ArchConnector />

        {/* Island Card 5: Minimalist RSVP Form & Dua */}
        <RsvpForm />

        <ArchConnector />

        {/* Royal Islamic Footer Arched Card */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="relative p-6 sm:p-8 rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl bg-white/95 backdrop-blur-sm border-[1.5px] border-[#D4AF37]/50 shadow-[0_18px_45px_rgba(74,14,23,0.08)] text-center overflow-hidden"
        >
          {/* Corner Star Filigree */}
          <div className="absolute top-4 left-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
            ✦ ✧ ✦
          </div>
          <div className="absolute top-4 right-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
            ✦ ✧ ✦
          </div>

          <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#4A0E17]/5 text-[#C89D2B] shadow-sm">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>

          <div className="font-arabic text-2xl sm:text-3xl text-[#4A0E17] font-bold mb-1">
            جَزَاكُمُ اللَّهُ خَيْرًا
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-[#6D1A27] mb-4">
            "May Allah reward you abundantly with goodness"
          </p>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] tracking-wide text-gold-shimmer-sweep">
            Sheima Baig & Sabir Baig
          </h3>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#C89D2B] font-bold mt-1 font-sans">
            Saturday, 26 December 2026
          </p>

          <p className="text-xs sm:text-sm font-normal text-[#241416] mt-3.5 max-w-xs mx-auto leading-relaxed italic">
            "Your gracious presence, love, and prayers are our greatest blessings. We look forward to celebrating with you."
          </p>

          <div className="flex items-center justify-center gap-2 my-5 text-[#D4AF37]" aria-hidden="true">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <p className="text-xs sm:text-sm font-normal text-[#241416]">
            With best compliments from the <strong className="text-[#4A0E17] font-bold">Baig Family & Relatives</strong>
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
};
