import type { TSelectNativeVariantStyle } from "@/app/uikit/components/selectNative/types";
import type { ETheme } from "@/app/uikit/enums/theme";

const COLOR_PRIMARY = "#6ab3f3";
const COLOR_PRIMARY_HOVER = "#548CBD";
const COLOR_WHITE = "#232e3c";
const COLOR_DARKNESS = "#17212b";
const COLOR_GRAY = "#3e3b50";
const CURRENT_COLOR = "currentColor";
const BORDER_RADIUS = "4px";
const CURSOR = "pointer";
const MENU_PADDING = "8px 0";
const MENU_LIST_PADDING = "8px 0";
const TRANSITION = "all 0.15s";
const TRANSPARENT = "transparent";
const Z_INDEX = 10;

export const VARIANTS: { [key in ETheme]: TSelectNativeVariantStyle } = {
  // Dark theme
  DARK: {
    control: {
      background:
        "linear-gradient(40deg, rgba(138, 143, 160, 0.16), rgba(31, 32, 41, 0.24) 40%),\n" +
        "      linear-gradient(210deg, rgba(138, 143, 160, 0.5), rgba(31, 32, 41, 0.24) 40%)",
      border: `1px solid ${TRANSPARENT}`,
      borderRadius: BORDER_RADIUS,
      cursor: CURSOR,
      transition: TRANSITION,
      ":active": {
        border: `1px solid ${COLOR_PRIMARY}`,
      },
      ":hover": {
        border: `1px solid ${COLOR_PRIMARY}`,
      },
    },
    singleValue: {
      color: CURRENT_COLOR,
    },
    option: {
      backgroundColor: COLOR_DARKNESS,
      borderRadius: "0",
      color: CURRENT_COLOR,
      cursor: CURSOR,
      transition: TRANSITION,
      ":active": {
        backgroundColor: COLOR_PRIMARY,
        color: COLOR_WHITE,
      },
      ":hover": {
        backgroundColor: COLOR_PRIMARY_HOVER,
        color: COLOR_WHITE,
      },
    },
    menu: {
      backgroundColor: COLOR_DARKNESS,
      padding: MENU_PADDING,
      zIndex: Z_INDEX,
    },
    menuList: {
      padding: MENU_LIST_PADDING,
      zIndex: Z_INDEX,
    },
    menuPortal: {
      zIndex: Z_INDEX,
    },
  },

  // Light theme
  LIGHT: {
    control: {
      background: TRANSPARENT,
      border: `1px solid ${COLOR_GRAY}`,
      borderRadius: BORDER_RADIUS,
      cursor: CURSOR,
      transition: TRANSITION,
      ":active": {
        border: `1px solid ${COLOR_PRIMARY}`,
      },
      ":hover": {
        border: `1px solid ${COLOR_PRIMARY}`,
      },
    },
    singleValue: {
      color: CURRENT_COLOR,
    },
    option: {
      backgroundColor: COLOR_WHITE,
      borderRadius: "0",
      color: CURRENT_COLOR,
      cursor: CURSOR,
      transition: TRANSITION,
      ":active": {
        backgroundColor: COLOR_PRIMARY,
        color: COLOR_WHITE,
      },
      ":hover": {
        backgroundColor: COLOR_PRIMARY_HOVER,
        color: COLOR_WHITE,
      },
    },
    menu: {
      backgroundColor: COLOR_WHITE,
      zIndex: Z_INDEX,
      padding: MENU_PADDING,
    },
    menuList: {
      padding: MENU_LIST_PADDING,
      zIndex: Z_INDEX,
    },
    menuPortal: {
      zIndex: Z_INDEX,
    },
  },
};
