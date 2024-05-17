"use client";

import { motion, AnimatePresence } from "framer-motion";

export const ThreeDot = () => {
  return (
    <div className="flex gap-1 bg-indigo-500 items-center justify-center  rounded-full w-12 h-8">
      <Dot delay={0} />
      <Dot delay={0.4} />
      <Dot delay={0.8} />
    </div>
  );
};

const Dot = ({ delay }) => {
  return (
    <motion.div
      initial={{
        height: 4,
        width: 4,
      }}
      animate={{
        height: 12,
        width: 4,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      }}
      className="bg-white/45 rounded-full w-2 h-2"
    ></motion.div>
  );
};

