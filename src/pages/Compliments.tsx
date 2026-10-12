"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import { ScrollReveal, StaggerContainer, StaggerItem, FloatingElement, RevealText } from '@/components/ScrollReveal';

const complimentsList = [
  "a kind and patient soul like you doesn't deserve to be broken^^",
  "never have i sought upon someone's heart but yours",
  "for always being kind, for always being genuine, thank you for everything.",
  "thinking about you everyday makes my heart ache from not being able to always see you.",
  "having you made me realize that someone can love as much as you.",
  "your smile and giggle are one of the wonders of my world",
  "the dandelions sings when your presence is seen",
  "you are my today and all of my tomorrows",
  "loving you is the easiest thing i've ever done",
  "you make ordinary moments feel like magic",
];

const loveNotes = [
  "i hope you love me",
  "hiiii i hope you're enjoying this even though it's not perfect",
  "no AI!! all made by me :3",
  "you deserve every single part of my praise for everything you've done",
  "your happiness is my favorite thing in the world",
  "thank you for choosing me, every single day",
  "you're my person, my home, my everything",
];

function Compliments() {
  const [randomCompliment, setRandomCompliment] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [complimentHistory, setComplimentHistory] = useState<string[]>([]);

  const generateCompliment = () => {
    const available = complimentsList.filter(c => !complimentHistory.includes(c) || complimentHistory.length >= complimentsList.length);
    const randomIndex = Math.floor(Math.random() * available.length);
    const compliment = available[randomIndex];
    setRandomCompliment(compliment);
    setShowDialog(true);
    setComplimentHistory(prev => [...prev.slice(-6), compliment]);
  };

  return (
    <div className="page-container min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img
          src={bluerealbackground3}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-transparent to-lavender-900/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse at 30% 30%, rgba(146, 198, 249, 0.32) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(199, 210, 254, 0.32) 0%, transparent 50%)'
        }} />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-8 px-4 flex-1 flex flex-col">
          <div className="text-center mb-10 relative">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-rose border border-rose-200/50 shadow-lg shadow-rose-200/30 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-4xl animate-heartbeat">💕</span>
              <RevealText 
                text="love notes for you" 
                className="font-romantic type-title text-gradient-romantic" 
                delay={0.2}
              />
              <span className="text-4xl animate-heartbeat" style={{ animationDelay: '0.3s' }}>💕</span>
            </motion.div>

            <RevealText 
              text="handmade with love, just for your eyes" 
              className="font-romantic-alt text-rose-300/90 type-subtitle" 
              delay={0.4}
            />
          </div>

          <div className="flex-1 flex items-center justify-center px-4">
            <ScrollReveal direction="up" delay={0.3} className="w-full max-w-[clamp(28rem,92vw,44rem)]">
              <motion.div
                className="romantic-card relative overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-cream-50/50 to-lavender-50/50" />
                
                <div className="relative z-10 p-8 text-center">
                  <RevealText 
                    text="to my favorite person" 
                    className="font-romantic type-title text-gradient-romantic mb-2" 
                    delay={0.4}
                  />
                  <RevealText 
                    text="handmade love notes for your eyes only" 
                    className="font-romantic-alt text-rose-600 type-lead mb-8" 
                    delay={0.5}
                  />

                  <motion.div
                    className="relative min-h-[120px] flex items-center justify-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <FloatingElement amplitude={8} period={4} className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-[clamp(6rem,12vw,9rem)] h-[clamp(6rem,12vw,9rem)] rounded-2xl glass-rose border border-rose-200/50 flex items-center justify-center text-5xl animate-heartbeat"
                        animate={{ rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💌
                      </motion.div>
                    </FloatingElement>
                    
                    <AnimatePresence mode="wait">
                      {randomCompliment && (
                        <motion.p
                          key={randomCompliment}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="font-romantic-alt text-rose-700 type-subtitle leading-relaxed italic px-4 max-w-md"
                        >
                          "{randomCompliment}"
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.button
                    className="romantic-button-primary group relative overflow-hidden"
                    onClick={generateCompliment}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={showDialog}
                  >
                    <span className="relative z-10 flex items-center gap-2 font-ui type-body">
                      {showDialog ? (
                        <>
                          <motion.span className="animate-spin">✨</motion.span>
                          <span>Creating magic...</span>
                        </>
                      ) : (
                        <>
                          <span>Reveal a Love Note</span>
                          <motion.svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                          </motion.svg>
                        </>
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-rose-600 to-lavender-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </motion.button>

                  {complimentHistory.length > 0 && (
                    <motion.div
                      className="mt-8 pt-6 border-t border-rose-200/50"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <RevealText 
                        text="previous notes" 
                        className="font-romantic-alt text-rose-500/80 text-sm font-medium mb-4" 
                        delay={0.1}
                      />
                      <div className="flex flex-wrap justify-center gap-2">
                        {complimentHistory.slice(-4).map((note, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 25 }}
                            className="px-3 py-1.5 rounded-full glass-rose border border-rose-200/50 text-xs font-romantic-alt text-rose-600/80 cursor-default"
                          >
                            "{note.slice(0, 30)}..."
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.8} className="mb-8">
            <div className="relative max-w-3xl mx-auto">
              <RevealText 
                text="whispers from my heart" 
                className="font-romantic type-subtitle text-gradient-romantic text-center mb-6" 
                delay={0.1}
              />
              <StaggerContainer className="space-y-3">
                {loveNotes.map((note, index) => (
                  <StaggerItem key={index} direction="left" delay={index * 0.05}>
                    <motion.div
                      className="romantic-card p-4 relative overflow-hidden group"
                      whileHover={{ x: 8, boxShadow: "0 16px 32px -8px rgba(59, 142, 224, 0.22)" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 to-lavender-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 flex items-center gap-3">
                        <motion.div
                          className="w-[clamp(2.5rem,5vw,3.25rem)] h-[clamp(2.5rem,5vw,3.75rem)] rounded-xl glass-rose border border-rose-200/50 flex items-center justify-center text-2xl flex-shrink-0 animate-heartbeat"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        >
                          💭
                        </motion.div>
                        <RevealText 
                          text={note} 
                          className="font-romantic-alt text-sage-700 type-body leading-relaxed italic" 
                          delay={0.1}
                        />
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </ScrollReveal>

        <footer className="relative z-10 py-8 px-4">
          <ScrollReveal direction="up" delay={1}>
            <FloatingElement amplitude={6} period={3} className="inline-block">
              <p className="font-romantic text-rose-500/90 text-center type-lead">
                infinite love, infinite notes 💕
              </p>
            </FloatingElement>
          </ScrollReveal>
        </footer>
      </main>

      <AnimatePresence>
        {showDialog && randomCompliment && (
          <motion.div
            key="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowDialog(false)}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-[clamp(1.5rem,4vw,2.5rem)] max-w-[clamp(20rem,92vw,30rem)] w-full text-center shadow-2xl shadow-rose-200/50 border border-rose-200/50"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="w-[clamp(5rem,10vw,7rem)] h-[clamp(5rem,10vw,7rem)] mx-auto mb-6 rounded-2xl glass-rose border border-rose-200/50 flex items-center justify-center text-5xl animate-heartbeat"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💌
              </motion.div>
              
              <RevealText 
                text="your love note" 
                className="font-romantic type-title text-gradient-romantic mb-4" 
                delay={0.1}
              />
              
              <motion.p
                className="font-romantic-alt text-rose-700 type-subtitle leading-relaxed italic mb-6 px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                "{randomCompliment}"
              </motion.p>

              <motion.button
                className="romantic-button-primary w-full"
                onClick={() => setShowDialog(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2 font-ui">
                  <span>Keep Close to Heart</span>
                  <motion.svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></motion.svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Compliments;