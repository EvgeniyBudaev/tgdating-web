import { Locale } from "date-fns";
import { type FC, memo, SyntheticEvent, useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useFieldError } from "@/app/shared/hooks";
import { InputDateField as InputDateFieldUi } from "@/app/uikit/components/inputDateField";

type TProps = {
  locale?: Locale;
  name: string;
  onChange: (value: Date | null) => void;
  onFieldClear?: (event: SyntheticEvent) => void;
  placeholder?: string;
  value: Date | null;
};

const InputDateFieldComponent: FC<TProps> = ({
  locale,
  name,
  onChange,
  onFieldClear,
  placeholder,
  value,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: value,
  });
  const fieldErrors = useFieldError({ errors: error?.message });

  const handleChange = useCallback(
    (value: Date | null) => {
      onChange(value);
      field.onChange(value?.toString());
    },
    [field, onChange],
  );

  const handleFieldClear = useCallback(
    (event: SyntheticEvent) => {
      onFieldClear?.(event);
      field.onChange("");
    },
    [field, onFieldClear],
  );

  return (
    <InputDateFieldUi
      errors={fieldErrors}
      locale={locale}
      name={field.name}
      onChange={handleChange}
      onFieldClear={handleFieldClear}
      placeholder={placeholder}
      value={value}
    />
  );
};

InputDateFieldComponent.displayName = "InputDateField";

export const InputDateField = memo(InputDateFieldComponent);
