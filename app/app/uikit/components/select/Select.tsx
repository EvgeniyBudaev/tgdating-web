"use client";

import clsx from "clsx";
import { FC, type ReactNode, useRef } from "react";
import { Error } from "@/app/uikit/components/error";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums";
import "./Select.scss";

type TClasses = {
  sidebar?: string;
};

type TProps = {
  children?: ReactNode;
  classes?: TClasses;
  errors?: string | string[] | null;
  headerTitle?: string | number;
  isSidebarOpen?: boolean;
  label?: string | ReactNode;
  name?: string;
  onHeaderClick?: () => void;
  onSidebarClose?: () => void;
  subLabel?: string;
  theme?: ETheme;
};

export const Select: FC<TProps> = ({
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
      className={clsx("Select", { ["theme-dark"]: theme === ETheme.Dark })}
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
          <Icon type="ArrowRight" />
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
