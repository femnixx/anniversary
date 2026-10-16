"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Spin-for-our-next-adventure wheel.

   Two modes:
   - Compact: inline in the Options page
   - Expanded: full-screen modal that locks interaction until spin completes

   Eight wedges drawn in SVG. Only `transform` is ever transitioned,
   so the spin costs no layout. The landing wedge is derived from the
   final rotation rather than random-chosen, so what you see is what
   the maths says it is.
   ══════════════════════════════════════════════════════════════ */

const IDEAS = [
  "sunrise drive\nwith no map",
  "that café\nwe keep mentioning",
  "movie night,\nyour pick",
  "a walk with\nno destination",
  "cook something\nwe've never tried",
  "karaoke,\nbadly",
  "market run\n+ street food",
  "stay in and\ndo absolutely nothing",
];

const N = 8;
const STEP = 360 / N;
const SPIN_MS = 4000;

function polar(deg: number, r: number, center: number = 160) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [center + r * Math.cos(a), center + r * Math.sin(a)];
}

function wedge(i: number, center: number, rOut: number, rIn: number) {
  const a0 = i * STEP;
  const a1 = (i + 1) * STEP;
  const [x0, y0] = polar(a0, rOut, center);
  const [x1, y1] = polar(a1, rOut, center);
  const [x2, y2] = polar(a1, rIn, center);
  const [x3, y3] = polar(a0, rIn, center);
  const large = STEP > 180 ? 1 : 0;
  return (
    `M${x0.toFixed(1)},${y0.toFixed(1)}` +
    `A${rOut},${rOut} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)}` +
    `L${x2.toFixed(1)},${y2.toFixed(1)}` +
    `A${rIn},${rIn} 0 ${large} 0 ${x3.toFixed(1)},${y3.toFixed(1)}` +
    "Z"
  );
}

export default function DateWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const wheelRef = useRef<SVGSVGElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const spin = useCallback(() => {
    if (spinning) return;

    const target = Math.floor(Math.random() * N);
    const needed = (360 - (target * STEP + STEP / 2) + 360) % 360;
    const MIN_TURNS = 2.5;
    let final = Math.floor((rotation + 360 * MIN_TURNS) / 360) * 360 + needed;
    while (final < rotation + 360 * MIN_TURNS) final += 360;

    setSpinning(true);
    setPicked(null);
    setRotation(final);

    timer.current = window.setTimeout(() => {
      setSpinning(false);
      setPicked(target);
    }, SPIN_MS);
  }, [spinning, rotation]);

  const handleExpand = () => {
    if (!spinning && !expanded) setExpanded(true);
  };

  const handleClose = () => {
    if (!spinning) setExpanded(false);
  };

  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-rose-900/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={spinning ? undefined : handleClose}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!spinning && (
                <motion.button
                  className="absolute top-6 right-6 z-20 p-2 rounded-full bg-cream-50 border-2 border-rose-700 hover:bg-rose-100 transition-colors"
                  onClick={() => setExpanded(false)}
                  disabled={spinning}
                  aria-label="Close wheel"
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-rose-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
              
              <motion.div
                ref={wheelRef}
                className="relative rounded-full bg-cream-50 border-[3px] border-rose-700 plate-lg [will-change:transform]"
                animate={{ rotate: rotation, scale: spinning ? 1 : (hovering ? 1.05 : 1) }}
                transition={{
                  rotate: reduced ? { duration: 0.9, ease: "easeOut" } : { duration: SPIN_MS / 1000, ease: [0.12, 0.72, 0.06, 1] },
                  scale: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={spinning ? undefined : handleClose}
              >
                <svg
                  viewBox="0 0 320 320"
                  className="block h-[clamp(20rem,40vw,24rem)] w-[clamp(20rem,40vw,24rem)]"
                  role="img"
                  aria-label="Wheel of date ideas"
                >
                  {IDEAS.map((idea, i) => {
                    const angle = i * 45;
                    const textAngle = i * 45 + 22.5;
                    const textRadius = 120;
                    const textX = 160 + 120 * Math.cos(((i * 45 + 22.5 - 90) * Math.PI) / 180);
                    const textY = 160 + 120 * Math.sin((i * 45 + 22.5 - 90) * Math.PI / 180);
                    
                    const lit = picked === i;
                    return (
                      <g key={i}>
                        <path
                          d={wedge(i, 160, 180, 50)}
                          fill={lit ? "#2f80d8" : i % 2 ? "#eaf3fc" : "#dce9f7"}
                          stroke="#123a6b"
                          strokeWidth="2.0"
                        />
                        <line
                          x1={160} y1={160}
                          x2={160 + 120 * Math.cos(i * 45 * Math.PI / 180)}
                          y2={160 + 180 * Math.sin(i * 45 * Math.PI / 180)}
                          stroke="#123a6b" strokeWidth="1.6"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={lit ? "#f4f8fd" : "#123a6b"}
                          style={{
                            font: "700 20px 'Plus Jakarta Sans', system-ui, sans-serif",
                            letterSpacing: "0.5px",
                            userSelect: "none"
                          }}
                        >
                          {idea.split("\n").map((ln, k) => (
                            <tspan key={k} x={textX} dy={k === 0 ? -12 : 24}>{ln}</tspan>
                          ))}
                        </text>
                      </g>
                    );
                  })}

                  <circle cx="160" cy="160" r={50} fill="#f4f8fd" stroke="#123a6b" strokeWidth="3.0" />
                  <text x="160" y="166" textAnchor="middle" fill="#2f80d8" style={{ font: "400 36px 'Great Vibes', cursive" }}>
                    us
                  </text>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute left-1/2 -top-1 z-20 -translate-x-1/2" aria-hidden="true">
            <div className="h-0 w-0 border-x-[11px] border-t-[19px] border-x-transparent border-t-rose-700" />
          </div>

          <motion.div
            ref={wheelRef}
            className="relative rounded-full bg-cream-50 border-[3px] border-rose-700 plate-lg [will-change:transform] cursor-pointer"
            animate={{ rotate: rotation, scale: spinning ? 1 : (expanded ? 2.0 : (hovering ? 1.05 : 1)) }}
            transition={{
              rotate: reduced ? { duration: 0.9, ease: "easeOut" } : { duration: SPIN_MS / 1000, ease: [0.12, 0.72, 0.06, 1] },
              scale: { duration: 0.3, ease: "easeOut" }
            }}
            onClick={spinning ? undefined : handleExpand}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <svg
              viewBox="0 0 320 320"
              className="block h-[clamp(20rem,40vw,24rem)] w-[clamp(20rem,40vw,24rem)]"
              role="img"
              aria-label="Wheel of date ideas"
            >
              {IDEAS.map((idea, i) => {
                const angle = i * 45;
                const textAngle = i * 45 + 22.5;
                const textRadius = 120;
                const textX = 160 + 120 * Math.cos(((i * 45 + 22.5 - 90) * Math.PI) / 180);
                const textY = 160 + 120 * Math.sin((i * 45 + 22.5 - 90) * Math.PI / 180);
                
                const lit = picked === i;
                return (
                  <g key={i}>
                    <path
                      d={wedge(i, 160, 180, 50)}
                      fill={lit ? "#2f80d8" : i % 2 ? "#eaf3fc" : "#dce9f7"}
                      stroke="#123a6b"
                      strokeWidth="2.0"
                    />
                    <line
                      x1={160} y1={160}
                      x2={160 + 120 * Math.cos(i * 45 * Math.PI / 180)}
                      y2={160 + 180 * Math.sin(i * 45 * Math.PI / 180)}
                      stroke="#123a6b" strokeWidth="1.6"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={lit ? "#f4f8fd" : "#123a6b"}
                      style={{
                        font: "700 20px 'Plus Jakarta Sans', system-ui, sans-serif",
                        letterSpacing: "0.5px",
                        userSelect: "none"
                      }}
                    >
                      {idea.split("\n").map((ln, k) => (
                        <tspan key={k} x={textX} dy={k === 0 ? -12 : 24}>{ln}</tspan>
                      ))}
                    </text>
                  </g>
                );
              })}

              <circle cx="160" cy="160" r={50} fill="#f4f8fd" stroke="#123a6b" strokeWidth="3.0" />
              <text x="160" y="166" textAnchor="middle" fill="#2f80d8" style={{ font: "400 36px 'Great Vibes', cursive" }}>
                us
              </text>
            </svg>
          </motion.div>
        </div>

        <motion.button
          type="button"
          className="romantic-button romantic-button-primary mt-4"
          onClick={spin}
          disabled={spinning}
          whileTap={{ scale: 0.97 }}
          style={{ minWidth: "200px" }}
        >
          <span className="flex items-center gap-2 font-ui">
            {spinning ? (
              "spinning…"
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-3.2-6.9M21 3v5h-5" />
                </svg>
                spin for our next adventure
              </>
            )}
          </span>
        </motion.button>

        <div className="min-h-[3.5rem] flex items-center justify-center" aria-live="polite">
          {picked !== null ? (
            <motion.div
              className="ink-chip max-w-[22rem] text-center normal-case tracking-normal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <span className="normal-case">{IDEAS[picked].replace("\n", " ")}</span>
            </motion.div>
          ) : (
            <p className="type-sm text-sage-500 text-center max-w-xs">
              {spinning ? "where will it land…" : "no arguing with the wheel"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}