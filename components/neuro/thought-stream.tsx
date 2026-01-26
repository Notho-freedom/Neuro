"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ==============================================
// THOUGHT STREAM - Streaming text display
// Typewriter effect with Notilus aesthetics
// ==============================================

interface ThoughtStreamProps {
  content: string;
  isStreaming?: boolean;
  speed?: "slow" | "normal" | "fast";
  className?: string;
  onComplete?: () => void;
}

const speedConfig = {
  slow: 50,
  normal: 25,
  fast: 10,
};

function ThoughtStream({
  content = "",
  isStreaming = false,
  speed = "normal",
  className,
  onComplete,
}: ThoughtStreamProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ensure content is always a string
  const safeContent = content ?? "";

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedContent(safeContent);
      setCurrentIndex(safeContent.length);
      return;
    }

    if (currentIndex < safeContent.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(safeContent.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, speedConfig[speed]);

      return () => clearTimeout(timeout);
    }
    if (currentIndex === safeContent.length && safeContent.length > 0 && onComplete) {
      onComplete();
    }
  }, [safeContent, currentIndex, isStreaming, speed, onComplete]);

  // Reset when content changes
  useEffect(() => {
    if (isStreaming) {
      setDisplayedContent("");
      setCurrentIndex(0);
    }
  }, [safeContent, isStreaming]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedContent]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-y-auto max-h-64",
        className
      )}
    >
      <div className="space-y-2">
        {displayedContent.split("\n").map((line, lineIndex) => (
          <motion.p
            key={lineIndex}
            className="leading-relaxed text-foreground/90 font-sans"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {line.split(" ").map((word, wordIndex) => (
              <motion.span
                key={`${lineIndex}-${wordIndex}`}
                className="inline-block mr-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.15,
                  delay: wordIndex * 0.02,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        ))}

        {/* Cursor with Notilus neon effect */}
        <AnimatePresence>
          {isStreaming && currentIndex < safeContent.length && (
            <motion.span
              className="inline-block w-2 h-5 bg-primary ml-1 align-middle rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
              }}
              style={{
                filter: "drop-shadow(0 0 4px var(--glow-primary))",
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { ThoughtStream };
