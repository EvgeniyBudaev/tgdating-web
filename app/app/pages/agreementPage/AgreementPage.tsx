"use client";

import { useRouter } from "next/navigation";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "@/app/shared/components/container";
import { ELanguage } from "@/app/shared/enums";
import { Button } from "@/app/uikit/components/button";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./AgreementPage.scss";

type TProps = {
  lng: ELanguage;
};

const AgreementPageComponent: FC<TProps> = ({ lng }) => {
  const router = useRouter();
  const { t } = useTranslation("agreement");

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="AgreementPage">
      <Container>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB1Bold}>
            {t("page.text.1").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            <Typography variant={ETypographyVariant.TextB1Bold}>
              {t("page.text.2").toUpperCase()}
            </Typography>
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.3")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.4")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.5")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.6")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.7")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.8")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.9")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.10").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.11")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.12")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.13").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.14")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>1.&nbsp;{t("page.text.15")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>2.&nbsp;{t("page.text.16")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>3.&nbsp;{t("page.text.17")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>4.&nbsp;{t("page.text.18")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>5.&nbsp;{t("page.text.19")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>6.&nbsp;{t("page.text.20")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.21")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.22")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.23")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.24")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.25")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.26").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.27")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.28")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.29")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.30")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.31")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.32")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.33")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.34")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.35")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.36")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.37")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.38")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.39")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.40").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.41")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.42")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.43")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.44")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.45")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.46")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.47").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.48")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.49")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.50")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.51")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>1.&nbsp;{t("page.text.52")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>2.&nbsp;{t("page.text.53")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>3.&nbsp;{t("page.text.54")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.55")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.56").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.57")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.58")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.59")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.60")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.61")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>{t("page.text.62")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            <Typography>{t("page.text.63")}</Typography>
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.64").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            {t("page.text.66")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            {t("page.text.67")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {t("page.text.68").toUpperCase()}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            {t("page.text.69")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>1.&nbsp;{t("page.text.70")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            1.1&nbsp;{t("page.text.71")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            1.2&nbsp;{t("page.text.72")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            1.3&nbsp;{t("page.text.73")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>2.&nbsp;{t("page.text.74")}</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            2.1&nbsp;{t("page.text.75")}
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            2.2 Requests that fail to meet these requirements may be delayed or
            rejected.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>3. Limitations on Data Disclosure:</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            3.1 The Service will disclose only the minimum amount of data
            necessary to fulfill the legal request.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            3.2 Where permissible by law and in the absence of a confidentiality
            order, the Service may notify the user whose data is being
            requested.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>4. Emergency Situations:</Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            4.1 In urgent cases involving imminent harm or threats to public
            safety, the Service may expedite processing of requests. Such
            requests must still be formally submitted and justified.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            FINAL PROVISIONS
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The meanings of terms used in this Agreement are determined in
            accordance with the laws of the relevant jurisdiction, unless
            explicitly stated otherwise. If any provision of this Agreement is
            found to be invalid or unenforceable, this will not affect the
            validity or enforceability of the remaining provisions.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            Users under the age of 18 are required to inform their legal
            representatives about their registration and use of the Service. The
            Service does not assume responsibility for ensuring that such
            notification is provided.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The responsibility for the actions of minors using the Service lies
            entirely with their legal representatives. By registering or
            allowing a minor to use the Service, legal representatives confirm
            their consent to this Agreement and take full responsibility for
            ensuring compliance with its terms.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            The Service reserves the right to assign or transfer its rights and
            obligations under this Agreement to a third party without prior
            notice, provided that such assignment does not adversely affect the
            rights of the User.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            By accepting this Agreement, you agree that all communications,
            notices, and agreements will be delivered electronically where
            legally permissible.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            This Agreement constitutes the entire understanding between the
            parties concerning the use of the Service and supersedes all prior
            agreements or understandings, whether written or oral, relating to
            its subject matter.
          </Typography>
        </div>
        <div className="AgreementPage-Block">
          <Typography>
            If you have any questions or concerns about this Agreement, please
            contact us at @wafatehelp.
          </Typography>
        </div>
        <div className="AgreementPage-Control">
          <Button className="AgreementPage-Button" onClick={handleBack}>
            <Typography>OK</Typography>
          </Button>
        </div>
      </Container>
    </section>
  );
};

AgreementPageComponent.displayName = "AgreementPage";

export const AgreementPage = memo(AgreementPageComponent);
