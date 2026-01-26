"use client";

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AIState } from "./state-indicator";

// ==============================================
// SOUND MANAGER - Audio feedback system
// Generates synthetic sounds using Web Audio API
// ==============================================

interface SoundContextType {
  playSound: (type: SoundType) => void;
  playStateSound: (state: AIState) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  volume: number;
  isMuted: boolean;
}

type SoundType =
  | "activate"
  | "deactivate"
  | "listening"
  | "thinking"
  | "speaking"
  | "complete"
  | "error"
  | "click"
  | "hover";

const SoundContext = createContext<SoundContextType | null>(null);

export function useSounds() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSounds must be used within a SoundProvider");
  }
  return context;
}

interface SoundProviderProps {
  children: ReactNode;
  defaultVolume?: number;
  defaultMuted?: boolean;
}

export function SoundProvider({
  children,
  defaultVolume = 0.3,
  defaultMuted = false,
}: SoundProviderProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [volume, setVolumeState] = useState(defaultVolume);
  const [isMuted, setIsMuted] = useState(defaultMuted);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const createOscillator = useCallback(
    (
      ctx: AudioContext,
      frequency: number,
      type: OscillatorType,
      duration: number,
      gainValue: number,
      delay: number = 0
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(
        gainValue * volume,
        ctx.currentTime + delay + 0.02
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + delay + duration
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    },
    [volume]
  );

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMuted) return;

      try {
        const ctx = getAudioContext();

        switch (type) {
          case "activate": {
            // Rising arpeggio - cyan feeling
            createOscillator(ctx, 440, "sine", 0.15, 0.3, 0);
            createOscillator(ctx, 554, "sine", 0.15, 0.25, 0.05);
            createOscillator(ctx, 659, "sine", 0.2, 0.2, 0.1);
            createOscillator(ctx, 880, "sine", 0.3, 0.15, 0.15);
            break;
          }

          case "deactivate": {
            // Falling tone
            createOscillator(ctx, 659, "sine", 0.15, 0.2, 0);
            createOscillator(ctx, 440, "sine", 0.2, 0.15, 0.08);
            createOscillator(ctx, 330, "sine", 0.25, 0.1, 0.15);
            break;
          }

          case "listening": {
            // Soft pulse - attention
            createOscillator(ctx, 600, "sine", 0.1, 0.2, 0);
            createOscillator(ctx, 800, "sine", 0.08, 0.15, 0.05);
            break;
          }

          case "thinking": {
            // Mysterious shimmer - magenta feeling
            createOscillator(ctx, 350, "triangle", 0.3, 0.15, 0);
            createOscillator(ctx, 466, "triangle", 0.25, 0.12, 0.1);
            createOscillator(ctx, 523, "sine", 0.2, 0.1, 0.15);
            break;
          }

          case "speaking": {
            // Warm confirmation - amber feeling
            createOscillator(ctx, 523, "sine", 0.12, 0.2, 0);
            createOscillator(ctx, 659, "sine", 0.15, 0.15, 0.03);
            break;
          }

          case "complete": {
            // Success chime
            createOscillator(ctx, 523, "sine", 0.15, 0.25, 0);
            createOscillator(ctx, 659, "sine", 0.15, 0.2, 0.08);
            createOscillator(ctx, 784, "sine", 0.2, 0.18, 0.15);
            createOscillator(ctx, 1047, "sine", 0.3, 0.12, 0.22);
            break;
          }

          case "error": {
            // Dissonant warning
            createOscillator(ctx, 200, "sawtooth", 0.15, 0.2, 0);
            createOscillator(ctx, 207, "sawtooth", 0.15, 0.18, 0);
            createOscillator(ctx, 180, "square", 0.2, 0.1, 0.1);
            break;
          }

          case "click": {
            // Subtle tap
            createOscillator(ctx, 800, "sine", 0.05, 0.15, 0);
            break;
          }

          case "hover": {
            // Very soft blip
            createOscillator(ctx, 1200, "sine", 0.03, 0.08, 0);
            break;
          }
        }
      } catch {
        // Audio context may not be available
        console.warn("Audio not available");
      }
    },
    [isMuted, getAudioContext, createOscillator]
  );

  const playStateSound = useCallback(
    (state: AIState) => {
      const stateToSound: Record<AIState, SoundType> = {
        idle: "deactivate",
        listening: "listening",
        thinking: "thinking",
        speaking: "speaking",
        error: "error",
      };
      playSound(stateToSound[state]);
    },
    [playSound]
  );

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(1, vol)));
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted);
  }, []);

  return (
    <SoundContext.Provider
      value={{
        playSound,
        playStateSound,
        setVolume,
        setMuted,
        volume,
        isMuted,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

// ==============================================
// SOUND CONTROL COMPONENT
// ==============================================

interface SoundControlProps {
  className?: string;
}

export function SoundControl({ className }: SoundControlProps) {
  const { volume, isMuted, setVolume, setMuted, playSound } = useSounds();

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => {
          setMuted(!isMuted);
          if (isMuted) playSound("click");
        }}
        className="p-2 rounded-lg glass-surface hover:bg-secondary/30 transition-colors"
        aria-label={isMuted ? "Activer le son" : "Desactiver le son"}
      >
        {isMuted ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      {!isMuted && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
          className="w-20 h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          aria-label="Volume"
        />
      )}
    </div>
  );
}
