"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ==============================================
// COGNITIVE SURFACE - Base container component
// Glassmorphism card with neural aesthetics
// ==============================================

export type SurfaceVariant = "default" | "elevated" | "floating" | "minimal";
export type SurfaceGlow = "none" | "cyan" | "magenta" | "amber" | "auto";

interface CognitiveSurfaceProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  variant?: SurfaceVariant;
  glow?: SurfaceGlow;
  animated?: boolean;
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
  auto: "animate-neuro-glow",
};

const CognitiveSurface = forwardRef<HTMLDivElement, CognitiveSurfaceProps>(
  (
    {
      variant = "default",
      glow = "none",
      animated = true,
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
        {/* Scan line effect */}
        {animated && variant !== "minimal" && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-neuro-scan"
              style={{ animationDuration: "4s" }}
            />
          </div>
        )}

        {/* Corner accents */}
        {variant !== "minimal" && (
          <>
            <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
            <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
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
