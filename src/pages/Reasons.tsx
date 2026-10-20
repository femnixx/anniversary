"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ReasonTerminal from "@/components/ReasonTerminal";
import { ScrollReveal } from "@/components/ScrollReveal";

function Reasons() {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [currentPath]);

  return (
    <div className="page-container min-h-screen 100dvh relative max-w-7xl mx-auto px-3 sm:px-4">
      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-12 pb-8 flex-1">
          <div className="text-center mb-8">
            <p className="press-label mb-2">100 reasons</p>
            <motion.h1
              className="font-romantic type-title text-rose-700 mb-2"
              style={{ fontSize: "calc(1.75rem + 0.7vw)" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              reason terminal
            </motion.h1>
            <p className="text-gray-500 mt-1 max-w-md mx-auto break-words" style={{ fontSize: "calc(0.7rem + 0.2vw)" }}>
              Type a keyword (smile, laugh, always) or a number (1-100) to discover another reason I love you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col items-center flex-1">
            <ScrollReveal direction="up" delay={0.2} className="w-full">
              <ReasonTerminal />
            </ScrollReveal>
          </div>
        </ScrollReveal>

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

export default Reasons;
