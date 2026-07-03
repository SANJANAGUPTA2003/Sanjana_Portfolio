"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionProfile } from "@/lib/motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  download?: boolean;
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  external,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { enableHoverMotion } = useMotionProfile();

  const handleMouse = (e: MouseEvent) => {
    if (!enableHoverMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary:
      "bg-accent text-bg-primary hover:bg-accent/90 border border-accent active:scale-[0.98]",
    secondary:
      "bg-transparent text-text-primary border border-border hover:border-accent/40 hover:text-accent active:scale-[0.98]",
    ghost:
      "bg-transparent text-text-secondary border border-transparent hover:text-text-primary active:scale-[0.98]",
  };

  const baseClassName = cn(
    "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-300 sm:px-6",
    variants[variant],
    className
  );

  const motionProps = enableHoverMotion
    ? {
        animate: { x: position.x, y: position.y },
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
        onMouseMove: handleMouse,
        onMouseLeave: reset,
      }
    : {};

  if (href) {
    const isHashLink = href.startsWith("#");
    return (
      <motion.a
        ref={ref}
        href={href}
        download={download || undefined}
        target={external && !download && !isHashLink ? "_blank" : undefined}
        rel={external && !download && !isHashLink ? "noopener noreferrer" : undefined}
        data-cursor="button"
        className={baseClassName}
        whileTap={{ scale: 0.98 }}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      data-cursor="button"
      className={baseClassName}
      whileTap={{ scale: 0.98 }}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
