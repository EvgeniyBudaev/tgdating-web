"use client";

import { FC, type ReactNode, useRef } from "react";
import { Error } from "@/app/uikit/components/error";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { Typography } from "@/app/uikit/components/typography";
import "./Select.scss";

type TClasses = {
  sidebar?: string;
};

type TProps = {
  children?: ReactNode;
  classes?: TClasses;
  errors?: string | string[];
  headerTitle?: string | number;
  isRequired?: boolean;
  isSidebarOpen?: boolean;
  label?: string | ReactNode;
  onHeaderClick?: () => void;
  onSidebarClose?: () => void;
};

export const Select: FC<TProps> = ({
  children,
  classes,
  errors,
  headerTitle,
  isRequired = false,
  isSidebarOpen = false,
  label,
  onHeaderClick,
  onSidebarClose,
}) => {
  const sidebarRef = useRef(null);

  return (
    <div className="Select">
      <div className="Select-Header" onClick={onHeaderClick}>
        <div className="Select-Header-Label">
          <Typography>{label}</Typography>
          {isRequired && (
            <span className="Select-Header-LabelRequired"> *</span>
          )}
        </div>
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
      >
        {children}
      </Sidebar>
    </div>
  );
};
