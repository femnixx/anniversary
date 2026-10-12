"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import bluerealbackground from "../assets/bluerealbackground.jpg";
import pomsit from "../assets/pomsit.png";
import { ScrollReveal, RevealText, FloatingElement } from '@/components/ScrollReveal';

/* ═══════════════════════════════════════════════════════════════
   TIME CAPSULE
   ─────────────────────────────────────────────────────────────
   The vault is sealed until the milestone below. Change this one
   line to move the date; everything else follows automatically.
   ═══════════════════════════════════════════════════════════════ */
const VAULT_OPENS_AT = "2027-06-08T00:00:00+08:00"; // next 8 June — our recurring milestone

interface Left { days: number; hours: number; minutes: number; seconds: number; done: boolean; }

function timeLeft(target: string): Left {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

function CountCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 sm:w-20 py-3 bg-cream-50 border-2 border-rose-700 rounded-lg plate flex items-center justify-center">
        <span className="font-romantic text-4xl sm:text-5xl text-rose-700 tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="press-label mt-2">{label}</span>
    </div>
  );
}

function Moments() {
  const [left, setLeft] = useState<Left>(() => timeLeft(VAULT_OPENS_AT));

  useEffect(() => {
    const id = window.setInterval(() => setLeft(timeLeft(VAULT_OPENS_AT)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const target = useMemo(() => new Date(VAULT_OPENS_AT), []);

  return (
    <div className="page-container min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src={bluerealbackground} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-cream-50/85" />
        <div className="absolute inset-0 halftone-fade" />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <ScrollReveal direction="up" delay={0.1} className="w-full max-w-[clamp(24rem,92vw,44rem)]">
            <motion.div
              className="romantic-card reg-tick"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <p className="press-label mb-2">sealed · vault 001</p>

              <div className="text-center">
                <RevealText
                  text="time capsule"
                  className="font-romantic type-title text-rose-700 mb-1"
                  delay={0.2}
                />
                <RevealText
                  text="the photos are still sealed"
                  className="font-romantic-alt text-rose-600 type-subtitle italic mb-6"
                  delay={0.3}
                />

                <FloatingElement amplitude={10} period={4} className="my-4 inline-block">
                  <div className="relative">
                    <div
                      className="absolute inset-0 bg-lavender-200 rounded-xl"
                      style={{ transform: "translate(8px, 8px)" }}
                      aria-hidden="true"
                    />
                    <img
                      src={pomsit}
                      alt="us"
                      className="relative w-[clamp(11rem,24vw,17rem)] rounded-xl border-2 border-rose-700"
                    />
                  </div>
                </FloatingElement>

                {/* Locked state */}
                <div className="mt-6 romantic-card-deep rounded-xl px-5 py-6 text-left">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-rose-400 border-2 border-rose-700 flex items-center justify-center text-xl text-cream-50">
                      🔒
                    </div>
                    <div>
                      <p className="font-romantic text-2xl text-rose-700 leading-tight">Vault locked</p>
                      <p className="type-body text-sage-700 mt-1 leading-relaxed">
                        The old photo storage pointed at a project that wasn't ours, so it's been unplugged.
                        The uploads are paused rather than lost — they open up on the date below, once the
                        new shelf is ready and this becomes the gallery we fill together.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Countdown */}
                <div className="mt-7">
                  <p className="press-label mb-4">
                    opens {target.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>

                  {left.done ? (
                    <p className="font-romantic type-subtitle text-rose-700">it's open — let's fill it</p>
                  ) : (
                    <div className="flex justify-center gap-2 sm:gap-4">
                      <CountCell value={left.days} label="days" />
                      <CountCell value={left.hours} label="hrs" />
                      <CountCell value={left.minutes} label="min" />
                      <CountCell value={left.seconds} label="sec" />
                    </div>
                  )}
                </div>

                {/* Disabled controls */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center opacity-70">
                  <button className="romantic-button romantic-button-secondary" disabled>
                    Choose Photos
                  </button>
                  <button className="romantic-button romantic-button-ghost" disabled>
                    Add to Vault
                  </button>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        <footer className="relative z-10 py-8 px-4 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-600 type-lead bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2 max-w-[calc(100%-2rem)]">
              patience is a love language too
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Moments;
