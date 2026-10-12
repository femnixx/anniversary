"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import cinnamoroll from "../assets/cinnamorollpeeking.png";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import { ScrollReveal, RevealText } from '@/components/ScrollReveal';

/* Keep the current set until the new one is dropped in. */
const complimentsList = [
  "a kind and patient soul like you doesn't deserve to be broken",
  "never have i sought upon someone's heart but yours",
  "for always being kind, for always being genuine, thank you for everything",
  "thinking about you everyday makes my heart ache from not being able to always see you",
  "having you made me realize that someone can love as much as you",
  "your smile and giggle are one of the wonders of my world",
  "the dandelions sing when your presence is seen",
  "you are my today and all of my tomorrows",
  "loving you is the easiest thing i've ever done",
  "you make ordinary moments feel like magic",
];

const loveNotes = [
  "i hope you love me",
  "hiiii i hope you're enjoying this even though it's not perfect",
  "no AI!! all made by me",
  "you deserve every single part of my praise for everything you've done",
  "your happiness is my favorite thing in the world",
  "thank you for choosing me, every single day",
  "you're my person, my home, my everything",
];

const STREAK_TARGET = 10;

function Confetti() {
  const bits = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    cx: `${(Math.random() * 240 - 120).toFixed(0)}px`,
    cy: `${(Math.random() * 180 + 60).toFixed(0)}px`,
    cr: `${(Math.random() * 520 + 180).toFixed(0)}deg`,
    color: ["#2f80d8", "#123a6b", "#c9ddf0", "#3b6fc4", "#8fb8dc"][i % 5],
    size: 5 + Math.random() * 6,
    delay: Math.random() * 0.18,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
      {bits.map(b => (
        <span
          key={b.id}
          className="absolute left-1/2 top-1/2 animate-confetti"
          style={{
            width: b.size,
            height: b.size,
            background: b.color,
            borderRadius: b.id % 3 === 0 ? "50%" : "2px",
            ["--cx" as string]: b.cx,
            ["--cy" as string]: b.cy,
            ["--cr" as string]: b.cr,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Compliments() {
  const [randomCompliment, setRandomCompliment] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const generateCompliment = () => {
    const pool = complimentsList.filter(c => !history.includes(c));
    const pick = pool.length ? pool : complimentsList;
    const chosen = pick[Math.floor(Math.random() * pick.length)];

    const nextStreak = streak + 1;
    setRandomCompliment(chosen);
    setShowDialog(true);
    setStreak(nextStreak);
    setHistory(prev => [...prev.slice(-6), chosen]);
  };

  const hitTarget = streak >= STREAK_TARGET;

  return (
    <div className="page-container min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src={bluerealbackground3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-cream-50/85" />
        <div className="absolute inset-0 halftone-fade" />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-8 px-4 flex-1 flex flex-col">
          <div className="text-center mb-10">
            <div className="inline-flex flex-col items-center">
              <p className="press-label mb-2">handmade · for your eyes</p>
              <RevealText
                text="love notes for you"
                className="font-romantic type-title ink-mark inline-block"
                delay={0.2}
              />
              <p className="font-romantic-alt text-rose-600 type-lead italic mt-3">
                one at a time, no repeats until they're used up
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-4">
            <ScrollReveal direction="up" delay={0.3} className="w-full max-w-[clamp(28rem,92vw,44rem)]">
              <motion.div
                className="romantic-card reg-tick relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
              >
                <p className="press-label mb-2">no.001</p>

                <div className="text-center">
                  <RevealText
                    text="to my favorite person"
                    className="font-romantic type-subtitle text-rose-700 mb-1"
                    delay={0.4}
                  />
                  <RevealText
                    text="handmade love notes, your eyes only"
                    className="font-romantic-alt text-rose-600 type-body italic mb-8"
                    delay={0.5}
                  />

                  <div className="relative min-h-[clamp(6rem,12vw,9rem)] flex items-center justify-center mb-8">
                    <motion.div
                      className="w-24 h-24 rounded-xl bg-cream-100 border-2 border-rose-700 flex items-center justify-center text-4xl"
                      animate={{ rotate: [0, 4, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      💌
                    </motion.div>

                    <AnimatePresence mode="wait">
                      {randomCompliment && (
                        <motion.p
                          key={randomCompliment}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="absolute font-romantic-alt text-rose-700 type-subtitle italic px-4"
                        >
                          "{randomCompliment}"
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    className="romantic-button romantic-button-primary"
                    onClick={generateCompliment}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="flex items-center gap-2 font-ui">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                      </svg>
                      {showDialog ? "Another one" : "Reveal a Love Note"}
                    </span>
                  </motion.button>

                  {/* Heart streak */}
                  {streak > 0 && (
                    <motion.div
                      className="mt-7 inline-flex items-center gap-3 bg-cream-100 border-2 border-rose-700 rounded-full px-5 py-2"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 340, damping: 22 }}
                    >
                      <span className="text-xl animate-heartbeat">💗</span>
                      <span className="font-romantic text-2xl text-rose-700">
                        heart streak {streak}
                      </span>
                      <span className="press-label">
                        {hitTarget ? "unlocked" : `${STREAK_TARGET - streak} to go`}
                      </span>
                    </motion.div>
                  )}

                  {/* streak target reaction */}
                  {hitTarget && (
                    <motion.div
                      className="relative mt-8"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Confetti />
                      <div className="relative flex flex-col items-center gap-3">
                        <img
                          src={cinnamoroll}
                          alt="cinnamoroll celebrating with you"
                          className="w-28 drop-shadow-lg"
                        />
                        <p className="font-romantic type-subtitle text-rose-700">
                          ten in a row, and you're still here
                        </p>
                        <p className="font-romantic-alt text-sage-600 type-body italic">
                          thank you for reading every single one
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {history.length > 0 && (
                    <div className="mt-8 pt-6 border-t-2 border-rose-200">
                      <p className="press-label mb-3">previous notes</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {history.slice(-4).map((note, i) => (
                          <motion.span
                            key={`${note}-${i}`}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.08 }}
                            className="ink-chip"
                          >
                            {note.length > 28 ? `${note.slice(0, 28)}…` : note}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.8} className="mb-8 mt-10">
            <div className="max-w-3xl mx-auto">
              <p className="press-label mb-4 text-center">whispers</p>
              <div className="space-y-3">
                {loveNotes.map((note, index) => (
                  <motion.div
                    key={index}
                    className="romantic-card-flat !p-4"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💭</span>
                      <p className="font-romantic-alt text-sage-700 type-body italic">{note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </ScrollReveal>

        <footer className="relative z-10 py-8 px-4 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic text-rose-600 type-lead bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2">
              infinite love, infinite notes
            </p>
          </ScrollReveal>
        </footer>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showDialog && randomCompliment && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDialog(false)}
          >
            <motion.div
              className="relative bg-cream-50 border-2 border-rose-700 plate-lg rounded-2xl p-[clamp(1.5rem,4vw,2.5rem)] max-w-[clamp(20rem,92vw,30rem)] w-full text-center"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {hitTarget && <Confetti />}

              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-cream-100 border-2 border-rose-700 flex items-center justify-center text-4xl animate-heartbeat">
                  💌
                </div>

                <p className="press-label mb-2">your love note</p>
                <p className="font-romantic type-subtitle text-rose-700 mb-4">
                  note {history.length}
                </p>

                <p className="font-romantic-alt text-rose-700 type-lead italic leading-relaxed mb-6 px-2">
                  "{randomCompliment}"
                </p>

                {/* streak inside the modal */}
                <div className="inline-flex items-center gap-2 bg-cream-100 border-2 border-rose-700 rounded-full px-4 py-1.5 mb-6">
                  <span className="animate-heartbeat">💗</span>
                  <span className="font-romantic-alt text-rose-700 font-bold">
                    streak {streak}
                  </span>
                </div>

                <motion.button
                  className="romantic-button romantic-button-primary w-full"
                  onClick={() => setShowDialog(false)}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="flex items-center justify-center gap-2 font-ui">
                    Keep Close to Heart
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Compliments;
