"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SceneSection } from "@/components/ui/ChapterBridge";
import {
  scrollTriggerStart,
  shouldRunScrollAnimation,
  useMotionProfile,
} from "@/lib/motion";
import { techStackGroups, techFlow } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { enableHoverMotion, enableContinuousMotion, floatIntensity } =
    useMotionProfile();

  useEffect(() => {
    if (!sectionRef.current || !shouldRunScrollAnimation()) return;

    const ctx = gsap.context(() => {
      gsap.from(".flow-node", {
        opacity: 0,
        y: 30,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".flow-chain",
          start: scrollTriggerStart("top 75%", "top 85%"),
        },
      });

      gsap.from(".flow-line", {
        scaleY: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".flow-chain",
          start: scrollTriggerStart("top 70%", "top 82%"),
        },
      });

      gsap.utils.toArray<HTMLElement>(".stack-item").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: el,
              start: scrollTriggerStart("top 85%", "top 92%"),
              end: scrollTriggerStart("top 60%", "top 72%"),
              scrub: 0.3,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const floatY = 4 * floatIntensity;
  const floatRotate = floatIntensity;

  return (
    <SceneSection id="stack" className="section-padding section-anchor py-16 sm:py-24 lg:py-32">
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <p className="section-label mb-3">Tech Stack</p>
          <h2 className="section-title">Tools of the craft</h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div className="flow-chain flex flex-col items-center">
            {techFlow.map((tech, i) => (
              <div key={tech} className="flex flex-col items-center">
                <motion.div
                  className="flow-node card-surface px-5 py-3 text-sm font-medium text-text-primary sm:px-6"
                  data-cursor="button"
                  onMouseEnter={() => enableHoverMotion && setHovered(tech)}
                  onMouseLeave={() => setHovered(null)}
                  animate={
                    enableContinuousMotion
                      ? {
                          y: [0, -floatY, 0],
                          rotate: [0, i % 2 === 0 ? floatRotate : -floatRotate, 0],
                          borderColor:
                            hovered === tech
                              ? "rgba(143, 167, 146, 0.4)"
                              : "rgba(255,255,255,0.08)",
                        }
                      : {
                          borderColor:
                            hovered === tech
                              ? "rgba(143, 167, 146, 0.4)"
                              : "rgba(255,255,255,0.08)",
                        }
                  }
                  transition={{
                    y: {
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 5 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    borderColor: { duration: 0.3 },
                  }}
                  whileHover={enableHoverMotion ? { scale: 1.03 } : undefined}
                  whileTap={{ scale: 0.98 }}
                >
                  {tech}
                </motion.div>
                {i < techFlow.length - 1 && (
                  <div className="relative my-1 h-8 w-px">
                    <div className="flow-line absolute inset-0 origin-top bg-accent/20" />
                    {enableContinuousMotion && (
                      <motion.div
                        className="absolute inset-0 origin-top bg-accent/50"
                        animate={{ scaleY: [0.2, 1, 0.2] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {techStackGroups.map((group) => (
              <div key={group.category}>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-text-secondary sm:mb-6">
                  {group.category}
                </h3>
                <div className="space-y-2">
                  {group.items.map((item, idx) => (
                    <motion.div
                      key={item}
                      className="stack-item flex items-center gap-3 card-surface px-4 py-3"
                      data-cursor="card"
                      animate={
                        enableContinuousMotion
                          ? {
                              y: [0, -2 * floatIntensity, 0],
                              rotate: [
                                0,
                                idx % 2 === 0 ? 0.4 * floatIntensity : -0.4 * floatIntensity,
                                0,
                              ],
                              borderColor:
                                hovered && techFlow.includes(item)
                                  ? "rgba(143, 167, 146, 0.25)"
                                  : "rgba(255,255,255,0.08)",
                            }
                          : {
                              borderColor:
                                hovered && techFlow.includes(item)
                                  ? "rgba(143, 167, 146, 0.25)"
                                  : "rgba(255,255,255,0.08)",
                            }
                      }
                      transition={{
                        y: {
                          duration: 4 + idx * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        rotate: {
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        borderColor: { duration: 0.3 },
                      }}
                      whileHover={
                        enableHoverMotion
                          ? { x: 6, borderColor: "rgba(143, 167, 146, 0.3)" }
                          : undefined
                      }
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
                      <span className="text-sm text-text-primary">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneSection>
  );
}
