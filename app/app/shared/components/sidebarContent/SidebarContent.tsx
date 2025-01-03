"use client";

import clsx from "clsx";
import { type FC, type ReactNode, memo, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Gradient } from "@/app/uikit/components/gradient";
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
      <div className="SidebarContent-Header">
        <Gradient />
        <div className="SidebarContent-Header-Control" onClick={handleBack}>
          <Icon className="SidebarContent-Header-Cancel" type="ArrowBack" />
          <span className="SidebarContent-Header-Cancel-Title">
            <Typography>{t("common.actions.saveChanges")}</Typography>
          </span>
        </div>

        <div></div>
      </div>
      {options && (
        <div className="SidebarContent-List">
          {(options ?? []).map((item) => {
            const isChecked =
              item.value.toString() === (checkedItem?.value ?? "").toString();
            return (
              <div
                className={clsx("SidebarContent-List-Item", classes?.item, {
                  ["SidebarContent-List-Item__isChecked"]: isChecked,
                })}
                key={item.value}
                onClick={() => setCheckedItem(item)}
              >
                <Typography>{item.label}</Typography>
                {isChecked && <Icon type="Checkbox" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

SidebarContentComponent.displayName = "SidebarContent";

export const SidebarContent = memo(SidebarContentComponent);
