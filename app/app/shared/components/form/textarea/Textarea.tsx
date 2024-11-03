import {
  type ChangeEventHandler,
  type FC,
  type FocusEvent,
  memo,
  useCallback,
} from "react";
import { useController, useFormContext } from "react-hook-form";
import { useFieldError } from "@/app/shared/hooks";
import { Textarea as TextareaUi } from "@/app/uikit/components/textarea";

type TProps = {
  defaultValue?: string | number;
  label?: string;
  maxLength?: number;
  name: string;
  onFocus?: ((event: FocusEvent<HTMLElement>) => void) | undefined;
  type?: string;
};

const TextareaComponent: FC<TProps> = ({
  defaultValue,
  label,
  maxLength,
  name,
  onFocus,
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

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      let resultValue = event.target.value;
      field.onChange(resultValue);
    },
    [field],
  );

  return (
    <TextareaUi
      errors={fieldErrors}
      label={label}
      maxLength={maxLength}
      name={field.name}
      onFocus={onFocus}
      onChange={handleChange}
      ref={field.ref}
      type={type}
      value={field.value}
    />
  );
};

TextareaComponent.displayName = "Textarea";

export const Textarea = memo(TextareaComponent);
