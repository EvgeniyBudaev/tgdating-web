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
import "./DevicePage.scss";

type TProps = {
  lng: ELanguage;
};

const DevicePageComponent: FC<TProps> = (props) => {
  const { theme } = useTelegram();
  const { t } = useTranslation("index");

  return (
    <section
      className={clsx("DevicePage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <div className="DevicePage-Inner">
        <Container>
          <div className="DevicePage-Text">
            <Typography variant={ETypographyVariant.TextB2Regular}>
              {t("common.titles.invalidDevice")}
            </Typography>
          </div>
        </Container>
      </div>
    </section>
  );
};

DevicePageComponent.displayName = "DevicePage";

export const DevicePage = memo(DevicePageComponent);
