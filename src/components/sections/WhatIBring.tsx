"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatMotion } from "@/components/ui/FloatMotion";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { SceneSection } from "@/components/ui/ChapterBridge";
import { scrollTriggerStart, shouldRunScrollAnimation } from "@/lib/motion";
import { whatIBring } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhatIBring() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !shouldRunScrollAnimation()) return;

    const cards = gsap.utils.toArray<HTMLElement>(".bring-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: scrollTriggerStart("top 70%", "top 85%"),
        },
      }
    );
  }, []);

  return (
    <SceneSection className="section-padding section-anchor py-16 sm:py-24 lg:py-32 bg-bg-secondary/40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-3">What I Bring</p>
          <h2 className="section-title">Engineering with purpose</h2>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whatIBring.map((item, i) => (
            <FloatMotion
              key={item.title}
              delay={i * 0.4}
              duration={4.5 + i * 0.3}
              intensity={3}
            >
              <MagneticCard className="bring-card card-surface p-6" strength={0.06}>
                <span className="text-xs font-mono text-accent/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-medium text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </MagneticCard>
            </FloatMotion>
          ))}
        </div>
      </div>
    </SceneSection>
  );
}
