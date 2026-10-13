"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PassportStamp from "@/components/PassportStamp";
import { photoForAny, focusMotion, type Milestone } from "@/journeyData";
import PhotoPlate from "@/components/PhotoPlate";

const SWIPE_THRESHOLD = 60; // px before a drag counts as a page change

interface Props {
  item: Milestone;
  onClose: () => void;
}

/**
 * Focused milestone view.
 *
 * A dark scrim sits behind a centred card. Cards with sub-journeys
 * expose prev/next arrows, keyboard arrows, and pointer/touch swipe;
 * cards without them hide the navigation entirely. Escape or a click
 * on the scrim dismisses.
 */
export default function MilestoneFocus({ item, onClose }: Props) {
  const subs = item.children ?? [];
  const hasSubs = subs.length > 0;

  const [subIndex, setSubIndex] = useState(0);
  const [dir, setDir] = useState(1); // 1 forward, -1 back — drives the slide
  const closeRef = useRef<HTMLButtonElement>(null);

  /* reset to the first sub-journey whenever a different card opens */
  useEffect(() => {
    setSubIndex(0);
    setDir(1);
  }, [item.slug]);

  /* lock the page behind the scrim */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* move focus into the dialog so Escape reads naturally */
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const go = useCallback((next: number) => {
    setDir(next > subIndex ? 1 : -1);
    setSubIndex(((next % subs.length) + subs.length) % subs.length);
  }, [subIndex, subs.length]);

  const prev = useCallback(() => go(subIndex - 1), [go, subIndex]);
  const next = useCallback(() => go(subIndex + 1), [go, subIndex]);

  /* hold the latest onClose in a ref so the key listener never re-binds */
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  /* keyboard: arrows navigate sub-journeys, Escape closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onCloseRef.current(); return; }
      if (!hasSubs) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hasSubs, prev, next]);

  /* pointer/touch swipe */
  const dragStart = useRef<number | null>(null);
  const dragDelta = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!hasSubs) return;
    dragStart.current = e.clientX;
    dragDelta.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current == null) return;
    dragDelta.current = e.clientX - dragStart.current;
  };
  const onPointerUp = () => {
    if (dragStart.current == null) return;
    const d = dragDelta.current;
    dragStart.current = null;
    if (d < -SWIPE_THRESHOLD) next();
    else if (d > SWIPE_THRESHOLD) prev();
  };

  const active = hasSubs ? subs[subIndex] : null;
  /* the milestone's own photo when it has one, otherwise any photo
     from the pool — so a card never sits empty once photos exist */
  const shot = photoForAny(active ? active.slug : item.slug);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, focused view`}
    >
      {/* darkened backdrop — clicking it unfocuses */}
      <div className="absolute inset-0 bg-rose-900/70" aria-hidden="true" />

      <motion.div
        {...focusMotion}
        className="relative w-full max-w-[clamp(22rem,94vw,60rem)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-cream-50 border-2 border-rose-700 plate-lg rounded-3xl overflow-hidden">
          {/* header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-rose-200">
            <span className="text-2xl" aria-hidden="true">{item.icon}</span>
            <p className="press-label flex-1 min-w-0 truncate">{item.date}</p>
            {hasSubs && (
              <p className="press-label opacity-70">
                {subIndex + 1} / {subs.length}
              </p>
            )}
            <button
              ref={closeRef}
              type="button"
              className="flex-shrink-0 w-11 h-11 rounded-full grid place-items-center border-2 border-rose-700 bg-cream-50 text-rose-700 transition-all duration-200 hover:bg-rose-400 hover:text-cream-50"
              onClick={onClose}
              aria-label="Close focused view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* body — swipeable when there are sub-journeys */}
          <div
            className="grid md:grid-cols-2 gap-0"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ touchAction: hasSubs ? "pan-y" : "auto" }}
          >
            {/* media */}
            <div className="p-5 sm:p-6 bg-cream-100 border-b-2 md:border-b-0 md:border-r-2 border-rose-200">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active ? active.slug : item.slug}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {shot
                    ? <img src={shot.url} alt={active ? active.title : item.title} className="w-full aspect-[4/3] object-cover rounded-lg border-2 border-rose-700" />
                    : <PhotoPlate label={active ? active.title : item.title} />}
                </motion.div>
              </AnimatePresence>

              {item.stamp && (
                <div className="mt-5 flex justify-end">
                  <PassportStamp place="MALAYSIA" date="02 SEP" />
                </div>
              )}
            </div>

            {/* text */}
            <div className="p-5 sm:p-7 flex flex-col">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active ? active.slug : item.slug}
                  initial={{ opacity: 0, y: dir * 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: dir * -16 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <p className="press-label mb-2">
                      {active ? active.date : item.date}
                    </p>
                    <h2 className="font-romantic text-4xl sm:text-5xl text-rose-700 leading-[1.05]">
                      {active ? active.title : item.title}
                    </h2>
                  </div>

                  <p className="text-sage-700 type-body whitespace-pre-line leading-relaxed">
                    {active ? active.story : item.story}
                  </p>

                  {active && (
                    <p className="press-label opacity-60">
                      part of {item.title}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* navigation */}
              {hasSubs && (
                <div className="mt-7 pt-5 border-t-2 border-rose-200 flex items-center gap-3">
                  <button
                    type="button"
                    className="romantic-button romantic-button-ghost flex items-center gap-2"
                    onClick={prev}
                    aria-label="Previous sub-journey"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    <span className="hidden sm:inline">Back</span>
                  </button>

                  <div className="flex-1 flex justify-center gap-1.5" aria-hidden="true">
                    {subs.map((s, i) => (
                      <span
                        key={s.slug}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === subIndex ? "w-6 bg-rose-400" : "w-2 bg-rose-200"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="romantic-button romantic-button-primary flex items-center gap-2"
                    onClick={next}
                    aria-label="Next sub-journey"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}

              {hasSubs && (
                <p className="type-sm text-sage-500 mt-3 text-center">
                  swipe, drag, or use the arrow keys
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
