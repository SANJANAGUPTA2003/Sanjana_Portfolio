"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/portfolio";

const socialLinks = [
  { href: siteConfig.github, icon: GitHubIcon, label: "GitHub" },
  { href: siteConfig.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-padding border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-text-primary">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Frontend Developer · Still writing the next chapter
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-accent/30 hover:text-accent"
              aria-label={link.label}
              data-cursor="link"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <link.icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>

        <p className="text-xs text-text-secondary">
          © {year} Sanjana Gupta
        </p>
      </div>
    </footer>
  );
}
