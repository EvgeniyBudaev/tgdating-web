"use client";

import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { i18n } from "i18next";
import { Icon } from "@/app/uikit/components/icon";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./ErrorUI.scss";

type TProps = {
  error?: Error;
  message?: string;
};

export const ErrorUI: FC<TProps> = ({ error, message }) => {
  const { t } = useTranslation("index");

  const errorMessage =
    (message && t(message)) ||
    error?.message ||
    t("errorBoundary.common.unexpectedError");

  return (
    <section className="ErrorUI">
      <div className="ErrorUI-Inner">
        <div className="ErrorUI-Content">
          <div className="ErrorUI-IconBox">
            <Icon className="ErrorUI-Icon" type="Attention" />
          </div>
          <div className="ErrorUI-Message">
            <Typography variant={ETypographyVariant.TextH3Medium}>
              {errorMessage}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};
