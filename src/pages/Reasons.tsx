"use client";

import { motion } from "framer-motion";
import DateWheel from "@/components/DateWheel";
import ReasonTerminal from "@/components/ReasonTerminal";
import { ScrollReveal } from "@/components/ScrollReveal";

function Reasons() {
  return (
    <div className="page-container min-h-screen relative">
      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-16 pb-12 px-3 sm:px-4 flex-1">
          <div className="text-center mb-10">
            <p className="press-label mb-2">100 reasons</p>
            <motion.h1
              className="font-romantic type-title text-rose-700 text-[1.75rem] sm:text-[2rem] mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              reason terminal
            </motion.h1>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto break-words">
              Type a keyword (smile, laugh, always) or a number (1-100) to discover another reason I love you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
            <ScrollReveal direction="up" delay={0.2} className="w-full">
              <ReasonTerminal />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="w-full">
              <div className="text-center">
                <p className="press-label mb-2 text-sm sm:text-base">can't decide?</p>
                <h2 className="font-romantic type-title text-rose-700 text-[1.5rem] sm:text-[1.75rem]">
                  let the wheel choose
                </h2>
                <p className="text-sm text-gray-500 mt-1 break-words">
                  Tap anywhere on the wheel to spin
                </p>
              </div>
              <div className="w-[80vw] max-w-[280px] sm:max-w-[340px] md:max-w-[400px] flex justify-center mx-auto">
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