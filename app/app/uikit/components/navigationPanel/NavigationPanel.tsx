"use client";

import { memo, type FC } from "react";
import { ETheme } from "@/app/uikit/enums";
import { Pagination } from "@/app/uikit/components/pagination";
import "./NavigationPanel.scss";

type TProps = {
  currentPage?: number;
  onChangePage?: ({ selected }: { selected: number }) => void;
  pagesCount?: number;
  theme?: ETheme;
};

const NavigationPanelComponent: FC<TProps> = ({
  currentPage,
  onChangePage,
  pagesCount,
  theme,
}) => {
  return (
    <div className="NavigationPanel">
      <div />
      {currentPage && pagesCount && onChangePage && (
        <Pagination
          forcePage={currentPage - 1}
          pagesCount={pagesCount}
          onChangePage={onChangePage}
          theme={theme}
        />
      )}
      <div />
    </div>
  );
};

NavigationPanelComponent.displayName = "NavigationPanel";

export const NavigationPanel = memo(NavigationPanelComponent);
