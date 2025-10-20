import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { title: "How We Met 💫", desc: "A simple hello that changed everything." },
  { title: "Our First Time Going Out 🍰", desc: "Almost got poisoned, but here we are!" },
  { title: "Our Adventures ✈️", desc: "Our time well spent together!" },
  { title: "Today 💙", desc: "Still us, still together, still growing." },
  { title: "Malaysia 🇲🇾", desc: "Still will be there with you, as well as call and play with you anytime I can:3" },
  { title: "Swiss Adventure? 🌏️", desc: "Can't wait to hear everything!" },
  { title: "Our Future ✨", desc: "Our story continues..." },
];

const Journey = () => {
  const [isMobile, setIsMobile] = useState(false);
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
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center py-16 px-4 md:px-10"
      style={{ backgroundImage: `url(${bluerealbackground3})` }}
    >
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-12 text-center leading-snug">
        Our Journey Together 💞
      </p>

      <div className="flex justify-center w-full max-w-6xl">
        <Timeline position={isMobile ? "right" : "alternate"}>
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" sx={{ width: 20, height: 20 }} />
                {index !== timelineEvents.length - 1 && (
                  <TimelineConnector sx={{ height: { xs: 50, sm: 70, md: 90 } }} />
                )}
              </TimelineSeparator>

              <TimelineContent className="md:px-6 lg:px-10 py-2 md:py-4">
                <div
                  ref={(el) => (itemRefs.current[index] = el!)}
                  className="bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl border border-white/30 transition-transform hover:scale-[1.02]"
                >
                  <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-blue-600 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 italic leading-relaxed">
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
