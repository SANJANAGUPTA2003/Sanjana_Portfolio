"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionProfile } from "@/lib/motion";

interface FloatMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  intensity?: number;
}

export function FloatMotion({
  children,
  className,
  delay = 0,
  duration = 5,
  intensity = 4,
}: FloatMotionProps) {
  const { enableContinuousMotion, floatIntensity } = useMotionProfile();
  const amount = intensity * floatIntensity;

  if (!enableContinuousMotion || amount <= 0) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      animate={{ y: [0, -amount, 0] }}
      transition={{
        duration: duration + (floatIntensity < 1 ? 1.5 : 0),
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface BreatheCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BreatheCard({ children, className, delay = 0 }: BreatheCardProps) {
  const { enableContinuousMotion, enableHoverMotion, floatIntensity } =
    useMotionProfile();
  const lift = 3 * floatIntensity;

  if (!enableContinuousMotion) {
    return (
      <div className={cn("card-surface", className)} data-cursor="card">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("card-surface", className)}
      data-cursor="card"
      animate={{
        y: [0, -lift, 0],
        boxShadow: [
          "0 0 0 rgba(143,167,146,0)",
          `0 8px 32px rgba(143,167,146,${0.06 * floatIntensity})`,
          "0 0 0 rgba(143,167,146,0)",
        ],
      }}
      transition={{
        duration: 6 + (floatIntensity < 1 ? 2 : 0),
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={
        enableHoverMotion
          ? {
              y: -5,
              borderColor: "rgba(143, 167, 146, 0.25)",
              boxShadow: "0 12px 40px rgba(143, 167, 146, 0.08)",
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
