import clsx from "clsx";
import { type FC, memo } from "react";
import { Error } from "@/app/uikit/components/error";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./CheckboxCustom.scss";

type TProps = {
  checked?: boolean;
  dataTestId?: string;
  errors?: string | string[] | null;
  label?: string;
  name: string;
  onChange?: (value: boolean) => void;
  theme?: ETheme;
};

const CheckboxCustomComponent: FC<TProps> = ({
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

export const CheckboxCustom = memo(CheckboxCustomComponent);
