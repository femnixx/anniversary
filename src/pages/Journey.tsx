"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import PassportStamp from "@/components/PassportStamp";
import { ScrollReveal, RevealText } from '@/components/ScrollReveal';

/* ═══════════════════════════════════════════════════════════════
   MILESTONES
   ─────────────────────────────────────────────────────────────
   Nested: each trip is a parent milestone, its sub-journeys are
   children. `slug` is matched against filenames in
   src/assets/moments/ (see that folder's README).

   Dates and labels are placeholders until the real list is dropped in.
   ═══════════════════════════════════════════════════════════════ */

interface SubJourney {
  slug: string;
  title: string;
  date: string;
  desc: string;
}

interface Milestone {
  slug: string;
  title: string;
  date: string;
  desc: string;
  icon: string;
  stamp?: boolean;
  children?: SubJourney[];
}

const MILESTONES: Milestone[] = [
  {
    slug: "surabaya-birthday",
    title: "Surabaya, on your birthday",
    date: "7–8 June",
    desc: "We left in the dark, through the toll road, and drove into Surabaya under the night lights. At midnight we were still there — cake, chaos, and you.",
    icon: "🌃",
    children: [
      {
        slug: "pakuwon-mall",
        title: "Pakuwon City Mall",
        date: "7 Jun",
        desc: "First stop. Wandering the mall with nowhere to be.",
      },
      {
        slug: "her-friend-ikea",
        title: "Her friend & IKEA",
        date: "8 Jun",
        desc: "Met up with her friend, drifted around IKEA, had far too much fun pretending to furnish a life together.",
      },
      {
        slug: "birthday-midnight",
        title: "Still awake at 12 AM",
        date: "8 Jun",
        desc: "Past midnight, still in Surabaya, still not ready to leave.",
      },
      {
        slug: "drive-home",
        title: "Home in the early morning",
        date: "8 Jun",
        desc: "The drive back while the sky turned, both of us half asleep and completely happy.",
      },
    ],
  },
  {
    slug: "surabaya-again",
    title: "And then we went back",
    date: "July – August",
    desc: "A few more runs to Surabaya. Dates that ran until morning, sleeping in the car, then doing it all again the next week.",
    icon: "🚗",
    children: [
      {
        slug: "car-sunrise",
        title: "Sleeping in the car",
        date: "Jul – Aug",
        desc: "Dates stretched until dawn, then a nap in the parked car before the drive back.",
      },
      {
        slug: "variety-dates",
        title: "Every kind of date",
        date: "Jul – Aug",
        desc: "Small ones, long ones, ones that only made sense to us.",
      },
    ],
  },
  {
    slug: "malaysia",
    title: "Malaysia",
    date: "2 September → now",
    desc: "You went off to Malaysia and you've been having the time of your life. Different country, same us — spending it all online and still counting.",
    icon: "🇲🇾",
    stamp: true,
  },
  {
    slug: "future",
    title: "Swiss Adventure?",
    date: "sometime soon",
    desc: "Can't wait to hear every bit of it.",
    icon: "🌏",
  },
];

/* Discover date-prefixed photos. Empty until the directory is filled. */
const photoModules = import.meta.glob<{ default: string }>(
  "../assets/moments/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, query: "?url", import: "default" }
);

interface Photo { slug: string; date: string; url: string; file: string; }

const PHOTOS: Photo[] = Object.entries(photoModules).map(([path, url]) => {
  const file = path.split("/").pop() ?? "";
  const base = file.replace(/\.[^.]+$/, "");
  const [date = "", ...rest] = base.split("_");
  return { slug: rest.join("_"), date, url, file };
});

function photoFor(slug: string) {
  return PHOTOS.find(p => p.slug && slug.includes(p.slug)) ?? null;
}

/* ── Printed placeholder plate ─────────────────────────────── */
function PhotoPlate({ label }: { label: string }) {
  return (
    <div className="relative aspect-[4/3] bg-cream-100 border-2 border-dashed border-sage-300 rounded-lg overflow-hidden halftone">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
        <span className="text-2xl opacity-60">🖼️</span>
        <p className="press-label opacity-60">photo pending</p>
        <p className="font-romantic-alt text-sm text-sage-500 leading-tight">{label}</p>
      </div>
    </div>
  );
}

function JourneyMilestone({ item, isLast }: { item: Milestone; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Keep children collapsed until the card scrolls into view */
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !item.children?.length) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOpen(true); io.disconnect(); } },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [item.children?.length]);

  const hasKids = Boolean(item.children?.length);

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            width: 26, height: 26, backgroundColor: "#2f80d8",
            border: "2.5px solid #123a6b", zIndex: 2,
          }}
        />
        {!isLast && (
          <TimelineConnector
            sx={{
              height: { xs: 48, sm: 64, md: 80 }, backgroundColor: "transparent",
              "&::before": {
                content: '""', position: "absolute", top: 0, left: "50%",
                transform: "translateX(-50%)", width: 4, height: "100%",
                background: "#123a6b", borderRadius: 2,
              },
            }}
          />
        )}
      </TimelineSeparator>

      <TimelineContent className="md:px-6 lg:px-10 py-4">
        <ScrollReveal direction="up" delay={0.1}>
          <motion.div
            ref={cardRef}
            className="romantic-card reg-tick"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cream-100 border-2 border-rose-700 flex items-center justify-center text-2xl">
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className="press-label mb-1">{item.date}</p>
                <RevealText
                  text={item.title}
                  className="font-romantic type-subtitle text-rose-700 mb-2"
                  delay={0.1}
                />
                <p className="font-romantic-alt text-sage-700 type-body italic leading-relaxed">
                  {item.desc}
                </p>

                {/* Passport stamp for the Malaysia milestone */}
                {item.stamp && (
                  <div className="mt-4 flex justify-end">
                    <PassportStamp place="MALAYSIA" date="02 SEP" />
                  </div>
                )}

                {hasKids && (
                  <button
                    className="romantic-button romantic-button-ghost mt-4 text-sm"
                    onClick={() => setOpen(o => !o)}
                    aria-expanded={open}
                  >
                    {open ? "hide sub-journeys" : `show ${item.children!.length} sub-journeys`}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Nested sub-journeys */}
        {hasKids && open && (
          <motion.div
            className="mt-4 ml-6 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4 }}
          >
            {item.children!.map((kid, i) => {
              const shot = photoFor(kid.slug);
              return (
                <motion.div
                  key={kid.slug}
                  className="romantic-card-flat bg-cream-50 !p-4"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 24 }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-40 flex-shrink-0">
                      {shot
                        ? <img src={shot.url} alt={kid.title} className="w-full aspect-[4/3] object-cover rounded-md border-2 border-rose-700" />
                        : <PhotoPlate label={kid.title} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="press-label mb-1">{kid.date}</p>
                      <p className="font-romantic text-2xl text-rose-700 leading-tight">{kid.title}</p>
                      <p className="font-romantic-alt text-sage-600 text-base italic mt-1 leading-snug">{kid.desc}</p>
                      {shot && <p className="press-label mt-2 opacity-60">{shot.file}</p>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </TimelineContent>
    </TimelineItem>
  );
}

function Journey() {
  const [isMobile, setIsMobile] = useState(false);
  const matched = useMemo(() => PHOTOS.filter(p => p.slug).length, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="page-container min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src={bluerealbackground3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-cream-50/85" />
        <div className="absolute inset-0 halftone-fade" />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-8 px-4 flex-1">
          <div className="text-center mb-10">
            <div className="inline-flex flex-col items-center">
              <p className="press-label mb-2">our route so far</p>
              <RevealText
                text="every road we took"
                className="font-romantic type-title ink-mark inline-block"
                delay={0.2}
              />
              <p className="font-romantic-alt text-rose-600 type-lead mt-3 italic">
                {PHOTOS.length === 0
                  ? "sub-journeys marked — photos land soon"
                  : `${matched} photo${matched === 1 ? "" : "s"} wired into the timeline`}
              </p>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <Timeline position={isMobile ? "right" : "alternate"}>
              {MILESTONES.map((m, i) => (
                <JourneyMilestone key={m.slug} item={m} isLast={i === MILESTONES.length - 1} />
              ))}
            </Timeline>
          </div>
        </ScrollReveal>

        <footer className="relative z-10 py-8 px-4 flex justify-center">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic text-rose-600 type-lead bg-cream-50 plate border-2 border-rose-700 rounded-full px-5 py-2">
              the map isn't finished
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Journey;
