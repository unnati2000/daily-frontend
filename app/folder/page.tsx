"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FolderPage = () => {
  const [hover, setHover] = useState(false);
  const [shouldFlyOutside, setShouldFlyOutside] = useState(false);

  return (
    <div className="flex flex-col cursor-pointer h-screen w-screen justify-center items-center">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="border relative border-yellow-300 h-24 w-44 bg-yellow-800"
        onClick={() => setShouldFlyOutside(!shouldFlyOutside)}
      >
        {/* <div className="border absolute border-red-300 h-16 w-32 bottom-0"></div> */}

        <motion.div
          animate={{
            top: shouldFlyOutside ? "-140px" : hover ? "-20px" : 0,
            right: shouldFlyOutside ? "-70px" : hover ? "10px" : "30px",
            scale: shouldFlyOutside ? 1.5 : 1,
            rotate: shouldFlyOutside ? 8 : hover ? 4 : 2,
          }}
          className="border absolute bg-pink-400 border-pink-200 h-20 w-16"
        >
          right
        </motion.div>

        <motion.div
          animate={{
            top: shouldFlyOutside ? "-140px" : hover ? "-20px" : 0,
            left: shouldFlyOutside ? "-20%" : hover ? "5%" : "15%",
            scale: shouldFlyOutside ? 1.5 : 1,
            rotate: shouldFlyOutside ? -8 : hover ? -4 : 0,
          }}
          className="border absolute bg-pink-200 border-pink-200 h-20 w-16"
        >
          left
        </motion.div>

        <motion.div
          animate={{
            transform: shouldFlyOutside
              ? "perspective(1600px) rotateX(-50deg)"
              : "rotateZ(0deg)",
          }}
          className="border absolute bg-yellow-500 border-pink-200 h-20 bottom-0 w-full"
        ></motion.div>
      </div>
    </div>
  );
};

export default FolderPage;

