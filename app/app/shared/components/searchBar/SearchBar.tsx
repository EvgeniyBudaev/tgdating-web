"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SearchBar.scss";

type TProps = {
  theme?: ETheme;
  title?: string;
};

const SearchBarComponent: FC<TProps> = ({ theme, title }) => {
  return (
    <div
      className={clsx("SearchBar", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <Icon className="SearchBar-Icon" type="Search" />
      <Typography>{title}</Typography>
    </div>
  );
};

SearchBarComponent.displayName = "SearchBar";

export const SearchBar = memo(SearchBarComponent);
