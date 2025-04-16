"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "@/app/shared/components/container";
import { ELanguage } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./InvalidBrowserPage.scss";

type TProps = {
  lng: ELanguage;
};

const InvalidBrowserPageComponent: FC<TProps> = () => {
  const { theme } = useTelegram();
  const { t } = useTranslation("index");

  return (
    <section
      className={clsx("InvalidBrowserPage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <div className="InvalidBrowserPage-Inner">
        <Container>
          <div className="InvalidBrowserPage-Text">
            <Typography variant={ETypographyVariant.TextB2Regular}>
              {t("common.titles.invalidBrowser")}
            </Typography>
          </div>
        </Container>
      </div>
    </section>
  );
};

InvalidBrowserPageComponent.displayName = "InvalidBrowserPage";

export const InvalidBrowserPage = memo(InvalidBrowserPageComponent);
