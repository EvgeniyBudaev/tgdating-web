"use client";

import { isArray } from "lodash";
import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "@/app/i18n/client";
import type { TErrorProps } from "@/app/uikit/components/error/types";
import { FadeIn } from "@/app/uikit/components/fadeIn";
import { Typography } from "@/app/uikit/components/typography";
import "./Error.scss";

const ErrorComponent: FC<TErrorProps> = ({ errors }) => {
  const { t } = useTranslation("index");

  return (
    <ul className="Error-List">
      {!isArray(errors) && (
        <li className="Error-ListItem">
          <Typography>{errors}</Typography>
        </li>
      )}
      {isArray(errors) &&
        (errors ?? []).map((error, index) => (
          <li className="Error-ListItem" key={`error-item-${index}`}>
            <FadeIn>
              <Typography>{t(error)}</Typography>
            </FadeIn>
          </li>
        ))}
    </ul>
  );
};

ErrorComponent.displayName = "Error";

export const Error = memo(ErrorComponent);
