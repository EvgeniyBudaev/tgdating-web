"use client";

import clsx from "clsx";
import { memo, type FC, type SyntheticEvent } from "react";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./InputDate.scss";

type TProps = {
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  onFieldClear?: (event: SyntheticEvent) => void;
  placeholder?: string;
  subTitle?: string;
  title?: string;
  value?: string | null;
};

const InputDateComponent: FC<TProps> = (props) => {
  const {
    className,
    isDisabled,
    isInvalid,
    onClick,
    onFieldClear,
    placeholder,
    subTitle,
    title,
    value,
  } = props;

  return (
    <div
      className={clsx("InputDate", className, {
        InputDate__isDisabled: isDisabled,
        InputDate__isInvalid: isInvalid && !isDisabled,
      })}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div className="InputDate-Inner">
        {title && (
          <div className="InputDate-Title">
            <Typography>{title}&nbsp;</Typography>
          </div>
        )}
        <div
          className={clsx("InputDate-IconWrapper", {
            ["InputDate-IconWrapper__isFocusable"]: !isDisabled,
          })}
        >
          <div
            className={clsx("InputDate-Text", {
              ["InputDate-Text__isFilled"]: value && !isDisabled,
              ["InputDate-Text__isPlaceholder"]: !value,
            })}
          >
            <Typography>{value ?? placeholder}</Typography>
          </div>
          {value && (
            <div className="InputDate-PostIcon" onClick={onFieldClear} />
          )}

          <Icon className="InputDate-DatePickerIcon" type="Calendar" />
        </div>
        <div className="InputDate-Text__isInvalid" />
      </div>
      {subTitle && (
        <div className="InputDate-SubTitle">
          <Typography>{subTitle}&nbsp;</Typography>
        </div>
      )}
    </div>
  );
};

export const InputDate = memo(InputDateComponent);
