"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GxCard,
  GxButton,
  GxBadge,
  GxProgress,
  GxDivider,
  GxInput,
  GxSwitch,
  GxTabs,
  GxCheckbox,
  GxAvatar,
  GxSpinner,
  GeometricCorners,
  ParticleBackground,
} from "@/components/notilus";

// ==============================================
// NOTILUS BROWSER - Landing Page
// Futuristic Gaming/Sci-Fi Design
// ==============================================

// Feature data
const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "DevTools Integres",
    description: "Console, Network, Elements, Performance et Application directement dans le navigateur.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Mosaique Dynamique",
    description: "9 layouts predefinies avec tiles personnalisables. Drag & Drop et redimensionnement fluide.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Performance Analyzer",
    description: "7 categories d'analyse avec Core Web Vitals, 150+ regles d'audit et AI Advisor.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Terminal Natif",
    description: "Terminal integre avec multi-tabs, themes personnalisables et raccourcis clavier.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "AI Assistant",
    description: "Assistant IA contextuel pour le code, debugging et suggestions intelligentes.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Themes Personnalisables",
    description: "6 couleurs d'accent, glassmorphism, effets neon et wallpapers dynamiques.",
  },
];

// Theme colors for demo
const themeColors = [
  { name: "Rouge Notilus", color: "#FF2D55", class: "" },
  { name: "Bleu Cyber", color: "#007AFF", class: "theme-cyber-blue" },
  { name: "Vert Matrix", color: "#34C759", class: "theme-matrix-green" },
  { name: "Violet Neon", color: "#5856D6", class: "theme-neon-violet" },
  { name: "Orange Fire", color: "#FF9500", class: "theme-fire-orange" },
  { name: "Rose Cyber", color: "#FF2D92", class: "theme-cyber-pink" },
];

// Stats
const stats = [
  { value: "150+", label: "Regles d'Audit" },
  { value: "7", label: "Categories Analyse" },
  { value: "9", label: "Layouts Mosaique" },
  { value: "6", label: "Themes Couleur" },
];

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [activeTab, setActiveTab] = useState("features");
  const [switchValue, setSwitchValue] = useState(true);
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#09080D]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          {/* Logo */}
          <motion.div
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-[#FF2D92] flex items-center justify-center"
            animate={{ 
              boxShadow: [
                "0 0 30px rgba(255,45,85,0.4)",
                "0 0 60px rgba(255,45,85,0.6)",
                "0 0 30px rgba(255,45,85,0.4)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-display text-3xl font-black text-white">N</span>
          </motion.div>
          
          {/* Loading text */}
          <motion.p
            className="mt-6 text-sm font-sans text-white/60 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Initialisation du systeme...
          </motion.p>
          
          {/* Progress */}
          <motion.div
            className="mt-4 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <GxProgress value={100} showPercentage={false} />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen overflow-hidden ${themeColors[activeTheme].class}`}>
      {/* Particle Background */}
      <ParticleBackground 
        color={themeColors[activeTheme].color} 
        particleCount={80}
        connectionDistance={120}
      />

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
              style={{ background: `linear-gradient(135deg, ${themeColors[activeTheme].color}, #FF2D92)` }}
            >
              <span className="font-display text-lg font-black text-white">N</span>
            </div>
            <span className="font-display text-xl font-bold text-white tracking-wider">
              NOTILUS
            </span>
            <GxBadge variant="default" glow>BETA</GxBadge>
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a href="#features" className="text-sm font-sans text-white/70 hover:text-primary transition-colors">
              Fonctionnalites
            </a>
            <a href="#demo" className="text-sm font-sans text-white/70 hover:text-primary transition-colors">
              Demo
            </a>
            <a href="#components" className="text-sm font-sans text-white/70 hover:text-primary transition-colors">
              Composants
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GxButton variant="primary" size="sm">
              Telecharger
            </GxButton>
          </motion.div>
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
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GxBadge variant="default" glow className="mb-6">
                Nouvelle Generation de Navigateur
              </GxBadge>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-display-lg md:text-display-xl font-display mb-6">
              <span className="text-white">LE NAVIGATEUR</span>
              <br />
              <span 
                className="neon-text"
                style={{ color: themeColors[activeTheme].color }}
              >
                DES DEVELOPPEURS
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-body md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Navigateur futuriste avec DevTools integres, terminal natif, analyseur de performance 
              et assistant IA. Concu pour maximiser votre productivite.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <GxButton variant="primary" size="lg">
                Telecharger Gratuitement
              </GxButton>
              <GxButton 
                variant="outline" 
                size="lg"
                onClick={() => setShowDemo(true)}
              >
                Voir la Demo
              </GxButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div 
                    className="text-4xl font-display font-bold mb-1"
                    style={{ color: themeColors[activeTheme].color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-sans text-white/50 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Theme Selector */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <GxCard title="Themes de Couleur" showCorners className="overflow-visible">
            <div className="flex flex-wrap justify-center gap-4">
              {themeColors.map((theme, i) => (
                <motion.button
                  key={theme.name}
                  className={`relative w-12 h-12 rounded-xl transition-all ${
                    activeTheme === i ? "ring-2 ring-white ring-offset-2 ring-offset-[#09080D]" : ""
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
          </GxCard>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-headline font-display text-white mb-4">
              FONCTIONNALITES <span style={{ color: themeColors[activeTheme].color }}>AVANCEES</span>
            </h2>
            <p className="text-body text-white/60 max-w-xl mx-auto">
              Des outils puissants integres nativement pour une productivite maximale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GxCard 
                  variant="interactive" 
                  glowOnHover 
                  className="h-full hover:border-primary/60 transition-colors"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ 
                      background: `rgba(${themeColors[activeTheme].color === "#FF2D55" ? "255,45,85" : "255,45,85"}, 0.15)`,
                      color: themeColors[activeTheme].color 
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-sans text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </GxCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section id="components" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-headline font-display text-white mb-4">
              COMPOSANTS <span style={{ color: themeColors[activeTheme].color }}>GX</span>
            </h2>
            <p className="text-body text-white/60 max-w-xl mx-auto">
              Bibliotheque de composants futuristes avec glassmorphism et effets neon.
            </p>
          </motion.div>

          {/* Tabs */}
          <GxTabs
            tabs={[
              { id: "features", label: "Inputs" },
              { id: "buttons", label: "Boutons" },
              { id: "cards", label: "Cartes" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="mb-8"
          />

          <AnimatePresence mode="wait">
            {activeTab === "features" && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <GxCard title="Champs de Saisie">
                  <div className="space-y-4">
                    <GxInput 
                      label="Email" 
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <GxInput 
                      label="Mot de passe" 
                      type="password"
                      placeholder="********"
                    />
                    <GxInput 
                      label="Avec erreur" 
                      error="Ce champ est requis"
                      placeholder="Texte invalide"
                    />
                  </div>
                </GxCard>

                <GxCard title="Controles">
                  <div className="space-y-6">
                    <GxSwitch 
                      checked={switchValue} 
                      onChange={setSwitchValue}
                      label="Mode sombre active"
                    />
                    <GxCheckbox 
                      checked={checkboxValue} 
                      onChange={setCheckboxValue}
                      label="Accepter les conditions"
                    />
                    <GxDivider />
                    <GxProgress value={75} label="Progression" />
                    <GxProgress value={45} label="Telechargement" />
                  </div>
                </GxCard>
              </motion.div>
            )}

            {activeTab === "buttons" && (
              <motion.div
                key="buttons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <GxCard title="Variantes de Boutons">
                  <div className="space-y-6">
                    <div>
                      <p className="text-label text-white/60 mb-3">Variantes</p>
                      <div className="flex flex-wrap gap-3">
                        <GxButton variant="primary">Primary</GxButton>
                        <GxButton variant="secondary">Secondary</GxButton>
                        <GxButton variant="outline">Outline</GxButton>
                        <GxButton variant="ghost">Ghost</GxButton>
                        <GxButton variant="danger">Danger</GxButton>
                      </div>
                    </div>
                    <GxDivider />
                    <div>
                      <p className="text-label text-white/60 mb-3">Tailles</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <GxButton variant="primary" size="sm">Small</GxButton>
                        <GxButton variant="primary" size="md">Medium</GxButton>
                        <GxButton variant="primary" size="lg">Large</GxButton>
                      </div>
                    </div>
                    <GxDivider />
                    <div>
                      <p className="text-label text-white/60 mb-3">Etats</p>
                      <div className="flex flex-wrap gap-3">
                        <GxButton variant="primary" loading>Loading</GxButton>
                        <GxButton variant="primary" disabled>Disabled</GxButton>
                      </div>
                    </div>
                  </div>
                </GxCard>
              </motion.div>
            )}

            {activeTab === "cards" && (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <GxCard 
                  title="Carte avec Titre" 
                  titleIcon={
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                >
                  <p className="text-sm text-white/70">
                    Carte avec titre, icone et contours geometriques signature de Notilus.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <GxBadge>Tag 1</GxBadge>
                    <GxBadge variant="success">Actif</GxBadge>
                  </div>
                </GxCard>

                <GxCard variant="elevated" glowOnHover>
                  <div className="flex items-center gap-4 mb-4">
                    <GxAvatar initials="JD" size={48} />
                    <div>
                      <p className="font-sans font-semibold text-white">John Doe</p>
                      <p className="text-xs text-white/50">Developpeur Senior</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70">
                    Carte elevee avec effet glow au survol et avatar utilisateur.
                  </p>
                </GxCard>

                <GxCard className="md:col-span-2">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#FF2D92] flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">Notilus Browser v1.0</h3>
                        <p className="text-sm text-white/50">macOS / Windows / Linux</p>
                      </div>
                    </div>
                    <GxButton variant="primary" size="lg">
                      Telecharger Maintenant
                    </GxButton>
                  </div>
                </GxCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <GxCard variant="elevated" className="text-center">
            <GeometricCorners size={24} glowIntensity={0.5} />
            <h2 className="text-title font-display text-white mb-3">
              RESTEZ INFORME
            </h2>
            <p className="text-sm text-white/60 mb-6">
              Inscrivez-vous pour recevoir les dernieres mises a jour et fonctionnalites.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <GxInput 
                placeholder="votre@email.com" 
                className="flex-1"
              />
              <GxButton variant="primary">
                {"S'inscrire"}
              </GxButton>
            </div>
          </GxCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-[rgba(255,45,85,0.2)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${themeColors[activeTheme].color}, #FF2D92)` }}
              >
                <span className="font-display text-sm font-black text-white">N</span>
              </div>
              <span className="font-display text-lg font-bold text-white">NOTILUS</span>
            </div>
            
            <p className="text-xs text-white/40 font-sans">
              2024 Notilus Browser. Tous droits reserves.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/40 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setShowDemo(false)}
            />
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <GxCard 
                title="Demo Interactive" 
                variant="elevated"
                titleIcon={
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                <button
                  onClick={() => setShowDemo(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-white/60 hover:text-white hover:bg-primary/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="aspect-video rounded-xl bg-[#0B0B11] border border-[rgba(255,45,85,0.2)] flex items-center justify-center mb-6 overflow-hidden">
                  <div className="text-center">
                    <GxSpinner size={48} />
                    <p className="text-sm text-white/50 mt-4 font-sans">Video de demonstration bientot disponible</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <GxButton variant="ghost" onClick={() => setShowDemo(false)}>
                    Fermer
                  </GxButton>
                  <GxButton variant="primary">
                    Telecharger
                  </GxButton>
                </div>
              </GxCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
