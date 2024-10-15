import { type FC } from "react";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./SearchBar.scss";

type TProps = {
  title?: string;
};

export const SearchBar: FC<TProps> = ({ title }) => {
  return (
    <div className="SearchBar">
      <Icon className="SearchBar-Icon" type="Search" />
      <Typography>{title}</Typography>
    </div>
  );
};
