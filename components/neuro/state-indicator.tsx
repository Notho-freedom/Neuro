"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ==============================================
// STATE INDICATOR - Visual AI state representation
// Shows: idle, listening, thinking, speaking, error
// ==============================================

export type AIState = "idle" | "listening" | "thinking" | "speaking" | "error";

interface StateIndicatorProps {
  state: AIState;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  className?: string;
}

const stateConfig: Record<
  AIState,
  {
    label: string;
    color: string;
    bgColor: string;
    animation: string;
  }
> = {
  idle: {
    label: "En veille",
    color: "text-state-idle",
    bgColor: "bg-state-idle",
    animation: "",
  },
  listening: {
    label: "Ecoute...",
    color: "text-state-listening",
    bgColor: "bg-state-listening",
    animation: "animate-neuro-pulse",
  },
  thinking: {
    label: "Reflexion...",
    color: "text-state-thinking",
    bgColor: "bg-state-thinking",
    animation: "animate-neuro-thinking",
  },
  speaking: {
    label: "Reponse",
    color: "text-state-speaking",
    bgColor: "bg-state-speaking",
    animation: "animate-neuro-pulse",
  },
  error: {
    label: "Erreur",
    color: "text-state-error",
    bgColor: "bg-state-error",
    animation: "",
  },
};

const sizeConfig: Record<
  "sm" | "md" | "lg" | "xl",
  {
    container: string;
    core: string;
    rings: string[];
    label: string;
  }
> = {
  sm: {
    container: "w-8 h-8",
    core: "w-3 h-3",
    rings: ["w-5 h-5", "w-7 h-7"],
    label: "text-xs",
  },
  md: {
    container: "w-12 h-12",
    core: "w-4 h-4",
    rings: ["w-7 h-7", "w-10 h-10"],
    label: "text-sm",
  },
  lg: {
    container: "w-16 h-16",
    core: "w-6 h-6",
    rings: ["w-10 h-10", "w-14 h-14"],
    label: "text-base",
  },
  xl: {
    container: "w-24 h-24",
    core: "w-8 h-8",
    rings: ["w-14 h-14", "w-20 h-20"],
    label: "text-lg",
  },
};

function StateIndicator({
  state,
  size = "md",
  showLabel = false,
  className,
}: StateIndicatorProps) {
  const config = stateConfig[state];
  const sizes = sizeConfig[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Main indicator */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          sizes.container
        )}
      >
        {/* Outer ripple rings */}
        <AnimatePresence>
          {(state === "listening" || state === "thinking") && (
            <>
              <motion.div
                key="ring-1"
                className={cn(
                  "absolute rounded-full border-2 opacity-30",
                  sizes.rings[1],
                  state === "listening"
                    ? "border-state-listening"
                    : "border-state-thinking"
                )}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                key="ring-2"
                className={cn(
                  "absolute rounded-full border opacity-20",
                  sizes.rings[0],
                  state === "listening"
                    ? "border-state-listening"
                    : "border-state-thinking"
                )}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.2, 0.05, 0.2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Core orb */}
        <motion.div
          className={cn(
            "relative rounded-full",
            sizes.core,
            state === "thinking"
              ? "animate-neuro-thinking bg-gradient-to-r from-state-thinking via-primary to-state-thinking bg-[length:200%_100%]"
              : config.bgColor
          )}
          animate={
            state === "speaking"
              ? {
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 10px oklch(0.8 0.18 85 / 0.5)",
                    "0 0 25px oklch(0.8 0.18 85 / 0.8)",
                    "0 0 10px oklch(0.8 0.18 85 / 0.5)",
                  ],
                }
              : state === "listening"
                ? {
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      "0 0 10px oklch(0.75 0.18 195 / 0.5)",
                      "0 0 20px oklch(0.75 0.18 195 / 0.7)",
                      "0 0 10px oklch(0.75 0.18 195 / 0.5)",
                    ],
                  }
                : state === "error"
                  ? {
                      x: [-2, 2, -2, 2, 0],
                    }
                  : {}
          }
          transition={{
            duration: state === "error" ? 0.4 : 1.5,
            repeat: state === "error" ? 2 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            boxShadow:
              state === "idle"
                ? "0 0 8px oklch(0.5 0.1 195 / 0.4)"
                : undefined,
          }}
        />

        {/* Speaking wave effect */}
        <AnimatePresence>
          {state === "speaking" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 bg-state-speaking rounded-full"
                  animate={{
                    height: ["30%", "80%", "30%"],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${35 + i * 15}%`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <AnimatePresence>
        {showLabel && (
          <motion.span
            className={cn(
              "font-mono uppercase tracking-wider",
              sizes.label,
              config.color
            )}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            key={state}
          >
            {config.label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export { StateIndicator };
