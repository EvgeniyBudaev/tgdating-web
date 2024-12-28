import {
  type ChangeEventHandler,
  type FC,
  type FocusEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useController, useFormContext } from "react-hook-form";
import { useFieldError } from "@/app/shared/hooks";
import { Input as InputUi } from "@/app/uikit/components/input";
import { ETheme } from "@/app/uikit/enums/theme";

type TProps = {
  defaultValue?: string | number;
  isNumeric?: boolean;
  isReadOnly?: boolean;
  label?: string;
  maxLength?: number;
  name: string;
  onFocus?: ((event: FocusEvent<HTMLElement>) => void) | undefined;
  subLabel?: string;
  theme?: ETheme;
  type?: string;
};

const InputComponent: FC<TProps> = ({
  defaultValue,
  isNumeric,
  isReadOnly,
  label,
  maxLength,
  name,
  onFocus,
  subLabel,
  theme,
  type,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });
  const fieldErrors = useFieldError({ errors: error?.message });

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      let resultValue = event.target.value;
      if (isNumeric) {
        resultValue = resultValue.replace(",", ".");
      }
      field.onChange(resultValue);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNumeric],
  );

  return (
    <InputUi
      defaultValue={defaultValue}
      errors={fieldErrors}
      isReadOnly={isReadOnly}
      label={label}
      maxLength={maxLength}
      name={field.name}
      onFocus={onFocus}
      onChange={handleChange}
      ref={field.ref}
      subLabel={subLabel}
      theme={theme}
      type={type}
      value={field.value}
    />
  );
};

InputComponent.displayName = "Input";

export const Input = memo(InputComponent);
