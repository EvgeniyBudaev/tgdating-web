import clsx from "clsx";
import { type FC, memo } from "react";
import { TCheckboxCustomProps } from "@/app/uikit/components/checkboxCustom/types";
import { Error } from "@/app/uikit/components/error";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./CheckboxCustom.scss";

const CheckboxCustomComponent: FC<TCheckboxCustomProps> = ({
  checked = false,
  dataTestId = "uikit__checkboxCustom",
  errors,
  label,
  name,
  onChange,
  theme,
}) => {
  const handleChange = () => {
    onChange?.(!checked);
  };

  return (
    <div
      className={clsx("CheckboxCustom", {
        ["CheckboxCustom__isChecked"]: checked,
        ["theme-dark"]: theme === ETheme.Dark,
      })}
      data-testid={dataTestId}
      onClick={handleChange}
    >
      <div className="CheckboxCustom-Checkbox">
        <Icon className="CheckboxCustom-Icon" type="Checkbox" />
      </div>
      {label && (
        <div className="CheckboxCustom-Label">
          <Typography>{label}</Typography>
        </div>
      )}
      {errors && (
        <div className="CheckboxCustom-ErrorField">
          <Error errors={errors} />
        </div>
      )}
      <input type="hidden" value={checked.toString()} name={name} />
    </div>
  );
};

CheckboxCustomComponent.displayName = "CheckboxCustom";

export const CheckboxCustom = memo(CheckboxCustomComponent);
