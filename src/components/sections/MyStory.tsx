"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollTriggerStart, shouldRunScrollAnimation, useMotionProfile } from "@/lib/motion";
import { siteConfig, storyTimeline } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { revealDistance, prefersReducedMotion } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.35"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0.08, 0.35], [0, 1]);
  const sectionY = useTransform(
    scrollYProgress,
    [0.08, 0.35],
    [revealDistance, 0]
  );

  useEffect(() => {
    if (!contentRef.current || !lineRef.current || !shouldRunScrollAnimation()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 65%",
            end: "bottom 35%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".story-milestone").forEach((el) => {
        const year = el.querySelector(".story-year");
        const body = el.querySelector(".story-body");
        const dot = el.querySelector(".story-dot");

        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: scrollTriggerStart("top 78%", "top 88%"),
            end: scrollTriggerStart("top 50%", "top 62%"),
            scrub: 0.5,
          },
        })
          .fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2 })
          .fromTo(year, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.3 })
          .fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="section-anchor relative z-20 bg-bg-primary"
    >
      <motion.div
        className="section-padding overflow-hidden py-16 sm:py-24 lg:py-32"
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: sectionOpacity, y: sectionY }
        }
      >
        <div ref={contentRef} className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <p className="section-label mb-3">My Story</p>
            <h2 className="section-title">She built herself</h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              An ordinary beginning. Continuous learning. Real work. Real growth.
              Still writing the next chapter.
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-[auto_1fr] lg:gap-20 lg:items-start">
            <div className="flex justify-center lg:justify-start">
              <div
                className="relative h-72 w-72 shrink-0 overflow-hidden rounded-full border border-border sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                data-cursor="image"
              >
                <Image
                  src={siteConfig.images.podium}
                  alt="Sanjana Gupta receiving YUVA Award of Appreciation"
                  fill
                  quality={100}
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </div>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-[7px] top-0 h-full w-px origin-top bg-border">
                <div
                  ref={lineRef}
                  className="h-full w-full origin-top bg-accent/60"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>

              <div className="space-y-0">
                {storyTimeline.map((item) => (
                  <div
                    key={item.year + item.title}
                    className="story-milestone relative pb-14 pl-6 last:pb-0"
                  >
                    <div className="story-dot absolute -left-[9px] top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg-primary" />
                    <span className="story-year block font-mono text-sm text-accent">
                      {item.year}
                    </span>
                    <div className="story-body">
                      <h3 className="mt-1 text-lg font-medium text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
