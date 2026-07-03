"use client";

import { useEffect, useState } from "react";

export type MotionProfile = {
  isMobile: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  enableHoverMotion: boolean;
  enableContinuousMotion: boolean;
  enableLenis: boolean;
  floatIntensity: number;
  revealDistance: number;
  particleScale: number;
};

export function readMotionProfile(): MotionProfile {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTouch: false,
      prefersReducedMotion: false,
      enableHoverMotion: true,
      enableContinuousMotion: true,
      enableLenis: true,
      floatIntensity: 1,
      revealDistance: 48,
      particleScale: 1,
    };
  }

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const enableContinuousMotion = !prefersReducedMotion;
  const enableHoverMotion =
    !prefersReducedMotion && !isTouch && window.matchMedia("(pointer: fine)").matches;

  return {
    isMobile,
    isTouch,
    prefersReducedMotion,
    enableHoverMotion,
    enableContinuousMotion,
    enableLenis: !prefersReducedMotion && !isMobile && !isTouch,
    floatIntensity: prefersReducedMotion ? 0 : isMobile ? 0.45 : 1,
    revealDistance: isMobile ? 24 : 48,
    particleScale: prefersReducedMotion ? 0 : isMobile ? 0.45 : 1,
  };
}

export function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState(readMotionProfile);

  useEffect(() => {
    const update = () => setProfile(readMotionProfile());

    const queries = [
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(pointer: fine)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];

    queries.forEach((mq) => mq.addEventListener("change", update));
    window.addEventListener("resize", update, { passive: true });

    return () => {
      queries.forEach((mq) => mq.removeEventListener("change", update));
      window.removeEventListener("resize", update);
    };
  }, []);

  return profile;
}

export function shouldRunScrollAnimation(): boolean {
  if (typeof window === "undefined") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollTriggerStart(desktop = "top 70%", mobile = "top 82%"): string {
  if (typeof window === "undefined") return desktop;
  return window.matchMedia("(max-width: 767px)").matches ? mobile : desktop;
}
