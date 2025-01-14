import { type FC, memo, useRef } from "react";
import { ELanguage } from "@/app/shared/enums";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SettingsSidebar.scss";
import clsx from "clsx";

type TProps = {
  isOpen: boolean;
  lng: ELanguage;
  onCloseSidebar?: () => void;
  theme?: ETheme;
};

const SettingsSidebarComponent: FC<TProps> = ({
  isOpen,
  lng,
  onCloseSidebar,
  theme,
}) => {
  const sidebarRef = useRef(null);

  const handleSubmit = () => {};

  return (
    <div className="SettingsSidebar">
      <Sidebar isActive={isOpen} ref={sidebarRef} theme={theme}>
        <div
          className={clsx("SettingsSidebar", {
            ["theme-dark"]: theme === ETheme.Dark,
          })}
        >
          <form action={handleSubmit} className="SettingsSidebar-Form"></form>
        </div>
      </Sidebar>
    </div>
  );
};

SettingsSidebarComponent.displayName = "SettingsSidebar";

export const SettingsSidebar = memo(SettingsSidebarComponent);
