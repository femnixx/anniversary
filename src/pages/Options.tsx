"use client";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import compliments from "../assets/compliments.png";
import date from "../assets/date.png";
import moments from "../assets/moments.png";
import together from "../assets/together.png";
import bluekitty from "../assets/bluekitty.png";
import { ScrollReveal, RevealText } from '@/components/ScrollReveal';
import DateWheel from '@/components/DateWheel';

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
          className="romantic-card reg-tick relative h-full w-full flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-white"
          onClick={() => navigate(to)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(to); }
          }}
          aria-label={label}
        >
              <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 icon-container">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-lavender-200 rounded-lg"
                    style={{ transform: "translate(7px, 7px)" }}
                    aria-hidden="true"
                  />
                  <img
                    src={imgSrc}
                    alt={alt}
                    className="relative h-[clamp(5rem,12vw,12rem)] sm:h-[clamp(5.5rem,14vw,14rem)] md:h-[clamp(6rem,16vw,16rem)] object-contain"
                  />
                </div>

            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">{icon}</span>
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
  { imgSrc: date, label: "our memories", alt: "Calendar and heart", to: "/memories", icon: "🌸" },
  { imgSrc: moments, label: "capture moments", alt: "Camera and memories", to: "/moments", icon: "📸" },
  { imgSrc: together, label: "journey together", alt: "Timeline together", to: "/journey", icon: "🗺️" },
  { imgSrc: compliments, label: "Compliments", alt: "Stars and compliments", to: "/compliments", icon: "💕" },
  { imgSrc: bluekitty, label: "100 reasons", alt: "Cute cat", to: "/reasons", icon: "🐱" },
];

function Options() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [currentPath]);

  /* Dominant colour of the last photo viewed on /memories, cached in
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
    <div className="page-container min-h-screen 100dvh relative max-w-7xl mx-auto">
      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-6 sm:pt-8 px-3 sm:px-4 flex-1">
          <div className="text-center mb-8">
            <div className="inline-flex flex-col items-center">
              <p className="press-label mb-2">pick a page</p>
              <RevealText
                text="choose your adventure"
                className="font-romantic type-title ink-mark inline-block"
                delay={0.2}
                style={{ fontSize: "calc(1.5rem + 0.5vw)" }}
              />
              <p className="text-rose-600 type-lead mt-3" style={{ fontSize: "calc(0.8rem + 0.2vw)" }}>
                every path leads to more of us
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 auto-rows-fr w-full card-grid">
            {cardData.map((d, i) => (
              <Card key={d.to} {...d} delay={i * 0.08} />
            ))}
          </div>

          {halo && (
            <div className="flex flex-col items-center gap-4 mt-6 lg:gap-6 lg:mt-8">
              <p className="text-center">
                <span className="ink-chip">
                  <span className="ink-dot" style={{ background: halo }} />
                  halo from your last photo
                </span>
              </p>
            </div>
          )}
        </ScrollReveal>

        {/* Spin wheel section */}
        <section
          className="relative z-10 px-3 sm:px-4 py-8"
          aria-label="A little spin game"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
            <ScrollReveal direction="up" delay={0.1} className="w-full flex flex-col items-center gap-4">
              <button
                className="romantic-button romantic-button-ghost"
                onClick={() => navigate('/message')}
                style={{ fontSize: "calc(0.85rem + 0.2vw)" }}
              >
                back to the letter
              </button>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="w-full">
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <p className="press-label mb-2" style={{ fontSize: "calc(0.7rem + 0.2vw)" }}>can't decide?</p>
                  <h2 className="font-romantic type-title text-rose-700" style={{ fontSize: "calc(1.5rem + 0.6vw)" }}>
                    let the wheel choose
                  </h2>
                  <p className="text-gray-500 mt-1 break-words" style={{ fontSize: "calc(0.65rem + 0.2vw)" }}>
                    Tap anywhere on the wheel to spin
                  </p>
                </div>
                <div className="flex justify-center">
                  <DateWheel />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <footer className="relative z-10 py-6 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-600 type-lead text-center bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2 break-words whitespace-normal" style={{ fontSize: "calc(0.9rem + 0.8vw)" }}>
            each path leads to more love
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Options;
