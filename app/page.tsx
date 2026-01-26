"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CognitiveSurface,
  StateIndicator,
  NeuroIcon,
  ParticleField,
  ResponseWidget,
  ThoughtStream,
  type AIState,
} from "@/components/neuro";

// ==============================================
// NEURO - AI Interface Demo
// Powered by Notilus Design System
// ==============================================

const themeColors = [
  { name: "Rouge Notilus", color: "#FF2D55", class: "" },
  { name: "Bleu Cyber", color: "#007AFF", class: "theme-cyber-blue" },
  { name: "Vert Matrix", color: "#34C759", class: "theme-matrix-green" },
  { name: "Violet Neon", color: "#5856D6", class: "theme-neon-violet" },
  { name: "Orange Fire", color: "#FF9500", class: "theme-fire-orange" },
  { name: "Rose Cyber", color: "#FF2D92", class: "theme-cyber-pink" },
];

const demoMessages = [
  "Bonjour! Je suis Neuro, votre interface cognitive.",
  "Je peux vous aider a analyser des donnees, repondre a vos questions, et bien plus encore.",
  "Mon interface utilise le design system Notilus pour une experience futuriste et immersive.",
];

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [currentState, setCurrentState] = useState<AIState>("idle");
  const [showWidget, setShowWidget] = useState(false);
  const [streamContent, setStreamContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [demoIndex, setDemoIndex] = useState(0);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Demo cycle
  const runDemo = () => {
    setShowWidget(true);
    setCurrentState("listening");
    
    setTimeout(() => {
      setCurrentState("thinking");
    }, 2000);

    setTimeout(() => {
      setCurrentState("speaking");
      setStreamContent(demoMessages[demoIndex]);
    }, 4000);

    setTimeout(() => {
      setCurrentState("idle");
      setDemoIndex((prev) => (prev + 1) % demoMessages.length);
    }, 8000);
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--native-bg)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <motion.div
            className="w-24 h-24 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--state-thinking))",
            }}
            animate={{ 
              boxShadow: [
                "0 0 30px var(--glow-primary)",
                "0 0 60px var(--glow-primary-strong)",
                "0 0 30px var(--glow-primary)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <NeuroIcon state="thinking" size={48} />
          </motion.div>
          
          <motion.p
            className="mt-6 text-sm font-sans text-white/60 text-center uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Initialisation Neuro...
          </motion.p>
          
          {/* Progress bar */}
          <motion.div
            className="mt-4 w-48 h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ 
                background: "linear-gradient(90deg, var(--primary), var(--state-thinking))",
                filter: "drop-shadow(0 0 4px var(--glow-primary))",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen overflow-hidden ${themeColors[activeTheme].class}`}>
      {/* Particle Background */}
      <ParticleField state={currentState} particleCount={60} />

      {/* Animated gradient background */}
      <div className="fixed inset-0 gradient-animated opacity-50 pointer-events-none" />

      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
          style={{ background: themeColors[activeTheme].color }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ background: themeColors[activeTheme].color }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center neon-glow-sm"
              style={{ background: `linear-gradient(135deg, ${themeColors[activeTheme].color}, var(--state-thinking))` }}
            >
              <NeuroIcon state={currentState} size={24} />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-wider neon-text">
              NEURO
            </span>
            <span 
              className="badge-neuro badge-neuro-glow text-xs"
              style={{ 
                background: `rgba(${themeColors[activeTheme].color === "#FF2D55" ? "255,45,85" : "255,45,85"}, 0.15)`,
              }}
            >
              COGNITIVE AI
            </span>
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a href="#demo" className="text-sm font-sans text-white/70 hover:text-primary transition-colors">
              Demo
            </a>
            <a href="#components" className="text-sm font-sans text-white/70 hover:text-primary transition-colors">
              Composants
            </a>
            <a href="#states" className="text-sm font-sans text-white/70 hover:text-primary transition-colors">
              Etats
            </a>
          </motion.div>

          <motion.button
            className="btn-neuro btn-neuro-primary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={runDemo}
          >
            Lancer Demo
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Icon */}
            <motion.div
              className="mx-auto mb-8 w-32 h-32 rounded-3xl flex items-center justify-center glass-surface-elevated animate-border-glow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <NeuroIcon state={currentState} size={64} />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <span className="badge-neuro badge-neuro-glow">
                Interface Cognitive Avancee
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-display-lg md:text-display-xl mb-6">
              <span className="text-white">INTERFACE</span>
              <br />
              <span 
                className="neon-text"
                style={{ color: themeColors[activeTheme].color }}
              >
                NEURONALE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-body md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              Systeme d&apos;intelligence artificielle avec interface visuelle reactive.
              Design futuriste Notilus avec effets neon, glassmorphism et animations fluides.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                className="btn-neuro btn-neuro-primary"
                onClick={runDemo}
              >
                Demarrer l&apos;Experience
              </button>
              <button 
                className="btn-neuro btn-neuro-secondary"
                onClick={() => setShowWidget(!showWidget)}
              >
                {showWidget ? "Masquer Widget" : "Voir Widget"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Theme Selector */}
      <section className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <CognitiveSurface variant="elevated" glow="none" showCorners={true}>
            <h3 className="font-display text-lg font-bold text-white mb-4 text-center">
              Themes Notilus
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {themeColors.map((theme, i) => (
                <motion.button
                  key={theme.name}
                  className={`relative w-12 h-12 rounded-xl transition-all ${
                    activeTheme === i ? "ring-2 ring-white ring-offset-2 ring-offset-[var(--native-bg)]" : ""
                  }`}
                  style={{ background: theme.color }}
                  onClick={() => setActiveTheme(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeTheme === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ boxShadow: `0 0 20px ${theme.color}` }}
                      layoutId="activeTheme"
                    />
                  )}
                </motion.button>
              ))}
            </div>
            <p className="text-center text-sm text-white/50 mt-4 font-sans">
              Theme actif: <span style={{ color: themeColors[activeTheme].color }}>{themeColors[activeTheme].name}</span>
            </p>
          </CognitiveSurface>
        </div>
      </section>

      {/* AI States Section */}
      <section id="states" className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-headline text-white mb-4">
              ETATS <span style={{ color: themeColors[activeTheme].color }}>COGNITIFS</span>
            </h2>
            <p className="text-body text-white/60 max-w-xl mx-auto font-sans">
              Indicateurs visuels pour chaque etat de l&apos;interface neuronale.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {(["idle", "listening", "thinking", "speaking", "error"] as AIState[]).map((stateType, i) => (
              <motion.div
                key={stateType}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CognitiveSurface 
                  variant="default" 
                  glow="none"
                  showCorners={true}
                  className={`text-center cursor-pointer transition-all hover:scale-105 ${
                    currentState === stateType ? "animate-border-glow" : ""
                  }`}
                  onClick={() => setCurrentState(stateType)}
                >
                  <StateIndicator 
                    state={stateType} 
                    size="lg" 
                    showLabel={true}
                    className="mx-auto"
                  />
                  <p className="mt-4 text-xs font-sans text-white/40 uppercase tracking-wider">
                    {stateType === "idle" && "Veille"}
                    {stateType === "listening" && "Ecoute"}
                    {stateType === "thinking" && "Reflexion"}
                    {stateType === "speaking" && "Reponse"}
                    {stateType === "error" && "Erreur"}
                  </p>
                </CognitiveSurface>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section id="components" className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-headline text-white mb-4">
              COMPOSANTS <span style={{ color: themeColors[activeTheme].color }}>NEURO</span>
            </h2>
            <p className="text-body text-white/60 max-w-xl mx-auto font-sans">
              Bibliotheque de composants avec design Notilus integre.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* CognitiveSurface Demo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <CognitiveSurface variant="elevated" glow="primary" showCorners={true}>
                <h3 className="font-display text-lg font-bold text-white mb-4">
                  CognitiveSurface
                </h3>
                <p className="text-sm text-white/60 font-sans mb-4">
                  Conteneur glassmorphism avec coins geometriques Notilus, 
                  effets de scan line et glow neon configurable.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-neuro">Glassmorphism</span>
                  <span className="badge-neuro">Geometric Corners</span>
                  <span className="badge-neuro">Neon Glow</span>
                </div>
              </CognitiveSurface>
            </motion.div>

            {/* NeuroIcon Demo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <CognitiveSurface variant="elevated" glow="cyan" showCorners={true}>
                <h3 className="font-display text-lg font-bold text-white mb-4">
                  NeuroIcon
                </h3>
                <div className="flex items-center justify-center gap-6 py-4">
                  <NeuroIcon state="idle" size={40} />
                  <NeuroIcon state="listening" size={40} />
                  <NeuroIcon state="thinking" size={40} />
                  <NeuroIcon state="speaking" size={40} />
                  <NeuroIcon state="error" size={40} />
                </div>
                <p className="text-sm text-white/60 font-sans text-center">
                  Icone neurale animee avec effets neon adaptes a chaque etat.
                </p>
              </CognitiveSurface>
            </motion.div>

            {/* StateIndicator Demo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <CognitiveSurface variant="elevated" glow="magenta" showCorners={true}>
                <h3 className="font-display text-lg font-bold text-white mb-4">
                  StateIndicator
                </h3>
                <div className="flex items-center justify-center gap-8 py-4">
                  <StateIndicator state="idle" size="md" />
                  <StateIndicator state="listening" size="md" />
                  <StateIndicator state="thinking" size="md" />
                  <StateIndicator state="speaking" size="md" />
                </div>
                <p className="text-sm text-white/60 font-sans text-center">
                  Indicateur d&apos;etat avec anneaux pulses et glow dynamique.
                </p>
              </CognitiveSurface>
            </motion.div>

            {/* ThoughtStream Demo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <CognitiveSurface variant="elevated" glow="amber" showCorners={true}>
                <h3 className="font-display text-lg font-bold text-white mb-4">
                  ThoughtStream
                </h3>
                <div className="bg-black/20 rounded-lg p-4">
                  <ThoughtStream 
                    content="Interface cognitive active. Analyse des donnees en cours..." 
                    isStreaming={false}
                  />
                </div>
                <p className="text-sm text-white/60 font-sans text-center mt-4">
                  Affichage de texte avec effet typewriter et curseur neon.
                </p>
              </CognitiveSurface>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-headline text-white mb-4">
              DEMO <span style={{ color: themeColors[activeTheme].color }}>INTERACTIVE</span>
            </h2>
            <p className="text-body text-white/60 max-w-xl mx-auto font-sans mb-8">
              Cliquez sur les boutons pour tester les differents etats de l&apos;interface.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="btn-neuro btn-neuro-primary"
                onClick={runDemo}
              >
                Cycle Complet
              </button>
              <button 
                className="btn-neuro btn-neuro-secondary"
                onClick={() => setCurrentState("listening")}
              >
                Mode Ecoute
              </button>
              <button 
                className="btn-neuro btn-neuro-secondary"
                onClick={() => setCurrentState("thinking")}
              >
                Mode Reflexion
              </button>
              <button 
                className="btn-neuro btn-neuro-ghost"
                onClick={() => {
                  setCurrentState("idle");
                  setShowWidget(false);
                }}
              >
                Reset
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-primary/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NeuroIcon state="idle" size={24} />
            <span className="font-display text-sm text-white/60">
              NEURO x NOTILUS
            </span>
          </div>
          <p className="text-xs text-white/40 font-sans">
            Design System Futuriste pour Interfaces Cognitives
          </p>
        </div>
      </footer>

      {/* Response Widget */}
      <AnimatePresence>
        {showWidget && (
          <ResponseWidget
            state={currentState}
            content={streamContent}
            isStreaming={currentState === "speaking"}
            position="bottom-right"
            onDismiss={() => setShowWidget(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
