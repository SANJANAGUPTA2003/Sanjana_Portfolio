"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Mail, FileDown, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SceneSection } from "@/components/ui/ChapterBridge";
import { shouldRunScrollAnimation, useMotionProfile } from "@/lib/motion";
import { siteConfig } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    external: false,
    download: false,
  },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: siteConfig.linkedin,
    icon: LinkedInIcon,
    external: true,
    download: false,
  },
  {
    label: "GitHub",
    value: "View repositories",
    href: siteConfig.github,
    icon: GitHubIcon,
    external: true,
    download: false,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: siteConfig.resumeUrl,
    icon: FileDown,
    external: false,
    download: true,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || !shouldRunScrollAnimation()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".contact-link").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -20, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 65%",
              scrub: 0.3,
            },
            delay: i * 0.05,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SceneSection
      id="contact"
      className="section-padding section-anchor py-24 lg:py-32 bg-bg-secondary/40"
    >
      <div ref={sectionRef} className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="section-label mb-3">Contact</p>
          <h2 className="section-title">Let&apos;s build something meaningful</h2>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary leading-relaxed">
            Open to full-time roles, contract work, and collaborations.
            I typically respond within 24 hours.
          </p>

          <div className="mt-10">
            <MagneticButton
              href={`mailto:${siteConfig.email}`}
              variant="primary"
              className="text-base px-8 py-4"
            >
              <Mail size={18} />
              Get in touch
            </MagneticButton>
          </div>
        </div>

        <div className="relative mt-16 flex gap-6">
          <div className="hidden w-px shrink-0 sm:block">
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-accent/40"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            {contactLinks.map((link) => (
              <ContactCard key={link.label} link={link} />
            ))}
          </div>
        </div>
      </div>
    </SceneSection>
  );
}

function ContactCard({
  link,
}: {
  link: (typeof contactLinks)[0];
}) {
  const [iconOffset, setIconOffset] = useState({ x: 0, y: 0 });
  const { enableHoverMotion } = useMotionProfile();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enableHoverMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setIconOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.04,
      y: (e.clientY - rect.top - rect.height / 2) * 0.04,
    });
  };

  return (
    <motion.a
      href={link.href}
      download={link.download || undefined}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="contact-link group flex items-center justify-between card-surface p-4 sm:p-5"
      data-cursor="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIconOffset({ x: 0, y: 0 })}
      whileHover={
        enableHoverMotion
          ? {
              borderColor: "rgba(143, 167, 146, 0.25)",
              boxShadow: "0 12px 40px rgba(143, 167, 146, 0.06)",
            }
          : undefined
      }
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-primary text-text-secondary transition-colors group-active:text-accent sm:group-hover:text-accent"
          animate={
            enableHoverMotion
              ? { x: iconOffset.x, y: iconOffset.y }
              : { x: 0, y: 0 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <link.icon className="h-[18px] w-[18px]" />
        </motion.span>
        <div>
          <p className="text-sm font-medium text-text-primary">{link.label}</p>
          <p className="text-sm text-text-secondary">{link.value}</p>
        </div>
      </div>
      <ArrowUpRight
        size={16}
        className="text-text-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
      />
    </motion.a>
  );
}
