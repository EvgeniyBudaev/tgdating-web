import type { FC } from "react";
import "./Gradient.scss";

export const Gradient: FC = () => {
  return (
    <div className="Gradient-bg">
      <div className="Gradient-container">
        <div className="g g1" />
        <div className="g g2" />
        <div className="g g3" />
        <div className="g g4" />
        <div className="g g5" />
        <div className="g interactive" />
      </div>
    </div>
  );
};
