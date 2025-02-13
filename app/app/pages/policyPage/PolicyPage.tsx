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
          <Typography>4. Other persons:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.1 Other recipients may be any natural/legal persons to whom you
            ask to transfer your data (for example, a link, etc.) or give your
            consent to the transfer of data.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2 The Service Provider may also disclose your data in such
            circumstances as:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2.1 In order to protect our rights, safety or property, as well as
            the rights of our customers or third parties/the public. This
            includes sharing information with other companies and organizations
            for the purposes of money laundering, fraud prevention and similar
            risks.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4.2.2 If We are required to disclose or transfer your data in
            accordance with any legal or regulatory obligations or requests..
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            USER RIGHTS
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>Users have the right to:</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1. Access and request details about the information we hold.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2. Request corrections to inaccurate or outdated information.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3. Request the deletion or anonymization of data no longer necessary
            for the stated purposes.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4. Object to processing based on legitimate interests.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            5. Withdraw consent for data processing where applicable.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            RETENTION PERIODS AND DATA PROCESSING
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            All collected data, including but not limited to profile
            information, photos, video materials, and user interactions (e.g.,
            likes and matches), is retained for:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            1. The time necessary to provide services and fulfill contractual
            obligations.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            2. Compliance with legal and regulatory requirements.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            3. Statistical or analytical purposes, provided the data is
            anonymized.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            4. Improvement of security algorithms and development of new
            features (anonymized data only).
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            Data may be retained beyond these periods if there are lawful
            grounds, such as ongoing legal obligations or user consent. Upon the
            expiration of retention periods, data will be securely deleted or
            anonymized for continued use in analytics and service improvement.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            RIGHT TO COMPLAIN
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            If you are dissatisfied with the way your personal data has been
            processed or have concerns regarding any privacy-related issue, you
            may contact us at the details provided below. We will investigate
            your complaint and respond within 14 calendar days.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            Before pursuing legal action, you agree to first attempt to resolve
            the complaint directly with the Service Provider using the provided
            contact details.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            CONTACT DETAILS
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            For any privacy-related concerns, please contact:
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>Telegram Support: @wefatehelp</Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            If your concerns are not addressed to your satisfaction, you may
            file a complaint with the relevant supervisory authority in your
            jurisdiction.
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            CHANGES TO THIS POLICY
          </Typography>
        </div>
        <div className="PolicyPage-Block">
          <Typography>
            This Privacy Policy may be updated from time to time to reflect
            changes in legal, regulatory, or operational requirements.
            Significant updates will be communicated to users through the
            Telegram bot interface.
          </Typography>
        </div>
        <div className="PolicyPage-Control">
          <Button className="PolicyPage-Button" onClick={handleBack}>
            <Typography>OK</Typography>
          </Button>
        </div>
      </Container>
    </section>
  );
};

PolicyPageComponent.displayName = "PolicyPage";

export const PolicyPage = memo(PolicyPageComponent);
