import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { title: "How We Met 💫", desc: "A simple hello that changed everything." },
  { title: "Our First Time Going Out 🍰", desc: "Almost got poisoned, but here we are!" },
  { title: "Our Adventures ✈️", desc: "Our time together, adventures, and laughter." },
  { title: "Today 💙", desc: "Still us, still together, still growing." },
  { title: "Our Future ✨", desc: "Our story continues..." },
   { title: "Our Future ✨", desc: "Our story continues..." },
    { title: "Our Future ✨", desc: "Our story continues..." },
     { title: "Our Future ✨", desc: "Our story continues..." },
      { title: "Our Future ✨", desc: "Our story continues..." },
];

const Journey = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Each timeline item will have its own ref
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    itemRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center py-16 px-4"
      style={{ backgroundImage: `url(${bluerealbackground3})` }}
    >
      <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-10 text-center">
        Our Journey Together 💞
      </p>

      <div className="flex justify-center w-full max-w-3xl md:max-w-4xl">
        <Timeline position={isMobile ? "right" : "alternate"}>
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index !== timelineEvents.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent className="md:px-4">
                {/* GSAP animation wrapper */}
                <div
                  ref={(el) => (itemRefs.current[index] = el!)}
                  className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-lg border border-white/40"
                >
                  <h3 className="font-semibold text-base md:text-lg text-blue-600 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-800 italic leading-snug md:leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default Journey;
