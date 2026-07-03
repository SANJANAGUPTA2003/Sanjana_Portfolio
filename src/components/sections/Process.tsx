"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BreatheCard } from "@/components/ui/FloatMotion";
import { SceneSection } from "@/components/ui/ChapterBridge";
import { shouldRunScrollAnimation } from "@/lib/motion";
import { processSteps } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !shouldRunScrollAnimation()) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");

      steps.forEach((step, i) => {
        if (i === steps.length - 1) return;

        gsap.to(step, {
          opacity: 0.35,
          scale: 0.96,
          scrollTrigger: {
            trigger: steps[i + 1],
            start: "top 80%",
            end: "top 50%",
            scrub: 0.4,
          },
        });

        gsap.fromTo(
          steps[i + 1],
          { opacity: 0.3, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: steps[i + 1],
              start: "top 75%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SceneSection id="process" className="section-padding section-anchor py-24 lg:py-32">
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-3">My Process</p>
          <h2 className="section-title">How I ship products</h2>
          <p className="mt-4 text-text-secondary">
            A structured approach from discovery to launch — each stage
            transforms into the next.
          </p>
        </div>

        <div ref={trackRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <BreatheCard key={step.step} className="process-step p-6" delay={i * 0.35}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-xs font-mono text-accent">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </BreatheCard>
          ))}
        </div>
      </div>
    </SceneSection>
  );
}
