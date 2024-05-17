// import { Avatar as AvatarG } from "@/components/ringtone/Avatar";
"use client";

import { Avatar } from "@mantine/core";

import { ThreeDot } from "@/components/ringtone/ThreeDot";

const people = [
  {
    id: 1,
    name: "Unnati Bamania",
    avatar: "https://github.com/unnati2000.png",
  },
  {
    id: 2,
    name: "Nitin Ranganath",
    avatar: "https://github.com/nitinranganath.png",
  },
  {
    id: 3,
    name: "Amey Bhavsar",
    avatar: "https://github.com/ameytessact.png",
  },
];

const Ringtone = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="relative flex z-1">
        <Avatar.Group>
          <Avatar src={people[0].avatar} />
          <Avatar src={people[1].avatar} />
          <Avatar src={people[2].avatar} />
        </Avatar.Group>
        <div className="absolute top-1/2 -translate-y-1/2 left-[70px] -z-3">
          <ThreeDot />
        </div>
      </div>
    </div>
  );
};

export default Ringtone;

