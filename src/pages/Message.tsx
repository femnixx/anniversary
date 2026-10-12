"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import pomaroll from "../assets/pomarollcropped.png";
import { ScrollReveal, StaggerContainer, StaggerItem, FloatingElement, RevealText } from '@/components/ScrollReveal';
import { ScrollArea } from '@/components/ui/scroll-area';

const LETTER = `Happy anniversary to us.

I still think about that drive to Surabaya on your birthday. We left in the dark and the toll lights went past one after another, and you were right there beside me the whole way. We rolled in past midnight and you were still laughing, still not ready to go home. That night I remember thinking: I want a thousand more of these.

Then we kept going back. Pakuwon, IKEA with your friend, dates that ran until morning, both of us asleep in the parked car like it was the most normal thing in the world. None of it was fancy. All of it was us.

And now you're in Malaysia, living something I can't see from here. Different country, same us — still talking every day, still finding each other through a screen. It's not the same as having you next to me, and I'm not going to pretend it is.

So thank you. For the grit, for the patience, for choosing me on the ordinary days too. For being my bright, shining star.

Here's to the next one, and every road after that.

I love you.`;

function Message() {
  const navigate = useNavigate();

  return (
    <div className="page-container min-h-screen relative">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <ScrollReveal direction="up" delay={0.1} className="w-full max-w-[clamp(48rem,94vw,82rem)]">
          <StaggerContainer>
            <motion.div
              className="romantic-card reg-tick relative overflow-visible"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <p className="press-label mb-4">letter · no.001 · pressed for you</p>

              <div className="flex flex-col md:flex-row gap-10 md:gap-12">
                {/* Photo */}
                <StaggerItem direction="down" delay={0.1} className="w-full md:w-1/2">
                  <FloatingElement amplitude={10} period={4} className="relative block">
                    <div
                      className="absolute inset-0 bg-lavender-200 rounded-xl"
                      style={{ transform: "translate(10px, 10px)" }}
                      aria-hidden="true"
                    />
                    <img
                      src={pomaroll}
                      alt="us together, happy memories"
                      className="relative w-full max-w-[clamp(16rem,34vw,30rem)] mx-auto rounded-xl border-2 border-rose-700"
                    />
                  </FloatingElement>

                  <div className="mt-8 flex flex-col gap-3">
                    <div className="ink-chip">sealed 8 june</div>
                    <div className="ink-chip">toll lights · midnight</div>
                    <div className="ink-chip">still us</div>
                  </div>
                </StaggerItem>

                {/* Letter */}
                <StaggerItem direction="right" delay={0.2} className="w-full md:w-1/2 flex flex-col">
                  <div className="text-center mb-6">
                    <RevealText
                      text="to my amore"
                      className="font-romantic type-title text-rose-700"
                      delay={0.3}
                    />
                    <RevealText
                      text="happy anniversary"
                      className="font-romantic-alt text-rose-600 type-lead italic mt-1"
                      delay={0.4}
                    />
                  </div>

                  {/* Audio-reactive fade mask (simulated beat) */}
                  <AudioPulseLetter text={LETTER} />

                  <motion.button
                    className="romantic-button romantic-button-primary mt-8 w-full sm:w-auto mx-auto"
                    onClick={() => navigate("/options")}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="flex items-center gap-2 font-ui">
                      Continue our journey
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4-4 4M3 12h18" />
                      </svg>
                    </span>
                  </motion.button>
                </StaggerItem>
              </div>
            </motion.div>
          </StaggerContainer>
        </ScrollReveal>
      </main>
    </div>
  );
}

/**
 * Love letter inside a fade-masked ScrollArea. With no audio track
 * available, the "beat" is simulated: a slow pulse drives both the
 * fade-mask depth and a soft ink glow so the text breathes the way
 * it would on the beat of a lo-fi music box.
 */
function AudioPulseLetter({ text }: { text: string }) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      /* ~62bpm-ish, with a secondary shimmer so it never feels mechanical */
      const pulse = 0.5 - 0.5 * Math.cos((t * Math.PI * 2) / 1.6);
      const shimmer = 0.5 - 0.5 * Math.cos((t * Math.PI * 2) / 0.37);
      setBeat(pulse * 0.75 + shimmer * 0.25);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* only the mid-column is lit; edges stay faded by the mask */
  const maskStrength = 0.35 + beat * 0.5;
  const glow = 0.12 + beat * 0.4;

  return (
    <div className="relative rounded-xl border-2 border-rose-700 bg-cream-50 overflow-hidden">
      <ScrollArea className="h-[clamp(14rem,40vh,26rem)]">
        <p
          className="font-romantic-alt text-sage-700 type-body whitespace-pre-line px-4 py-3"
          style={{
            textShadow: `0 0 ${(6 + beat * 14).toFixed(1)}px rgba(47, 128, 216, ${glow.toFixed(3)})`,
          }}
        >
          {text}
        </p>
      </ScrollArea>

      {/* fade masks — depth tied to the beat */}
      <div
        className="absolute top-0 left-0 right-0 h-10 pointer-events-none bg-gradient-to-b from-cream-50 to-transparent"
        style={{ opacity: maskStrength }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none bg-gradient-to-t from-cream-50 to-transparent"
        style={{ opacity: maskStrength }}
      />

      {/* beat meter */}
      <div className="absolute bottom-2 right-3 flex items-center gap-2">
        <span className="press-label opacity-70">beat</span>
        <span className="flex gap-1" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-rose-400"
              style={{ height: `${(6 + beat * (14 - i * 3)).toFixed(1)}px` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export default Message;
