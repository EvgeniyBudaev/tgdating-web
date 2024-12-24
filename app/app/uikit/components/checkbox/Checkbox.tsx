import clsx from "clsx";
import { memo } from "react";
import type { ChangeEvent, FC, ReactNode } from "react";
import { Error } from "@/app/uikit/components/error";
import { Icon } from "@/app/uikit/components/icon";
import { ETheme } from "@/app/uikit/enums";
import "./Checkbox.scss";

export type TCheckboxProps = {
  checked?: boolean;
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  defaultChecked?: boolean;
  errors?: string | string[] | null;
  id: string;
  label?: string;
  name: string;
  nameGroup: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    nameGroup: string,
  ) => void;
  theme?: ETheme;
};

export const CheckboxComponent: FC<TCheckboxProps> = ({
  checked,
  children,
  className,
  dataTestId = "uikit__checkbox",
  defaultChecked,
  errors,
  id,
  label,
  name,
  nameGroup,
  onChange,
  theme,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event, id, nameGroup);
  };

  return (
    <div
      className={clsx("Checkbox-Wrapper", className)}
      data-testid={dataTestId}
    >
      <input
        checked={checked}
        className="Checkbox"
        defaultChecked={defaultChecked}
        id={id}
        name={name}
        onChange={handleChange}
        type="checkbox"
        value={id}
      />
      {label && (
        <label className="Checkbox-Label" htmlFor={id}>
          <Icon className="Checkbox-Icon" type="Checkbox" />
          <span>{label}</span>
        </label>
      )}
      {children && <span className="Checkbox-Description">{children}</span>}
      {errors && (
        <div className="Checkbox-ErrorField">
          <Error errors={errors} />
        </div>
      )}
    </div>
  );
};

export const Checkbox = memo(CheckboxComponent);
