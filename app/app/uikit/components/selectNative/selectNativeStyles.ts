import type { GroupBase, StylesConfig } from "react-select";
import { VARIANTS } from "@/app/uikit/components/selectNative/selectNativeVariants";
import type {
  TSelectNativeMultiType,
  TSelectNativeOption,
} from "@/app/uikit/components/selectNative/types";
import { ETheme } from "@/app/uikit/enums/theme";

export const selectNativeStyles = (
  variant = ETheme.Light,
):
  | StylesConfig<
      TSelectNativeOption,
      TSelectNativeMultiType,
      GroupBase<TSelectNativeOption>
    >
  | undefined => {
  const style = VARIANTS[variant];

  return {
    control: (provided) => ({
      ...provided,
      background: style.control.background,
      border: style.control.border,
      borderRadius: style.control.borderRadius,
      cursor: style.control.cursor,
      transition: style.control.transition,
      ":active": style.control[":active"],
      ":hover": style.control[":hover"],
    }),
    singleValue: (provided) => ({
      ...provided,
      color: style.singleValue.color,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? (style.option &&
            style.option[":active"] &&
            style.option[":active"].backgroundColor) ||
          style.option.backgroundColor
        : (style.option && style.option.backgroundColor) ||
          style.option.backgroundColor,
      borderRadius: style.option.borderRadius,
      color: state.isSelected
        ? (style.option &&
            style.option[":active"] &&
            style.option[":active"].color) ||
          style.option.color
        : (style.option && style.option.color) || style.option.color,
      cursor: style.option.cursor,
      transition: style.option.transition,
      ":hover": style.option[":hover"],
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: style.menu.backgroundColor,
      padding: style.menu.padding,
      zIndex: style.menu.zIndex,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: style.menuList.padding,
      zIndex: style.menuList.zIndex,
    }),
    menuPortal: (provided) => ({
      ...provided,
    }),
  };
};
