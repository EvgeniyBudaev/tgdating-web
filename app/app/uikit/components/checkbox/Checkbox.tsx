import clsx from "clsx";
import { memo } from "react";
import type { ChangeEvent, FC } from "react";
import type { TCheckboxProps } from "@/app/uikit/components/checkbox/types";
import { Error } from "@/app/uikit/components/error";
import { Icon } from "@/app/uikit/components/icon";
import "./Checkbox.scss";

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

CheckboxComponent.displayName = "Checkbox";

export const Checkbox = memo(CheckboxComponent);
