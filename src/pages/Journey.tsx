"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import MilestoneFocus from "@/components/MilestoneFocus";
import { ScrollReveal, RevealText } from '@/components/ScrollReveal';
import { MILESTONES, PHOTOS, type Milestone } from "@/journeyData";

function JourneyMilestone({
  item,
  isLast,
  onFocus,
}: {
  item: Milestone;
  isLast: boolean;
  onFocus: () => void;
}) {
  const hasKids = Boolean(item.children?.length);

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            width: 26, height: 26, backgroundColor: "#2f80d8",
            border: "2.5px solid #123a6b", zIndex: 2,
          }}
        />
        {!isLast && (
          <TimelineConnector
            sx={{
              height: { xs: 48, sm: 64, md: 80 }, backgroundColor: "transparent",
              "&::before": {
                content: '""', position: "absolute", top: 0, left: "50%",
                transform: "translateX(-50%)", width: 4, height: "100%",
                background: "#123a6b", borderRadius: 2,
              },
            }}
          />
        )}
      </TimelineSeparator>

      <TimelineContent className="md:px-6 lg:px-10 py-4">
        <ScrollReveal direction="up" delay={0.1}>
          <motion.div
            role="button"
            tabIndex={0}
            className="romantic-card reg-tick w-full text-left cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            whileHover={{ y: -6 }}
            onClick={onFocus}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onFocus(); }
            }}
            aria-label={`Open ${item.title} in focused view`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cream-100 border-2 border-rose-700 flex items-center justify-center text-2xl">
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className="press-label mb-1">{item.date}</p>
                <RevealText
                  text={item.title}
                  className="font-romantic type-subtitle text-rose-700 mb-2"
                  delay={0.1}
                />
                <p className="text-sage-700 type-body leading-relaxed">{item.desc}</p>

                {hasKids && (
                  <p className="press-label mt-3 opacity-70">
                    {item.children!.length} sub-journey{item.children!.length === 1 ? "" : "ies"}
                  </p>
                )}
              </div>

              {/* expand affordance */}
              <span
                className="flex-shrink-0 w-11 h-11 rounded-full grid place-items-center border-2 border-rose-700 bg-cream-50 text-rose-700 transition-all duration-300"
                aria-hidden="true"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </div>
          </motion.div>
        </ScrollReveal>
      </TimelineContent>
    </TimelineItem>
  );
}

function Journey() {
  const [isMobile, setIsMobile] = useState(false);
  const [focused, setFocused] = useState<Milestone | null>(null);
  const matched = useMemo(() => PHOTOS.filter(p => p.slug).length, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="page-container min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src={bluerealbackground3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-cream-50/85" />
        <div className="absolute inset-0 halftone-fade" />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-8 px-4 flex-1">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <p className="press-label mb-2">our route so far</p>
              <RevealText
                text="every road we took"
                className="font-romantic type-title ink-mark"
                delay={0.2}
              />
              <p className="text-rose-600 type-lead mt-3">
                {PHOTOS.length === 0
                  ? "sub-journeys marked — photos land soon"
                  : `${matched} photo${matched === 1 ? "" : "s"} wired into the timeline`}
              </p>
              <p className="press-label mt-4 opacity-70">tap any card to open it</p>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <Timeline position={isMobile ? "right" : "alternate"}>
              {MILESTONES.map((m, i) => (
                <JourneyMilestone
                  key={m.slug}
                  item={m}
                  isLast={i === MILESTONES.length - 1}
                  onFocus={() => setFocused(m)}
                />
              ))}
            </Timeline>
          </div>
        </ScrollReveal>

        {/* Focused milestone — dark scrim, centred card, sub-journey nav */}
        <AnimatePresence>
          {focused && (
            <MilestoneFocus item={focused} onClose={() => setFocused(null)} />
          )}
        </AnimatePresence>

        <footer className="relative z-10 py-8 px-4 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-600 type-lead bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2">
              the map isn't finished
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Journey;
