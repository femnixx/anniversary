"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import MilestoneFocus from "@/components/MilestoneFocus";
import { ScrollReveal, RevealText } from '@/components/ScrollReveal';
import { MILESTONES, type Milestone } from "@/journeyData";
import { verifyJourneyImages } from "@/journeyImages";

function JourneyMilestone({
  item,
  index,
  total,
  onFocus,
}: {
  item: Milestone;
  index: number;
  total: number;
  onFocus: () => void;
}) {
  const isEven = index % 2 === 0;
  const isLast = index === total - 1;
  const hasKids = Boolean(item.children?.length);

  const cardWidth = "calc(50% - clamp(1.5rem, 4vw, 3rem))";

  return (
    <div className="relative w-full mb-[clamp(1.5rem,4vw,3rem)] last:mb-0">
      {/* Center axis dot + connector (tablet+) */}
      <div
        className="absolute top-10 z-20 hidden md:flex items-center"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div className="h-3 w-3 rounded-full bg-black border-2 border-black" />

        {/* Connector line to card */}
        <div
          className={`absolute top-1/2 h-0.5 bg-black -translate-y-1/2 ${
            isEven ? "right-0" : "left-0"
          }`}
          style={{
            width: cardWidth,
            left: isEven ? "auto" : "0",
            right: isEven ? "0" : "auto",
          }}
        />
      </div>

      {/* Mobile axis dot + connector */}
      <div
        className="absolute top-10 z-20 flex items-center md:hidden"
        style={{ left: "clamp(0.75rem, 4vw, 1.25rem)" }}
      >
        <div className="h-3 w-3 rounded-full bg-black border-2 border-black" />

        <div
          className="absolute top-1/2 h-0.5 bg-black -translate-y-1/2 left-[12px]"
          style={{
            width: "clamp(0.75rem, 4vw, 1.5rem)",
          }}
        />
      </div>

      {/* Card container */}
      <div
        className={`relative mx-auto ${
          isEven ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
        } w-full md:w-[${cardWidth}]`}
      >
        <ScrollReveal direction="up" delay={0.1} className="w-full">
          <motion.div
            role="button"
            tabIndex={0}
            className="romantic-card reg-tick w-full break-words whitespace-normal"
            style={{ boxSizing: "border-box" }}
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
            <div className="flex flex-col gap-3">
              {/* icon */}
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-cream-100 border-2 border-rose-700 text-2xl">
                {item.emoji ?? item.icon}
              </div>

              {/* text stack */}
              <div className="flex-1 min-w-0">
                <p className="press-label mb-1 break-words whitespace-normal">
                  {item.date}
                </p>

                {item.location && (
                  <p className="press-label mb-1 text-xs text-gray-500 break-words whitespace-normal">
                    {item.location}
                  </p>
                )}

                <RevealText
                  text={item.title}
                  className="font-romantic type-subtitle text-rose-700 mb-2 break-words whitespace-normal"
                  delay={0.1}
                />

                <p className="text-sage-700 type-body leading-relaxed break-words whitespace-normal">
                  {item.desc}
                </p>

                {hasKids && (
                  <p className="press-label mt-3 opacity-70 break-words whitespace-normal">
                    {item.children!.length} sub-journey{item.children!.length === 1 ? "" : "ies"}
                  </p>
                )}
              </div>

              <span
                className="flex-shrink-0 self-start w-11 h-11 rounded-full grid place-items-center border-2 border-rose-700 bg-cream-50 text-rose-700 transition-all duration-300"
                aria-hidden="true"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function Journey() {
  const [focused, setFocused] = useState<Milestone | null>(null);

  useEffect(() => {
    verifyJourneyImages().then((ok) => {
      if (!ok) {
        console.warn(
          "[SITREP]: Journey images asset mismatch. " +
            "Cross-reference audit failed between static local memories and queried rows inside Neon Postgres DB.",
        );
      }
    });
  }, []);

  return (
    <div
      className="page-container min-h-screen 100dvh relative max-w-7xl mx-auto overflow-x-hidden px-3 sm:px-4"
      data-journey-root
    >
      <div className="absolute inset-0 z-0">
        <img src={bluerealbackground3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-cream-50/85" />
        <div className="absolute inset-0 halftone-fade" />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-6 pb-6 flex-1">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <p className="press-label mb-2">our route so far</p>
              <RevealText
                text="every road we took"
                className="font-romantic type-title ink-mark break-words whitespace-normal"
                delay={0.2}
              />
              <p className="text-rose-600 type-lead mt-3 break-words whitespace-normal">
                sub-journeys marked — photos land soon
              </p>
              <p className="press-label mt-4 opacity-70">tap any card to open it</p>
            </div>
          </div>

          <div className="journeys-timeline relative w-full">
            {/* Vertical timeline line (behind cards, in front of background) */}
            {/* Desktop: center line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-black md:translate-x-0"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 0,
              }}
            />
            {/* Mobile: left-side line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-black md:hidden"
              style={{
                left: "calc(clamp(0.75rem, 4vw, 1.25rem) - 1px)",
                zIndex: 0,
              }}
            />

            <div className="relative flex flex-col gap-6 md:gap-8" style={{ zIndex: 1 }}>
              {MILESTONES.map((m, i) => (
                <JourneyMilestone
                  key={m.slug}
                  item={m}
                  index={i}
                  total={MILESTONES.length}
                  onFocus={() => setFocused(m)}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <AnimatePresence>
          {focused && (
            <MilestoneFocus item={focused} onClose={() => setFocused(null)} />
          )}
        </AnimatePresence>

        <footer className="relative z-10 py-6 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-600 type-lead text-center bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2 break-words whitespace-normal" style={{ fontSize: "calc(0.9rem + 0.8vw)" }}>
              the map isn't finished
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Journey;
