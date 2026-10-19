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
  "stay in and\ndo absolutely nothing",
  "sunrise drive\nwith no map",
  "that café\nwe keep mentioning",
  "movie night,\nyour pick",
  "a walk with\nno destination",
  "cook something\nwe've never tried",
  "karaoke,\nbadly",
  "market run\n+ street food",
];

const N = 8;
const STEP = 360 / N;
const SPIN_MS = 4000;
const CENTER = 200;
const R_OUT = 180;
const R_IN = 45;
const R_TEXT = 125;

function polar(deg: number, r: number, center: number = CENTER) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [center + r * Math.cos(a), center + r * Math.sin(a)];
}

function arcPath(i: number) {
  const cx = CENTER;
  const cy = CENTER;
  const rOut = R_OUT;
  const rIn = R_IN;
  const a0 = i * STEP;
  const a1 = (i + 1) * STEP;

  const [p0x, p0y] = polar(a0, rOut);
  const [p1x, p1y] = polar(a1, rOut);
  const [p2x, p2y] = polar(a1, rIn);
  const [p3x, p3y] = polar(a0, rIn);
  const large = STEP > 180 ? 1 : 0;

  return (
    `M${cx},${cy} L${p0x.toFixed(1)},${p0y.toFixed(1)}` +
    `A${rOut},${rOut} 0 ${large} 1 ${p1x.toFixed(1)},${p1y.toFixed(1)}` +
    `L${p2x.toFixed(1)},${p2y.toFixed(1)}` +
    `A${rIn},${rIn} 0 ${large} 0 ${p3x.toFixed(1)},${p3y.toFixed(1)}` +
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

  const renderWheel = () => (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Wheel of date ideas"
      className={`block w-full h-full ${reduced ? "" : "transition-all"}`}
    >
      {IDEAS.map((idea, i) => {
        const sliceAngle = i * STEP + STEP / 2;
        const [tx, ty] = polar(sliceAngle, R_TEXT);
        const lit = picked === i;
        return (
          <g key={idea}>
            <path
              d={arcPath(i)}
              fill={lit ? "#2563eb" : i % 2 ? "#eff6ff" : "#f0fdf4"}
              stroke="#1e3a8a"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER} y1={CENTER}
              x2={polar(i * STEP, R_OUT)[0]}
              y2={polar(i * STEP, R_OUT)[1]}
              stroke="#1e3a8a"
              strokeWidth="1.2"
            />
            <text
              x={tx}
              y={ty}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={lit ? "#ffffff" : "#0f172a"}
              style={{
                font: `700 ${expanded ? 16 : 11}px 'Plus Jakarta Sans', system-ui, sans-serif`,
                letterSpacing: "0.3px",
                userSelect: "none",
                transform: `rotate(${sliceAngle} ${tx} ${ty})`,
                transformBox: "fill-box"
              }}
            >
              {idea.split("\n").map((ln, k) => (
                <tspan key={k} x={tx} dy={k === 0 ? -8 : 16}>{ln}</tspan>
              ))}
            </text>
          </g>
        );
      })}

      <circle cx={CENTER.toString()} cy={CENTER.toString()} r={R_IN} fill="#ffffff" stroke="#1e3a8a" strokeWidth="2.5" />
      <text x={CENTER.toString()} y={CENTER + 8} textAnchor="middle" fill="#3b82f6" style={{ font: `400 ${expanded ? 48 : 28}px 'Georgia', serif; font-style: italic` }}>
        us
      </text>
    </svg>
  );

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c1e3a]"
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
                  className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white border-2 border-blue-700 hover:bg-blue-100 transition-colors"
                  onClick={() => setExpanded(false)}
                  disabled={spinning}
                  aria-label="Close wheel"
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
              
              <motion.div
                ref={wheelRef}
                className="relative aspect-square w-[85vmin] max-w-[500px] [will-change:transform]"
                animate={{ rotate: rotation, scale: spinning ? 1 : (hovering ? 1.05 : 1) }}
                transition={{
                  rotate: reduced ? { duration: 0.9, ease: "easeOut" } : { duration: SPIN_MS / 1000, ease: [0.12, 0.72, 0.06, 1] },
                  scale: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={spinning ? undefined : handleClose}
              >
                {renderWheel()}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <motion.div
            ref={wheelRef}
            className="relative aspect-square w-[280px] max-w-[80vw] cursor-pointer [will-change:transform]"
            animate={{ rotate: rotation, scale: spinning ? 1 : (hovering ? 1.05 : 1) }}
            transition={{
              rotate: reduced ? { duration: 0.9, ease: "easeOut" } : { duration: SPIN_MS / 1000, ease: [0.12, 0.72, 0.06, 1] },
              scale: { duration: 0.3, ease: "easeOut" }
            }}
            onClick={spinning ? undefined : handleExpand}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {renderWheel()}
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