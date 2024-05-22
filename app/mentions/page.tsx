"use client";

import { useEffect, useState, useRef } from "react";

const users = [
  {
    id: 1,
    name: "Unnati",
  },
  {
    id: 2,
    name: "Sheep",
  },
];

const Mentions = () => {
  const [text, setText] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    const words = text.split(" ");
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith("@")) {
      setShowDiv(true);

      //   const textarea = document.querySelector("textarea");
      const { left, top } = textRef?.current.getBoundingClientRect();
      console.log({
        left,
        top,
      });
      const { width, height } = getTextDimensions(text);
      setPosition({ x: width, y: height });
    } else {
      setShowDiv(false);
    }
  }, [text]);

  const getTextDimensions = (text: string) => {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.whiteSpace = "pre";
    span.style.font = "inherit";
    span.textContent = text;
    document.body.appendChild(span);
    const { width, height } = span.getBoundingClientRect();
    document.body.removeChild(span);
    console.log({
      height,
      width,
    });
    return { width, height };
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="relative border">
        <textarea
          className="border"
          onChange={(e) => setText(e.target.value)}
          value={text}
          ref={textRef}
        />
        {console.log({
          position,
        })}
        {showDiv && (
          <div
            className="absolute bg-white border rounded"
            style={{ left: position.x, top: position.y }}
            ref={popoverRef}
          >
            {users.map((user) => (
              <div key={user.id}>{user.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentions;

