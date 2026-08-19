/**
 * AudioManager handles ambient wedding music playback for /audio-bg.mp3
 */

type AudioListener = (isPlaying: boolean, isMuted: boolean) => void;

class AudioManager {
  private audioElement: HTMLAudioElement | null = null;
  private isPlayingState = false;
  private isMutedState = false;
  private listeners: Set<AudioListener> = new Set();
  private wasPlayingBeforeHidden = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    try {
      this.audioElement = new Audio('/audio-bg.mp3');
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';
      this.audioElement.volume = 0.5;

      this.audioElement.addEventListener('play', () => {
        this.isPlayingState = true;
        this.notifyListeners();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlayingState = false;
        this.notifyListeners();
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlayingState = false;
        this.notifyListeners();
      });

      // Visibility change safeguard
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.audioElement && !this.audioElement.paused) {
            this.wasPlayingBeforeHidden = true;
            this.audioElement.pause();
          }
        } else {
          if (this.wasPlayingBeforeHidden && this.audioElement) {
            this.wasPlayingBeforeHidden = false;
            this.audioElement.play().catch((err) => {
              console.warn('Audio resume interrupted:', err);
            });
          }
        }
      });
    } catch (err) {
      console.warn('Audio element initialization error:', err);
    }
  }

  public addListener(listener: AudioListener) {
    this.listeners.add(listener);
    listener(this.isPlayingState, this.isMutedState);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isPlayingState, this.isMutedState));
  }

  public async play(): Promise<boolean> {
    if (!this.audioElement) {
      this.initAudioElement();
    }
    if (this.audioElement) {
      try {
        this.audioElement.muted = this.isMutedState;
        this.audioElement.volume = 0.5;
        await this.audioElement.play();
        this.isPlayingState = true;
        this.notifyListeners();
        return true;
      } catch (err) {
        console.warn('Audio play error:', err);
        return false;
      }
    }
    return false;
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.isPlayingState = false;
    this.notifyListeners();
  }

  public toggle(): boolean {
    if (this.isPlayingState) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public toggleMute(): boolean {
    this.isMutedState = !this.isMutedState;
    if (this.audioElement) {
      this.audioElement.muted = this.isMutedState;
      if (!this.isMutedState && this.audioElement.paused) {
        this.audioElement.play().catch((err) => console.warn('Unmute play error:', err));
      }
    }
    this.notifyListeners();
    return this.isMutedState;
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public isMuted(): boolean {
    return this.isMutedState;
  }
}

export const audioManager = new AudioManager();
