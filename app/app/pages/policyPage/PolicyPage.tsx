"use client";

import { useRouter } from "next/navigation";
import { type FC, memo } from "react";
import {useTranslation} from "@/app/i18n/client";
import { Container } from "@/app/shared/components/container";
import { ELanguage } from "@/app/shared/enums";
import { Button } from "@/app/uikit/components/button";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./PolicyPage.scss";

type TProps = {
  lng: ELanguage;
};

const PolicyPageComponent: FC<TProps> = ({ lng }) => {
  const router = useRouter();
  const { t } = useTranslation("policy");

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="PolicyPage">
      <Container>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB1Bold}>
            {t("page.text.1").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.2").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.3")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.4")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.5")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.6")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.7")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.8")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.9")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.10").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.11")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.12")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.&nbsp;{t("page.text.13")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            2.&nbsp;{t("page.text.14")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.1&nbsp;{t("page.text.15")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.2&nbsp;{t("page.text.16")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            3.&nbsp;{t("page.text.17")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            4.&nbsp;{t("page.text.18")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.19")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.20")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.21").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.22")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            1.&nbsp;{t("page.text.23")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.24")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            2.&nbsp;{t("page.text.25")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.26")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            3.&nbsp;{t("page.text.27")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.28")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            4.&nbsp;{t("page.text.29")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.30")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            5.&nbsp;{t("page.text.31")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.32")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.33")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>1.&nbsp;{t("page.text.34")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.&nbsp;{t("page.text.35")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.&nbsp;{t("page.text.36")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.37")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.38")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.39")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.40").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.41")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.&nbsp;{t("page.text.42")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.&nbsp;{t("page.text.43")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>3.&nbsp;{t("page.text.44")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.1&nbsp;{t("page.text.45")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.2&nbsp;{t("page.text.46")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.3&nbsp;{t("page.text.47")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.&nbsp;{t("page.text.48")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            5.&nbsp;{t("page.text.49")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            6.&nbsp;{t("page.text.50")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            7.&nbsp;{t("page.text.51")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            8.&nbsp;{t("page.text.52")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            9.&nbsp;{t("page.text.53")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.54").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.55")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>1.&nbsp;{t("page.text.56")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.1&nbsp;{t("page.text.57")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.&nbsp;{t("page.text.58")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.1&nbsp;{t("page.text.59")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.2&nbsp;{t("page.text.60")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>3.&nbsp;{t("page.text.61")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.1&nbsp;{t("page.text.62")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>4.&nbsp;{t("page.text.63")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.1&nbsp;{t("page.text.64")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2&nbsp;{t("page.text.65")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.66").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.67")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.68")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>1.&nbsp;{t("page.text.69")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.1&nbsp;{t("page.text.70")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>2.&nbsp;{t("page.text.71")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.1&nbsp;{t("page.text.72")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.&nbsp;{t("page.text.73")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.1&nbsp;{t("page.text.74")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>4.&nbsp;{t("page.text.75")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.1&nbsp;{t("page.text.76")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2&nbsp;{t("page.text.77")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2.1&nbsp;{t("page.text.78")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2.2&nbsp;{t("page.text.79")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.80").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>{t("page.text.81")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.&nbsp;{t("page.text.82")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.&nbsp;{t("page.text.83")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.&nbsp;{t("page.text.84")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.&nbsp;{t("page.text.85")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            5.&nbsp;{t("page.text.86")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.87").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.88")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1.&nbsp;{t("page.text.89")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2.&nbsp;{t("page.text.90")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3.&nbsp;{t("page.text.91")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.&nbsp;{t("page.text.92")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.93")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.94").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.95")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.96")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.97").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.98")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>{t("page.text.99")}</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.100")}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.101").toUpperCase()}
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            {t("page.text.102")}
          </Typography>
        </div>
        <div className="PolicyPage-Control">
          <Button className="PolicyPage-Button" onClick={handleBack}>
            <Typography>{t("common.actions.ok")}</Typography>
          </Button>
        </div>
      </Container>
    </section>
  );
};

PolicyPageComponent.displayName = "PolicyPage";

export const PolicyPage = memo(PolicyPageComponent);
