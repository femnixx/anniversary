"use client";

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import compliments from "../assets/compliments.png";
import date from "../assets/date.png";
import moments from "../assets/moments.png";
import title from "../assets/optionstitle.png";
import together from "../assets/together.png";
import { ScrollReveal, StaggerContainer, RevealText } from '@/components/ScrollReveal';

interface CardProps {
  imgSrc: string;
  label: string;
  alt: string;
  to: string;
  icon: React.ReactNode;
  delay: number;
}

const Card = ({ imgSrc, label, alt, to, icon, delay }: CardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
      whileHover={{ y: -12, scale: 1.02, boxShadow: "0 32px 64px -12px rgba(59, 142, 224, 0.32)" }}
      whileTap={{ scale: 0.98 }}
    >
      <ScrollReveal direction="up" delay={delay + 0.1} className="h-full">
        <button
          role="button"
          tabIndex={0}
          className="romantic-card relative overflow-hidden group h-full w-full flex flex-col items-center justify-center p-6 sm:p-8 text-center"
          onClick={() => navigate(to)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate(to);
            }
          }}
          aria-label={label}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-cream-50/50 to-lavender-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay }}
          >
            <div className="relative">
              <img
                src={imgSrc}
                alt={alt}
                className="h-[clamp(6.5rem,13vw,14rem)] object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
              />
              
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-rose-300/20 to-lavender-300/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.3, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay }}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-4xl animate-heartbeat">{icon}</span>
              <RevealText 
                text={label} 
                className="font-romantic-alt text-rose-700 type-lead font-medium" 
                delay={0.1}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-rose-400 to-lavender-500 group-hover:w-full transition-all duration-500"
          />
        </button>
      </ScrollReveal>
    </motion.div>
  );
};

const cardData = [
  { imgSrc: date, label: "our memories", alt: "Calendar and heart", to: "/plan", icon: "🌸", delay: 0 },
  { imgSrc: moments, label: "capture moments", alt: "Camera and memories", to: "/moments", icon: "📸", delay: 0.1 },
  { imgSrc: together, label: "journey together", alt: "Timeline together", to: "/journey", icon: "🗺️", delay: 0.2 },
  { imgSrc: compliments, label: "love notes", alt: "Stars and compliments", to: "/compliments", icon: "💕", delay: 0.3 },
];

function Options() {
  return (
    <div className="page-container min-h-screen relative">
      <main className="flex-1 flex flex-col items-center px-4 py-16">
        <ScrollReveal direction="down" delay={0.1} className="w-full max-w-6xl">
          <motion.div
            className="text-center mb-12 relative"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-rose border border-rose-200/50 shadow-lg shadow-rose-200/30 mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-4xl animate-heartbeat">💕</span>
              <RevealText 
                text="choose your adventure" 
                className="font-romantic type-title text-gradient-romantic" 
                delay={0.2}
              />
              <span className="text-4xl animate-heartbeat" style={{ animationDelay: '0.3s' }}>💕</span>
            </motion.div>

            <img
              src={title}
              alt="Our options"
              className="h-[clamp(4.5rem,9vw,9.5rem)] object-contain drop-shadow-xl mx-auto"
            />
          </motion.div>

          <StaggerContainer className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 auto-rows-fr">
              {cardData.map((data, index) => (
                <Card
                  key={data.to}
                  {...data}
                  delay={data.delay + index * 0.05}
                />
              ))}
            </div>
          </StaggerContainer>
        </ScrollReveal>
      </main>

      <footer className="py-8 px-4">
        <ScrollReveal direction="up" delay={1}>
          <p className="font-romantic-alt text-rose-500/80 text-center type-lead">
            each path leads to more love 💕
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
}

export default Options;