"use client";

import clsx from "clsx";
import { FC, useRef } from "react";
import { Error } from "@/app/uikit/components/error";
import { Icon } from "@/app/uikit/components/icon";
import type { TSelectProps } from "@/app/uikit/components/select/types";
import { Sidebar } from "@/app/uikit/components/sidebar";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Select.scss";

export const Select: FC<TSelectProps> = ({
  children,
  classes,
  errors,
  headerTitle,
  isSidebarOpen = false,
  label,
  name,
  onHeaderClick,
  onSidebarClose,
  subLabel,
  theme,
}) => {
  const sidebarRef = useRef(null);

  return (
    <div
      className={clsx("Select", {
        ["theme-dark"]: theme === ETheme.Dark,
        ["Select__errors"]: errors,
      })}
      data-name={name}
    >
      <div className="Select-Label">
        <Typography>{label}</Typography>
        {subLabel && (
          <Typography variant={ETypographyVariant.TextB4Regular}>
            &nbsp;({subLabel})
          </Typography>
        )}
      </div>
      <div className="Select-Header" onClick={onHeaderClick}>
        <div className="Select-HeaderRight">
          <div className="Select-Header-Value">
            <Typography>{headerTitle ?? "--"}</Typography>
          </div>
          <Icon type="ArrowRight" height={12} width={12} />
        </div>
      </div>
      {errors && (
        <div className="InputField-ErrorField">
          <Error errors={errors} />
        </div>
      )}
      <Sidebar
        isActive={isSidebarOpen}
        className={classes?.sidebar}
        onClose={onSidebarClose}
        ref={sidebarRef}
        theme={theme}
      >
        {children}
      </Sidebar>
    </div>
  );
};
