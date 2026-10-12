"use client";

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  shortLabel: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "Home", shortLabel: "🏠", icon: <HomeIcon /> },
  { path: "/message", label: "Letter", shortLabel: "💌", icon: <LetterIcon /> },
  { path: "/plan", label: "Memories", shortLabel: "🌸", icon: <MemoriesIcon /> },
  { path: "/moments", label: "Upload", shortLabel: "📸", icon: <UploadIcon /> },
  { path: "/journey", label: "Journey", shortLabel: "🗺️", icon: <JourneyIcon /> },
  { path: "/compliments", label: "Love Notes", shortLabel: "💕", icon: <ComplimentsIcon /> },
];

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function LetterIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="2"/><polyline points="22 6 12 13 2 6"/></svg>;
}
function MemoriesIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
}
function UploadIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
}
function JourneyIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>;
}
function ComplimentsIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}

export function DynamicIsland() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    navItems.findIndex(item => location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path)))
  );
  const islandRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newIndex = navItems.findIndex(item => location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path)));
    setActiveIndex(newIndex >= 0 ? newIndex : 0);
  }, [location.pathname]);

  const handleNavClick = (path: string) => {
    if (path !== location.pathname) {
      window.location.href = path;
    }
    setIsExpanded(false);
  };

  const activeItem = navItems[activeIndex >= 0 ? activeIndex : 0];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div
        ref={islandRef}
        className="pointer-events-auto"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsExpanded(false);
          }
        }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-rose rounded-full px-6 py-3 shadow-2xl shadow-rose-200/50 border border-rose-200/50 cursor-pointer transition-all duration-300 hover:shadow-rose-300/50"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsExpanded(true); } }}
              aria-label="Open navigation"
              aria-expanded="false"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-heartbeat">{activeItem.shortLabel}</span>
                <span className="font-romantic-alt text-rose-700 text-lg hidden sm:inline">{activeItem.label}</span>
                <svg className="w-4 h-4 text-rose-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/></svg>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-rose rounded-3xl shadow-2xl shadow-rose-200/50 border border-rose-200/50 overflow-hidden"
              role="navigation"
              aria-label="Main navigation"
              aria-expanded="true"
            >
              <div ref={contentRef} className="flex items-center gap-1 p-2">
                <AnimatePresence mode="popLayout">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ delay: index * 0.03, type: "spring", stiffness: 400, damping: 30 }}
                      className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all duration-300 ${
                        index === activeIndex
                          ? "bg-gradient-to-br from-rose-400/20 to-rose-500/20 text-rose-700 shadow-lg shadow-rose-300/30"
                          : "text-sage-600 hover:text-rose-600 hover:bg-rose-50/50"
                      }`}
                      onClick={() => handleNavClick(item.path)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNavClick(item.path); } }}
                      aria-current={index === activeIndex ? "page" : undefined}
                      aria-label={item.label}
                    >
                      <span className="text-xl animate-heartbeat">{item.shortLabel}</span>
                      <span className="font-romantic-alt text-sm font-medium hidden lg:inline whitespace-nowrap">{item.label}</span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none"
          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? -8 : 0 }}
          transition={{ duration: 200 }}
        >
          <div className="glass-rose rounded-full px-4 py-1.5 shadow-lg shadow-rose-200/50 border border-rose-200/50 text-xs font-romantic-alt text-rose-700 whitespace-nowrap">
            Hover to explore 💕
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollTop / docHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none"
      animate={{ scaleX: progress }}
      style={{ transformOrigin: 'left center' }}
    >
      <div className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-lavender-500 rounded-full shadow-lg shadow-rose-400/50" />
    </motion.div>
  );
}