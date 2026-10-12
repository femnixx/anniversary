"use client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import compliments from "../assets/compliments.png";
import date from "../assets/date.png";
import moments from "../assets/moments.png";
import together from "../assets/together.png";
import { ScrollReveal, RevealText } from '@/components/ScrollReveal';

interface CardProps {
  imgSrc: string;
  label: string;
  alt: string;
  to: string;
  icon: string;
  delay: number;
  halo: string | null;
}

const Card = ({ imgSrc, label, alt, to, icon, delay, halo }: CardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <ScrollReveal direction="up" delay={delay + 0.1} className="h-full">
        <button
          role="button"
          tabIndex={0}
          className="romantic-card reg-tick relative h-full w-full flex flex-col items-center justify-center p-6 sm:p-8 text-center"
          onClick={() => navigate(to)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(to); }
          }}
          aria-label={label}
        >
          {/* Dynamic halo: the dominant colour of the last photo viewed */}
          {halo && (
            <motion.div
              className="absolute inset-0 rounded-[10px] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ background: halo }}
              aria-hidden="true"
            />
          )}

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="relative">
              {/* offset ink plate behind the artwork */}
              <div
                className="absolute inset-0 bg-lavender-200 rounded-lg"
                style={{ transform: "translate(7px, 7px)" }}
                aria-hidden="true"
              />
              <img
                src={imgSrc}
                alt={alt}
                className="relative h-[clamp(6.5rem,13vw,14rem)] object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <RevealText
                text={label}
                className="font-romantic-alt text-rose-700 type-lead font-bold"
                delay={0.1}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-rose-400 group-hover:w-[calc(100%-2rem)] transition-all duration-500" />
        </button>
      </ScrollReveal>
    </motion.div>
  );
};

const cardData = [
  { imgSrc: date, label: "our memories", alt: "Calendar and heart", to: "/plan", icon: "🌸" },
  { imgSrc: moments, label: "capture moments", alt: "Camera and memories", to: "/moments", icon: "📸" },
  { imgSrc: together, label: "journey together", alt: "Timeline together", to: "/journey", icon: "🗺️" },
  { imgSrc: compliments, label: "love notes", alt: "Stars and compliments", to: "/compliments", icon: "💕" },
];

function Options() {
  const navigate = useNavigate();

  /* Dominant colour of the last photo viewed on /plan, cached in
     sessionStorage by that page. Falls back to null. */
  const readHalo = () => {
    try {
      return sessionStorage.getItem("last-photo-color");
    } catch {
      return null;
    }
  };

  const [halo, setHalo] = useState<string | null>(readHalo);

  useEffect(() => {
    const onShow = () => setHalo(readHalo());
    window.addEventListener("focus", onShow);
    const id = window.setInterval(onShow, 1200);
    return () => {
      window.removeEventListener("focus", onShow);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="page-container min-h-screen relative">
      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-8 px-4 flex-1">
          <div className="text-center mb-10">
            <div className="inline-flex flex-col items-center">
              <p className="press-label mb-2">pick a page</p>
              <RevealText
                text="choose your adventure"
                className="font-romantic type-title ink-mark inline-block"
                delay={0.2}
              />
              <p className="font-romantic-alt text-rose-600 type-lead italic mt-3">
                every path leads to more of us
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 auto-rows-fr w-full max-w-6xl mx-auto">
            {cardData.map((d, i) => (
              <Card key={d.to} {...d} delay={i * 0.08} halo={halo} />
            ))}
          </div>

          {halo && (
            <p className="text-center mt-8">
              <span className="ink-chip">
                <span className="ink-dot" style={{ background: halo }} />
                halo from your last photo
              </span>
            </p>
          )}

          <div className="flex justify-center mt-10">
            <button
              className="romantic-button romantic-button-ghost"
              onClick={() => navigate('/message')}
            >
              back to the letter
            </button>
          </div>
        </ScrollReveal>

        <footer className="relative z-10 py-8 px-4 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-600 type-lead bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2 max-w-[calc(100%-2rem)]">
              each path leads to more love
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Options;
