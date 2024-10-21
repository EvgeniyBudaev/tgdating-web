import type { FC, ReactNode } from "react";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
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
            <>
              &nbsp;
              <Typography variant={ETypographyVariant.TextB4Regular}>
                ({subTitle})
              </Typography>
            </>
          )}
        </span>
      </div>
      <div className="Section-Container">{children}</div>
    </div>
  );
};
