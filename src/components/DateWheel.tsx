"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Spin-for-our-next-adventure wheel.

   Three states:
     PREVIEW   – a quiet, label-free disc you can click to focus.
     FOCUSED   – the wheel scrolls into view, scales up, and the slice
                 labels are revealed with outward-oriented text.
     SPINNING  – a CSS rotation animation decelerates to a winner.

   Only `transform` is ever transitioned on the wheel itself, so the
   spin costs no layout. The landing wedge is derived from the final
   rotation rather than chosen at random, so what you see is what the
   maths says it is.
   ═══════════════════════════════════════════════════════════════ */

interface DateIdea {
  label: string;
  icon: string;
}

const IDEAS: DateIdea[] = [
  { label: "sunrise drive with no map", icon: "🌅" },
  { label: "that café we keep mentioning", icon: "☕" },
  { label: "movie night, your pick", icon: "🎬" },
  { label: "a walk with no destination", icon: "🚶" },
  { label: "cook something we've never tried", icon: "🍳" },
  { label: "karaoke, badly", icon: "🎤" },
  { label: "market run + street food", icon: "🍢" },
  { label: "stay in and do absolutely nothing", icon: "🛋️" },
];

const N = IDEAS.length;
const STEP = 360 / N;
const C = 110; // viewBox centre
const R_OUT = 104; // outer radius
const R_IN = 30; // hub radius
const R_TEXT = 76; // label radius

/* Extra turns the wheel makes before it settles. */
const SPIN_EXTRA_TURNS = 5;
const SPIN_DURATION = 4000;

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
  // 1. Component states
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  const wheelRef = useRef<HTMLDivElement>(null);
  const spinTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(spinTimer.current), []);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // 4. Rotation calculation
  const handleSpinClick = useCallback(() => {
    if (isSpinning) return;

    /* always spin forward by at least SPIN_EXTRA_TURNS full rotations,
       plus a random 0–359deg offset so every spin is unique */
    const newDegrees = rotationDegree + 360 * SPIN_EXTRA_TURNS + Math.floor(Math.random() * 360);

    setIsSpinning(true);
    setPicked(null);
    setRotationDegree(newDegrees);

    spinTimer.current = window.setTimeout(() => {
      setIsSpinning(false);
      /* Which slice is at the top (0deg) after the final rotation? */
      const landed = Math.round(((360 - (newDegrees % 360)) / STEP) % N);
      setPicked((landed + N) % N);
    }, SPIN_DURATION);
  }, [isSpinning, rotationDegree]);

  // 3. Interaction & viewport focus
  const handlePreviewClick = useCallback(() => {
    setIsPreviewMode(false);
    wheelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const label = picked !== null ? IDEAS[picked].label : null;

  return (
    <div
      className={`relative mx-auto transition-all duration-700 ease-out ${
        isPreviewMode
          ? "w-[clamp(14rem,36vw,17rem)] cursor-pointer rounded-full"
          : "w-[clamp(20rem,48vw,26rem)]"
      }`}
      ref={wheelRef}
    >
      {/* Preview mode: click the whole wheel to focus */}
      {isPreviewMode && (
        <div
          className="absolute inset-0 rounded-full bg-cream-50 border-[3px] border-rose-700 plate-lg"
          onClick={handlePreviewClick}
          role="button"
          tabIndex={0}
          aria-label="Focus the adventure wheel"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePreviewClick();
            }
          }}
        />
      )}

      {/* The wheel ring itself — click to spin once focused */}
      <div
        className={`
          relative mx-auto rounded-full bg-cream-50 border-[3px] border-rose-700 plate-lg
          ${isPreviewMode ? "w-full h-full" : "w-full h-full scale-100"}
          will-change-transform
        `}
        onClick={isPreviewMode ? undefined : handleSpinClick}
        style={{
          /* 4. Rotation via CSS transform with smooth transition */
          transform: `rotate(${rotationDegree}deg)`,
          transition: isSpinning
            ? "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)"
            : reduced
              ? "transform 0.9s ease-out"
              : "transform 0.3s ease-out",
        }}
      >
        <svg
          viewBox="0 0 220 220"
          className="block h-full w-full"
          role="img"
          aria-label="Wheel of date ideas"
        >
          {/* 2. Render logic: slices only in preview, labels in focused mode */}
          {IDEAS.map((idea, i) => {
            const lit = picked === i;
            const midAngle = i * STEP + STEP / 2;
            const [tx, ty] = polar(midAngle, R_TEXT);

            return (
              <g key={idea.label}>
                <path
                  d={wedge(i)}
                  fill={lit ? "#2f80d8" : i % 2 ? "#eaf3fc" : "#dce9f7"}
                  stroke="#123a6b"
                  strokeWidth="1.6"
                />
                {/* Slice divider lines */}
                <line
                  x1={polar(i * STEP, R_IN)[0]}
                  y1={polar(i * STEP, R_IN)[1]}
                  x2={polar(i * STEP, R_OUT)[0]}
                  y2={polar(i * STEP, R_OUT)[1]}
                  stroke="#123a6b"
                  strokeWidth="1.4"
                />
                {/* Labels only in interactive / focused mode */}
                {!isPreviewMode && (
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    fill={lit ? "#f4f8fd" : "#123a6b"}
                    style={{
                      font: "700 8.4px 'Plus Jakarta Sans', system-ui, sans-serif",
                      letterSpacing: "0.4px",
                      /* Orient the text to read outward from the centre */
                      transform: `rotate(${midAngle}deg) translate(${R_TEXT - R_IN}px) rotate(${-midAngle}deg)`,
                      transformBox: "auto",
                      transformOrigin: "center",
                    }}
                  >
                    {idea.label.split(" ").map((word, k) => (
                      <tspan key={k} x={tx} dy={9.4}>
                        {word}
                      </tspan>
                    ))}
                  </text>
                )}
              </g>
            );
          })}

          {/* Hub (always visible) */}
          <circle cx={C} cy={C} r={R_IN} fill="#f4f8fd" stroke="#123a6b" strokeWidth="2.6" />
          <text
            x={C}
            y={C + 3.6}
            textAnchor="middle"
            fill="#2f80d8"
            style={{ font: "400 21px 'Great Vibes', cursive" }}
          >
            us
          </text>

          {/* Central SPIN button (only when focused) */}
          {!isPreviewMode && (
            <g>
              <circle cx={C} cy={C} r={14} fill="#ffffff" stroke="#123a6b" strokeWidth="1.6" />
              <text
                x={C}
                y={C + 4.6}
                textAnchor="middle"
                fill={isSpinning ? "#94a3bc" : "#2f80d8"}
                style={{
                  font: "700 11px 'Plus Jakarta Sans', system-ui, sans-serif",
                  letterSpacing: "1px",
                }}
              >
                {isSpinning ? "spin…" : "SPIN"}
              </text>
            </g>
          )}
        </svg>

        {/* Pointer marker at top */}
        <div
          className="absolute left-1/2 -top-1 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="h-0 w-0 border-x-[11px] border-t-[19px] border-x-transparent border-t-rose-700" />
        </div>
      </div>

      {/* Result of the last spin */}
      {label && !isSpinning && (
        <motion.div
          className="ink-chip max-w-[20rem] text-center normal-case tracking-normal mt-4 mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <span className="normal-case">{label}</span>
        </motion.div>
      )}
    </div>
  );
}
