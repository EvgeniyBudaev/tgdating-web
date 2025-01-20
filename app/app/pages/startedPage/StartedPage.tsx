"use client";

import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { ImagesGrid } from "@/app/pages/startedPage/imagesGrid";
import { StartedPageInfo } from "@/app/pages/startedPage/startedPageInfo";
import { Container } from "@/app/shared/components/container";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useCheckPermissions } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ButtonLink } from "@/app/uikit/components/button/buttonLink";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./StartedPage.scss";

type TProps = {
  lng: ELanguage;
};

const StartedPageComponent: FC<TProps> = ({ lng }) => {
  const { t } = useTranslation("index");
  useCheckPermissions({ lng });

  return (
    <section className="StartedPage">
      <Container>
        <div className="StartedPage-Header">
          <Typography variant={ETypographyVariant.TextH4Bold}>
            {t("common.titles.appName")}
          </Typography>
        </div>
        <ImagesGrid />
        <StartedPageInfo lng={lng} />
        <div className="StartedPage-Controls">
          <ButtonLink
            className="StartedPage-Button"
            href={createPath({
              route: ERoutes.ProfileAdd,
              lng,
            })}
          >
            <Typography>{t("common.titles.getStarted")}</Typography>
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
};

StartedPageComponent.displayName = "StartedPage";

export const StartedPage = memo(StartedPageComponent);
