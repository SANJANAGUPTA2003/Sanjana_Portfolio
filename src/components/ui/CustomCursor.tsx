"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "button" | "card" | "image" | "link";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const ringScale = useSpring(1, { stiffness: 300, damping: 25 });
  const ringSize = useSpring(32, { stiffness: 300, damping: 25 });

  const updateCursorState = useCallback((target: HTMLElement) => {
    const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
    if (cursorAttr === "button") setCursorState("button");
    else if (cursorAttr === "card") setCursorState("card");
    else if (cursorAttr === "image") setCursorState("image");
    else if (cursorAttr === "link") setCursorState("link");
    else if (target.closest("a, button, [role='button']")) setCursorState("hover");
    else setCursorState("default");
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
      updateCursorState(e.target as HTMLElement);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, visible, updateCursorState]);

  useEffect(() => {
    if (!enabled) return;

    const sizes: Record<CursorState, number> = {
      default: 32,
      hover: 48,
      button: 56,
      card: 64,
      image: 80,
      link: 40,
    };

    const scales: Record<CursorState, number> = {
      default: 1,
      hover: 1,
      button: 1.2,
      card: 1.1,
      image: 1.3,
      link: 0.9,
    };

    ringSize.set(sizes[cursorState]);
    ringScale.set(scales[cursorState]);
  }, [cursorState, enabled, ringSize, ringScale]);

  if (!enabled) return null;

  const showRing = cursorState !== "default";

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          scale: ringScale,
          opacity: visible && showRing ? 1 : 0,
        }}
      >
        <div
          className="h-full w-full rounded-full border border-accent/50"
          style={{
            animation: showRing ? "pulse-ring 2s ease-out infinite" : "none",
          }}
        />
      </motion.div>
    </>
  );
}
