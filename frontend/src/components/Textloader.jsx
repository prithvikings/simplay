import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const MEME_QUOTES = [
  "Control Uday Control",
  "Utha le re deva utha le",
  "Abhi maza aayega na bhidu",
  "Seh lenge thoda",
  "Jal Lijiye, thak gaye honge",
  "Aayein?",
  "Baingan",
  "Chin Tapak Dam Dam",
  "Naam bataye? Bhupendra Jogi",
  "Gaddari Karbe",
  "Chhoti bachi ho kya?",
  "Sheetal To Sheetal hai",
  "Aditi hi Sheetal hai",
  "Par Aditi Nisha Hai",
  "Nisha Munni hai",
  "Aur wo laal button dikh raha hai?",
  "Ye sab doglapan hai",
  "Kya karu main mar jaun?",
  "Hum bhi bana lenge",
  "Thala For Reason",
];

export function TextLoopBasic() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        // Logic: Pick a random number. If it's the same as current, pick again.
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * MEME_QUOTES.length);
        } while (nextIndex === prevIndex);
        return nextIndex;
      });
    }, 2500); // Change text every 2.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index} // Key change triggers the animation
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="font-spacegrotesk font-semibold text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap"
        >
          {MEME_QUOTES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
