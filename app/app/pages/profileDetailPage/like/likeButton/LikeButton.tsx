"use client";

import { memo, type FC } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./LikeButton.scss";

type TProps = {
  isLiked?: boolean;
  message?: string;
  onClick: () => void;
};

const LikeButtonComponent: FC<TProps> = ({ isLiked, message, onClick }) => {
  const { pending } = useFormStatus();

  return (
    <div className="LikeButton" onClick={onClick}>
      {pending && (
        <div className="LikeButton-Info">
          <div className="LikeButton-IconWrapper">
            <Icon className="SubmitButton-Loading-Icon" type="Spinner" />
          </div>
        </div>
      )}

      {isLiked && !pending && (
        <div className="LikeButton-Info">
          {message && (
            <div className="LikeButton-Message">
              <Typography>{message}</Typography>
            </div>
          )}
          <div className="LikeButton-IconWrapper">
            <Icon className="LikeButton-Icon" type="Heart" />
          </div>
        </div>
      )}

      {!isLiked && !pending && (
        <div className="LikeButton-Info">
          {message && (
            <div className="LikeButton-Message">
              <Typography>{message}</Typography>
            </div>
          )}
          <div className="LikeButton-IconWrapper">
            <Icon className="LikeButton-Icon" type="HeartEmpty" />
          </div>
        </div>
      )}
    </div>
  );
};

LikeButtonComponent.displayName = "LikeButton";

export const LikeButton = memo(LikeButtonComponent);
