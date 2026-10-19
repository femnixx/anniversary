"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ==================================================================
   Spin-for-our-next-adventure wheel.

   States:
     PREVIEW  – a quiet, label-free disc you can click to focus.
     FULLSCREEN – fixed overlay with dimmed backdrop; the wheel spins
                  with decelerating CSS rotation and lands on a winner.
     RESULT  – the winning description appears as a headline below.
                Re-spin any number of times. Close → back to PREVIEW.

   Only `transform` is ever transitioned on the wheel itself, so the
   spin costs no layout. The landing wedge is derived from the final
   rotation rather than chosen at random.
   ================================================================== */

interface DateIdea {
  id: string;
  summary: string;
  description: string;
  icon: string;
}

const IDEAS: DateIdea[] = [
  { id: "sunrise", summary: "Sunrise Drive", description: "sunrise drive with no map", icon: "🌅" },
  { id: "cafe", summary: "Café Date", description: "that café we keep mentioning", icon: "☕" },
  { id: "movie", summary: "Movie Night", description: "movie night, your pick", icon: "🎬" },
  { id: "walk", summary: "NoDest Walk", description: "a walk with no destination", icon: "🚶" },
  { id: "cook", summary: "New Recipe", description: "cook something we've never tried", icon: "🍳" },
  { id: "karaoke", summary: "Karaoke Badly", description: "karaoke, badly", icon: "🎤" },
  { id: "market", summary: "Street Food", description: "market run + street food", icon: "🍢" },
  { id: "stayin", summary: "Stay In", description: "stay in and do absolutely nothing", icon: "🛋️" },
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

const WheelSvg = ({
  showLabels,
  showSpinButton,
  rotationDegree,
  isSpinning,
  picked,
  hoveredIndex,
  onSliceHover,
  onSliceClick,
  onSpinClick,
}: {
  showLabels: boolean;
  showSpinButton: boolean;
  rotationDegree: number;
  isSpinning: boolean;
  picked: number | null;
  hoveredIndex: number | null;
  onSliceHover: (index: number | null) => void;
  onSliceClick: (index: number) => void;
  onSpinClick: () => void;
}) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const spinTransition = isSpinning
    ? "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)"
    : reduced
      ? "transform 0.9s ease-out"
      : "transform 0.3s ease-out";

  return (
    <div
      className="relative rounded-full bg-cream-50 shadow-xl will-change-transform"
      style={{
        transform: `rotate(${rotationDegree}deg)`,
        transition: spinTransition,
      }}
      onClick={showSpinButton ? onSpinClick : undefined}
    >
      {/* Pointer marker at top — shows which slice is the winner */}
      <div
        className="absolute left-1/2 -top-1.5 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-0 w-0 border-x-[11px] border-t-[19px] border-x-transparent border-t-rose-700" />
      </div>

      <svg
        viewBox="0 0 220 220"
        className="block h-[clamp(14rem,36vw,18rem)] w-[clamp(14rem,36vw,18rem)]"
        role="img"
        aria-label="Wheel of date ideas"
      >
        {IDEAS.map((idea, i) => {
          const lit = picked === i;
          const midAngle = i * STEP + STEP / 2;
          const [tx, ty] = polar(midAngle, R_TEXT);

          return (
            <g
              key={idea.id}
              onMouseEnter={() => onSliceHover(i)}
              onMouseLeave={() => onSliceHover(null)}
              onClick={(e) => {
                e.stopPropagation();
                if (!isSpinning && showSpinButton) onSliceClick(i);
              }}
              style={{ cursor: showSpinButton && !isSpinning ? "pointer" : "default" }}
            >
              <title>{idea.description}</title>
              <path
                d={wedge(i)}
                fill={lit ? "#2f80d8" : hoveredIndex === i ? "#f0f7ff" : i % 2 ? "#eaf3fc" : "#dce9f7"}
                stroke="#123a6b"
                strokeWidth="1.6"
              />
              <line
                x1={polar(i * STEP, R_IN)[0]}
                y1={polar(i * STEP, R_IN)[1]}
                x2={polar(i * STEP, R_OUT)[0]}
                y2={polar(i * STEP, R_OUT)[1]}
                stroke="#123a6b"
                strokeWidth="1.4"
              />
              {/* Inner text: short summary only, positioned with radial rotation */}
              {showLabels && (
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  fill={lit ? "#f4f8fd" : "#123a6b"}
                  style={{
                    font: "700 9.5px 'Plus Jakarta Sans', system-ui, sans-serif",
                    letterSpacing: "0.4px",
                    transform: `rotate(${midAngle}deg) translate(${R_TEXT - R_IN}px) rotate(${-midAngle}deg)`,
                    transformBox: "auto",
                    transformOrigin: "center",
                  }}
                >
                  {idea.summary.split(" ").map((word, k) => (
                    <tspan key={k} x={tx} dy={10}>
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

        {/* Central SPIN button — only shown in interactive (focused) mode */}
        {showSpinButton && (
          <>
            <circle
              cx={C}
              cy={C}
              r={isSpinning ? 18 : 20}
              fill={isSpinning ? "#f1f5f9" : "#ffffff"}
              stroke="#123a6b"
              strokeWidth="2"
            />
            <text
              x={C}
              y={C + 5.6}
              textAnchor="middle"
              fill={isSpinning ? "#94a3bc" : "#2f80d8"}
              style={{
                font: "700 12px 'Plus Jakarta Sans', system-ui, sans-serif",
                letterSpacing: "1.2px",
              }}
            >
              {isSpinning ? "SPIN…" : "SPIN"}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default function DateWheel() {
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const wheelRef = useRef<HTMLDivElement>(null);
  const spinTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(spinTimer.current), []);

  const handlePreviewClick = useCallback(() => {
    setIsPreviewMode(false);
    wheelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleClose = useCallback(() => {
    setRotationDegree(0);
    setPicked(null);
    setIsSpinning(false);
    setHoveredIndex(null);
    setTooltipPos(null);
    setIsPreviewMode(true);
  }, []);

  const handleSpinClick = useCallback(() => {
    if (isSpinning) return;

    const newDegrees =
      rotationDegree + 360 * SPIN_EXTRA_TURNS + Math.floor(Math.random() * 360);

    setIsSpinning(true);
    setPicked(null);
    setHoveredIndex(null);
    setTooltipPos(null);
    setRotationDegree(newDegrees);

    spinTimer.current = window.setTimeout(() => {
      setIsSpinning(false);
      const landed = Math.round(((360 - (newDegrees % 360)) / STEP) % N);
      setPicked((landed + N) % N);
    }, SPIN_DURATION);
  }, [isSpinning, rotationDegree]);

  const handleSliceClick = useCallback(
    (index: number) => {
      if (isSpinning) return;
      setRotationDegree(0);
      setPicked(index);
      setIsSpinning(false);
      setHoveredIndex(null);
      setTooltipPos(null);
    },
    [isSpinning],
  );

  const handleSliceHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (isSpinning || isPreviewMode) return;
    setTooltipPos({ x: e.clientX, y: e.clientY });
  }, [isSpinning, isPreviewMode]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setTooltipPos(null);
  }, []);

  const label = picked !== null ? IDEAS[picked].description : null;

  /* 1. STATE RENDERING LOGIC: Only ONE wheel instance at any time. */
  if (isPreviewMode) {
    /* PREVIEW: small, plain, label-free wheel in normal page flow */
    return (
      <div
        className="relative mx-auto flex w-fit flex-col items-center gap-3"
        ref={wheelRef}
      >
        <motion.div
          className="relative mx-auto flex h-[clamp(9rem,24vw,11rem)] w-[clamp(9rem,24vw,11rem)] cursor-pointer items-center justify-center rounded-full bg-cream-50 ring-2 ring-rose-200 hover:ring-rose-400"
          onClick={handlePreviewClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePreviewClick();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Focus the adventure wheel"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute -inset-1.5 rounded-full border-2 border-dashed border-rose-400 opacity-50"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <WheelSvg
            showLabels={false}
            showSpinButton={false}
            rotationDegree={0}
            isSpinning={false}
            picked={null}
            hoveredIndex={null}
            onSliceHover={() => {}}
            onSliceClick={() => {}}
            onSpinClick={() => {}}
          />
        </motion.div>

        <p className="press-label opacity-60">tap to spin</p>
      </div>
    );
  }

  /* 2. FOCUSED: fullscreen modal overlay with the large wheel.
     The wheel renders summaries, handles spins, and the result reveals after landing. */
  return (
    <>
      {/* 2a. Fixed overlay: dim backdrop with blur */}
      <div
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close"
        role="button"
      />

      {/* 2b. Centered wheel container inside the modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div
          className="relative flex flex-col items-center justify-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 4. Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-16 right-0 rounded-full bg-cream-50 px-3 py-1 text-rose-700 shadow hover:bg-rose-50 press-label"
            aria-label="Close wheel"
          >
            ✕
          </button>

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <WheelSvg
              showLabels={!isSpinning}
              showSpinButton={true}
              rotationDegree={rotationDegree}
              isSpinning={isSpinning}
              picked={picked}
              hoveredIndex={hoveredIndex}
              onSliceHover={handleSliceHover}
              onSliceClick={handleSliceClick}
              onSpinClick={handleSpinClick}
            />
          </div>

          {/* 3. Hover tooltip — floating label showing full description */}
          {hoveredIndex !== null && tooltipPos && (
            <motion.div
              className="pointer-events-none fixed z-[10000] rounded-lg bg-cream-50 px-3 py-2 text-xs text-rose-800 shadow-xl"
              style={{
                left: tooltipPos.x + 16,
                top: tooltipPos.y + 16,
                maxWidth: "200px",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              {IDEAS[hoveredIndex].description}
            </motion.div>
          )}

          {/* Result headline — prominent description of the spun/clicked slice */}
          {label && !isSpinning && (
            <motion.div
              className="press-label text-2xl font-bold text-rose-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              {label}
            </motion.div>
          )}

          {/* Hint text */}
          <p className="press-label opacity-60 text-center">
            {isSpinning
              ? "where will it land…"
              : label
                ? "close or spin again"
                : "tap the wheel or SPIN to go"}
          </p>
        </div>
      </div>
    </>
  );
}
