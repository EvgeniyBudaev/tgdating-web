"use client";

import clsx from "clsx";
import { type FC, type ReactNode, memo, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { SidebarContentControls } from "@/app/shared/components/sidebarContent/sidebarContentControls";
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { SidebarContentList } from "@/app/shared/components/sidebarContent/sidebarContentList";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { Icon } from "@/app/uikit/components/icon";
import type { TSelectOption } from "@/app/uikit/components/select";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SidebarContent.scss";

type TClasses = {
  item?: string;
};

type TProps = {
  children?: ReactNode;
  classes?: TClasses;
  options?: TSelectOption[];
  onCloseSidebar?: () => void;
  onSave?: (value?: TSelectOption) => void;
  selectedItem?: TSelectOption;
  theme?: ETheme;
  title: string;
  titleButton: string;
};

const SidebarContentComponent: FC<TProps> = ({
  children,
  classes,
  onSave,
  options,
  onCloseSidebar,
  selectedItem,
  theme,
  title,
  titleButton,
}) => {
  const [checkedItem, setCheckedItem] = useState<TSelectOption | undefined>(
    selectedItem,
  );
  const { t } = useTranslation("index");

  const handleBack = () => {
    onSave?.(checkedItem);
    onCloseSidebar?.();
  };

  return (
    <div
      className={clsx("SidebarContent", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <SidebarContentHeader theme={theme} title={title} />
      {options && (
        <SidebarContentList theme={theme}>
          {(options ?? []).map((item) => {
            const isChecked =
              item.value.toString() === (checkedItem?.value ?? "").toString();
            return (
              <SidebarContentListItem
                className={classes?.item}
                isChecked={isChecked}
                key={item.label}
                onClick={() => setCheckedItem(item)}
                theme={theme}
              >
                <>
                  <Typography>{item.label}</Typography>
                  {isChecked && <Icon type="Checkbox" />}
                </>
              </SidebarContentListItem>
            );
          })}
        </SidebarContentList>
      )}
      <SidebarContentControls
        onClick={handleBack}
        theme={theme}
        title={titleButton}
      />
    </div>
  );
};

SidebarContentComponent.displayName = "SidebarContent";

export const SidebarContent = memo(SidebarContentComponent);
