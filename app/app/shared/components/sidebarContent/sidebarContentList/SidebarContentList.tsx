import clsx from "clsx";
import { type FC, memo, type ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SidebarContentList.scss";

type TProps = {
  children: ReactNode;
  theme?: ETheme;
};

const SidebarContentListComponent: FC<TProps> = ({ children, theme }) => {
  return (
    <div
      className={clsx("SidebarContentList", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      {children}
    </div>
  );
};

SidebarContentListComponent.displayName = "SidebarContentList";

export const SidebarContentList = memo(SidebarContentListComponent);
