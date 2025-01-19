import { Masonry } from "@tx666/masonry";
import { type FC } from "react";
import "./ImagesGrid.scss";

export const ImagesGrid: FC = () => {
  const list = [
    { src: "/assets/images/girl1.jpg" },
    { src: "/assets/images/boy1.jpg" },
    { src: "/assets/images/girl11.jpg" },
    { src: "/assets/images/boy4.jpg" },
    { src: "/assets/images/girl9.jpg" },
    { src: "/assets/images/boy2.jpg" },
    { src: "/assets/images/girl3.jpg" },
    { src: "/assets/images/boy8.jpg" },
    { src: "/assets/images/girl6.jpg" },
    { src: "/assets/images/boy6.jpg" },
    { src: "/assets/images/boy7.jpg" },
    { src: "/assets/images/boy3.jpg" },
  ];

  const columns = {
    xs: 4,
    sm: 4,
    md: 4,
    lg: 4,
    xl: 5,
    xxl: 5,
  };

  return (
    <div className="ImagesGrid">
      <div className="ImagesGrid-Container">
        <Masonry data={list} column={columns} />
      </div>
    </div>
  );
};
