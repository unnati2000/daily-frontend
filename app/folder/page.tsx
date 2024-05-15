"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FolderPage = () => {
  const [hover, setHover] = useState(false);
  const [shouldFlyOutside, setShouldFlyOutside] = useState(false);

  return (
    <div className="flex bg-zinc-200 flex-col cursor-pointer h-screen w-screen justify-center items-center">
      <div className=" rounded-md relative">
        <div
          style={{
            background: "#efe309",
          }}
          className="h-6 w-12 border border-yellow-600 rounded-md absolute -top-3"
        />
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="border rounded-tr-lg rounded-br-lg rounded-bl-lg relative border-yellow-600 h-24 w-44 bg-yellow-400"
          onClick={() => setShouldFlyOutside(!shouldFlyOutside)}
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #efe309, #efd706, #efcc08, #edc00c, #ebb512)",
          }}
        >
          <motion.div
            animate={{
              top: shouldFlyOutside ? "-140px" : hover ? "-20px" : 0,
              right: shouldFlyOutside ? "-70px" : hover ? "10px" : "30px",
              scale: shouldFlyOutside ? 1.5 : 1,
              rotate: shouldFlyOutside ? 8 : hover ? 4 : 2,
            }}
            className="border-4 absolute bg-pink-400 border-white rounded-xl h-20 w-20"
          ></motion.div>

          <motion.div
            animate={{
              top: shouldFlyOutside ? "-140px" : hover ? "-20px" : 0,
              left: shouldFlyOutside ? "-20%" : hover ? "5%" : "15%",
              scale: shouldFlyOutside ? 1.5 : 1,
              rotate: shouldFlyOutside ? -8 : hover ? -4 : 0,
            }}
            style={{
              backgroundImage: "https://picsum.photos/100/200",
            }}
            className="absolute border-white border-4 bg-green-500 rounded-xl h-20 w-20"
          ></motion.div>

          <motion.div
            animate={{
              transform: shouldFlyOutside
                ? "perspective(600px) rotateX(-50deg)"
                : "rotateZ(0deg)",
              transformOrigin: "bottom",
            }}
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #efe309, #efd706, #efcc08, #edc00c, #ebb512)",
            }}
            className="border border-yellow-500 rounded-xl absolute  h-20 bottom-0 w-full"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default FolderPage;

