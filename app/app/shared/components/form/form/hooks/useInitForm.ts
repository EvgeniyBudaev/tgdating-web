import { useMemo } from "react";
import { useForm } from "react-hook-form";
import type {
  FieldValues,
  Resolver,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import type { TState } from "@/app/shared/components/form/form/types";

type TOptions = {
  state: TState;
};

type TUseInitForm<T extends FieldValues> = {
  resolver?: Resolver<T>;
} & UseFormProps<T>;

export type TUseInitFormReturn<T extends FieldValues> = {
  methods: UseFormReturn<T, any>;
  state?: TState;
};

export const useInitForm = <T extends FieldValues>(
  props?: TUseInitForm<T>,
  options?: TOptions,
): TUseInitFormReturn<T> => {
  const state = options?.state;
  const {
    resolver,
    mode = "all",
    reValidateMode,
    defaultValues,
    context,
    delayError,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    criteriaMode,
  } = props ?? {};
  const methods = useForm<T>({
    resolver,
    mode,
    reValidateMode,
    defaultValues,
    context,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    criteriaMode,
    delayError,
  });

  return useMemo(
    () => ({
      methods,
      state,
    }),
    [methods, state],
  );
};
