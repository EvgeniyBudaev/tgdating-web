"use client";

import Link from "next/link";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { Typography } from "@/app/uikit/components/typography";
import "./BuyPremiumFooter.scss";

type TProps = {
  lng: ELanguage;
};

const BuyPremiumFooterComponent: FC<TProps> = ({ lng }) => {
  const { t } = useTranslation("index");

  return (
    <div className="BuyPremiumFooter">
      <div className="BuyPremiumFooter-Item">
        <Link
          className="BuyPremiumFooter-Link"
          href={createPath({
            route: ERoutes.Agreement,
            lng,
          })}
        >
          <Typography>{t("common.titles.userAgreement")}&nbsp;</Typography>
        </Link>
      </div>
      <div className="BuyPremiumFooter-Item">
        <Link
          className="BuyPremiumFooter-Link"
          href={createPath({
            route: ERoutes.Policy,
            lng,
          })}
        >
          <Typography>{t("common.titles.privacyPolicyMain")}</Typography>
        </Link>
      </div>
      <div className="BuyPremiumFooter-Item">
        <Link
          className="BuyPremiumFooter-Link"
          href={createPath({
            route: ERoutes.Offer,
            lng,
          })}
        >
          <Typography>{t("common.titles.publicOffer")}</Typography>
        </Link>
      </div>
    </div>
  );
};

BuyPremiumFooterComponent.displayName = "BuyPremiumFooter";

export const BuyPremiumFooter = memo(BuyPremiumFooterComponent);
