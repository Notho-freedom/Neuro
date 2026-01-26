"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ==============================================
// COGNITIVE SURFACE - Base container component
// Glassmorphism card with Notilus gaming aesthetics
// Geometric corners, neon glow, scan line effects
// ==============================================

export type SurfaceVariant = "default" | "elevated" | "floating" | "minimal";
export type SurfaceGlow = "none" | "cyan" | "magenta" | "amber" | "primary" | "auto";

interface CognitiveSurfaceProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  variant?: SurfaceVariant;
  glow?: SurfaceGlow;
  animated?: boolean;
  showCorners?: boolean;
  showScanLine?: boolean;
  children?: ReactNode;
  className?: string;
}

const surfaceVariants: Record<SurfaceVariant, string> = {
  default: "glass-surface",
  elevated: "glass-surface-elevated",
  floating: "glass-surface-elevated shadow-2xl",
  minimal: "bg-transparent border-0",
};

const glowVariants: Record<SurfaceGlow, string> = {
  none: "",
  cyan: "glow-cyan",
  magenta: "glow-magenta",
  amber: "glow-amber",
  primary: "neon-glow",
  auto: "animate-neuro-glow",
};

const CognitiveSurface = forwardRef<HTMLDivElement, CognitiveSurfaceProps>(
  (
    {
      variant = "default",
      glow = "none",
      animated = true,
      showCorners = true,
      showScanLine = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const MotionDiv = animated ? motion.div : "div";

    const animationProps = animated
      ? {
          initial: { opacity: 0, scale: 0.95, y: 10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 10 },
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
        }
      : {};

    return (
      <MotionDiv
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl p-6",
          surfaceVariants[variant],
          glowVariants[glow],
          className
        )}
        {...animationProps}
        {...(props as MotionProps)}
      >
        {/* Notilus Scan line effect */}
        {animated && showScanLine && variant !== "minimal" && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-neuro-scan"
              style={{ animationDuration: "4s" }}
            />
          </div>
        )}

        {/* Notilus Geometric Corner accents with glow */}
        {showCorners && variant !== "minimal" && (
          <>
            {/* Top-left corner */}
            <div className="absolute left-0 top-0 pointer-events-none">
              <div 
                className="absolute w-5 h-[2px] bg-primary left-0 top-0"
                style={{ filter: "drop-shadow(0 0 4px var(--glow-primary))" }}
              />
              <div 
                className="absolute w-[2px] h-5 bg-primary left-0 top-0"
                style={{ filter: "drop-shadow(0 0 4px var(--glow-primary))" }}
              />
              {/* Extended lines */}
              <div className="absolute w-8 h-px bg-gradient-to-r from-primary/60 to-transparent left-0 top-0" />
              <div className="absolute w-px h-8 bg-gradient-to-b from-primary/60 to-transparent left-0 top-0" />
            </div>

            {/* Top-right corner */}
            <div className="absolute right-0 top-0 pointer-events-none">
              <div 
                className="absolute w-5 h-[2px] bg-primary right-0 top-0"
                style={{ filter: "drop-shadow(0 0 4px var(--glow-primary))" }}
              />
              <div 
                className="absolute w-[2px] h-5 bg-primary right-0 top-0"
                style={{ filter: "drop-shadow(0 0 4px var(--glow-primary))" }}
              />
              {/* Extended lines */}
              <div className="absolute w-8 h-px bg-gradient-to-l from-primary/60 to-transparent right-0 top-0" />
              <div className="absolute w-px h-8 bg-gradient-to-b from-primary/60 to-transparent right-0 top-0" />
            </div>

            {/* Bottom-left corner */}
            <div className="absolute left-0 bottom-0 pointer-events-none">
              <div 
                className="absolute w-5 h-[2px] bg-primary left-0 bottom-0"
                style={{ filter: "drop-shadow(0 0 4px var(--glow-primary))" }}
              />
              <div 
                className="absolute w-[2px] h-5 bg-primary left-0 bottom-0"
                style={{ filter: "drop-shadow(0 0 4px var(--glow-primary))" }}
              />
              {/* Extended lines */}
              <div className="absolute w-8 h-px bg-gradient-to-r from-primary/60 to-transparent left-0 bottom-0" />
              <div className="absolute w-px h-8 bg-gradient-to-t from-primary/60 to-transparent left-0 bottom-0" />
            </div>

            {/* Bottom-right corner */}
            <div className="absolute right-0 bottom-0 pointer-events-none">
              <div 
                className="absolute w-5 h-[2px] bg-primary right-0 bottom-0"
                style={{ filter: "drop-shadow(0 0 4px var(--glow-primary))" }}
              />
              <div 
                className="absolute w-[2px] h-5 bg-primary right-0 bottom-0"
                style={{ filter: "drop-shadow(0 0 4px var(--glow-primary))" }}
              />
              {/* Extended lines */}
              <div className="absolute w-8 h-px bg-gradient-to-l from-primary/60 to-transparent right-0 bottom-0" />
              <div className="absolute w-px h-8 bg-gradient-to-t from-primary/60 to-transparent right-0 bottom-0" />
            </div>
          </>
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </MotionDiv>
    );
  }
);

CognitiveSurface.displayName = "CognitiveSurface";

export { CognitiveSurface };
