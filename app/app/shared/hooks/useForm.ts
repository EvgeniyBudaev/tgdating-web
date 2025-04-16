import isEmpty from "lodash/isEmpty";
import { useEffect, useMemo } from "react";
import type { FieldPathValue, FieldValues } from "react-hook-form";
import type { TUseInitFormReturn } from "@/app/shared/components/form/form/hooks/useInitForm";

type TParams = Record<string, FieldPathValue<FieldValues, string>>;

type TProps = {
  defaultValues?: TParams;
  form: TUseInitFormReturn<Record<string, FieldPathValue<FieldValues, string>>>;
};

type TUseForm = (props: TProps) => void;

export const useForm: TUseForm = (props) => {
  const { defaultValues = {}, form } = props;
  const filter = useMemo(() => Object.entries(defaultValues), [defaultValues]);

  useEffect(() => {
    if (!isEmpty(defaultValues)) {
      (filter ?? []).forEach(([name, value]) => {
        form.methods.setValue(name, value, { shouldDirty: true });
      });
    }
  }, [filter, defaultValues, form.methods]);
};
