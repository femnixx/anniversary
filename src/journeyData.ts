export interface SubJourney {
  slug: string;
  title: string;
  date: string;
  desc: string;
  /** longer telling of the same moment, shown in the focused view */
  story: string;
}

export interface Milestone {
  slug: string;
  title: string;
  date: string;
  /** one-line summary, shown on the timeline card */
  desc: string;
  /** short story, shown in the focused view */
  story: string;
  icon: string;
  stamp?: boolean;
  children?: SubJourney[];
}

export interface Photo {
  /** descriptive part of the filename ("" when the file is just a name) */
  slug: string;
  /** "YYYY-MM-DD" when the file is date-prefixed, otherwise "" */
  date: string;
  /** true when the filename carried a real date prefix */
  hasDate: boolean;
  url: string;
  file: string;
}

/* ═══════════════════════════════════════════════════════════════
   MILESTONES — the original timeline merged with the Surabaya runs.

   The first three are the original milestones, then the Surabaya
   trips with their sub-journeys, then Malaysia, today, our
   anniversary and the future.

   `slug` matches filenames in src/assets/moments/ (see README).
   Dates are placeholders until the real list is dropped in.
   story text is placeholder prose written to fit the layout.
   ═══════════════════════════════════════════════════════════════ */
export const MILESTONES: Milestone[] = [
  {
    slug: "how-we-met",
    title: "How We Met",
    date: "the beginning",
    desc: "A simple hello that changed everything.",
    story:
      "It started the way the best things do — quietly, and without either of us planning it. A hello that should have been forgettable, and instead became the thing everything else got measured against.\n\nNeither of us knew yet that a year later we'd be driving through toll roads in the dark just to be somewhere together on a birthday.",
    icon: "✨",
  },
  {
    slug: "first-date",
    title: "Our First Date",
    date: "early days",
    desc: "Almost got poisoned, but here we are!",
    story:
      "We picked the one place that nearly took us both out. You laughed until you cried, I panicked quietly, and somehow that became the story we tell people when they ask how we knew.\n\nEvery date after that had something to live up to. Most of them managed it.",
    icon: "🍰",
  },
  {
    slug: "our-adventures",
    title: "Our Adventures",
    date: "before the big trips",
    desc: "Our time well spent together.",
    story:
      "Before the big trips there were the small ones — the ones nobody else would think to put on a map. Our time well spent together.\n\nLooking back, those are the ones that quietly taught us we travel well as a pair.",
    icon: "✈️",
  },
  {
    slug: "surabaya-birthday",
    title: "Surabaya, on your birthday",
    date: "7–8 June",
    desc: "We left in the dark, through the toll road, and drove into Surabaya under the night lights.",
    story:
      "We left in the dark. The toll lights went past one after another and you were right there beside me the whole way.\n\nWe rolled into Surabaya past midnight and you were still laughing, still not ready to go home. Cake, chaos, and you.\n\nI remember thinking: I want a thousand more of these.",
    icon: "🌃",
    children: [
      {
        slug: "pakuwon-mall",
        title: "Pakuwon City Mall",
        date: "7 Jun",
        desc: "First stop. Wandering the mall with nowhere to be.",
        story:
          "First stop, and we had nowhere to be. We walked the mall like people who had all night — because we did.",
      },
      {
        slug: "her-friend-ikea",
        title: "Her friend & IKEA",
        date: "8 Jun",
        desc: "Met up with her friend, drifted around IKEA, had far too much fun.",
        story:
          "We met up with her friend and somehow ended up in IKEA, arguing about furniture for a life we're already building. Far too much fun for a Tuesday.",
      },
      {
        slug: "birthday-midnight",
        title: "Still awake at 12 AM",
        date: "8 Jun",
        desc: "Past midnight, still in Surabaya, still not ready to leave.",
        story:
          "Past midnight and still in Surabaya. You said \"one more hour\" and we stayed until the sky turned. We always stay.",
      },
      {
        slug: "drive-home",
        title: "Home in the early morning",
        date: "8 Jun",
        desc: "The drive back while the sky turned — half asleep and completely happy.",
        story:
          "The drive home while the sky turned, both of us half asleep and completely happy. Nobody spoke for most of it. Nobody needed to.",
      },
    ],
  },
  {
    slug: "surabaya-again",
    title: "And then we went back",
    date: "July – August",
    desc: "Dates that ran until morning, sleeping in the car, then doing it all again.",
    story:
      "A few more runs to Surabaya. None of it was fancy. All of it was us.\n\nDates stretched until dawn, then a nap in the parked car before the drive back, and then we did it all again the next week.",
    icon: "🚗",
    children: [
      {
        slug: "car-sunrise",
        title: "Sleeping in the car",
        date: "Jul – Aug",
        desc: "Dates stretched until dawn, then a nap in the parked car.",
        story:
          "Dates stretched until dawn, and then we'd nap in the parked car like it was the most normal thing in the world. Somehow it was the most comfortable we've ever been anywhere.",
      },
      {
        slug: "variety-dates",
        title: "Every kind of date",
        date: "Jul – Aug",
        desc: "Small ones, long ones, ones that only made sense to us.",
        story:
          "Small ones, long ones, and the ones that only ever made sense to the two of us. We ran through the whole catalogue that summer.",
      },
    ],
  },
  {
    slug: "today",
    title: "Today",
    date: "right now",
    desc: "Still us, still together, still growing.",
    story:
      "Still us. Still together. Still growing — which is the honest version, and the better one.\n\nWe've had a whole timeline of \"remember when\" and we're nowhere near done.",
    icon: "💙",
  },
  {
    slug: "malaysia",
    title: "Malaysia",
    date: "2 September → now",
    desc: "Different country, same us — still talking every day.",
    story:
      "You went off to Malaysia and you've been having the time of your life. I'm genuinely, ridiculously happy for you.\n\nAnd I'm also counting the days. Different country, same us — still finding each other through a screen, still choosing this.",
    icon: "🇲🇾",
    stamp: true,
  },
  {
    slug: "anniversary",
    title: "Our Anniversary",
    date: "21 October",
    desc: "The day we keep coming back to — and the one we get to count properly this year.",
    story:
      "Every road on this page led here. The toll lights, the midnight drives, the dates that ran until morning, the calls that crossed a timezone — all of it pointed at this one date.\n\nThis year we get to count it properly, together, with the whole map behind us.",
    icon: "🎂",
  },
  {
    slug: "future",
    title: "Our Future",
    date: "everything after",
    desc: "Our story continues…",
    story:
      "Our story continues — on every road, in every timezone, at every 12 AM that finds us still awake together.\n\nWhatever comes next, I already know I want it with you.",
    icon: "✨",
  },
];

/* ═══════════════════════════════════════════════════════════════
   Photo discovery — every photo is stored on Neon Object Storage
   (bucket "media", public_read). The manifest written by
   scripts/upload-moments.mjs lists each one with its storage key, so
   the app fetches images from storage instead of from the project
   folder. The local src/assets/moments/ folder is now only the
   upload source — drop new photos there and re-run the upload script.

   A date-prefixed name like 2025-06-07_pakuwon.jpg is a bonus: it
   lets that photo pin itself to the matching milestone. Every other
   file still counts — it simply joins the shared pool that fills in
   any milestone without its own photo.
   ═══════════════════════════════════════════════════════════════ */
import manifest from "./assets/moments/manifest.json";

const STORAGE_ENDPOINT = import.meta.env.VITE_NEON_S3_ENDPOINT ?? "";
const STORAGE_BUCKET = import.meta.env.VITE_NEON_S3_BUCKET ?? "media";

function storageUrl(key: string): string {
  if (!STORAGE_ENDPOINT) return "";
  const base = STORAGE_ENDPOINT.replace(/\/$/, "");
  return `${base}/${STORAGE_BUCKET}/${key}`;
}

export const PHOTOS: Photo[] = Object.entries(manifest).map(([file, m]) => ({
  slug: m.slug,
  date: m.date,
  hasDate: m.hasDate,
  url: storageUrl(m.key),
  file,
}));

/* stable small hash, so a pool pick never shuffles between renders */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** the milestone's own photo, if one matched by slug */
export function photoFor(slug: string): Photo | null {
  return PHOTOS.find(p => p.slug && slug.includes(p.slug)) ?? null;
}

/**
 * A photo for a milestone: its own match if one exists, otherwise a
 * deterministic pick from everything available. Keeps every card
 * showing a real photo once any exist, without needing filenames to
 * mean anything.
 */
export function photoForAny(slug: string): Photo | null {
  const own = photoFor(slug);
  if (own) return own;
  if (PHOTOS.length === 0) return null;
  return PHOTOS[hash(slug) % PHOTOS.length];
}

/* ── Motion presets, shared by the open/close transition ──────── */
export const focusMotion = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { type: "spring" as const, stiffness: 300, damping: 26 },
};
