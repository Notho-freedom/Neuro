"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { AIState } from "./state-indicator";

// ==============================================
// PARTICLE FIELD - Background neural animation
// Creates ambient particle network effect
// ==============================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface ParticleFieldProps {
  state?: AIState;
  particleCount?: number;
  className?: string;
}

function ParticleField({
  state = "idle",
  particleCount = 50,
  className,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  const stateColors: Record<AIState, { r: number; g: number; b: number }> = {
    idle: { r: 100, g: 180, b: 220 },
    listening: { r: 0, g: 220, b: 255 },
    thinking: { r: 220, g: 100, b: 220 },
    speaking: { r: 255, g: 180, b: 50 },
    error: { r: 255, g: 80, b: 80 },
  };

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    },
    [particleCount]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const color = stateColors[state];
    const speedMultiplier = state === "thinking" ? 2 : state === "idle" ? 0.5 : 1;

    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (const particle of particlesRef.current) {
      // Move
      particle.x += particle.vx * speedMultiplier;
      particle.y += particle.vy * speedMultiplier;

      // Slight attraction to mouse
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        particle.vx += dx * 0.00005;
        particle.vy += dy * 0.00005;
      }

      // Boundary wrap
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Limit speed
      const speed = Math.sqrt(
        particle.vx * particle.vx + particle.vy * particle.vy
      );
      if (speed > 1) {
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.alpha})`;
      ctx.fill();
    }

    // Draw connections
    const connectionDistance = state === "thinking" ? 120 : 80;
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [state, stateColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none z-0", className)}
      style={{ opacity: state === "idle" ? 0.4 : 0.7 }}
    />
  );
}

export { ParticleField };
