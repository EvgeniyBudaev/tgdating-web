import { FC, MouseEvent } from "react";
import { Icon } from "@/app/uikit/components/icon";
import "./Heart.scss";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  isLiked: boolean;
  message?: string;
  onClick?: (event: MouseEvent) => void;
};

export const Heart: FC<TProps> = ({ isLiked, message, onClick }) => {
  return (
    <div className="Heart" onClick={onClick}>
      {isLiked ? (
        <div className="Heart-Info">
          {message && (
            <div className="Heart-Message">
              <Typography>{message}</Typography>
            </div>
          )}
          <div>
            <Icon className="Heart-Icon" type="Heart" />
          </div>
        </div>
      ) : (
        <div className="Heart-Info">
          {message && (
            <div className="Heart-Message">
              <Typography>{message}</Typography>
            </div>
          )}
          <div>
            <Icon className="Heart-Icon" type="HeartEmpty" />
          </div>
        </div>
      )}
    </div>
  );
};
