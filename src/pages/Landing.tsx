"use client";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import cinnamorollpeeking from "../assets/cinnamorollpeeking.png";
import text from "../assets/text.png";
import envelope from "../assets/trans-evelope.png";
import LeaveDialog from '@/components/LeaveDialog';
import { ScrollReveal, RevealText, FloatingElement } from '@/components/ScrollReveal';

const BEGS = [
  { title: "c'mnon noww", msg: "i love you so i sent this to you!!" },
  { title: "i love you though", msg: "i beggg" },
  { title: "pleaseee", msg: "at least give it a shot!!" },
  { title: "but i wanna give you something", msg: "but i wanna give you somethingg" },
];

function Landing() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [begIndex] = useState(0);

  /* ── The "Maybe Later" multiplier ─────────────────────────────
     1st/2nd click: Cinnamoroll reacts (eyes squeezed shut, then a
     teardrop). 3rd click: we choose for them.                   */
  const [maybes, setMaybes] = useState(0);
  const [banner, setBanner] = useState<string | null>(null);

  const handleMaybeLater = () => {
    const next = maybes + 1;
    setMaybes(next);

    if (next >= 3) {
      setBanner("Okay, I'm choosing for you!");
      setTimeout(() => {
        setBanner(null);
        navigate('/message');
      }, 2100);
      return;
    }
    setOpenDialog(true);
  };

  const reaction = maybes === 0 ? 'idle' : maybes === 1 ? 'shy' : 'crying';

  return (
    <div className="page-container flex flex-col min-h-screen relative">
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-10 sm:py-12 pb-[clamp(7rem,17vh,11rem)]">
          <ScrollReveal direction="down" delay={0.2} className="w-full max-w-[clamp(64rem,92vw,88rem)]">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 flex-wrap">

              <ScrollReveal direction="left" delay={0.3} className="w-full min-w-0 max-w-[clamp(22rem,38vw,36rem)]">
                <motion.div
                  className="romantic-card reg-tick relative overflow-visible"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <p className="press-label mb-3">for you · no.001</p>

                  <div className="text-center">
                    <RevealText
                      text="surprise!"
                      className="font-romantic type-hero text-rose-700 mb-3"
                      delay={0.4}
                    />

                    <div className="relative mb-5">
                      <FloatingElement amplitude={8} period={4} className="inline-block">
                        <img
                          src={envelope}
                          alt="love letter envelope"
                          className="w-[clamp(11rem,26vw,26rem)] transition-transform duration-500 hover:scale-105"
                        />
                      </FloatingElement>
                    </div>

                    <RevealText
                      text="you've got mail!"
                      className="font-romantic-alt text-rose-600 type-subtitle mb-6"
                      delay={0.5}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        className="romantic-button romantic-button-primary"
                        onClick={() => navigate('/message')}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="flex items-center gap-2 font-ui">
                          <span>Open Letter</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4-4 4M3 12h18" />
                          </svg>
                        </span>
                      </motion.button>

                      <motion.button
                        className="romantic-button romantic-button-ghost"
                        onClick={handleMaybeLater}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="flex items-center gap-2 font-ui">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Maybe Later</span>
                          {maybes > 0 && maybes < 3 && (
                            <span className="ink-chip ml-1">{maybes}/3</span>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.4} className="w-full min-w-0 flex-1">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="relative">
                    <img
                      src={text}
                      alt="handwritten love text"
                      className="w-[clamp(16rem,42vw,42rem)] max-w-full transition-transform duration-500 hover:rotate-1"
                    />
                    {/* offset plate behind the text image */}
                    <div
                      className="absolute inset-0 -z-10 bg-lavender-200 rounded-lg"
                      style={{ transform: "translate(10px, 10px)" }}
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </main>

        {/* Cinnamoroll peeking from the bottom edge, reacting to the multiplier */}
        <div className="pointer-events-none">
          <FloatingElement
            amplitude={10}
            period={5}
            className="block absolute bottom-0 left-4 sm:left-10 lg:left-20 z-10 pointer-events-auto"
          >
            <div className="relative">
              <img
                src={cinnamorollpeeking}
                alt="cinnamoroll peeking with love"
                className="w-[clamp(8rem,20vw,22rem)] translate-y-6"
                style={{
                  /* shy: squeeze the eyes shut; crying: squeeze + droop */
                  filter: reaction === 'idle' ? undefined
                    : reaction === 'shy' ? "brightness(0.94) saturate(0.85)"
                    : "brightness(0.9) saturate(0.7)",
                }}
              />
              {reaction !== 'idle' && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -top-2 flex gap-1"
                  initial={{ opacity: 0, scale: 0.4, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                >
                  {reaction === 'shy'
                    ? <span className="text-2xl">🙈</span>
                    : <>
                        <span className="text-2xl">💧</span>
                        <span className="text-xl">🥺</span>
                      </>}
                </motion.div>
              )}
            </div>
          </FloatingElement>
        </div>

        <footer className="relative z-20 py-6 sm:py-8 px-4 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-600 type-lead bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2 max-w-[calc(100%-2rem)]">
              made with love for you
            </p>
          </ScrollReveal>
        </footer>
      </div>

      {/* "Okay, I'm choosing for you!" banner */}
      {banner && (
        <motion.div
          className="fixed inset-x-0 top-24 z-50 flex justify-center px-4 pointer-events-none"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
        >
          <motion.div
            className="bg-rose-400 border-2 border-rose-700 plate-lg rounded-2xl px-8 py-5 text-center"
            animate={{ rotate: [0, -1.5, 1.5, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            <p className="font-romantic type-title text-cream-50">{banner}</p>
            <p className="font-romantic-alt text-cream-50/90 text-lg mt-1">off we go 💌</p>
          </motion.div>
        </motion.div>
      )}

      <LeaveDialog open={openDialog} onClose={() => setOpenDialog(false)} beg={BEGS[begIndex % BEGS.length]} />
    </div>
  );
}

export default Landing;
