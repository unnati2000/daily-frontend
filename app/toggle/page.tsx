"use client";

import { useState } from "react";

import { motion } from "framer-motion";

const Toggle = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div
        onClick={() => setToggle(!toggle)}
        className="border border-red-200 h-16 p-1 rounded-full cursor-pointer w-40 flex flex-col justify-center"
      >
        <motion.div
          animate={{
            x: toggle ? 96 : 0,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
          className="h-14 w-14 rounded-full border border-white"
        ></motion.div>
      </div>
    </div>
  );
};

export default Toggle;
