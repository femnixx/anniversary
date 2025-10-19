import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const timelineEvents = [
  {
    title: "How We Met 💫",
    desc: "A simple hello, to us calling and playing games, and then to the meeting that changed everything.",
  },
  {
    title: "Our First Time Going Out 🍰",
    desc: "Almost got poisoned, but here we are!",
  },
  {
    title: "Our Adventures ✈️",
    desc: "Our time together, our adventures, and our togetherness.",
  },
  {
    title: "Today 💙",
    desc: "Here we are, standing together — still us.",
  },
  {
    title: "Today 💙",
    desc: "Here we are, standing together — still us.",
  },
  {
    title: "Today 💙",
    desc: "Here we are, standing together — still us.",
  },
  {
    title: "Today 💙",
    desc: "Here we are, standing together — still us.",
  },
  {
    title: "Today 💙",
    desc: "Here we are, standing together — still us.",
  },
  
];

const Journey = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center py-16 px-4"
      style={{ backgroundImage: `url(${bluerealbackground3})` }}
    >
      <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-10 text-center">
        Our Journey Together 💞
      </p>
      {/* Timeline container */}
      <div className="flex justify-center w-full max-w-3xl md:max-w-4xl">
        <Timeline position={isMobile ? "right" : "alternate"}>
         {timelineEvents.map((event, index) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 }); // only active when 30% in view

  return (
    <div ref={ref} key={index}>
      <AnimatePresence mode="wait">
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.6 }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index !== timelineEvents.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent className="md:px-4">
                <div className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-lg border border-white/40">
                  <h3 className="font-semibold text-base md:text-lg text-blue-600 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-800 italic leading-snug md:leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
})}

        </Timeline>
      </div>
    </div>
  );
};

export default Journey;
