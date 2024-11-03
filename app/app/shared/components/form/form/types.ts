import type { CSSProperties, ReactNode } from "react";
import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import type { TUseInitFormReturn } from "@/app/shared/components/form/form/hooks/useInitForm";
import type { TErrorsResolverResponse } from "@/app/shared/utils/getErrorsResolver";

type TChildrenFunction<T extends FieldValues> = (
  data: UseFormReturn<T, any>,
) => ReactNode | ReactNode[];

export type TSubmitData<T> = T & {
  csrf: string;
};

export type TSubmit<T extends FieldValues> = (data: TSubmitData<T>) => void;

export type TFormComponentProps<T extends FieldValues> = {
  form: TUseInitFormReturn<T>;
  authenticity?: boolean;
  method?: any;
  id?: string;
  action?: (formData: FormData) => void;
  noValidate?: boolean;
  dataTestId?: string;
  className?: string;
  children?: ReactNode | ReactNode[] | TChildrenFunction<T>;

  handleSubmit?: TSubmit<T>;
  onChange?: TSubmit<T>;
  style?: CSSProperties;
} & UseFormProps<T>;

export type TState =
  | {
      data: undefined;
      success: boolean;
      error: undefined;
      errors: TErrorsResolverResponse;
    }
  | {
      data: any;
      success: boolean;
      error: undefined;
      errors: undefined;
    };
