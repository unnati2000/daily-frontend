import Image from "next/image";

interface AvatarProps {
  url: string;
  name: string;
  index: number;
}

export const Avatar = ({ url, name, index }: AvatarProps) => {
  return (
    // <div className="">
    <Image
      src={url}
      className="rounded-full h-8 w-8"
      width={32}
      height={32}
      alt={name}
    />
    // </div>
  );
};

