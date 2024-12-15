"use client";

import { type FC, memo } from "react";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./SearchBar.scss";

type TProps = {
  title?: string;
};

const SearchBarComponent: FC<TProps> = ({ title }) => {
  return (
    <div className="SearchBar">
      <Icon className="SearchBar-Icon" type="Search" />
      <Typography>{title}</Typography>
    </div>
  );
};

SearchBarComponent.displayName = "SearchBar";

export const SearchBar = memo(SearchBarComponent);
