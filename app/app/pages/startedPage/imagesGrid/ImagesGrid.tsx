import { Masonry } from "@tx666/masonry";
import { type FC } from "react";
import "./ImagesGrid.scss";

export const ImagesGrid: FC = () => {
  const list = [
    { src: "/assets/images/girl1.jpg" },
    { src: "/assets/images/boy1.jpg" },
    { src: "/assets/images/girl2.jpg" },
    { src: "/assets/images/boy4.jpg" },
    { src: "/assets/images/girl3.jpg" },
    { src: "/assets/images/boy3.jpg" },
    { src: "/assets/images/girl4.jpg" },
    { src: "/assets/images/boy2.jpg" },
    { src: "/assets/images/boy5.jpg" },
    { src: "/assets/images/girl6.jpg" },
    { src: "/assets/images/boy6.jpg" },
    { src: "/assets/images/boy7.jpg" },
  ];

  const columns = {
    xs: 3,
    sm: 3,
    md: 3,
    lg: 3,
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
