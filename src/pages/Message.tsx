"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import pomaroll from "../assets/pomarollcropped.png";
import { ScrollReveal, StaggerContainer, StaggerItem, FloatingElement, RevealText } from '@/components/ScrollReveal';
import { ScrollArea } from '@/components/ui/scroll-area';

function Message() {
  const navigate = useNavigate();

  return (
    <div className="page-container min-h-screen relative">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <ScrollReveal direction="up" delay={0.1} className="w-full max-w-[clamp(48rem,94vw,82rem)]">
          <motion.div
            className="romantic-card relative overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-cream-50/50 to-lavender-50/50" />
            
            <StaggerContainer>
              <StaggerItem direction="down" delay={0.1} className="w-full md:w-1/2 mx-auto md:mx-0">
                <FloatingElement amplitude={10} period={4} className="relative">
                  <div className="relative z-10">
                    <img
                      src={pomaroll}
                      alt="us together, happy memories"
                      className="w-full max-w-[clamp(16rem,34vw,30rem)] mx-auto rounded-3xl shadow-2xl shadow-rose-200/50 border-4 border-rose-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-rose-300/50"
                    />
                  </div>
                  
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-rose-300/30 to-lavender-300/30 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-cream-300/40 to-rose-300/40 rounded-full blur-xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 2, ease: "easeInOut" }}
                  />
                </FloatingElement>
              </StaggerItem>

              <StaggerItem direction="right" delay={0.2} className="w-full md:w-1/2">
                <div className="p-4 md:p-8 flex flex-col justify-center h-full">
                  <div className="text-center mb-8">
                    <RevealText 
                      text="to my amore" 
                      className="font-romantic type-title text-gradient-romantic mb-2" 
                      delay={0.3}
                    />
                    <RevealText 
                      text="happy anniversary ૮ ˶ᵔ ᵕ ᵔ˶ ა" 
                      className="font-romantic-alt text-rose-600 type-subtitle" 
                      delay={0.4}
                    />
                  </div>

                  <motion.div
                    className="romantic-card p-6 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-lavender-50/30" />
                    
                    <div className="relative z-10">
                      <ScrollArea className="h-[clamp(14rem,40vh,26rem)]">
                        <motion.p
                          className="font-body text-sage-700 leading-relaxed type-lead text-center whitespace-pre-line"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                        >
                          {"Happy 1 year anniversary for the both of us together, we've been through so much. We've been through happiness, sadness, and times where we don't even know where we are in life and in our relationship. Though, we've pushed through all of that and we've proven time and time again that with grit, determination, and love for each other, we can push through. And I intend to love you as much as I do now, and even more. Thank you, my lovely ciby, my princess. My bright, shining star."}
                        </motion.p>
                      </ScrollArea>
                    </div>
                  </motion.div>

                  <motion.button
                    className="romantic-button-primary mt-8 w-full sm:w-auto mx-auto"
                    onClick={() => navigate("/options")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="flex items-center gap-2 font-ui type-body">
                      Continue our journey
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
                  </motion.button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </motion.div>
        </ScrollReveal>
      </main>
    </div>
  );
}

export default Message;