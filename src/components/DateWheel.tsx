"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface DateIdea {
  id: string;
  emoji: string;
  description: string;
}

const IDEAS: DateIdea[] = [
  { id: "sunrise", emoji: "🚗", description: "sunrise drive with no map" },
  { id: "cafe", emoji: "☕", description: "that café we keep mentioning" },
  { id: "movie", emoji: "🎬", description: "movie night, your pick" },
  { id: "walk", emoji: "🚶‍♂️", description: "a walk with no destination" },
  { id: "cook", emoji: "🍳", description: "cook something we've never tried" },
  { id: "karaoke", emoji: "🎤", description: "karaoke, badly" },
  { id: "market", emoji: "🍔", description: "market run + street food" },
  { id: "stayin", emoji: "🏠", description: "stay in and do absolutely nothing" },
];

const N = IDEAS.length;
const STEP = 360 / N;

const C = 250;
const R_OUT = 220;
const R_IN = 65;
const R_TEXT = R_IN + (R_OUT - R_IN) * 0.55;

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

interface WheelSvgProps {
  showLabels: boolean;
  showSpinButton: boolean;
  rotationDegree: number;
  isSpinning: boolean;
  picked: number | null;
  hoveredIndex: number | null;
  onSliceHover: (index: number | null) => void;
  onSpinClick: () => void;
}

const WheelSvg = ({
  showLabels,
  showSpinButton,
  rotationDegree,
  isSpinning,
  picked,
  hoveredIndex,
  onSliceHover,
  onSpinClick,
}: WheelSvgProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const spinTransition = isSpinning
    ? "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)"
    : reduced
    ? "transform 0.9s ease-out"
    : "transform 0.3s ease-out";

  return (
    <div className="relative mx-auto">
      <svg
        viewBox="0 0 500 500"
        style={{
          minWidth: "280px",
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          width: showSpinButton ? "38vw" : "100%",
          height: showSpinButton ? "38vw" : "100%",
        }}
        role="img"
        aria-label="Wheel of date ideas"
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.15" />
          </filter>
        </defs>

        <g
          style={{
            transform: `rotate(${rotationDegree}deg)`,
            transformOrigin: `${C}px ${C}px`,
            transition: spinTransition,
          }}
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
                style={{ cursor: showSpinButton && !isSpinning ? "pointer" : "default" }}
              >
                <title>{idea.description}</title>
                <path
                  d={wedge(i)}
                  fill={lit ? "#2f80d8" : hoveredIndex === i ? "#f0f7ff" : i % 2 ? "#eaf3fc" : "#dce9f7"}
                  stroke="#123a6b"
                  strokeWidth="3"
                />
                <line
                  x1={polar(i * STEP, R_IN)[0]}
                  y1={polar(i * STEP, R_IN)[1]}
                  x2={polar(i * STEP, R_OUT)[0]}
                  y2={polar(i * STEP, R_OUT)[1]}
                  stroke="#123a6b"
                  strokeWidth="2"
                />
                {showLabels && (
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={lit ? "#f4f8fd" : "#123a6b"}
                    style={{
                      fontSize: "calc(1.2rem + 1.5vw)",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {idea.emoji}
                  </text>
                )}
              </g>
            );
          })}

          <circle cx={C} cy={C} r={R_IN} fill="#f4f8fd" stroke="#123a6b" strokeWidth="4" />
          <text
            x={C}
            y={C + 12}
            textAnchor="middle"
            fill="#2f80d8"
            style={{
              font: `400 calc(1.5rem + 0.8vw) 'Great Vibes', cursive`,
            }}
          >
            us
          </text>

          {showSpinButton && (
            <>
              <circle
                cx={C}
                cy={C}
                r={isSpinning ? 42 : 48}
                fill={isSpinning ? "#f1f5f9" : "#ffffff"}
                stroke="#123a6b"
                strokeWidth="3"
              />
              <text
                x={C}
                y={C + 10}
                textAnchor="middle"
                fill={isSpinning ? "#94a3bc" : "#2f80d8"}
                style={{
                  font: `700 calc(1rem + 0.3vw) 'Plus Jakarta Sans', system-ui, sans-serif`,
                  letterSpacing: "2px",
                }}
              >
                {isSpinning ? "SPIN…" : "SPIN"}
              </text>
            </>
          )}
        </g>

        <circle
          cx={C}
          cy={C}
          r={R_OUT}
          fill="none"
          stroke="#123a6b"
          strokeWidth="2"
          strokeDasharray="6,4"
          opacity="0.3"
        />
      </svg>

      {showSpinButton && (
        <div
          className="absolute inset-0 rounded-full"
          style={{ cursor: "pointer", zIndex: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            onSpinClick();
          }}
          aria-label="Spin the wheel"
        />
      )}
    </div>
  );
};

interface DateWheelFocusedProps {
  onClose: () => void;
  onSpinResult?: (description: string) => void;
}

function DateWheelFocused({ onClose, onSpinResult }: DateWheelFocusedProps) {
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const spinTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(spinTimer.current), []);

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
      const newPicked = (landed + N) % N;
      setPicked(newPicked);
      if (onSpinResult) {
        onSpinResult(IDEAS[newPicked].description);
      }
    }, SPIN_DURATION);
  }, [isSpinning, rotationDegree]);

  const handleSliceHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (isSpinning) return;
    setTooltipPos({ x: e.clientX, y: e.clientY });
  }, [isSpinning]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setTooltipPos(null);
  }, []);

  const label = picked !== null ? IDEAS[picked].description : null;

  return (
    <>
      <div
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
        role="button"
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center mt-[5vh] mb-[4vh]">
        <div
          className="relative flex flex-col items-center justify-center gap-[3.5vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
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
              onSpinClick={handleSpinClick}
            />
          </div>

          {hoveredIndex !== null && tooltipPos && (
            <motion.div
              className="pointer-events-none fixed z-[10000] rounded-lg bg-cream-50 px-3 py-2 text-rose-800 shadow-xl"
              style={{
                left: tooltipPos.x + 16,
                top: tooltipPos.y + 16,
                maxWidth: "200px",
                fontSize: "calc(0.6rem + 0.2vw)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              {IDEAS[hoveredIndex].description}
            </motion.div>
          )}

          {label && !isSpinning && (
            <motion.div
              className="flex w-full flex-col items-center justify-center text-center box-border"
              style={{ padding: "0 5vmin" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <span
                className="press-label font-bold text-rose-800 break-words"
                style={{ fontSize: "calc(1rem + 0.8vw)" }}
              >
                {label}
              </span>
            </motion.div>
          )}

          <p className="press-label opacity-60 text-center" style={{ fontSize: "calc(0.7rem + 0.3vw)" }}>
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

function DateWheelPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const wheelRef = useRef<HTMLDivElement>(null);

  const handlePreviewClick = useCallback(() => {
    setIsModalOpen(true);
    setTimeout(() => {
      wheelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div
        className="relative mx-auto aspect-square w-[min(42vmin,280px)]"
        style={{ overflow: "visible" }}
        ref={wheelRef}
      >
        <motion.div
          className="relative mx-auto flex cursor-pointer items-center justify-center rounded-full bg-cream-50 ring-2 ring-rose-200 hover:ring-rose-400"
          style={{
            width: "100%",
            height: "100%",
          }}
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
            onSpinClick={() => {}}
          />
        </motion.div>

      <p
        className="press-label opacity-60 absolute -bottom-[2rem] left-0 right-0 text-center"
        style={{ fontSize: "calc(0.7rem + 0.3vw)" }}
      >
        tap to spin
      </p>
    </div>

      {isModalOpen && <DateWheelFocused onClose={handleClose} />}
    </>
  );
}

export default DateWheelPreview;
export { DateWheelFocused as DateWheelModal };
