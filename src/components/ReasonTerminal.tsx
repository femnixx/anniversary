"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REASONS: string[] = [
  "You make ordinary days feel like adventures",
  "Your laugh is my favorite sound in the world",
  "You love me exactly as I am",
  "Every moment with you is a gift I never want to unwrap",
  "You have the most beautiful smile when you're focused",
  "You always know how to make me feel seen",
  "Your curiosity about everything is so endearing",
  "You turn my chaos into calm",
  "You remember the little things I mention in passing",
  "Your hugs fix anything that's broken in my day",
  "You're smarter than everyone I know",
  "You dance like nobody's watching even when they are",
  "Your hands are the perfect size to hold mine",
  "You never make me feel alone, even in a crowd",
  "You have the cutest freckle on your left hand",
  "You ask the best questions about everything",
  "You say 'I love you' like it's the most natural thing in the world",
  "Your perspective on life makes me a better person",
  "You let me win at board games on purpose (and I know it)",
  "You make breakfast in bed without being asked",
  "Your eyes crinkle when you smile genuinely",
  "You support every crazy idea I have",
  "You smell like safety and home",
  "You're my partner in every sense of the word",
  "You make even grocery shopping fun",
  "You're passionate about things that matter",
  "You never judge me for my weird habits",
  "Your voice is the last thing I want to hear at night",
  "You understand my need for silence sometimes",
  "You're genuinely interested in my day",
  "Your patience with me is endless",
  "You wear that one sweater that's too big and it's adorable",
  "You have the coziest laugh",
  "You make plans for us even when you're busy",
  "You're brave in ways I aspire to match",
  "You say good morning like it's a gift",
  "Your cooking tastes like love",
  "You never forget our anniversary",
  "You're better at finding parking spots than anyone I know",
  "You hum when you're thinking",
  "You hold the door for strangers without fail",
  "You're the reason I believe in love",
  "You ask me to dance in the kitchen",
  "Your advice is always exactly what I needed",
  "You remember my childhood stories",
  "You're competitive in the sweetest way",
  "You let me borrow your hoodie and actually miss it",
  "You're beautiful without any makeup",
  "You make me want to be the best version of myself",
  "Your hugs last just the right amount of time",
  "You're the reason my heart skips",
  "You're better at directions than GPS",
  "You say 'I'm proud of you' unprompted",
  "Your patience with strangers is incredible",
  "You make even bad weather fun",
  "You're the only person I want to be stuck in traffic with",
  "Your eyes are the color I want to live in",
  "You never make me feel like a burden",
  "You're naturally maternal and nurturing",
  "Your voice when you're reading aloud is hypnotic",
  "You're the reason I believe in fairy tales",
  "You make my worst days better just by being near",
  "You're the only person whose opinion truly matters to me",
  "Your laugh is contagious and I love catching you at it",
  "You're better at planning than anyone I know",
  "You surprise me with thoughtful gestures",
  "Your intuition about people is almost supernatural",
  "You're the reason I smile when I see my phone",
  "You make me want to write poems about us",
  "You're endlessly forgiving of my mistakes",
  "Your excitement about things I love makes me love them more",
  "You're the reason I have a home to come back to",
  "Your kisses taste like happiness",
  "You're better at handling my moods than I am",
  "You make even boring evenings magical",
  "Your consistency is the safest feeling in the world",
  "You're the reason I want to grow old with someone",
  "You have the warmest hand in the coldest seasons",
  "You're better at finding joy in small moments",
  "You make me want to be more myself",
  "Your patience when I'm being difficult is saintly",
  "You're the reason I believe in love at first sight",
  "You're endlessly curious about the world around us",
  "Your quiet moments are just as beautiful as your loud ones",
  "You're the best travel companion imaginable",
  "You make me want to visit every place on Earth",
  "You're better at staying calm in emergencies",
  "Your excitement when you tell me stories is infectious",
  "You're the reason my heart feels full",
  "You're the only person who understands my humor",
  "Your love languages are all of them at once",
  "You make me want to build a future together",
  "You're better at listening than anyone I know",
  "Your care for our pets is the sweetest thing",
  "You're the reason I'm not afraid of the future",
  "You have the most beautiful handwriting",
  "You're better at making friends wherever we go",
  "Your love fills every room you enter",
  "You're the reason I want to wake up early",
  "You're endlessly patient with my forgetfulness",
  "Your strength when I'm weak is superhuman",
  "You make me want to be less cynical",
  "You're the reason I believe in destiny",
  "You have the coziest voice when you're sleepy",
  "You're better at remembering dates than anyone",
  "Your love is my anchor in every storm",
  "You make me want to cook more",
  "You're endlessly optimistic about what's possible",
  "Your touch heals everything",
  "You're the reason I have the best life",
  "You make me want to take more photos of our life",
  "You're better at math than me (and that's impressive)",
  "Your love is my greatest adventure",
  "You're the reason I always come home",
  "You make me want to learn new things for you",
  "You're endlessly generous with your time",
  "Your love makes everything better",
  "You're the reason I'm the luckiest person alive",
  "You make me want to plant a garden together",
  "You're better at picking movies than anyone",
  "Your love is my favorite story",
  "You're the reason I believe in happy endings",
  "You make me want to write a book about us",
  "You're endlessly creative in problem-solving",
  "Your love is my safe place",
  "You're the reason I have the best partner in crime",
  "You make me want to grow alongside you",
  "You're better at decorating than interior designers",
  "Your love lights up my darkest days",
  "You're the reason I look forward to tomorrow",
  "You make me want to explore the world with you",
  "You're endlessly thoughtful in ways I never see coming",
  "Your love is my favorite chapter",
  "You're the reason I'm never alone even when I'm by myself",
  "You make me want to build blanket forts",
  "You're better at recalling details than anyone I know",
  "Your love is my favorite melody",
  "You're the reason I want to grow old holding hands",
  "You make me want to collect memories with you",
  "You're endlessly inspiring in your kindness",
  "Your love is my greatest treasure",
  "You're the reason I have everything I need",
  "You make me want to learn your love languages fluently",
  "You're better at making me feel loved than anyone",
  "Your love is my home",
  "You're the reason I wake up smiling",
  "You make me want to be a better human being",
  "You're endlessly patient when I'm overthinking",
  "Your love is my favorite place to be",
  "You're the reason I believe in magic",
  "You make me want to write our story in the stars",
  "You're better at comforting me than anyone",
  "Your love is my eternal sunshine",
  "You're the reason I have the best life possible",
  "You make me want to spend forever finding new reasons to love you",
  "You're endlessly the reason my heart beats faster",
  "Your love is my everything, always has been, always will be",
  "You're the reason I know what forever feels like",
  "You make me want to love you for a thousand lifetimes",
];

const KEYWORD_MAP: Record<string, string> = {
  smile: REASONS[4],
  laugh: REASONS[1],
  always: REASONS[176],
};

export default function ReasonTerminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processInput(input);
    }
  };

  const processInput = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) return;

    setIsProcessing(true);
    setOutput(null);

    setTimeout(() => {
      if (trimmed in KEYWORD_MAP) {
        setOutput(KEYWORD_MAP[trimmed]);
      } else {
        const num = parseInt(trimmed, 10);
        if (!isNaN(num) && num >= 1 && num <= 100) {
          setOutput(REASONS[(num - 1) % REASONS.length]);
        } else {
          setOutput(
            "Keyword not recognized. Try typing: smile, laugh, always, or look up a random number 1-100!",
          );
        }
      }
      setIsProcessing(false);
      setInput("");
    }, 300);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-[480px] box-border"
      style={{
        backgroundColor: "#1e1e24",
        borderRadius: "16px",
        border: "3px solid #bde0fe",
        boxShadow: "0px 8px 0px #a2d2ff",
        fontFamily: "monospace",
        color: "#fdf0d5",
      }}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-[#3a3a4a]">
        <div className="flex gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="block h-3 w-3 rounded-full bg-[#ffb400]" />
          <span className="block h-3 w-3 rounded-full bg-[#00d26a]" />
        </div>
        <span className="text-sm font-medium text-[#bde0fe]">💕 reason_terminal.exe</span>
      </div>

      <div className="p-4">
        <div className="mb-4 text-sm text-[#8a8a9a]">
          <p>&gt; Welcome to the reason terminal.</p>
          <p>&gt; Type a keyword (smile, laugh, always) or a number (1-100).</p>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-[#00d2ff]">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type keyword..."
              className="flex-1 bg-[#2a2a3a] px-3 py-2 text-[#fdf0d5] outline-none transition-colors placeholder-[#8a8a9a] focus:bg-[#323246]"
              style={{ borderRadius: "6px" }}
              aria-label="Type a keyword or number to look up a reason"
            />
          </label>
        </div>

        <AnimatePresence>
          {isProcessing && (
            <motion.div
              className="text-sm text-[#8a8a9a]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>&gt; Processing request...</p>
            </motion.div>
          )}

          {output && !isProcessing && (
            <motion.div
              className="text-sm text-[#fdf0d5]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="mb-1">&gt; {input.trim() || "query"}</p>
              <p className="text-[#a2d2ff]">{output}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { REASONS };
