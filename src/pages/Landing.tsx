"use client";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import cinnamorollpeeking from "../assets/cinnamorollpeeking.png";
import text from "../assets/text.png";
import envelope from "../assets/trans-evelope.png";
import LeaveDialog from '@/components/LeaveDialog';
import { ScrollReveal, RevealText, FloatingElement } from '@/components/ScrollReveal';

function Landing() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="page-container flex flex-col min-h-screen relative">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(219,233,247,0.45) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-10 sm:py-12 pb-[clamp(6rem,16vh,10rem)]">
          <ScrollReveal direction="down" delay={0.2} className="w-full max-w-[clamp(64rem,92vw,88rem)]">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 flex-wrap">
              
              <ScrollReveal direction="left" delay={0.3} className="w-full min-w-0 max-w-[clamp(22rem,38vw,36rem)]">
                <motion.div
                  className="romantic-card relative overflow-hidden group"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ y: -8, scale: 1.01, boxShadow: "0 32px 64px -12px rgba(59, 142, 224, 0.3)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-transparent to-lavender-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 text-center">
                    <RevealText 
                      text="surprise!" 
                      className="font-romantic type-hero text-gradient-romantic mb-3 sm:mb-4" 
                      delay={0.4}
                    />
                    
                    <div className="relative mb-4 sm:mb-6">
                      <FloatingElement amplitude={8} period={4} className="inline-block">
                        <img 
                          src={envelope} 
                          alt="love letter envelope" 
                          className="w-[clamp(11rem,26vw,26rem)] drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </FloatingElement>
                      
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>

                    <RevealText 
                      text="you've got mail!" 
                      className="font-romantic-alt text-rose-600 type-subtitle mb-5 sm:mb-6" 
                      delay={0.5}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        className="romantic-button-primary group relative overflow-hidden"
                        onClick={() => navigate('/message')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center gap-2 font-ui type-body">
                          <span>Open Letter</span>
                          <motion.svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4-4 4M3 12h18" />
                          </motion.svg>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-700 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                        />
                      </motion.button>

                      <motion.button
                        className="romantic-button-ghost group relative overflow-hidden"
                        onClick={() => setOpenDialog(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center gap-2 font-ui type-body">
                          <motion.svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></motion.svg>
                          <span>Maybe Later</span>
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
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="relative z-10">
                    <img 
                      src={text} 
                      alt="handwritten love text" 
                      className="w-[clamp(16rem,42vw,42rem)] max-w-full h-auto drop-shadow-2xl transition-transform duration-700 hover:scale-[1.02] hover:rotate-1"
                    />
                  </div>
                  
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-rose-200/50 to-lavender-200/50 rounded-full blur-3xl opacity-50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-cream-200/50 to-rose-200/50 rounded-full blur-2xl opacity-50"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </main>

        {/* Cinnamoroll peeking from the bottom edge */}
        <ScrollReveal direction="up" delay={0.9} className="pointer-events-none">
          <FloatingElement amplitude={10} period={5} className="block absolute bottom-0 left-4 sm:left-10 lg:left-20 z-0 pointer-events-auto">
            <img 
              src={cinnamorollpeeking} 
              alt="cinnamoroll peeking with love" 
              className="w-[clamp(8rem,20vw,22rem)] drop-shadow-xl translate-y-6"
            />
          </FloatingElement>
        </ScrollReveal>

        <footer className="relative z-20 py-6 sm:py-8 px-4 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-600 text-center type-lead glass-rose rounded-full px-5 py-2 shadow-lg shadow-rose-200/50 max-w-[calc(100%-2rem)]">
              made with love for you 💕
            </p>
          </ScrollReveal>
        </footer>
      </div>

      <LeaveDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}

export default Landing;