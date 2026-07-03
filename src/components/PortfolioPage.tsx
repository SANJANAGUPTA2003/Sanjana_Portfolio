"use client";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { ScrollProgress, BackToTop } from "@/components/ui/ScrollProgress";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ChapterBridge } from "@/components/ui/ChapterBridge";
import { Navbar } from "@/components/layout/Navbar";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { MyStory } from "@/components/sections/MyStory";
import { WhatIBring } from "@/components/sections/WhatIBring";
import { TechStack } from "@/components/sections/TechStack";
import { RecentWork } from "@/components/sections/RecentWork";
import { Experience } from "@/components/sections/Experience";
import { BeyondCode } from "@/components/sections/BeyondCode";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { NextChapter } from "@/components/sections/NextChapter";
import { Footer } from "@/components/sections/Footer";

export function PortfolioPage() {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <CustomCursor />
      <AnimatedBackground />
      <ScrollProgress />
      <BackToTop />

      <div className="relative z-10">
        <Navbar />
        <main>
          <CinematicHero />
          <MyStory />
          <ChapterBridge from="primary" to="secondary" />
          <WhatIBring />
          <ChapterBridge from="secondary" to="primary" />
          <TechStack />
          <RecentWork />
          <ChapterBridge from="secondary" to="primary" />
          <Experience />
          <ChapterBridge from="primary" to="primary" />
          <BeyondCode />
          <ChapterBridge from="primary" to="primary" />
          <Process />
          <ChapterBridge from="primary" to="secondary" />
          <Contact />
          <NextChapter />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
