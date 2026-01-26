"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CognitiveSurface,
  StateIndicator,
  NeuroIcon,
  ThoughtStream,
  ResponseWidget,
  ParticleField,
  SoundProvider,
  SoundControl,
  useSounds,
  type AIState,
} from "@/components/neuro";

// Demo conversation for showcase
const demoConversation = [
  {
    role: "user" as const,
    content: "Explain quantum computing in simple terms",
    timestamp: Date.now() - 60000,
  },
  {
    role: "assistant" as const,
    content:
      "Quantum computing harnesses quantum mechanics to process information in fundamentally new ways. Unlike classical bits that are either 0 or 1, quantum bits (qubits) can exist in superposition - being both 0 and 1 simultaneously. This allows quantum computers to explore many possibilities at once, making them exceptionally powerful for specific types of problems like cryptography, drug discovery, and optimization.",
    timestamp: Date.now() - 30000,
  },
];

function NeuroDemo() {
  const [aiState, setAiState] = useState<AIState>("idle");
  const [showResponse, setShowResponse] = useState(false);
  const [showStream, setShowStream] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { playSound } = useSounds();

  const simulateInteraction = useCallback(() => {
    // Reset
    setShowResponse(false);
    setShowStream(false);

    // Start listening
    playSound("activate");
    setAiState("listening");

    setTimeout(() => {
      playSound("process");
      setAiState("thinking");
      setShowStream(true);
    }, 1500);

    setTimeout(() => {
      playSound("success");
      setAiState("speaking");
      setShowResponse(true);
    }, 4000);

    setTimeout(() => {
      setAiState("idle");
    }, 8000);
  }, [playSound]);

  const handleStateChange = (state: AIState) => {
    setAiState(state);
    if (state === "listening") playSound("activate");
    else if (state === "thinking") playSound("process");
    else if (state === "speaking") playSound("success");
    else if (state === "error") playSound("error");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Particle Background */}
      <ParticleField density={60} color="cyan" speed={0.3} interactive />

      {/* Ambient gradient overlays */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-neuro-glow-cyan/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-neuro-glow-magenta/8 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <NeuroIcon icon="brain" size={32} animated color="cyan" />
          <h1
            className="text-2xl font-bold tracking-wider text-foreground"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            NEURO
          </h1>
          <span className="text-xs text-muted-foreground">v1.0</span>
        </motion.div>

        <SoundControl />
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">
        {/* State Indicator Section */}
        <section className="flex flex-col items-center gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium uppercase tracking-widest text-muted-foreground"
          >
            Cognitive State
          </motion.h2>

          <StateIndicator
            state={aiState}
            size="lg"
            showLabel
            showPulse
            onClick={simulateInteraction}
          />

          {/* State selector buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {(
              ["idle", "listening", "thinking", "speaking", "error"] as const
            ).map((state) => (
              <button
                key={state}
                onClick={() => handleStateChange(state)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-all ${
                  aiState === state
                    ? "border-primary/50 bg-primary/20 text-primary"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </section>

        {/* Widgets Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Cognitive Surface Demo */}
          <CognitiveSurface
            variant="elevated"
            glow="cyan"
            className="p-6"
            animate
          >
            <div className="flex items-start gap-4">
              <NeuroIcon icon="chip" size={24} color="cyan" />
              <div className="flex-1">
                <h3
                  className="mb-2 text-lg font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  Neural Processing Unit
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Core cognitive engine running at optimal capacity. All
                  subsystems nominal.
                </p>
                <div className="mt-4 flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-neuro-glow-cyan" />
                    <span className="text-muted-foreground">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Latency:</span>
                    <span className="text-primary">12ms</span>
                  </div>
                </div>
              </div>
            </div>
          </CognitiveSurface>

          {/* Input Surface */}
          <CognitiveSurface variant="default" glow="none" className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <NeuroIcon icon="mic" size={20} color="magenta" />
                <span
                  className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  Neural Input
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your query..."
                  className="w-full rounded-xl border border-border/50 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={simulateInteraction}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary/20 p-2 text-primary transition-all hover:bg-primary/30"
                >
                  <NeuroIcon icon="send" size={16} />
                </button>
              </div>
            </div>
          </CognitiveSurface>
        </section>

        {/* Thought Stream */}
        <AnimatePresence>
          {showStream && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ThoughtStream
                thoughts={[
                  "Parsing natural language input...",
                  "Activating semantic analysis module...",
                  "Cross-referencing knowledge base...",
                  "Synthesizing coherent response...",
                ]}
                isActive={aiState === "thinking"}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response Widget */}
        <AnimatePresence>
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ResponseWidget
                messages={demoConversation}
                isStreaming={aiState === "speaking"}
                onDismiss={() => setShowResponse(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Component Showcase */}
        <section className="mt-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground"
          >
            Component Library
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Icons Showcase */}
            <CognitiveSurface variant="subtle" className="p-4">
              <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Icons
              </h4>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    "brain",
                    "wave",
                    "chip",
                    "network",
                    "eye",
                    "mic",
                    "speaker",
                    "send",
                  ] as const
                ).map((icon) => (
                  <NeuroIcon
                    key={icon}
                    icon={icon}
                    size={20}
                    color="cyan"
                    className="transition-transform hover:scale-110"
                  />
                ))}
              </div>
            </CognitiveSurface>

            {/* Surface Variants */}
            <CognitiveSurface variant="subtle" className="p-4">
              <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Surfaces
              </h4>
              <div className="flex flex-col gap-2">
                {(["default", "elevated", "subtle"] as const).map((variant) => (
                  <CognitiveSurface
                    key={variant}
                    variant={variant}
                    className="px-3 py-2 text-xs"
                  >
                    {variant}
                  </CognitiveSurface>
                ))}
              </div>
            </CognitiveSurface>

            {/* Glow Effects */}
            <CognitiveSurface variant="subtle" className="p-4">
              <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Glow Effects
              </h4>
              <div className="flex flex-col gap-2">
                {(["cyan", "magenta", "amber"] as const).map((glow) => (
                  <CognitiveSurface
                    key={glow}
                    variant="default"
                    glow={glow}
                    className="px-3 py-2 text-xs"
                  >
                    {glow}
                  </CognitiveSurface>
                ))}
              </div>
            </CognitiveSurface>

            {/* States */}
            <CognitiveSurface variant="subtle" className="p-4">
              <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                States
              </h4>
              <div className="flex flex-wrap gap-2">
                {(
                  ["idle", "listening", "thinking", "speaking", "error"] as const
                ).map((state) => (
                  <StateIndicator key={state} state={state} size="sm" />
                ))}
              </div>
            </CognitiveSurface>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-muted-foreground/50">
            NEURO Design System - Cognitive AI Interface
          </p>
          <p className="mt-1 text-xs text-muted-foreground/30">
            Inspired by Accel World / Brain Burst
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <SoundProvider>
      <NeuroDemo />
    </SoundProvider>
  );
}
