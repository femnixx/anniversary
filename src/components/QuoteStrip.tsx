"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Quiet rotating quote strip. Advances on its own and can be nudged
 * forward by clicking; transform/opacity only.
 */
const QUOTES = [
  "in all the world, there is no heart for me like yours",
  "you are my today and all of my tomorrows",
  "every road we took led us here",
  "loving you is the easiest thing i've ever done",
  "you're my person, my home, my everything",
];

const INTERVAL = 9000;

export default function QuoteStrip() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* auto-advance is a moving target, so it stays off under reduced
     motion — tapping still works */
  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setI(v => (v + 1) % QUOTES.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const fade = reduced ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  const next = () => setI(v => (v + 1) % QUOTES.length);

  return (
    <div
      className="relative mx-auto max-w-3xl px-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* offset plate behind the strip */}
      <div
        className="absolute inset-0 rounded-2xl bg-lavender-200"
        style={{ transform: "translate(7px, 7px)" }}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={next}
        className="relative w-full rounded-2xl border-2 border-rose-700 bg-cream-50 px-6 py-7 text-center"
        aria-label="Show another quote"
      >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 ink-chip">a note for you</span>

        <div className="relative h-[3.75rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              className="font-romantic-alt type-subtitle text-rose-700 italic absolute"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={fade}
            >
              {QUOTES[i]}
            </motion.p>
          </AnimatePresence>
        </div>

        <span className="press-label opacity-60 mt-1 block">
          {i + 1} / {QUOTES.length} · tap for another
        </span>
      </button>
    </div>
  );
}
