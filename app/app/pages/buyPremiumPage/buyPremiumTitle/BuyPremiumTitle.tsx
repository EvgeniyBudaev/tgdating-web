import { FC } from "react";
import { useTranslation } from "@/app/i18n/client";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./BuyPremiumTitle.scss";

export const BuyPremiumTitle: FC = () => {
  const { t } = useTranslation("index");

  return (
    <div className="BuyPremiumPage">
      <Typography variant={ETypographyVariant.TextH4Medium}>
        {t("common.titles.premiumNow")}
      </Typography>
    </div>
  );
};
