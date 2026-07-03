"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { HeroButton } from "@/components/ui/HeroButton";
import { useMotionProfile } from "@/lib/motion";
import { siteConfig } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export function CinematicHero() {
  const { enableContinuousMotion, floatIntensity, prefersReducedMotion, revealDistance } =
    useMotionProfile();

  const entrance = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: revealDistance * 0.5 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="relative z-10 min-h-[100svh] bg-bg-primary">
      <div className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        <HeroBackground />

        <div className="relative z-20 flex flex-1 items-center">
          <div className="section-padding w-full py-16 sm:py-20 lg:py-28">
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
              <div className="order-2 flex flex-col justify-center lg:order-1">
                <motion.p
                  className="font-hero-body mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-accent/80"
                  {...entrance}
                  transition={{ duration: 0.7, delay: 0.05, ease }}
                >
                  Portfolio
                </motion.p>

                <motion.h1
                  className="font-hero-display text-[2.75rem] font-bold leading-[0.92] tracking-[-0.04em] text-text-primary sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]"
                  {...entrance}
                  transition={{ duration: 0.85, delay: 0.12, ease }}
                >
                  SANJANA
                </motion.h1>

                <motion.div
                  className="my-5 h-px bg-accent/35"
                  initial={prefersReducedMotion ? false : { width: 0, opacity: 0 }}
                  animate={{ width: 72, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.28, ease }}
                />

                <motion.p
                  className="font-hero-display text-lg font-semibold text-accent sm:text-2xl lg:text-[1.65rem]"
                  {...entrance}
                  transition={{ duration: 0.75, delay: 0.34, ease }}
                >
                  {siteConfig.heroRole}
                </motion.p>

                <motion.p
                  className="font-hero-body mt-5 max-w-xl text-base leading-[1.7] text-text-secondary sm:text-[1.05rem] lg:max-w-lg"
                  {...entrance}
                  transition={{ duration: 0.75, delay: 0.44, ease }}
                >
                  {siteConfig.heroTagline}
                </motion.p>

                <motion.div
                  className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
                  {...entrance}
                  transition={{ duration: 0.75, delay: 0.54, ease }}
                >
                  <HeroButton href="#work" variant="primary">
                    View Work
                  </HeroButton>
                  <HeroButton
                    href={siteConfig.resumeUrl}
                    variant="secondary"
                    download
                  >
                    <Download size={16} />
                    Download Resume
                  </HeroButton>
                  <HeroButton href="#contact" variant="ghost">
                    Let&apos;s Connect
                  </HeroButton>
                </motion.div>
              </div>

              <motion.div
                className="order-1 flex justify-center lg:order-2 lg:justify-end"
                {...entrance}
                transition={{ duration: 0.9, delay: 0.35, ease }}
              >
                {enableContinuousMotion ? (
                  <motion.div
                    className="mx-auto shrink-0 lg:mx-0"
                    animate={{ y: [0, -4 * floatIntensity, 0] }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2,
                    }}
                    data-cursor="image"
                  >
                    <Image
                      src={siteConfig.images.hero}
                      alt={`${siteConfig.name} — professional portrait`}
                      width={819}
                      height={1024}
                      className="h-auto w-[16rem] rounded-2xl sm:w-[19rem] lg:w-[22rem]"
                      priority
                      quality={100}
                      unoptimized
                    />
                  </motion.div>
                ) : (
                  <div className="mx-auto shrink-0 lg:mx-0" data-cursor="image">
                    <Image
                      src={siteConfig.images.hero}
                      alt={`${siteConfig.name} — professional portrait`}
                      width={819}
                      height={1024}
                      className="h-auto w-[16rem] rounded-2xl sm:w-[19rem] lg:w-[22rem]"
                      priority
                      quality={100}
                      unoptimized
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
