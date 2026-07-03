"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionProfile } from "@/lib/motion";

interface ChapterBridgeProps {
  from?: "primary" | "secondary";
  to?: "primary" | "secondary";
}

export function ChapterBridge({
  from = "primary",
  to = "secondary",
}: ChapterBridgeProps) {
  const fromClass = from === "primary" ? "from-bg-primary" : "from-bg-secondary/40";
  const toClass = to === "primary" ? "to-bg-primary" : "to-bg-secondary/40";

  return (
    <div
      className="relative z-20 h-12 overflow-hidden sm:h-16 md:h-20"
      aria-hidden
    >
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent sm:inset-x-8 lg:inset-x-16 xl:inset-x-24" />
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${fromClass} via-accent/[0.015] ${toClass}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

interface SceneSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SceneSection({ children, className, id }: SceneSectionProps) {
  const { revealDistance, prefersReducedMotion } = useMotionProfile();

  if (prefersReducedMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: revealDistance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
