import type { FC, ReactNode } from "react";
import { Typography } from "@/app/uikit/components/typography";
import "./Section.scss";

type TProps = {
  children?: ReactNode;
  title: string | ReactNode;
  subTitle?: string | ReactNode;
};

export const Section: FC<TProps> = ({ children, title, subTitle }) => {
  return (
    <div className="Section">
      <div className="Section-Header">
        <span>
          <span className="Section-Title">
            <Typography>{title}</Typography>
          </span>
          {subTitle && (
            <span className="Section-SubTitle">
              &nbsp;<Typography>({subTitle})</Typography>
            </span>
          )}
        </span>
      </div>
      <div className="Section-Container">{children}</div>
    </div>
  );
};
