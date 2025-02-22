"use client";

import clsx from "clsx";
import { memo, type FC, useState, FocusEvent } from "react";
import { Icon } from "@/app/uikit/components/icon";
import type { TInputDateProps } from "@/app/uikit/components/inputDate/types";
import { Typography } from "@/app/uikit/components/typography";
import "./InputDate.scss";

const InputDateComponent: FC<TInputDateProps> = (props) => {
  const {
    className,
    errors,
    isDisabled,
    isInvalid,
    onClick,
    onFieldClear,
    placeholder,
    subTitle,
    title,
    value,
  } = props;
  const [isFocused, setIsFocused] = useState<boolean | undefined>(false);

  const onBlurCallback = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
  };

  const onFocusCallback = (event: FocusEvent<HTMLInputElement>) => {
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  return (
    <div
      className={clsx("InputDate", className, {
        InputDate__isDisabled: isDisabled,
        InputDate__isFocused: isFocused && !isDisabled,
        InputDate__isInvalid: isInvalid && !isDisabled,
        InputDate__isError: errors,
      })}
      onBlur={onBlurCallback}
      onClick={!isDisabled ? onClick : undefined}
      onFocus={onFocusCallback}
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

InputDateComponent.displayName = "InputDate";

export const InputDate = memo(InputDateComponent);
