"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import CircularGallery from "../components/CircularGallery";
import "../components/CircularGallery.css";
import { neonStorage } from "@/NeonClient";
import { PHOTOS } from "@/journeyData";
import { ScrollReveal, RevealText } from '@/components/ScrollReveal';

interface GalleryItem {
  image: string;
  text: string;
}

const fallbackGallery: GalleryItem[] = [
  { image: "https://picsum.photos/id/1003/800/600", text: "First Date" },
  { image: "https://picsum.photos/id/1025/800/600", text: "Beach Day" },
  { image: "https://picsum.photos/id/1062/800/600", text: "Coffee Break" },
  { image: "https://picsum.photos/id/1074/800/600", text: "Concert Night" },
];

function Plan() {
  const [myGalleryItems, setMyGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryFontSize, setGalleryFontSize] = useState(28);
  const [focused, setFocused] = useState<number | null>(null);

  const onSelect = useCallback((index: number | null) => {
    setFocused(index);
    if (index == null) return;

    /* Sample the focused photo's dominant colour so /options can echo
       it back as a halo. Drawn offscreen so it costs nothing visible. */
    const item = myGalleryItems[index];
    if (!item?.image) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const size = 24;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        /* bucket into 4x4x4 coarse bins, pick the most populated,
           skipping near-black/near-white so the halo stays visible */
        const bins = new Map<string, { n: number; r: number; g: number; b: number }>();
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const lum = (r * 299 + g * 587 + b * 114) / 1000;
          if (lum < 26 || lum > 232) continue;
          const key = `${r >> 6}-${g >> 6}-${b >> 6}`;
          const hit = bins.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
          hit.n++; hit.r += r; hit.g += g; hit.b += b;
          bins.set(key, hit);
        }
        let best: { n: number; r: number; g: number; b: number } | null = null;
        bins.forEach(v => { if (!best || v.n > best.n) best = v; });
        if (!best) return;
        const rgb = `rgb(${Math.round(best.r / best.n)}, ${Math.round(best.g / best.n)}, ${Math.round(best.b / best.n)})`;
        sessionStorage.setItem("last-photo-color", rgb);
      } catch {
        /* cross-origin canvas taint — halo simply stays off */
      }
    };
    img.src = item.image;
  }, [myGalleryItems]);

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width < 480) setGalleryFontSize(20);
      else if (width < 768) setGalleryFontSize(24);
      else if (width < 1280) setGalleryFontSize(30);
      else setGalleryFontSize(38);
    };
    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  useEffect(() => {
    /* Local photos in src/assets/moments/ come first — they are real,
       and they need no renaming to show up. */
    if (PHOTOS.length > 0) {
      setMyGalleryItems(
        PHOTOS.map(p => ({
          image: p.url,
          text: p.hasDate ? `${p.date}` : p.file.replace(/\.[^.]+$/, ""),
        }))
      );
      return;
    }

    if (!neonStorage.isConfigured) {
      setMyGalleryItems(fallbackGallery);
      return;
    }

    const fetchImages = async () => {
      try {
        const files = await neonStorage.list();

        if (!files || files.length === 0) {
          setMyGalleryItems(fallbackGallery);
          return;
        }

        const neonItems: GalleryItem[] = await Promise.all(
          files.map(async (file) => {
            const url = await neonStorage.getPublicUrl(file.key);
            return {
              image: url,
              text: file.name.replace(/\.[^/.]+$/, ""),
            };
          })
        );

        const combinedItems =
          neonItems.length >= 4
            ? neonItems
            : [...neonItems, ...fallbackGallery].slice(0, 4);

        setMyGalleryItems(combinedItems);
      } catch (error) {
        console.error("Error fetching images:", error);
        setMyGalleryItems(fallbackGallery);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="page-container min-h-screen overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <img
          src={bluerealbackground3}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* one flat tint, so the photo reads as the same paper everywhere */}
        <div className="absolute inset-0 bg-cream-50/75" />
        <div className="absolute inset-0 halftone-fade" />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-8 px-4 flex-1 flex flex-col">
          <div className="text-center mb-6 sm:mb-8 relative">
            <motion.div
              className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-cream-50 plate border-2 border-rose-700 max-w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl sm:text-3xl animate-heartbeat flex-shrink-0">🌸</span>
              {/* sized for a pill, not a page hero — type-title runs to 5rem
                  and was blowing straight out of the container */}
              <RevealText
                text="our favorite memories"
                className="pill-title text-rose-700"
                delay={0.2}
              />
              <span className="text-2xl sm:text-3xl animate-heartbeat flex-shrink-0">🌸</span>
            </motion.div>
          </div>

          <div className="flex-1 flex items-center justify-center w-full relative">
            <div className="relative w-full max-w-[clamp(48rem,94vw,96rem)] mx-auto" style={{ height: "clamp(20rem, 68vh, 52rem)" }}>
              {/* framed stage — the plate the sheets are mounted on */}
              <div className="absolute -inset-3 sm:-inset-5 rounded-[26px] border-2 border-rose-700 bg-cream-100/70 pointer-events-none" aria-hidden="true" />
              <div className="absolute -inset-3 sm:-inset-5 rounded-[26px] halftone-fade opacity-60 pointer-events-none" aria-hidden="true" />
              {/* corner registration ticks */}
              <span className="absolute -top-3 -left-3 w-5 h-5 border-t-[3px] border-l-[3px] border-rose-700 rounded-tl-lg pointer-events-none" aria-hidden="true" />
              <span className="absolute -top-3 -right-3 w-5 h-5 border-t-[3px] border-r-[3px] border-rose-700 rounded-tr-lg pointer-events-none" aria-hidden="true" />
              <span className="absolute -bottom-3 -left-3 w-5 h-5 border-b-[3px] border-l-[3px] border-rose-700 rounded-bl-lg pointer-events-none" aria-hidden="true" />
              <span className="absolute -bottom-3 -right-3 w-5 h-5 border-b-[3px] border-r-[3px] border-rose-700 rounded-br-lg pointer-events-none" aria-hidden="true" />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-full h-full bg-cream-200 rounded-3xl"
                  animate={{ scale: [1, 1.02, 1], opacity: [0.35, 0.6, 0.35] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Focus mode: the ring recedes, the chosen sheet comes forward */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  filter: focused != null ? "blur(7px) saturate(0.7)" : "blur(0px) saturate(1)",
                }}
                transition={{ duration: 0.45 }}
              >
                <ScrollReveal direction="up" delay={0.3} className="relative z-10 w-full h-full">
                  <CircularGallery
                    key={myGalleryItems.length}
                    items={myGalleryItems}
                    bend={2.5}
                    textColor="#1d5aa0"
                    borderRadius={0.08}
                    scrollEase={0.04}
                    scrollSpeed={1.5}
                    font={`bold ${galleryFontSize}px 'Great Vibes', 'Dancing Script', cursive`}
                    onSelect={onSelect}
                  />
                </ScrollReveal>
              </motion.div>

              {/* scrim so the focused sheet reads as above the ring */}
              <motion.div
                className="absolute inset-0 bg-cream-50 pointer-events-none"
                animate={{ opacity: focused != null ? 0.45 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* focused caption */}
              {focused != null && myGalleryItems[focused] && (
                <motion.div
                  className="absolute inset-x-0 bottom-2 flex justify-center px-4 z-20"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <div className="bg-cream-50 border-2 border-rose-700 plate rounded-xl px-6 py-4 text-center max-w-md">
                    <p className="press-label mb-1">now showing</p>
                    <p className="font-romantic type-subtitle text-rose-700 leading-none">
                      {myGalleryItems[focused].text}
                    </p>
                    <p className="text-sage-600 type-sm mt-2">
                      click the photo again to close
                    </p>
                  </div>
                </motion.div>
              )}

              {focused != null && (
                <button
                  className="absolute top-2 right-2 z-20 romantic-button romantic-button-ghost text-sm"
                  onClick={() => setFocused(null)}
                >
                  close
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        <div className="relative z-10 px-4 pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-20 flex flex-col items-center gap-3">
          <ScrollReveal direction="up" delay={0.8}>
            <p className="text-rose-600 type-body text-center max-w-md">
              swipe through our journey together — tap a photo to open it
            </p>
          </ScrollReveal>
        </div>

        <footer className="relative z-10 py-8 px-4 sm:py-10 lg:py-12">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-600 type-lead text-center">
              every moment a treasure 💕
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Plan;