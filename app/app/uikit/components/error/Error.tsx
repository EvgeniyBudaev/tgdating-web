"use client";

import { isArray } from "lodash";
import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "@/app/i18n/client";
import { FadeIn } from "@/app/uikit/components/fadeIn";
import { Typography } from "@/app/uikit/components/typography";
import "./Error.scss";

type TProps = {
  errors?: string | string[];
};

const ErrorComponent: FC<TProps> = ({ errors }) => {
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
              {/*<Typography value={t(errorUI)} variant={ETypographyVariant.TextB3Regular} />*/}
              <Typography>{t(error)}</Typography>
            </FadeIn>
          </li>
        ))}
    </ul>
  );
};

export const Error = memo(ErrorComponent);
