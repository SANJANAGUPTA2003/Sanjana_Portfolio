"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { readMotionProfile, useMotionProfile } from "@/lib/motion";

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMobile, prefersReducedMotion, enableContinuousMotion } =
    useMotionProfile();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      drift: number;
    }> = [];

    const orbs: Array<{
      x: number;
      y: number;
      radius: number;
      pulse: number;
      speed: number;
      offsetX: number;
      offsetY: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles.length = 0;
      orbs.length = 0;

      const profile = readMotionProfile();
      const scale = profile.particleScale;

      const particleCount = Math.max(
        6,
        Math.floor(Math.min(42, window.innerWidth / 40) * scale)
      );
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.14,
          size: Math.random() * 1.6 + 0.4,
          alpha: Math.random() * 0.4 + 0.12,
          drift: Math.random() * Math.PI * 2,
        });
      }

      const orbCount = Math.max(
        4,
        Math.floor(Math.min(22, window.innerWidth / 70) * scale)
      );
      for (let i = 0; i < orbCount; i++) {
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 4 + Math.random() * 8,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.006 + Math.random() * 0.01,
          offsetX: Math.random() * Math.PI * 2,
          offsetY: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawTerrain = () => {
      const w = canvas.width;
      const h = canvas.height;
      const horizon = h * 0.58;
      const drift = time * 0.00045;

      ctx.beginPath();
      ctx.moveTo(0, h);

      for (let x = 0; x <= w; x += 6) {
        const wave =
          Math.sin(x * 0.0035 + drift) * 22 +
          Math.sin(x * 0.008 + drift * 1.6) * 14 +
          Math.sin(x * 0.0015 + drift * 0.5) * 8;
        ctx.lineTo(x, horizon + wave);
      }

      ctx.lineTo(w, h);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, horizon - 50, 0, h);
      gradient.addColorStop(0, "rgba(143, 167, 146, 0.055)");
      gradient.addColorStop(1, "rgba(14, 15, 17, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      for (let x = 0; x <= w; x += 5) {
        const wave =
          Math.sin(x * 0.005 + drift * 1.3) * 16 +
          Math.sin(x * 0.012 + drift * 0.8) * 8;
        ctx.lineTo(x, horizon + 34 + wave);
      }
      ctx.strokeStyle = "rgba(143, 167, 146, 0.08)";
      ctx.lineWidth = 0.7;
      ctx.stroke();
    };

    const drawMesh = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cols = 12;
      const rows = 7;
      const cellW = w / cols;
      const cellH = (h * 0.5) / rows;
      const drift = time * 0.00035;
      const baseY = h * 0.12;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const sway = Math.sin(time * 0.0008 + r * 0.6 + c * 0.4) * 14;
          const x1 = c * cellW + Math.sin(r + drift) * 12 + sway;
          const y1 = baseY + r * cellH + Math.cos(c + drift) * 10;
          const x2 = (c + 1) * cellW + Math.sin(r + drift + 0.5) * 12 + sway * 0.8;
          const y2 = baseY + r * cellH + Math.cos(c + 1 + drift) * 10;
          const x3 = c * cellW + Math.sin(r + 1 + drift) * 12 + sway * 0.6;
          const y3 = baseY + (r + 1) * cellH + Math.cos(c + drift + 0.3) * 10;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x3, y3);
          ctx.closePath();
          ctx.fillStyle = "rgba(143, 167, 146, 0.012)";
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = "rgba(143, 167, 146, 0.035)";
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    };

    const draw = () => {
      time += 16;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawMesh();
      drawTerrain();

      particles.forEach((p) => {
        p.drift += 0.008;
        p.x += p.vx + Math.sin(p.drift) * 0.06;
        p.y += p.vy + Math.cos(p.drift * 0.9) * 0.05;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const twinkle = 0.65 + Math.sin(p.drift * 2) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(143, 167, 146, ${p.alpha * twinkle})`;
        ctx.fill();
      });

      orbs.forEach((o) => {
        o.pulse += o.speed;
        const floatX = o.x + Math.sin(time * 0.0006 + o.offsetX) * 28;
        const floatY = o.y + Math.cos(time * 0.0005 + o.offsetY) * 22;
        const glow = 0.12 + Math.sin(o.pulse) * 0.12;
        const radius = o.radius + Math.sin(o.pulse * 1.4) * 2;

        const gradient = ctx.createRadialGradient(
          floatX,
          floatY,
          0,
          floatX,
          floatY,
          radius * 3
        );
        gradient.addColorStop(0, `rgba(143, 167, 146, ${glow})`);
        gradient.addColorStop(1, "rgba(143, 167, 146, 0)");
        ctx.beginPath();
        ctx.arc(floatX, floatY, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <motion.div
        className="absolute h-[28rem] w-[28rem] rounded-full blur-[100px] hidden md:block"
        style={{
          background: "rgba(143, 167, 146, 0.08)",
          left: "58%",
          top: "18%",
        }}
        animate={{
          x: [0, 24, -12, 0],
          y: [0, -18, 10, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute h-[22rem] w-[22rem] rounded-full blur-[90px] hidden md:block"
        style={{
          background: "rgba(143, 167, 146, 0.05)",
          left: "8%",
          top: "55%",
        }}
        animate={{
          x: [0, -20, 14, 0],
          y: [0, 16, -10, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className={`absolute inset-0 ${isMobile ? "opacity-20" : "opacity-30"}`}
        animate={enableContinuousMotion ? { opacity: [0.22, 0.32, 0.22] } : { opacity: 0.24 }}
        transition={
          enableContinuousMotion
            ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 70% 38%, rgba(143, 167, 146, 0.16) 0%, transparent 55%), radial-gradient(ellipse 38% 32% at 18% 72%, rgba(143, 167, 146, 0.08) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
