import { type FC, memo, useCallback, useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useFieldError } from "@/app/shared/hooks";
import { CheckboxCustom as CheckboxUi } from "@/app/uikit/components/checkboxCustom";
import { ETheme } from "@/app/uikit/enums/theme";

type TProps = {
  checked?: boolean;
  label?: string;
  name: string;
  onChange?: (value: boolean) => void;
  theme?: ETheme;
};

const CheckboxComponent: FC<TProps> = ({
  checked,
  label,
  name,
  onChange,
  theme,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: checked,
  });
  const fieldErrors = useFieldError({ errors: error?.message });

  const handleChange = useCallback(
    (value: boolean) => {
      field.onChange(value);
      onChange?.(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    field.onChange(checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <CheckboxUi
      checked={field.value}
      errors={fieldErrors}
      label={label}
      theme={theme}
      name={field.name}
      onChange={handleChange}
    />
  );
};

export const Checkbox = memo(CheckboxComponent);
