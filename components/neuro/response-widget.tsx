"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CognitiveSurface } from "./cognitive-surface";
import { StateIndicator, type AIState } from "./state-indicator";
import { ThoughtStream } from "./thought-stream";
import { NeuroIcon } from "./neuro-icon";

// ==============================================
// RESPONSE WIDGET - Main AI response container
// Floating widget with Notilus design elements
// Geometric corners, neon glow, glassmorphism
// ==============================================

interface ResponseWidgetProps {
  state: AIState;
  content?: string;
  isStreaming?: boolean;
  position?: "center" | "bottom-right" | "bottom-left" | "top-right";
  onDismiss?: () => void;
  className?: string;
}

const positionClasses = {
  center: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "fixed bottom-8 right-8",
  "bottom-left": "fixed bottom-8 left-8",
  "top-right": "fixed top-8 right-8",
};

function ResponseWidget({
  state,
  content = "",
  isStreaming = false,
  position = "center",
  onDismiss,
  className,
}: ResponseWidgetProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-collapse after speaking ends
  useEffect(() => {
    if (state === "idle" && !isStreaming && content) {
      const timer = setTimeout(() => {
        // Could auto-hide here if desired
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state, isStreaming, content]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };

  // Determine glow color based on state
  const glowColor = state === "thinking" ? "magenta" : state === "listening" ? "cyan" : state === "speaking" ? "amber" : "none";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "z-50 w-full max-w-md",
            positionClasses[position],
            className
          )}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          <CognitiveSurface
            variant="floating"
            glow={glowColor}
            showCorners={true}
            showScanLine={true}
            className="relative"
          >
            {/* Close button with Notilus style */}
            {onDismiss && (
              <button
                onClick={handleDismiss}
                type="button"
                className="absolute right-3 top-3 p-1.5 rounded-lg opacity-50 hover:opacity-100 hover:bg-primary/20 transition-all border border-transparent hover:border-primary/30"
                aria-label="Fermer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            )}

            {/* Header with icon and state - Notilus typography */}
            <div className="flex items-center gap-4 mb-4">
              <NeuroIcon state={state} size={40} />
              <div className="flex-1">
                <h3 className="font-display text-sm font-bold tracking-wider text-primary uppercase neon-text">
                  Neuro
                </h3>
                <p className="text-xs text-muted-foreground font-sans">
                  Interface Cognitive v1.0
                </p>
              </div>
              <StateIndicator state={state} size="sm" />
            </div>

            {/* Content area */}
            <AnimatePresence mode="wait">
              {state === "listening" && (
                <motion.div
                  key="listening"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-center py-6">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-state-listening rounded-full"
                          animate={{
                            height: ["12px", "28px", "12px"],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                          style={{
                            filter: "drop-shadow(0 0 4px var(--glow-cyan))",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground font-sans">
                    {"J'ecoute..."}
                  </p>
                </motion.div>
              )}

              {state === "thinking" && !content && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="py-6">
                    {/* Neural processing visualization - Notilus style */}
                    <div className="relative h-16 flex items-center justify-center">
                      <motion.div
                        className="absolute w-32 h-1 rounded-full"
                        style={{
                          background: "linear-gradient(90deg, transparent, var(--state-thinking), transparent)",
                          filter: "drop-shadow(0 0 8px var(--glow-magenta))",
                        }}
                        animate={{
                          x: [-60, 60, -60],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute w-20 h-1 rounded-full"
                        style={{
                          background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                          filter: "drop-shadow(0 0 8px var(--glow-primary))",
                        }}
                        animate={{
                          x: [40, -40, 40],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 0.3,
                        }}
                      />
                    </div>
                    <p className="text-center text-sm text-muted-foreground font-sans">
                      Analyse en cours...
                    </p>
                  </div>
                </motion.div>
              )}

              {(state === "speaking" || (state === "idle" && content)) && content && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-primary/20 pt-4 mt-2">
                    <ThoughtStream
                      content={content}
                      isStreaming={isStreaming && state === "speaking"}
                      speed="normal"
                    />
                  </div>
                </motion.div>
              )}

              {state === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div 
                    className="py-4 px-3 rounded-lg"
                    style={{
                      background: "rgba(255, 69, 58, 0.1)",
                      border: "1px solid rgba(255, 69, 58, 0.3)",
                    }}
                  >
                    <p className="text-sm text-state-error font-sans">
                      Une erreur est survenue. Veuillez reessayer.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer status bar - Notilus style */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/20">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    state === "idle"
                      ? "bg-state-idle"
                      : state === "error"
                        ? "bg-state-error"
                        : "bg-state-listening animate-pulse"
                  )}
                  style={{
                    filter: state !== "idle" && state !== "error" 
                      ? "drop-shadow(0 0 4px var(--glow-cyan))" 
                      : undefined,
                  }}
                />
                <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
                  {state === "idle"
                    ? "STANDBY"
                    : state === "listening"
                      ? "LISTENING"
                      : state === "thinking"
                        ? "PROCESSING"
                        : state === "speaking"
                          ? "RESPONDING"
                          : "ERROR"}
                </span>
              </div>
              <span className="text-xs font-sans text-muted-foreground/50">
                {new Date().toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </CognitiveSurface>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { ResponseWidget };
