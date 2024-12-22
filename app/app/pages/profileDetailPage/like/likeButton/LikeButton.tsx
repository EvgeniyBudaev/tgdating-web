"use client";

import { memo, type FC } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/app/uikit/components/icon";
import { TooltipV2 } from "@/app/uikit/components/tooltipV2";
import "./LikeButton.scss";

type TProps = {
  isLiked?: boolean;
  message?: string;
  onClick: () => void;
};

const LikeButtonComponent: FC<TProps> = ({ isLiked, message, onClick }) => {
  const { pending } = useFormStatus();
  const isLoading = pending;
  const isMessage = !!message;

  return (
    <div className="LikeButton" onClick={onClick}>
      {isLoading && (
        <div className="LikeButton-Info">
          <div className="Controls-Box Controls-Box-Green">
            <Icon className="SubmitButton-Loading-Icon" type="Spinner" />
          </div>
        </div>
      )}

      {isLiked && !isLoading && (
        <div className="LikeButton-Info">
          <TooltipV2 isOpen={isMessage} isVisible={isMessage} message={message}>
            <div className="Controls-Box Controls-Box-Green">
              <Icon
                className="Controls-Icon LikeButton-Icon__isLiked"
                type="Heart"
              />
            </div>
          </TooltipV2>
        </div>
      )}

      {!isLiked && !isLoading && (
        <div className="LikeButton-Info">
          <TooltipV2 isOpen={isMessage} isVisible={isMessage} message={message}>
            <div className="Controls-Box Controls-Box__no-checked Controls-Box-Green">
              <Icon className="Controls-Icon" type="HeartEmpty" />
            </div>
          </TooltipV2>
        </div>
      )}
    </div>
  );
};

LikeButtonComponent.displayName = "LikeButton";

export const LikeButton = memo(LikeButtonComponent);
