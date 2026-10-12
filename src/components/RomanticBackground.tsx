"use client";

import { useEffect, useRef, useState } from "react";

interface Cloud {
  id: number;
  x: number;
  y: number;
  scale: number;
  speed: number;
  opacity: number;
  src: string;
}

interface Bird {
  id: number;
  x: number;
  y: number;
  scale: number;
  speed: number;
  phase: number;
  wingPhase: number;
}

const CLOUD_SVGS = [
  `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M30,50 Q30,20 60,20 Q80,10 100,20 Q130,10 150,30 Q170,30 170,50 Q170,70 150,80 Q100,100 30,80 Z"/></svg>`,
  `<svg viewBox="0 0 250 120" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M40,60 Q40,25 80,25 Q110,10 140,30 Q180,10 210,40 Q230,40 230,65 Q230,90 200,100 Q120,120 40,100 Z"/></svg>`,
  `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M20,45 Q20,15 50,15 Q70,5 90,20 Q110,5 130,25 Q160,25 160,50 Q160,70 140,78 Q70,95 20,78 Z"/></svg>`,
];

const BIRD_WINGS_UP = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M32 2 C20 2 10 12 10 24 c0 8 6 18 14 24 4 3 8 7 12 12 4-5 8-9 12-12 8-6 14-16 14-24 C54 12 44 2 32 2 z M12 32 Q20 24 32 32 Q44 24 52 32 M8 36 Q20 28 32 36 Q44 28 56 36"/></svg>`;

const BIRD_WINGS_DOWN = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M32 2 C20 2 10 12 10 24 c0 8 6 18 14 24 4 3 8 7 12 12 4-5 8-9 12-12 8-6 14-16 14-24 C54 12 44 2 32 2 z M32 32 Q20 40 12 32 M32 32 Q44 40 52 32 M32 32 Q20 24 12 32 M32 32 Q44 24 52 32"/></svg>`;

export function RomanticBackground({ className = "" }: { className?: string }) {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [birds, setBirds] = useState<Bird[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const initialClouds: Cloud[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 120 - 10,
      y: Math.random() * 60 + 5,
      scale: 0.4 + Math.random() * 0.6,
      speed: 0.02 + Math.random() * 0.03,
      opacity: 0.3 + Math.random() * 0.3,
      src: CLOUD_SVGS[Math.floor(Math.random() * CLOUD_SVGS.length)],
    }));

    const initialBirds: Bird[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 40 + 10,
      scale: 0.3 + Math.random() * 0.4,
      speed: 0.15 + Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
      wingPhase: Math.random() * Math.PI * 2,
    }));

    setClouds(initialClouds);
    setBirds(initialBirds);

    let lastTime = 0;
    const animate = (timestamp: number) => {
      const dt = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      setClouds(prev => prev.map(cloud => ({
        ...cloud,
        x: cloud.x + cloud.speed * dt * 10,
        y: cloud.y + Math.sin(timestamp / 2000 + cloud.id) * 0.02,
      })).map(cloud => cloud.x > 110 ? { ...cloud, x: -10, y: Math.random() * 60 + 5 } : cloud));

      setBirds(prev => prev.map(bird => ({
        ...bird,
        x: bird.x + bird.speed * dt * 10,
        y: bird.y + Math.sin(timestamp / 1000 + bird.phase) * 0.5,
        wingPhase: bird.wingPhase + dt * 8,
      })).map(bird => bird.x > 105 ? { ...bird, x: -5, y: Math.random() * 40 + 10 } : bird));
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-rose-50/30 to-lavender-50/50" />
      
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 20% 20%, rgba(146, 198, 249, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(199, 210, 254, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(219, 233, 247, 0.1) 0%, transparent 60%)' }} />
      
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b8ee0\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 6V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {clouds.map(cloud => (
        <div
          key={cloud.id}
          className="absolute pointer-events-none animate-drift"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            transform: `scale(${cloud.scale})`,
            opacity: cloud.opacity,
            filter: 'drop-shadow(0 4px 12px rgba(59, 142, 224, 0.1))',
            animationDuration: `${80 + cloud.speed * 1000}s`,
            animationDelay: `${cloud.id * 2}s`,
          }}
          dangerouslySetInnerHTML={{ __html: cloud.src.replace('currentColor', '#92c6f9') }}
        />
      ))}

      {birds.map(bird => (
        <div
          key={bird.id}
          className="absolute pointer-events-none"
          style={{
            left: `${bird.x}%`,
            top: `${bird.y}%`,
            transform: `scale(${bird.scale})`,
            opacity: 0.6,
            filter: 'drop-shadow(0 2px 8px rgba(37, 115, 196, 0.25))',
          }}
        >
          <div
            style={{
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${bird.wingPhase}s`,
            }}
            dangerouslySetInnerHTML={{
              __html: Math.sin(bird.wingPhase) > 0 ? BIRD_WINGS_UP.replace('currentColor', '#1d5aa0') : BIRD_WINGS_DOWN.replace('currentColor', '#1d5aa0')
            }}
          />
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, transparent 100%)',
        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
      }} />
    </div>
  );
}

export function FloatingHearts({ count = 12 }: { count?: number }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 8,
    size: 12 + Math.random() * 20,
    opacity: 0.15 + Math.random() * 0.25,
    color: ['#92c6f9', '#3b8ee0', '#1d5aa0', '#c7d2fe', '#dbe9f7'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute bottom-full animate-float-up"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            transform: 'rotate(-45deg)',
          }}
        >
          <div className="w-full h-full" style={{
            background: heart.color,
            borderRadius: '50% 50% 0 0',
          }} />
        </div>
      ))}
    </div>
  );
}

export function Sparkles({ count = 20 }: { count?: number }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
    size: 3 + Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: sparkle.size,
            height: sparkle.size,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
            background: 'radial-gradient(circle, #fff 0%, #92c6f9 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}