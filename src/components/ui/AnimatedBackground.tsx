"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { readMotionProfile, useMotionProfile } from "@/lib/motion";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const { isMobile, prefersReducedMotion } = useMotionProfile();

  const layerY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, 180]
  );
  const glowShift = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [0.06, 0.06, 0.06] : [0.05, 0.1, 0.06]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const meshCanvas = meshRef.current;
    if (!canvas || !meshCanvas) return;

    const ctx = canvas.getContext("2d");
    const meshCtx = meshCanvas.getContext("2d");
    if (!ctx || !meshCtx) return;

    let animationId: number;
    let scrollFactor = 0;
    let time = 0;

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      glow: number;
    }> = [];

    const resize = () => {
      canvas.width = meshCanvas.width = window.innerWidth;
      canvas.height = meshCanvas.height = window.innerHeight;
    };

    const initNodes = () => {
      nodes.length = 0;
      const scale = readMotionProfile().particleScale;
      const count = Math.max(
        8,
        Math.floor(Math.min(35, window.innerWidth / 45) * scale)
      );
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.08,
          size: Math.random() * 1.2 + 0.4,
          glow: Math.random() * 0.4 + 0.15,
        });
      }
    };

    const drawMesh = () => {
      if (readMotionProfile().isMobile) return;

      meshCtx.clearRect(0, 0, meshCanvas.width, meshCanvas.height);
      const rows = 8;
      const cols = 14;
      const cellW = meshCanvas.width / cols;
      const cellH = meshCanvas.height / rows;
      const drift = time * 0.0003 + scrollFactor * 0.5;

      meshCtx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellW + Math.sin(r + drift) * 12;
          const y = r * cellH + Math.cos(c + drift) * 10 + scrollFactor * 40;
          const nextX = (c + 1) * cellW + Math.sin(r + drift + 0.5) * 12;
          const nextY = r * cellH + Math.cos(c + 1 + drift) * 10 + scrollFactor * 40;

          if (c < cols - 1) {
            meshCtx.moveTo(x, y);
            meshCtx.lineTo(nextX, nextY);
          }
          if (r < rows - 1) {
            const belowX = c * cellW + Math.sin(r + 1 + drift) * 12;
            const belowY =
              (r + 1) * cellH + Math.cos(c + drift + 0.3) * 10 + scrollFactor * 40;
            meshCtx.moveTo(x, y);
            meshCtx.lineTo(belowX, belowY);
          }
        }
      }
      meshCtx.strokeStyle = `rgba(143, 167, 146, ${0.04 + scrollFactor * 0.03})`;
      meshCtx.lineWidth = 0.5;
      meshCtx.stroke();
    };

    const drawNodes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const wake = 0.6 + scrollFactor * (readMotionProfile().isMobile ? 0.2 : 0.5);

      nodes.forEach((n) => {
        n.x += n.vx * wake;
        n.y += n.vy * wake;
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;

        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 4);
        gradient.addColorStop(0, `rgba(143, 167, 146, ${n.glow * wake})`);
        gradient.addColorStop(1, "rgba(143, 167, 146, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    const draw = () => {
      time += 16;
      drawMesh();
      drawNodes();
      animationId = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      if (readMotionProfile().isMobile) {
        scrollFactor = 0;
        return;
      }
      scrollFactor =
        window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
    };

    resize();
    initNodes();
    draw();
    onScroll();

    window.addEventListener("resize", () => {
      resize();
      initNodes();
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-bg-primary"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.canvas
        ref={meshRef}
        className="absolute inset-0 hidden opacity-70 md:block"
        style={{ y: layerY }}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${isMobile ? "opacity-60" : "opacity-90"}`}
      />
      <div className="noise-overlay" />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: glowShift,
          background:
            "radial-gradient(ellipse 70% 45% at 30% 20%, rgba(143, 167, 146, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 70%, rgba(143, 167, 146, 0.06) 0%, transparent 45%)",
        }}
      />
    </div>
  );
}
