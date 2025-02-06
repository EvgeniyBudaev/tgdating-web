"use client";

import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useMainPage } from "@/app/pages/mainPage/hooks";
import type { TMainPageProps } from "@/app/pages/mainPage/types";
import { Container } from "@/app/shared/components/container";
import { Loader } from "@/app/shared/components/loader";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./MainPage.scss";

const MainPageComponent: FC<TMainPageProps> = (props) => {
  const { isLocationError } = useMainPage(props);
  const { t } = useTranslation("index");

  if (isLocationError) {
    return (
      <section className="MainPage">
        <div className="MainPage-Inner">
          <Container>
            <div className="MainPage-Text">
              <Typography variant={ETypographyVariant.TextB2Regular}>
                {t("common.titles.invalidLocation")}
              </Typography>
            </div>
          </Container>
        </div>
      </section>
    );
  }

  return <Loader />;
};

MainPageComponent.displayName = "MainPage";

export const MainPage = memo(MainPageComponent);
