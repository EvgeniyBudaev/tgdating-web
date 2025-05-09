import { type FC, memo } from "react";
import { DATA_TEST_ID } from "@/app/uikit/components/radioButton/constants";
import type { TNativeRadioButtonProps } from "@/app/uikit/components/radioButton/nativeRadioButton/types";

const NativeRadioButtonComponent: FC<TNativeRadioButtonProps> = ({
  checked,
  className,
  defaultValue,
  id,
  name,
  onChange,
  value,
}) => {
  return (
    <input
      checked={checked}
      className={className}
      data-testid={`${DATA_TEST_ID}__input`}
      defaultValue={defaultValue}
      id={id}
      name={name}
      onChange={onChange}
      type="radio"
      value={value}
    />
  );
};

NativeRadioButtonComponent.displayName = "NativeRadioButton";

export const NativeRadioButton = memo(NativeRadioButtonComponent);
