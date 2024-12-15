import { type FC, memo, useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useFieldError } from "@/app/shared/hooks";
import { SelectNative as SelectNativeUi } from "@/app/uikit/components/selectNative";
import type {
  TSelectNativeOnChange,
  TSelectNativeProps,
} from "@/app/uikit/components/selectNative/types";

type TProps = {
  name: string;
} & TSelectNativeProps;

const SelectNativeComponent: FC<TProps> = (props) => {
  const { name, onChange, value, ...rest } = props;
  const { control } = useFormContext();
  const defaultValue = Array.isArray(value) ? value[0].value : value?.value;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });
  const defaultOption = { label: field.value.toString(), value: field.value };
  const fieldErrors = useFieldError({ errors: error?.message });

  const handleChange: TSelectNativeOnChange = useCallback(
    (option: any, actionMeta: any) => {
      onChange?.(option, actionMeta);
      field.onChange(option?.value);
      return undefined;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange],
  );

  return (
    <SelectNativeUi
      {...rest}
      errors={fieldErrors}
      onChange={handleChange}
      value={defaultOption}
    />
  );
};

SelectNativeComponent.displayName = "SelectNative";

export const SelectNative = memo(SelectNativeComponent);
