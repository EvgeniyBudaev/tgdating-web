import Image from "next/image";
import { type FC } from "react";
import "./ListImages.scss";

export const ListImages: FC = () => {
  const list = [
    "/assets/images/girl1.jpg",
    "/assets/images/boy1.jpg",
    "/assets/images/girl2.jpg",
    "/assets/images/boy2.jpg",
    "/assets/images/girl3.jpg",
    "/assets/images/boy3.jpg",
    "/assets/images/girl4.jpg",
    "/assets/images/boy4.jpg",
    "/assets/images/girl5.jpg",
    "/assets/images/boy5.jpg",
    "/assets/images/girl6.jpg",
    "/assets/images/boy6.jpg",
    "/assets/images/girl7.jpg",
    "/assets/images/boy7.jpg",
    "/assets/images/girl8.jpg",
  ];

  return (
    <div className="ListImages">
      {list.map((url) => (
        <Image
          alt=""
          className="ListImages-Image"
          key={url}
          src={url}
          priority={true}
          height={36}
          width={36}
          quality={100}
        />
      ))}
    </div>
  );
};
