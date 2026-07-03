"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { BreatheCard } from "@/components/ui/FloatMotion";
import { SceneSection } from "@/components/ui/ChapterBridge";
import { scrollTriggerStart, shouldRunScrollAnimation } from "@/lib/motion";
import { siteConfig, beyondCode } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BeyondCode() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !shouldRunScrollAnimation()) return;

    const ctx = gsap.context(() => {
      gsap.from(".beyond-card", {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: scrollTriggerStart("top 65%", "top 82%"),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SceneSection id="beyond" className="section-padding section-anchor py-24 lg:py-32">
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <motion.div
            className="relative mx-auto h-72 w-72 shrink-0 overflow-hidden rounded-2xl border border-border sm:h-80 sm:w-80 lg:mx-0"
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="image"
          >
            <Image
              src={siteConfig.images.beyondCode}
              alt="Sanjana Gupta speaking at a podium"
              fill
              quality={100}
              className="object-cover object-[center_25%] grayscale"
              sizes="(max-width: 768px) 288px, 320px"
            />
          </motion.div>

          <div>
            <p className="section-label mb-3">Beyond Code</p>
            <h2 className="section-title">The person behind the work</h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Technical skills open doors. But communication, collaboration,
              and curiosity are what make someone worth working with.
            </p>

            <div className="mt-10 space-y-5">
              {beyondCode.map((section, i) => (
                <BreatheCard
                  key={section.title}
                  className="beyond-card p-5"
                  delay={i * 0.5}
                >
                  <h3 className="font-medium text-text-primary">{section.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {section.points.map((point) => (
                      <li key={point} className="text-sm text-text-secondary">
                        {point}
                      </li>
                    ))}
                  </ul>
                </BreatheCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SceneSection>
  );
}
