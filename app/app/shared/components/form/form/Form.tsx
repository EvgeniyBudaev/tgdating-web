import debounce from "lodash/debounce";
import isFunction from "lodash/isFunction";
import { memo, useCallback, useId, useMemo } from "react";
import { type FieldValues, FormProvider } from "react-hook-form";
import { useSetFieldErrors } from "@/app/shared/components/form/form/hooks";
import {
  TFormComponentProps,
  TSubmitData,
} from "@/app/shared/components/form/form/types";
import { scrollToFirstErrorField } from "@/app/shared/components/form/form/utils";
import { omitEmptyFields } from "@/app/shared/utils";

const FormComponent = <T extends FieldValues>({
  action,
  children,
  className,
  dataTestId = "form",
  form,
  handleSubmit,
  id,
  method = "GET",
  noValidate,
  onChange,
  style,
}: TFormComponentProps<T>) => {
  console.log("Form form: ", form);
  const csrf = "csrf_key";
  const uuid = useId();

  useSetFieldErrors(form);

  const resultFormId = useMemo(() => {
    return id ?? uuid;
  }, [id, uuid]);

  const handleChange = useCallback(() => {
    debounce(() => {
      const preparedData: TSubmitData<T> = {
        csrf,
        ...(omitEmptyFields(form.methods.getValues()) as T),
      };
      onChange?.(preparedData);
    }, 400)();
  }, [form.methods, onChange, csrf]);

  const onSubmit = useCallback(() => {
    let preparedData: TSubmitData<T> = {
      csrf,
      ...(omitEmptyFields(form.methods.getValues()) as T),
    };
    handleSubmit?.(preparedData);
  }, [form.methods, handleSubmit, csrf]);

  return (
    <FormProvider {...form.methods}>
      <form
        action={action}
        className={className}
        data-testid={dataTestId}
        id={resultFormId}
        method={method}
        noValidate={noValidate}
        onChange={onChange && form.methods.handleSubmit(handleChange)}
        onSubmit={
          handleSubmit &&
          form.methods.handleSubmit(onSubmit, scrollToFirstErrorField)
        }
        style={style}
      >
        {isFunction(children) ? children(form.methods) : children}
      </form>
    </FormProvider>
  );
};

FormComponent.displayName = "Form";

export const Form = memo(FormComponent);
