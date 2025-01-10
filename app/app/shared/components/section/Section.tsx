"use client";

import clsx from "clsx";
import { memo } from "react";
import type { FC, ReactNode } from "react";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./Section.scss";

type TProps = {
  children?: ReactNode;
  className?: string;
  title?: string | ReactNode;
  subTitle?: string | ReactNode;
};

const SectionComponent: FC<TProps> = ({
  children,
  className,
  title,
  subTitle,
}) => {
  return (
    <div className={clsx("Section", className)}>
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

SectionComponent.displayName = "Section";

export const Section = memo(SectionComponent);
