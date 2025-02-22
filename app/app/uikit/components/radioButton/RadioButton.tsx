import clsx from "clsx";
import { memo, type FC } from "react";
import { ETheme } from "@/app/uikit/enums/theme";
import { NativeRadioButton } from "@/app/uikit/components/radioButton/nativeRadioButton";
import type { TRadioButtonProps } from "@/app/uikit/components/radioButton/types";
import { Typography } from "@/app/uikit/components/typography";
import "./RadioButton.scss";

const RadioButtonComponent: FC<TRadioButtonProps> = ({
  checked,
  label,
  name,
  onChange,
  theme,
  value,
}) => {
  return (
    <div
      className={clsx("RadioButton", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <label className="RadioButton-Label" htmlFor={name}>
        <NativeRadioButton
          checked={checked}
          id={name}
          name={name}
          onChange={onChange}
          value={value}
        />
        <div
          className={clsx("RadioButton-Radio", {
            ["RadioButton-Radio__checked"]: checked,
          })}
        />
        <Typography>{label}</Typography>
      </label>
    </div>
  );
};

RadioButtonComponent.displayName = "RadioButton";

export const RadioButton = memo(RadioButtonComponent);
