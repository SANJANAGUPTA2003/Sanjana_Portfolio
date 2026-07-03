"use client";

import { useRef } from "react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { experience } from "@/data/portfolio";

const careerChapters = [...experience].reverse();

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useHorizontalScroll(sectionRef, trackRef, pinRef);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-anchor relative z-20 bg-bg-primary"
    >
      <div ref={pinRef} className="min-h-screen overflow-hidden">
        <div className="section-padding pt-20 pb-6 sm:pt-24 sm:pb-8 lg:pt-28">
          <p className="section-label mb-3">Experience</p>
          <h2 className="section-title">Where I&apos;ve grown</h2>
        </div>

        <div
          ref={trackRef}
          className="flex w-max gap-6 px-5 pb-20 sm:gap-10 sm:px-8 sm:pb-24 lg:px-16 xl:px-24"
        >
          {careerChapters.map((item) => (
            <article
              key={item.company + item.role}
              className="w-[min(88vw,780px)] shrink-0 sm:w-[min(80vw,780px)]"
              data-cursor="card"
            >
              <ExperienceCard item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ item }: { item: (typeof experience)[0] }) {
  return (
    <div className="card-surface h-full p-6 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-accent">{item.period}</span>
        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">
          {item.type}
        </span>
      </div>
      <h3 className="font-display mt-4 text-xl font-semibold text-text-primary sm:text-2xl lg:text-3xl">
        {item.role}
      </h3>
      <p className="mt-1 text-text-secondary">{item.company}</p>
      <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
        {item.description}
      </p>
      <ul className="mt-5 space-y-2 sm:mt-6">
        {item.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-text-secondary">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
