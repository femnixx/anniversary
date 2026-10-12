"use client";

import { motion } from "framer-motion";

/**
 * Vintage passport stamp — double-circle ink ring, place, date,
 * and a pair of arrival bars. Rendered in solid ink with an offset
 * spot plate behind it, so it reads as stamped, not drawn.
 */
export default function PassportStamp({ place, date }: { place: string; date: string }) {
  return (
    <motion.div
      className="relative inline-block select-none"
      initial={{ opacity: 0, scale: 2.2, rotate: -26 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -7 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
      role="img"
      aria-label={`Passport stamp: ${place}, ${date}`}
    >
      {/* offset spot plate — the misregistration */}
      <div className="absolute inset-0" style={{ transform: "translate(4px,4px)" }} aria-hidden="true">
        <Stamp color="#2f80d8" place={place} date={date} />
      </div>
      {/* primary ink plate */}
      <div className="relative">
        <Stamp color="#123a6b" place={place} date={date} />
      </div>
    </motion.div>
  );
}

function Stamp({ color, place, date }: { color: string; place: string; date: string }) {
  return (
    <svg width="150" height="96" viewBox="0 0 150 96" xmlns="http://www.w3.org/2000/svg">
      {/* outer ring */}
      <circle cx="75" cy="48" r="42" fill="none" stroke={color} strokeWidth="3.4" />
      {/* inner ring */}
      <circle cx="75" cy="48" r="35" fill="none" stroke={color} strokeWidth="1.6" />
      {/* place */}
      <text
        x="75" y="38" textAnchor="middle"
        fill={color}
        style={{ font: "700 15px 'Plus Jakarta Sans', sans-serif", letterSpacing: "1.6px" }}
      >
        {place}
      </text>
      {/* divider */}
      <line x1="46" y1="45" x2="104" y2="45" stroke={color} strokeWidth="1.4" />
      {/* date */}
      <text
        x="75" y="58" textAnchor="middle"
        fill={color}
        style={{ font: "700 11px 'Plus Jakarta Sans', sans-serif", letterSpacing: "1.2px" }}
      >
        {date}
      </text>
      {/* ARRIVAL / DEPARTURE bars */}
      <text
        x="75" y="72" textAnchor="middle"
        fill={color}
        style={{ font: "700 7.5px 'Plus Jakarta Sans', sans-serif", letterSpacing: "2.4px" }}
      >
        ARRIVED
      </text>
      {/* corner ticks */}
      <g stroke={color} strokeWidth="1.6">
        <line x1="75" y1="2" x2="75" y2="9" />
        <line x1="75" y1="87" x2="75" y2="94" />
        <line x1="31" y1="48" x2="38" y2="48" />
        <line x1="112" y1="48" x2="119" y2="48" />
      </g>
    </svg>
  );
}
