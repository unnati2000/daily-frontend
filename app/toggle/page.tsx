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
    <div
      className={`flex flex-col h-screen w-screen justify-center items-center  ${
        toggle
          ? "bg-zinc-50 transition-colors ease-in-out duration-300"
          : "bg-[#171616] transition-colors ease-in-out duration-1000"
      } `}
    >
      <div
        onClick={() => setToggle(!toggle)}
        style={{
          boxShadow: toggle
            ? "5px 5px 16px #bbbbbb, -5px -5px 16px #ffffff"
            : "5px 5px 10px #0a0909, -5px -5px 10px #242323",
          background: toggle ? "#ffffff" : "#171616",
        }}
        className="h-16 p-1 rounded-full cursor-pointer w-40 flex flex-col justify-center transition-colors ease-in-out duration-1000"
      >
        <motion.div
          style={{
            x,
            background: x.get() <= 45 ? "yellow" : "transparent",
            transition: "background ease-in-out 1s",
            boxShadow: toggle
              ? "5px 5px 16px #bbbbbb, -5px -5px 16px #ffffff"
              : "5px 5px 16px #121111, -5px -5px 16px #1c1b1b",
          }}
          animate={{
            x: toggle ? 96 : 0,
            rotate: toggle ? 360 : 0,

            transition: {
              duration: 1,
              ease: "easeInOut",
            },
          }}
          className="h-14 w-14 rounded-full relative flex items-center z-1 justify-start"
        >
          <div
            className={
              !toggle
                ? ""
                : `absolute h-15 w-15 top-0 left-0 h-full w-full bg-yellow-200 -z-1 rounded-full blur-md`
            }
          />

          {x.get() >= 45 ? <WiMoonWaningCrescent4 size={96} /> : null}
        </motion.div>
      </div>
    </div>
  );
};

export default Toggle;
