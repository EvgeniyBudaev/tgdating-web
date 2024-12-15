import type { FocusEventHandler, ReactNode } from "react";
import type {
  ActionMeta,
  GetOptionLabel,
  GroupBase,
  MenuPlacement,
  MenuPosition,
  MultiValue,
  OnChangeValue,
  OptionsOrGroups,
  SelectComponentsConfig,
  SingleValue,
  StylesConfig,
} from "react-select";
import type { ETheme } from "@/app/uikit/enums/theme";

export type TSelectNativeOption = {
  value: string | number;
  label: string;
  prefixIcon?: ReactNode;
};

export type TSelectNativeMultiType = boolean;

export type TSelectNativeOnChange = (
  newValue: OnChangeValue<TSelectNativeOption, TSelectNativeMultiType>,
  actionMeta: ActionMeta<TSelectNativeOption>,
) =>
  | ((
      newValue: OnChangeValue<TSelectNativeOption, TSelectNativeMultiType>,
      actionMeta: ActionMeta<TSelectNativeOption>,
    ) => void)
  | undefined;

type TBaseSelectNativeProps = {
  className?: string;
  components?: SelectComponentsConfig<
    TSelectNativeOption,
    TSelectNativeMultiType,
    GroupBase<TSelectNativeOption>
  >;
  dataTestId?: string;
  defaultValue?: TSelectNativeOption | TSelectNativeOption[];
  getOptionLabel?: GetOptionLabel<TSelectNativeOption | TSelectNativeOption[]>;
  id?: string;
  instanceId?: string;
  isDisabled?: boolean;
  isMulti?: TSelectNativeMultiType;
  isSearchable?: boolean;
  menuPlacement?: MenuPlacement;
  menuPosition?: MenuPosition;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?: TSelectNativeOnChange;
  onFocus?: FocusEventHandler;
  placeholder?: string;
  styles?:
    | StylesConfig<
        TSelectNativeOption,
        TSelectNativeMultiType,
        GroupBase<TSelectNativeOption>
      >
    | undefined;
  theme?: ETheme;
  value?: SingleValue<TSelectNativeOption> | MultiValue<TSelectNativeOption>;
};

export type TAsyncSelectNativeLoadOptionsCallback = (
  options: OptionsOrGroups<TSelectNativeOption, GroupBase<TSelectNativeOption>>,
) => void;

export type TAsyncSelectLoadOptions =
  | ((
      inputValue: string,
      callback: TAsyncSelectNativeLoadOptionsCallback,
    ) => void | Promise<
      OptionsOrGroups<TSelectNativeOption, GroupBase<TSelectNativeOption>>
    >)
  | undefined;

export type TAsyncSelectNativeProps = {
  loadOptions?: TAsyncSelectLoadOptions;
} & TBaseSelectNativeProps;

export type TSelectNativeProps = {
  errors?: string | string[] | null;
  options?: TSelectNativeOption[];
} & TBaseSelectNativeProps;

export type TSelectNativeVariantStyle = {
  control: {
    background?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    cursor?: string;
    transition?: string;
    ":active"?: {
      border?: string;
      transition?: string;
    };
    ":hover"?: {
      border?: string;
      transition?: string;
    };
  };
  singleValue: {
    color?: string;
  };
  option: {
    backgroundColor?: string;
    borderRadius?: string;
    color?: string;
    cursor?: string;
    zIndex?: string;
    transition?: string;
    ":active"?: {
      backgroundColor?: string;
      color?: string;
      transition?: string;
    };
    ":hover"?: {
      backgroundColor?: string;
      color?: string;
      transition?: string;
    };
  };
  menu: {
    backgroundColor?: string;
    zIndex?: string | number;
  };
  menuList: {
    zIndex?: string | number;
  };
  menuPortal: {
    zIndex?: string | number;
  };
};
