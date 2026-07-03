"use client";

import { useRef } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { projects } from "@/data/portfolio";

export function RecentWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useHorizontalScroll(sectionRef, trackRef, pinRef);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-anchor relative z-20 bg-bg-secondary/40"
    >
      <div ref={pinRef} className="min-h-screen overflow-hidden">
        <div className="section-padding pt-20 pb-6 sm:pt-24 sm:pb-8 lg:pt-28">
          <p className="section-label mb-3">Recent Work</p>
          <h2 className="section-title">Built in production</h2>
          <p className="mt-4 max-w-xl text-sm text-text-secondary sm:text-base">
            Real client projects. Real constraints. Real outcomes.
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex w-max gap-6 px-5 pb-20 sm:gap-10 sm:px-8 sm:pb-24 lg:px-16 xl:px-24"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="work-panel w-[min(90vw,920px)] shrink-0 sm:w-[min(85vw,920px)]"
              data-cursor="card"
            >
              <ProjectCard project={project} index={index} />
            </article>
          ))}
          <article className="work-panel flex w-[min(78vw,640px)] shrink-0 items-center sm:w-[min(65vw,640px)]">
            <div className="text-center">
              <p className="section-label mb-4">Next Chapter</p>
              <h3 className="font-display text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
                The next project could be yours
              </h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <div className="card-surface flex h-full flex-col overflow-hidden">
      <div
        className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8 sm:py-5"
        style={{ borderTopColor: project.accent, borderTopWidth: 2 }}
      >
        <div>
          <p className="text-xs font-mono text-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="font-display mt-1 text-xl font-semibold text-text-primary sm:text-2xl lg:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{project.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-8">
        <div className="grid flex-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <CaseBlock label="Problem" content={project.problem} />
          <CaseBlock label="Solution" content={project.approach} />
          <CaseBlock label="Technology" content={project.tech.join(" · ")} />
          <CaseBlock label="Impact" content={project.outcome} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5 sm:mt-8 sm:gap-4 sm:pt-6">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-text-primary transition-all hover:border-accent/40 hover:text-accent active:scale-[0.98]"
            data-cursor="link"
          >
            <ExternalLink size={14} />
            Live Website
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-text-secondary transition-all hover:border-accent/40 hover:text-accent active:scale-[0.98]"
              data-cursor="link"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-text-secondary transition-all hover:border-accent/40 hover:text-accent active:scale-[0.98]"
            data-cursor="link"
          >
            <FileText size={14} />
            Case Study
          </a>
        </div>
      </div>
    </div>
  );
}

function CaseBlock({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
        {label}
      </h4>
      <p className="text-sm leading-relaxed text-text-secondary">{content}</p>
    </div>
  );
}
