import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  primeAudio: () => void;
  startAudio: (fadeIn?: boolean) => Promise<void>;
  pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AUDIO_SRC = '/audio-bg.mp3';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const wasPlayingBeforeHiddenRef = useRef<boolean>(false);
  const fadeIntervalRef = useRef<number | null>(null);

  // Initialize single persistent HTML5 audio element
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.5;

    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Tab visibility handling: pause when tab is hidden, resume when active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current && !audioRef.current.paused) {
          wasPlayingBeforeHiddenRef.current = true;
          audioRef.current.pause();
        }
      } else {
        if (wasPlayingBeforeHiddenRef.current && audioRef.current) {
          wasPlayingBeforeHiddenRef.current = false;
          audioRef.current.play().catch((err) => {
            console.warn('Audio resume after visibility change interrupted:', err);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (fadeIntervalRef.current !== null) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Prime / unlock audio element on initial user gesture (keeps muted/paused until reveal)
  const primeAudio = useCallback(() => {
    if (!audioRef.current) return;
    try {
      audioRef.current.load();
    } catch (err) {
      console.warn('Audio prime warning:', err);
    }
  }, []);

  // Start background music with soft 1-second volume fade-in from 0 to 0.5
  const startAudio = useCallback(
    async (fadeIn: boolean = true) => {
      if (!audioRef.current) return;

      if (fadeIntervalRef.current !== null) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      try {
        audioRef.current.muted = isMuted;

        if (fadeIn && !isMuted) {
          audioRef.current.volume = 0.05;
          await audioRef.current.play();
          setIsPlaying(true);

          let currentVol = 0.05;
          const targetVol = 0.5;
          const step = 0.05;
          const intervalMs = 100; // 10 steps = 1000ms = 1s

          fadeIntervalRef.current = window.setInterval(() => {
            if (!audioRef.current) {
              if (fadeIntervalRef.current !== null) clearInterval(fadeIntervalRef.current);
              return;
            }
            currentVol += step;
            if (currentVol >= targetVol) {
              audioRef.current.volume = targetVol;
              if (fadeIntervalRef.current !== null) {
                clearInterval(fadeIntervalRef.current);
                fadeIntervalRef.current = null;
              }
            } else {
              audioRef.current.volume = currentVol;
            }
          }, intervalMs);
        } else {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.warn('Audio play failed:', error);
      }
    },
    [isMuted]
  );

  // Pause audio
  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio(false);
    }
  }, [isPlaying, pauseAudio, startAudio]);

  // Toggle mute/unmute
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && audioRef.current.paused) {
      audioRef.current.play().catch((err) => console.warn('Unmute play error:', err));
    }
  }, [isMuted]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        togglePlay,
        toggleMute,
        primeAudio,
        startAudio,
        pauseAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
