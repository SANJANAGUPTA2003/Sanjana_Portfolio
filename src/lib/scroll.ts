import type { MouseEvent } from "react";

export const SCROLL_OFFSET = 96;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = (
    window as Window & { __lenis?: { scrollTo: (target: number, opts?: object) => void } }
  ).__lenis;

  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

  if (lenis) {
    lenis.scrollTo(top, { duration: 1.4 });
    return;
  }

  window.scrollTo({ top, behavior: "smooth" });
}

export function handleNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  onDone?: () => void
) {
  if (!href.startsWith("#")) return;

  e.preventDefault();
  const id = href.replace("#", "");
  if (id === "" || href === "#") {
    const lenis = (window as Window & { __lenis?: { scrollTo: (target: number) => void } })
      .__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    scrollToSection(id);
  }
  onDone?.();
}
