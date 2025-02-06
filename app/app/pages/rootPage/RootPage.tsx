"use client";

import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useRootPageAccess } from "@/app/pages/rootPage/hooks";
import type { TRootPageProps } from "@/app/pages/rootPage/types";
import { Container } from "@/app/shared/components/container";
import { Loader } from "@/app/shared/components/loader";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./RootPage.scss";

const RootPageComponent: FC<TRootPageProps> = (props) => {
  const { isLocationError } = useRootPageAccess(props);
  const { t } = useTranslation("index");

  if (isLocationError) {
    return (
      <section className="RootPage">
        <div className="RootPage-Inner">
          <Container>
            <div className="RootPage-Text">
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

RootPageComponent.displayName = "RootPage";

export const RootPage = memo(RootPageComponent);
