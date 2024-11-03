import { useEffect } from "react";
import type { Path, FieldValues } from "react-hook-form";
import { TUseInitFormReturn } from "@/app/shared/components/form/form/hooks/useInitForm";

export const useSetFieldErrors = <T extends FieldValues>(
  form: TUseInitFormReturn<T>,
): void => {
  const { state, methods } = form;

  const fieldErrors = state.errors;

  useEffect(() => {
    if (fieldErrors) {
      for (const error in fieldErrors) {
        methods.setError(error as Path<T>, {
          message: fieldErrors[error].map((message) => message).join(", "),
        });
      }
    }
  }, [fieldErrors, methods]);
};
