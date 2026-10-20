"use client";

import { motion } from "framer-motion";
import DateWheel from "@/components/DateWheel";
import ReasonTerminal from "@/components/ReasonTerminal";
import { ScrollReveal } from "@/components/ScrollReveal";

function Reasons() {
  return (
    <div className="page-container min-h-screen relative max-w-[1800px] mx-auto">
      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-16 pb-12 px-3 sm:px-4 flex-1">
          <div className="text-center mb-10">
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

          <div className="max-w-2xl mx-auto flex flex-col items-center gap-10 section-gap">
            <ScrollReveal direction="up" delay={0.2} className="w-full">
              <ReasonTerminal />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="w-full">
              <div className="text-center">
                <p className="press-label mb-2" style={{ fontSize: "calc(0.7rem + 0.2vw)" }}>can't decide?</p>
                <h2 className="font-romantic type-title text-rose-700" style={{ fontSize: "calc(1.5rem + 0.6vw)" }}>
                  let the wheel choose
                </h2>
                <p className="text-gray-500 mt-1 break-words" style={{ fontSize: "calc(0.65rem + 0.2vw)" }}>
                  Tap anywhere on the wheel to spin
                </p>
              </div>
              <div className="w-[min(80vmin,45vmax,550px)] max-w-[min(80vmin,45vmax,600px)] min-w-[200px] flex justify-center">
                <DateWheel />
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}

export default Reasons;