import { Avatar } from "@/components/ringtone/Avatar";

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
    <div className="h-screen w-screen flex flex-col items-center justify-center border">
      <div className="border relative flex w-32 z-1">
        <div className="absolute left-[40px] -z-2">
          <Avatar url={people[2].avatar} name={people[2].name} index={2} />
        </div>
        <div className="absolute left-[20px] -z-1">
          <Avatar url={people[1].avatar} name={people[1].name} index={1} />
        </div>

        <div className="absolute z-1">
          <Avatar url={people[0].avatar} name={people[0].name} index={0} />
        </div>
      </div>
    </div>
  );
};

export default Ringtone;

