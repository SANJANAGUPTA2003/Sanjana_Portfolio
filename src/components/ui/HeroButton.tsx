"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionProfile } from "@/lib/motion";

interface HeroButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
}

export function HeroButton({
  children,
  className,
  href,
  variant = "primary",
  download,
}: HeroButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { enableHoverMotion } = useMotionProfile();

  const handleMouse = (e: MouseEvent) => {
    if (!enableHoverMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.12,
      y: (e.clientY - rect.top - rect.height / 2) * 0.12,
    });
  };

  const variants = {
    primary:
      "bg-accent text-bg-primary border border-accent shadow-[0_0_0_rgba(143,167,146,0)] hover:shadow-[0_8px_28px_rgba(143,167,146,0.22)] active:scale-[0.98]",
    secondary:
      "bg-white/[0.03] text-text-primary border border-border hover:border-accent/35 hover:shadow-[0_8px_24px_rgba(143,167,146,0.08)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:shadow-[0_4px_20px_rgba(143,167,146,0.06)] active:scale-[0.98]",
  };

  const motionProps = enableHoverMotion
    ? {
        animate: { x: position.x, y: position.y },
        transition: { type: "spring" as const, stiffness: 280, damping: 22 },
        onMouseMove: handleMouse,
        onMouseLeave: () => setPosition({ x: 0, y: 0 }),
        whileHover: { y: -2 },
      }
    : {};

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download || undefined}
      data-cursor="button"
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-[box-shadow,border-color,color,transform] duration-300 sm:px-6",
        variants[variant],
        className
      )}
      whileTap={{ scale: 0.98 }}
      {...motionProps}
    >
      {children}
    </motion.a>
  );
}
