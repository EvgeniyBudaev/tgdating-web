import clsx from "clsx";
import { type FC, memo, type ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SidebarContentListItem.scss";

type TProps = {
  children: ReactNode;
  className?: string;
  isChecked?: boolean;
  onClick?: () => void;
  theme?: ETheme;
};

const SidebarContentListItemComponent: FC<TProps> = ({
  children,
  className,
  isChecked,
  onClick,
  theme,
}) => {
  return (
    <div
      className={clsx(className, "SidebarContentListItem", {
        ["theme-dark"]: theme === ETheme.Dark,
        ["SidebarContentListItem__isChecked"]: isChecked,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

SidebarContentListItemComponent.displayName = "SidebarContentListItem";

export const SidebarContentListItem = memo(SidebarContentListItemComponent);
