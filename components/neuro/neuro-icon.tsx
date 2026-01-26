"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AIState } from "./state-indicator";

// ==============================================
// NEURO ICON - Animated brain/neural logo
// Central visual identity element
// ==============================================

interface NeuroIconProps {
  state?: AIState;
  size?: number;
  className?: string;
}

function NeuroIcon({ state = "idle", size = 48, className }: NeuroIconProps) {
  const stateColors: Record<AIState, string> = {
    idle: "oklch(0.5 0.1 195)",
    listening: "oklch(0.75 0.18 195)",
    thinking: "oklch(0.7 0.2 330)",
    speaking: "oklch(0.8 0.18 85)",
    error: "oklch(0.6 0.25 25)",
  };

  const color = stateColors[state];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer glow filter */}
      <defs>
        <filter id="neuro-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="neuro-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={stateColors.thinking} />
        </linearGradient>
      </defs>

      {/* Central brain shape */}
      <motion.g filter="url(#neuro-glow)">
        {/* Neural network nodes */}
        {[
          { cx: 24, cy: 12, delay: 0 },
          { cx: 14, cy: 20, delay: 0.1 },
          { cx: 34, cy: 20, delay: 0.2 },
          { cx: 10, cy: 30, delay: 0.3 },
          { cx: 24, cy: 28, delay: 0.15 },
          { cx: 38, cy: 30, delay: 0.25 },
          { cx: 16, cy: 38, delay: 0.35 },
          { cx: 32, cy: 38, delay: 0.4 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={state === "thinking" ? 3 : 2.5}
            fill={color}
            initial={{ scale: 0 }}
            animate={{
              scale: state === "idle" ? 1 : [1, 1.3, 1],
              opacity: state === "idle" ? 0.7 : 1,
            }}
            transition={{
              scale: {
                duration: 1.5,
                repeat: state !== "idle" ? Number.POSITIVE_INFINITY : 0,
                delay: node.delay,
              },
              default: { delay: node.delay * 0.5 },
            }}
          />
        ))}

        {/* Neural connections */}
        {[
          "M24 12 L14 20",
          "M24 12 L34 20",
          "M14 20 L10 30",
          "M14 20 L24 28",
          "M34 20 L24 28",
          "M34 20 L38 30",
          "M10 30 L16 38",
          "M24 28 L16 38",
          "M24 28 L32 38",
          "M38 30 L32 38",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.6}
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              opacity:
                state === "thinking" ? [0.4, 0.8, 0.4] : state === "idle" ? 0.4 : 0.6,
            }}
            transition={{
              pathLength: { duration: 0.8, delay: i * 0.05 },
              opacity: {
                duration: 1.2,
                repeat: state === "thinking" ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.08,
              },
            }}
          />
        ))}

        {/* Central pulse for active states */}
        {state !== "idle" && (
          <motion.circle
            cx={24}
            cy={24}
            r={8}
            fill="none"
            stroke={color}
            strokeWidth={1}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.g>
    </motion.svg>
  );
}

export { NeuroIcon };
