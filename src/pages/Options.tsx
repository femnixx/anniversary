"use client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import compliments from "../assets/compliments.png";
import date from "../assets/date.png";
import moments from "../assets/moments.png";
import together from "../assets/together.png";
import { ScrollReveal, RevealText } from '@/components/ScrollReveal';
import DateWheel from '@/components/DateWheel';
import ReasonTerminal from '@/components/ReasonTerminal';

interface CardProps {
  imgSrc: string;
  label: string;
  alt: string;
  to: string;
  icon: string;
  delay: number;
}

const Card = ({ imgSrc, label, alt, to, icon, delay }: CardProps) => {
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
          className="romantic-card reg-tick relative h-full w-full flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-white"
          onClick={() => navigate(to)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(to); }
          }}
          aria-label={label}
        >
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
                className="relative h-[clamp(6.5rem,13vw,14rem)] object-contain"
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
  { imgSrc: compliments, label: "Compliments", alt: "Stars and compliments", to: "/compliments", icon: "💕" },
];

function Options() {
  const navigate = useNavigate();

  /* Dominant colour of the last photo viewed on /plan, cached in
     sessionStorage by that page. Read once on mount and again when the
     tab regains focus — no polling loop, so the choice cards never
     re-render on a timer. */
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
    return () => window.removeEventListener("focus", onShow);
  }, []);

  return (
    <div className="page-container min-h-screen relative">
      <main className="relative z-10 flex flex-col min-h-screen">
      <ScrollReveal direction="down" delay={0.1} className="pt-8 px-3 sm:px-4 flex-1">
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center">
            <p className="press-label mb-2">pick a page</p>
            <RevealText
              text="choose your adventure"
              className="font-romantic type-title ink-mark inline-block text-[1.5rem] sm:text-[1.75rem]"
              delay={0.2}
            />
            <p className="text-rose-600 type-lead mt-3">
              every path leads to more of us
            </p>
          </div>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr w-full max-w-6xl mx-auto">
            {cardData.map((d, i) => (
              <Card key={d.to} {...d} delay={i * 0.08} />
            ))}
          </div>

          {halo && (
            <div className="flex flex-col items-center gap-4 mt-8 lg:gap-6 lg:mt-12">
              <p className="text-center">
                <span className="ink-chip">
                  <span className="ink-dot" style={{ background: halo }} />
                  halo from your last photo
                </span>
              </p>
            </div>
          )}
        </ScrollReveal>

        {/* empty band, now populated: a quote strip + a little spin game */}
        <section
          className="relative z-10 px-3 sm:px-4 pb-4"
          aria-label="A quote and a little game"
        >
          <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8 sm:gap-24">
            <ScrollReveal direction="up" delay={0.1} className="w-full flex flex-col items-center gap-6">
              <button
                className="romantic-button romantic-button-ghost mt-6"
                onClick={() => navigate('/message')}
              >
                back to the letter
              </button>
              <ReasonTerminal />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="w-full">
              <div className="flex flex-col items-center gap-8 mt-6 md:mt-8 w-full">
                <div className="text-center">
                  <p className="press-label mb-2 text-sm sm:text-base">can't decide?</p>
                  <h2 className="font-romantic type-title text-rose-700 text-[1.5rem] sm:text-[1.75rem]">
                    let the wheel choose
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 break-words">
                    Tap anywhere on the wheel to spin
                  </p>
                </div>
                <div className="w-[80vw] max-w-[280px] sm:max-w-[340px] md:max-w-[400px] flex justify-center">
                  <DateWheel />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={1}>
              <footer className="flex justify-center">
                <p className="font-romantic-alt text-rose-600 type-lead text-center bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2 max-w-[calc(100%-2rem)]">
                  each path leads to more love
                </p>
              </footer>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Options;
