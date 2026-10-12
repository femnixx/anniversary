"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import CircularGallery from "../components/CircularGallery";
import "../components/CircularGallery.css";
import { neonStorage } from "@/NeonClient";
import { ScrollReveal, FloatingElement, RevealText } from '@/components/ScrollReveal';

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
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 via-transparent to-lavender-900/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(146, 198, 249, 0.24) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(199, 210, 254, 0.24) 0%, transparent 50%)'
        }} />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <ScrollReveal direction="down" delay={0.1} className="pt-8 px-4 flex-1 flex flex-col">
          <div className="text-center mb-8 relative">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-rose border border-rose-200/50 shadow-lg shadow-rose-200/30 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-4xl animate-heartbeat">🌸</span>
              <RevealText 
                text="our favorite memories" 
                className="font-romantic type-title text-gradient-romantic" 
                delay={0.2}
              />
              <span className="text-4xl animate-heartbeat" style={{ animationDelay: '0.3s' }}>🌸</span>
            </motion.div>

            <RevealText 
              text="swipe through our journey together" 
              className="font-romantic-alt text-rose-300/90 type-subtitle" 
              delay={0.4}
            />
          </div>

          <div className="flex-1 flex items-center justify-center w-full relative">
            <div className="relative w-full max-w-6xl mx-auto" style={{ height: "clamp(18rem, 62vh, 46rem)" }}>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-full h-full bg-gradient-to-r from-rose-200/10 via-transparent to-lavender-200/10 rounded-3xl"
                  animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

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
                />
              </ScrollReveal>

              <FloatingElement amplitude={8} period={4} className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-rose-300/30 to-lavender-300/30 rounded-full blur-2xl" />
              <FloatingElement amplitude={6} period={5} className="absolute -bottom-8 right-1/4 w-12 h-12 bg-gradient-to-br from-cream-300/40 to-rose-300/40 rounded-full blur-xl" />
            </div>
          </div>
        </ScrollReveal>

        <footer className="relative z-10 py-8 px-4">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-300/90 text-center text-lg">
              every moment a treasure 💕
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Plan;