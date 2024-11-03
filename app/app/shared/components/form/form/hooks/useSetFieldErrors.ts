import isNil from "lodash/isNil";
import { useEffect } from "react";
import type { Path, FieldValues } from "react-hook-form";
import { TUseInitFormReturn } from "@/app/shared/components/form/form/hooks/useInitForm";

export const useSetFieldErrors = <T extends FieldValues>(
  form: TUseInitFormReturn<T>,
): void => {
  const methods = form.methods;
  const state = form?.state;
  const fieldErrors = state?.errors;

  useEffect(() => {
    if (!isNil(fieldErrors)) {
      for (const error in fieldErrors) {
        let messages: string[] = [];
        if (Array.isArray(fieldErrors[error])) {
          messages = fieldErrors[error];
        } else if (typeof fieldErrors[error] === "string") {
          messages = [fieldErrors[error]];
        }
        methods.setError(error as Path<T>, {
          message: messages.join(", "),
        });
      }
    }
  }, [fieldErrors, methods]);
};
