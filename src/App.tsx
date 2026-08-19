import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import { ParticleCanvas } from './components/ParticleCanvas';
import { LatkanTassels } from './components/LatkanTassels';
import { AudioPlayer } from './components/AudioPlayer';
import { EntryGateModal } from './components/EntryGateModal';
import { HeroSection } from './components/HeroSection';
import { FamilyBlessings } from './components/FamilyBlessings';
import { EventCard } from './components/EventCard';
import { RsvpForm } from './components/RsvpForm';
import { Heart, ArrowUp, Send, Sparkles } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [hasOpenedGate, setHasOpenedGate] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-charcoal overflow-x-hidden font-sans selection:bg-burgundy selection:text-pearl">
      {/* Fullscreen 60fps Background Canvas with Falling 3D Rose Petals & Gold Dust */}
      <ParticleCanvas />

      {/* Swaying Hanging Gold Latkan Tassels in Top Corners */}
      <LatkanTassels />

      {/* Screen 1: Opening Unboxing Envelope Video Gate Modal */}
      {!hasOpenedGate && (
        <EntryGateModal onOpen={() => setHasOpenedGate(true)} />
      )}

      {/* Top-Right Floating Audio Pill with Animated 4-Bar Equalizer Wave */}
      <AudioPlayer />

      {/* Main 5-Card Luxury Story Layout (max-w-md mx-auto px-5 with space-y-20) */}
      <main className="relative z-10 container mx-auto px-5 py-6 max-w-md space-y-20">
        {/* Card 1 & Card 2: Sacred Inscription, Couple Hero, Isolated Scratch Date & Live Countdown */}
        <HeroSection />

        {/* Card 3: Family Honors & Heavenly Blessings (Single Arched Card) */}
        <FamilyBlessings />

        {/* Card 4: The Ceremonies (Haldi 23 Dec & Barat 26 Dec with Exact GPS Pin) */}
        <EventCard />

        {/* Card 5: Minimal RSVP Form */}
        <RsvpForm />

        {/* Royal Islamic Footer */}
        <footer className="py-16 px-2 text-center border-t border-gold/35">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-gold/50 flex items-center justify-center bg-burgundy/5 text-gold-dark shadow-sm">
            <Sparkles className="w-5 h-5 text-gold" />
          </div>

          <div className="font-arabic text-2xl text-burgundy font-bold mb-1">
            جَزَاكُمُ اللَّهُ خَيْرًا
          </div>
          <p className="text-xs font-serif italic text-slateBurgundy mb-3">
            "May Allah reward you abundantly with goodness"
          </p>

          <h3 className="text-2xl font-serif font-bold text-burgundy tracking-wide text-gold-shimmer-sweep">
            Sheima Baig & Sabir Baig
          </h3>
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-bold mt-1">
            Saturday, 26 December 2026
          </p>

          <p className="text-xs font-serif italic text-slateBurgundy mt-3 max-w-xs mx-auto leading-relaxed">
            "Your gracious presence, love, and prayers are our greatest blessings. We look forward to celebrating with you."
          </p>

          <div className="flex items-center justify-center gap-2 my-5 text-gold">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-gold" />
            <Heart className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <p className="text-xs font-serif text-slateBurgundy">
            With best compliments from the <strong className="text-burgundy">Baig Family & Relatives</strong>
          </p>
        </footer>
      </main>

      {/* Floating Bottom Quick-Action Bar */}
      <nav
        aria-label="Quick Actions"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy/90 backdrop-blur-md border border-gold/50 shadow-gold-glow text-pearl text-xs font-serif"
      >
        <a
          href="#rsvp"
          className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-gold-light"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="font-bold uppercase tracking-wider text-[11px]">RSVP</span>
        </a>

        <span className="text-gold/40">|</span>

        <button
          onClick={scrollToTop}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-pearl/80 hover:text-white cursor-pointer"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </nav>
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
