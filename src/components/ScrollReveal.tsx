"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  style?: React.CSSProperties;
}

const directionVariants = {
  up: { initial: { opacity: 0, y: 60 }, inView: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -60 }, inView: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 60 }, inView: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -60 }, inView: { opacity: 1, x: 0 } },
  none: { initial: { opacity: 0, scale: 0.9 }, inView: { opacity: 1, scale: 1 } },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  stagger = 0,
  once = true,
  className = "",
  threshold = 0.1,
  rootMargin = "0px",
  ...props
}: ScrollRevealProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  const variants = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={variants.initial}
      animate={isInView ? variants.inView : variants.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        ...(stagger > 0 && { staggerChildren: stagger }),
      }}
      {...props}
    >
      {typeof children === "function" ? children({ isInView }) : children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", delay = 0, direction = "up", ...props }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right" | "none" }) {
  const variants = directionVariants[direction];
  return (
    <motion.div
      className={className}
      initial={variants.initial}
      animate={variants.inView}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxLayer({ children, speed = 0.3, className = "", ...props }: { children: React.ReactNode; speed?: number; className?: string }) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const elementTop = scrollY + rect.top;
      const distanceFromCenter = (elementTop + rect.height / 2) - (scrollY + viewportHeight / 2);
      setOffset(-distanceFromCenter * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`parallax-layer ${className}`} style={{ transform: `translateY(${offset}px)` }} {...props}>
      {children}
    </div>
  );
}

export function FloatingElement({ children, amplitude = 15, period = 6, className = "", ...props }: { children: React.ReactNode; amplitude?: number; period?: number; className?: string }) {
  const [time, setTime] = useState(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    const animate = (now: number) => {
      setTime((now - startTime.current) / 1000);
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className={className}
      animate={{
        y: Math.sin(time / period * 2 * Math.PI) * amplitude,
        rotate: Math.sin(time / period * 2 * Math.PI + Math.PI / 2) * 3,
      }}
      transition={{ duration: period, ease: "easeInOut", repeat: Infinity }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  text,
  children,
  className = "",
  delay = 0,
  ...props
}: {
  text?: string;
  children?: string | React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const content = typeof text === "string" ? text : typeof children === "string" ? children : "";
  const words = content.split(" ").filter(Boolean);
  if (!words.length) return null;
  return (
    <motion.span className={`inline-block ${className}`} {...props}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function RevealLines({ children, className = "", delay = 0, stagger = 0.1, ...props }: { children: React.ReactNode; className?: string; delay?: number; stagger?: number }) {
  return (
    <motion.div className={className} {...props}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * stagger, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}