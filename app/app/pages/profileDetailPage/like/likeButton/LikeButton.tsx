"use client";

import { memo, type FC } from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "@/app/i18n/client";
import { Icon } from "@/app/uikit/components/icon";
import { TooltipV2 } from "@/app/uikit/components/tooltipV2";
import { ETheme } from "@/app/uikit/enums/theme";
import "./LikeButton.scss";

type TProps = {
  isLiked?: boolean;
  isShowTooltipHeart?: boolean;
  onClick: () => void;
  onCloseTooltip?: () => void;
  theme: ETheme;
};

const LikeButtonComponent: FC<TProps> = ({
  isLiked,
  isShowTooltipHeart,
  onClick,
  onCloseTooltip,
  theme,
}) => {
  const { pending } = useFormStatus();
  const { t } = useTranslation("index");
  const isLoading = pending;
  const message = t("common.titles.doubleLike");

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
          <TooltipV2
            isOpen={isShowTooltipHeart}
            isVisible={isShowTooltipHeart}
            message={message}
            onClose={onCloseTooltip}
            theme={theme}
          >
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
          <TooltipV2
            isOpen={isShowTooltipHeart}
            isVisible={isShowTooltipHeart}
            message={message}
            onClose={onCloseTooltip}
            theme={theme}
          >
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
