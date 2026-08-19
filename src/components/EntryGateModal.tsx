import React, { useState, useRef } from 'react';
import { useAudio } from '../context/AudioContext';
import { Sparkles } from 'lucide-react';

interface EntryGateModalProps {
  onOpen: () => void;
}

export const EntryGateModal: React.FC<EntryGateModalProps> = ({ onOpen }) => {
  const { primeAudio, startAudio } = useAudio();
  const [hasStarted, setHasStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasTriggeredRevealRef = useRef(false);

  const handleScreenTap = async () => {
    if (hasStarted) return;
    setHasStarted(true);

    // 1. Prime/unlock audio element within active user gesture (without loud premature playback)
    primeAudio();

    // 2. Play unboxing envelope video
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        await videoRef.current.play();
      } catch {
        try {
          if (videoRef.current) {
            videoRef.current.muted = true;
            await videoRef.current.play();
          }
        } catch (err) {
          console.warn('Video playback error:', err);
        }
      }
    }

    // 3. Trigger transition & start background audio right at the golden flare burst (~5.2s)
    setTimeout(() => {
      triggerRevealAndAudio();
    }, 5200);
  };

  const triggerRevealAndAudio = () => {
    if (hasTriggeredRevealRef.current) return;
    hasTriggeredRevealRef.current = true;

    // Start background audio with soft 1-second fade-in right when the invitation is revealed
    startAudio(true).catch((err) => console.warn('Background audio start error:', err));

    setIsFadingOut(true);
    setTimeout(() => {
      setIsDismissed(true);
      onOpen();
    }, 1000);
  };

  const handleVideoEnded = () => {
    triggerRevealAndAudio();
  };

  if (isDismissed) return null;

  return (
    <div
      onClick={handleScreenTap}
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center cursor-pointer select-none bg-black transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Fullscreen 9:16 Unboxing Video */}
      <video
        ref={videoRef}
        src="/entry-video.mp4"
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Subtle Vignette Shadows */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      {/* Top Header Subtle Islamic Inscription */}
      <div className="relative z-10 pt-10 text-center pointer-events-none">
        <span className="font-arabic text-xl sm:text-2xl text-gold-light/90 drop-shadow-md">
          ﷽
        </span>
      </div>

      {/* Minimal Elegant Bottom Prompt (Only before tapping) */}
      {!hasStarted && (
        <div className="relative z-10 pb-12 sm:pb-16 flex flex-col items-center gap-3 animate-pulseSubtle px-4 text-center">
          {/* Glowing Wax Seal Icon Button */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-gold-dark via-gold-primary to-gold-light p-[2px] shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-burgundy flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-gold-light animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>

          <div className="px-6 py-2.5 rounded-full bg-burgundy/80 backdrop-blur-md border border-gold/60 shadow-gold-glow">
            <p className="text-xs sm:text-sm font-serif font-semibold tracking-widest uppercase text-gold-light drop-shadow">
              ✨ Tap anywhere to open invitation ✨
            </p>
          </div>
        </div>
      )}

      {/* Skip Button after video starts playing */}
      {hasStarted && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            triggerRevealAndAudio();
          }}
          className="absolute bottom-8 right-6 z-20 px-4 py-2 rounded-full bg-burgundy/85 backdrop-blur-md border border-gold/40 text-gold-light text-xs font-sans tracking-widest uppercase hover:bg-burgundy hover:text-white transition-all shadow-lg cursor-pointer"
        >
          Skip to Invite →
        </button>
      )}
    </div>
  );
};
