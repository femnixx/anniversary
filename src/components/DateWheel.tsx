"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Spin-for-our-next-adventure wheel.

   Eight wedges drawn in SVG. Only `transform` is ever transitioned,
   so the spin costs no layout. The landing wedge is derived from the
   final rotation rather than random-chosen, so what you see is what
   the maths says it is.
   ═══════════════════════════════════════════════════════════════ */

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

const N = IDEAS.length;
const STEP = 360 / N;
const C = 110;        // viewBox centre
const R_OUT = 104;    // outer radius
const R_IN = 30;      // hub radius
const R_TEXT = 74;    // label radius

const SPIN_MS = 3200;

function polar(deg: number, r: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}

function wedge(i: number) {
  const a0 = i * STEP;
  const a1 = (i + 1) * STEP;
  const [x0, y0] = polar(a0, R_OUT);
  const [x1, y1] = polar(a1, R_OUT);
  const [x2, y2] = polar(a1, R_IN);
  const [x3, y3] = polar(a0, R_IN);
  const large = STEP > 180 ? 1 : 0;
  return (
    `M${x0.toFixed(1)},${y0.toFixed(1)}` +
    `A${R_OUT},${R_OUT} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)}` +
    `L${x2.toFixed(1)},${y2.toFixed(1)}` +
    `A${R_IN},${R_IN} 0 ${large} 0 ${x3.toFixed(1)},${y3.toFixed(1)}` +
    "Z"
  );
}

export default function DateWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const spin = useCallback(() => {
    if (spinning) return;

    /* choose the winner first, then solve the rotation that lands it
       under the pointer, so the result is never off by a wedge */
    const target = Math.floor(Math.random() * N);

    /* absolute angle that puts `target` at the top (0deg) */
    const needed = (360 - (target * STEP + STEP / 2) + 360) % 360;

    /* always travel forward by at least two and a half more turns, and
       always land on an angle congruent to `needed`. The earlier
       version normalised with % 360, which threw the turns away and
       left the wheel nudging instead of spinning. */
    const MIN_TURNS = 2.5;
    const minFinal = rotation + 360 * MIN_TURNS;
    let final = Math.floor(minFinal / 360) * 360 + needed;
    while (final < minFinal) final += 360;

    setSpinning(true);
    setPicked(null);
    setRotation(final);

    timer.current = window.setTimeout(() => {
      setSpinning(false);
      setPicked(target);
    }, SPIN_MS);
  }, [spinning, rotation]);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* wheel */}
      <div className="relative">
        {/* pointer */}
        <div className="absolute left-1/2 -top-1 z-20 -translate-x-1/2" aria-hidden="true">
          <div className="h-0 w-0 border-x-[11px] border-t-[19px] border-x-transparent border-t-rose-700" />
        </div>

        <motion.div
          className="relative rounded-full bg-cream-50 border-[3px] border-rose-700 plate-lg [will-change:transform]"
          animate={{ rotate: rotation }}
          /* Reduced motion still gets a tween — a zero duration applied the
             final angle in a single frame, which reads as a glitch rather
             than as "no animation". Shorter and gentler instead. */
          transition={
            reduced
              ? { duration: 0.9, ease: "easeOut" }
              : { duration: SPIN_MS / 1000, ease: [0.12, 0.72, 0.06, 1] }
          }
        >
          <svg viewBox="0 0 220 220" className="block h-[clamp(13rem,32vw,17rem)] w-[clamp(13rem,32vw,17rem)]" role="img" aria-label="Wheel of date ideas">
            {IDEAS.map((idea, i) => {
              const [tx, ty] = polar(i * STEP + STEP / 2, R_TEXT);
              const [line0x, line0y] = polar(i * STEP, R_IN);
              const [line1x, line1y] = polar(i * STEP, R_OUT);
              const lit = picked === i;
              return (
                <g key={idea}>
                  <path
                    d={wedge(i)}
                    fill={lit ? "#2f80d8" : i % 2 ? "#eaf3fc" : "#dce9f7"}
                    stroke="#123a6b"
                    strokeWidth="1.6"
                  />
                  <line
                    x1={line0x} y1={line0y} x2={line1x} y2={line1y}
                    stroke="#123a6b" strokeWidth="1.4"
                  />
                  <text
                    x={tx} y={ty}
                    textAnchor="middle"
                    fill={lit ? "#f4f8fd" : "#123a6b"}
                    style={{
                      font: "700 8.4px 'Plus Jakarta Sans', system-ui, sans-serif",
                      letterSpacing: "0.4px",
                    }}
                  >
                    {idea.split("\n").map((ln, k) => (
                      <tspan key={k} x={tx} dy={k === 0 ? -3.4 : 9.4}>{ln}</tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            {/* hub */}
            <circle cx={C} cy={C} r={R_IN} fill="#f4f8fd" stroke="#123a6b" strokeWidth="2.6" />
            <text x={C} y={C + 3.6} textAnchor="middle" fill="#2f80d8"
              style={{ font: "400 21px 'Great Vibes', cursive" }}>
              us
            </text>
          </svg>
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="romantic-button romantic-button-primary"
        onClick={spin}
        disabled={spinning}
        whileTap={{ scale: 0.97 }}
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
  );
}
