import clsx from "clsx";
import { type FC, memo, type ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SidebarContentList.scss";

type TProps = {
  children: ReactNode;
  className?: string;
  theme?: ETheme;
};

const SidebarContentListComponent: FC<TProps> = ({
  children,
  className,
  theme,
}) => {
  return (
    <div
      className={clsx("SidebarContentList", className, {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      {children}
    </div>
  );
};

SidebarContentListComponent.displayName = "SidebarContentList";

export const SidebarContentList = memo(SidebarContentListComponent);
