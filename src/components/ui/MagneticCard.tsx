"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionProfile } from "@/lib/motion";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticCard({
  children,
  className,
  strength = 0.08,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { enableHoverMotion } = useMotionProfile();

  const handleMouse = (e: MouseEvent) => {
    if (!enableHoverMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  if (!enableHoverMotion) {
    return (
      <div className={cn(className)} data-cursor="card">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      data-cursor="card"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      whileHover={{ y: position.y === 0 && position.x === 0 ? -2 : undefined }}
    >
      {children}
    </motion.div>
  );
}
