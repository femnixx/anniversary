"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Riso press sheet ground layer.
 *
 * Deliberately OPAQUE throughout: warm paper stock, halftone dot
 * fields and coarse grain. Clouds and birds are flat spot-ink
 * silhouettes with an offset plate behind them — no translucency,
 * no drop shadow, no blur anywhere.
 */

interface Cloud { id: number; x: number; y: number; scale: number; speed: number; svg: string; }
interface Bird { id: number; x: number; y: number; scale: number; speed: number; phase: number; }

/* Flat ink silhouette — filled, not outlined */
const CLOUD_SVGS = [
  `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,52 Q30,20 60,20 Q80,8 100,20 Q130,8 150,32 Q172,32 172,52 Q172,74 150,82 Q100,100 30,82 Z"/></svg>`,
  `<svg viewBox="0 0 250 120" xmlns="http://www.w3.org/2000/svg"><path d="M40,62 Q40,22 80,22 Q110,6 140,32 Q182,8 212,42 Q232,42 232,68 Q232,92 200,102 Q120,122 40,102 Z"/></svg>`,
  `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg"><path d="M20,46 Q20,14 50,14 Q70,4 90,20 Q110,4 130,26 Q160,26 160,52 Q160,72 140,80 Q70,96 20,80 Z"/></svg>`,
];

const BIRD_UP = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 4 C20 4 10 14 10 26 c0 9 6 19 14 25 4 3 8 7 12 12 4-5 8-9 12-12 8-6 14-16 14-25 C54 14 44 4 32 4 Z"/><path d="M10 34 Q20 24 32 34 Q44 24 54 34 M6 40 Q20 30 32 40 Q44 30 58 40"/></svg>`;

const BIRD_DOWN = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 4 C20 4 10 14 10 26 c0 9 6 19 14 25 4 3 8 7 12 12 4-5 8-9 12-12 8-6 14-16 14-25 C54 14 44 4 32 4 Z"/><path d="M32 36 Q18 46 10 36 M32 36 Q46 46 54 36 M32 36 Q18 26 10 36 M32 36 Q46 26 54 36"/></svg>`;

export function RomanticBackground() {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [birds, setBirds] = useState<Bird[]>([]);
  const raf = useRef<number>();

  useEffect(() => {
    setClouds(Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: Math.random() * 120 - 15,
      y: Math.random() * 55 + 4,
      scale: 0.45 + Math.random() * 0.7,
      speed: 0.03 + Math.random() * 0.05,
      svg: CLOUD_SVGS[i % CLOUD_SVGS.length],
    })));

    setBirds(Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 38 + 8,
      scale: 0.28 + Math.random() * 0.38,
      speed: 0.16 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2,
    })));

    let last = 0;
    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      setClouds(prev => prev.map(c => ({
        ...c,
        x: c.x + c.speed * dt * 12,
        y: c.y + Math.sin(t / 2200 + c.id) * 0.02,
      })).map(c => c.x > 115 ? { ...c, x: -15, y: Math.random() * 55 + 4 } : c));

      setBirds(prev => prev.map(b => ({
        ...b,
        x: b.x + b.speed * dt * 12,
        y: b.y + Math.sin(t / 1100 + b.phase) * 0.45,
        phase: b.phase + dt * 7,
      })).map(b => b.x > 104 ? { ...b, x: -6, y: Math.random() * 38 + 8 } : b));

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* 1. Warm paper stock — solid, opaque */}
      <div className="absolute inset-0 bg-cream-50" />

      {/* 2. Coarse halftone field in the open ground */}
      <div className="absolute inset-0 halftone-fade" />

      {/* 3. Paper grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* 4. Flat ink clouds, each with an offset spot plate behind it */}
      {clouds.map(c => (
        <div key={`c${c.id}`} className="absolute" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
          <div className="relative" style={{ width: 200 * c.scale, height: 100 * c.scale }}>
            {/* offset plate — the misregistration */}
            <div
              className="absolute inset-0"
              style={{ transform: "translate(6px, 6px)", opacity: 0.9 }}
              dangerouslySetInnerHTML={{ __html: c.svg.replace('d="', 'fill="#d8e6fa" d="') }}
            />
            {/* primary ink plate */}
            <div
              className="absolute inset-0"
              dangerouslySetInnerHTML={{ __html: c.svg.replace('d="', 'fill="#bbd5f2" d="') }}
            />
          </div>
        </div>
      ))}

      {/* 5. Birds: solid ink silhouette, wings flapping by swapping plates */}
      {birds.map(b => (
        <div key={`b${b.id}`} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%`, width: 64 * b.scale, height: 64 * b.scale }}>
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0"
              style={{ transform: "translate(3px, 3px)" }}
              dangerouslySetInnerHTML={{ __html: (Math.sin(b.phase) > 0 ? BIRD_UP : BIRD_DOWN).replace('fill="none"', 'fill="#8fb8dc"') }}
            />
            <div
              className="absolute inset-0"
              dangerouslySetInnerHTML={{ __html: (Math.sin(b.phase) > 0 ? BIRD_UP : BIRD_DOWN).replace('z"/', '#123a6b" z="/') }}
            />
          </div>
        </div>
      ))}

      {/* 6. A few solid ink-dots scattered as sparse spot accents */}
      {[
        { l: "12%", t: "22%", s: 10, c: "#2f80d8" },
        { l: "84%", t: "16%", s: 13, c: "#123a6b" },
        { l: "68%", t: "62%", s: 8, c: "#8fb8dc" },
        { l: "26%", t: "78%", s: 12, c: "#3b6fc4" },
        { l: "92%", t: "48%", s: 9, c: "#123a6b" },
        { l: "6%", t: "58%", s: 7, c: "#2f80d8" },
        { l: "48%", t: "12%", s: 11, c: "#8fb8dc" },
        { l: "76%", t: "86%", s: 8, c: "#3b6fc4" },
      ].map((d, i) => (
        <div
          key={`d${i}`}
          className="absolute rounded-full"
          style={{ left: d.l, top: d.t, width: d.s, height: d.s, background: d.c }}
        />
      ))}
    </div>
  );
}

/* Solid printed hearts that rise — filled disks, no blur */
export function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 9,
    duration: 11 + Math.random() * 9,
    size: 9 + Math.random() * 13,
    color: ["#2f80d8", "#123a6b", "#8fb8dc", "#3b6fc4", "#c9ddf0"][i % 5],
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute bottom-full animate-float-up"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            background: h.color,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            transform: "rotate(-45deg)",
          }}
        >
          <div className="w-full h-full" style={{ background: h.color, borderRadius: "50% 50% 0 0" }} />
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(100vh) rotate(-45deg) scale(0); opacity: 0; }
          8%   { opacity: .9; transform: translateY(88vh) rotate(-45deg) scale(1); }
          90%  { opacity: .9; transform: translateY(-8vh) rotate(-45deg) scale(1); }
          100% { transform: translateY(-18vh) rotate(-45deg) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* Halftone sparkles — solid dots that pulse, not blurred blobs */
export function Sparkles({ count = 18 }: { count?: number }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 2.6 + Math.random() * 3,
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {sparkles.map(s => (
        <div
          key={s.id}
          className="absolute animate-pulse-soft"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: "#123a6b",
            borderRadius: "50%",
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
