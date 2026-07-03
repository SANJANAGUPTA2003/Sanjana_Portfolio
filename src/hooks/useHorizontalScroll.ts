"use client";

import { useRef, useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldRunScrollAnimation } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useHorizontalScroll(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  pinRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !pinRef.current) return;
    if (!shouldRunScrollAnimation()) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const pin = pinRef.current;

    const mm = gsap.matchMedia();

    const setup = (scrub: number) => {
      const getDistance = () =>
        Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin,
          scrub,
          start: "top top",
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    mm.add("(max-width: 767px)", () => setup(0.65));
    mm.add("(min-width: 768px)", () => setup(0.8));

    return () => mm.revert();
  }, [sectionRef, trackRef, pinRef]);
}
