"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useMotionProfile } from "@/lib/motion";
import { futureChapters } from "@/data/portfolio";

export function NextChapter() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const { enableHoverMotion } = useMotionProfile();

  return (
    <SectionReveal className="section-padding py-20 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label mb-6">The story continues</p>

        <div className="flex items-center justify-center gap-8 sm:gap-16">
          {futureChapters.map((year) => (
            <motion.button
              key={year}
              className="relative min-h-11 min-w-11 font-mono text-3xl text-text-secondary transition-colors sm:text-5xl"
              onMouseEnter={() => enableHoverMotion && setHoveredYear(year)}
              onMouseLeave={() => setHoveredYear(null)}
              onClick={() => setHoveredYear(year)}
              whileHover={enableHoverMotion ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.98 }}
              data-cursor="button"
            >
              {year}
              <span className="text-accent">?</span>
            </motion.button>
          ))}
        </div>

        <motion.p
          className="mt-10 text-base text-accent sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredYear ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
        >
          {hoveredYear
            ? "Still writing the next chapter."
            : enableHoverMotion
              ? "Hover to reveal what's next."
              : "Tap a year to reveal what's next."}
        </motion.p>
      </div>
    </SectionReveal>
  );
}
