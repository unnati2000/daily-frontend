"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { WiMoonWaningCrescent4 } from "react-icons/wi";

import { useMotionValue, useMotionValueEvent } from "framer-motion";

const Toggle = () => {
  const [toggle, setToggle] = useState(false);

  const x = useMotionValue(0);

  useMotionValueEvent(x, "change", (latest) => {
    console.log("x changed to", latest);
  });

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div
        onClick={() => setToggle(!toggle)}
        className="border border-red-200 h-16 p-1 rounded-full cursor-pointer w-40 flex flex-col justify-center"
      >
        <motion.div
          style={{
            x,
            background: x.get() <= 45 ? "yellow" : "transparent",
            transition: "background ease-in-out 1s",
          }}
          animate={{
            x: toggle ? 96 : 0,
            rotate: toggle ? 360 : 0,

            transition: {
              duration: 1,
              ease: "easeInOut",
            },
          }}
          className="h-14 w-14 rounded-full border flex items-center justify-start border-white"
        >
          {x.get() >= 45 ? <WiMoonWaningCrescent4 size={96} /> : null}
        </motion.div>
      </div>
    </div>
  );
};

export default Toggle;
