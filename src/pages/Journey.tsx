"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import { ScrollReveal, StaggerContainer, StaggerItem, FloatingElement, RevealText } from '@/components/ScrollReveal';

const timelineEvents = [
  { title: "How We Met 💫", desc: "A simple hello that changed everything.", icon: "✨" },
  { title: "Our First Date 🍰", desc: "Almost got poisoned, but here we are!", icon: "🍰" },
  { title: "Our Adventures ✈️", desc: "Our time well spent together!", icon: "✈️" },
  { title: "Today 💙", desc: "Still us, still together, still growing.", icon: "💙" },
  { title: "Malaysia 🇲🇾", desc: "Still will be there with you, as well as call and play with you anytime I can:3", icon: "🇲🇾" },
  { title: "Swiss Adventure? 🌏", desc: "Can't wait to hear everything!", icon: "🌏" },
  { title: "Our Future ✨", desc: "Our story continues...", icon: "✨" },
];

function Journey() {
  const [isMobile, setIsMobile] = useState(false);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="page-container min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img
          src={bluerealbackground3}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 via-transparent to-lavender-900/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse at 20% 20%, rgba(146, 198, 249, 0.28) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(199, 210, 254, 0.28) 0%, transparent 50%)'
        }} />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-8 px-4 flex-1">
          <div className="text-center mb-12 relative">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-rose border border-rose-200/50 shadow-lg shadow-rose-200/30 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-4xl animate-heartbeat">🗺️</span>
              <RevealText 
                text="our journey together" 
                className="font-romantic type-title text-gradient-romantic" 
                delay={0.2}
              />
              <span className="text-4xl animate-heartbeat" style={{ animationDelay: '0.3s' }}>🗺️</span>
            </motion.div>

            <RevealText 
              text="every step brought us closer" 
              className="font-romantic-alt text-rose-300/90 type-subtitle" 
              delay={0.4}
            />
          </div>

          <StaggerContainer className="w-full max-w-4xl mx-auto">
            <Timeline position={isMobile ? "right" : "alternate"}>
              {timelineEvents.map((event, index) => (
                <StaggerItem key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.08} className="w-full">
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot 
                        color="primary" 
                        sx={{ 
                          width: 24, 
                          height: 24,
                          backgroundColor: '#3b8ee0',
                          boxShadow: '0 0 0 4px rgba(226,239,255,0.9), 0 4px 12px rgba(59,142,224,0.35)',
                          zIndex: 2,
                        }} 
                      />
                      {index !== timelineEvents.length - 1 && (
                        <TimelineConnector 
                          sx={{ 
                            height: { xs: 50, sm: 70, md: 90 },
                            backgroundColor: 'transparent',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: 3,
                              height: '100%',
                              background: 'linear-gradient(to bottom, #92c6f9, #c7d2fe, #dbe9f7)',
                              borderRadius: 2,
                            }
                          }} 
                        />
                      )}
                    </TimelineSeparator>

                    <TimelineContent className="md:px-6 lg:px-10 py-4">
                      <ScrollReveal direction={index % 2 === 0 ? "left" : "right"} delay={0.1}>
                        <motion.div
                          ref={(el) => (itemRefs.current[index] = el!)}
                          className="romantic-card relative overflow-hidden group"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 22 }}
                          whileHover={{ y: -8, scale: 1.01, boxShadow: "0 32px 64px -12px rgba(59, 142, 224, 0.26)" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-cream-50/30 to-lavender-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="relative z-10 p-6 md:p-8">
                            <div className="flex items-start gap-4">
                              <motion.div
                                className="flex-shrink-0 w-[clamp(3rem,7vw,4.5rem)] h-[clamp(3rem,7vw,4.5rem)] rounded-2xl glass-rose border border-rose-200/50 flex items-center justify-center text-5xl animate-heartbeat"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                              >
                                {event.icon}
                              </motion.div>
                              <div className="flex-1 min-w-0">
                                <RevealText 
                                  text={event.title} 
                                  className="font-romantic type-title text-gradient-romantic mb-2" 
                                  delay={0.1}
                                />
                                <RevealText 
                                  text={event.desc} 
                                  className="font-romantic-alt text-sage-700 type-lead leading-relaxed italic" 
                                  delay={0.2}
                                />
                              </div>
                            </div>
                          </div>

                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"
                          />
                        </motion.div>
                      </ScrollReveal>
                    </TimelineContent>
                  </TimelineItem>
                </StaggerItem>
              ))}
            </Timeline>
          </StaggerContainer>
        </ScrollReveal>

        <footer className="relative z-10 py-8 px-4">
          <ScrollReveal direction="up" delay={1}>
            <FloatingElement amplitude={8} period={3} className="inline-block">
              <p className="font-romantic text-rose-500/90 text-center type-lead">
                our story continues forever 💕
              </p>
            </FloatingElement>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Journey;