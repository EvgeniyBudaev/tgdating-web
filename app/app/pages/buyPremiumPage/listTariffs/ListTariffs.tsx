"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Tariff } from "@/app/pages/buyPremiumPage/tariff";
import { ETariff } from "@/app/shared/enums";
import { ETheme } from "@/app/uikit/enums/theme";
import "./ListTariffs.scss";

type TProps = {
  className?: string;
  onChange?: (tariff: ETariff) => void;
  tariff: ETariff;
  theme: ETheme;
};

const ListTariffsComponent: FC<TProps> = ({
  className,
  onChange,
  tariff,
  theme,
}) => {
  const { t } = useTranslation("index");
  // const priceFree = "0$";
  // const tariffFree = t("common.titles.premiumTariffFree");
  const priceMonth = "1$";
  const tariffMonth = t("common.titles.premiumTariffMonth");
  const priceThreeMonths = "2$";
  const tariffThreeMonths = t("common.titles.premiumTariffThreeMonths");
  const priceYear = "6$";
  const tariffYear = t("common.titles.premiumTariffYear");
  const titlePopular = t("common.titles.mostPopular");

  return (
    <div className={clsx(className, "ListTariffs-Wrapper")}>
      <div className="ListTariffs">
        {/*<Tariff*/}
        {/*  onChange={onChange}*/}
        {/*  price={priceFree}*/}
        {/*  tariff={ETariff.Free}*/}
        {/*  theme={theme}*/}
        {/*  title={tariffFree}*/}
        {/*  value={tariff}*/}
        {/*/>*/}
        <Tariff
          onChange={onChange}
          price={priceMonth}
          tariff={ETariff.Month}
          theme={theme}
          title={tariffMonth}
          value={tariff}
        />
        <Tariff
          onChange={onChange}
          price={priceYear}
          tariff={ETariff.Year}
          theme={theme}
          title={tariffYear}
          titlePopular={titlePopular}
          value={tariff}
        />
        <Tariff
          onChange={onChange}
          price={priceThreeMonths}
          tariff={ETariff.ThreeMonths}
          theme={theme}
          title={tariffThreeMonths}
          value={tariff}
        />
      </div>
    </div>
  );
};

ListTariffsComponent.displayName = "ListTariffs";

export const ListTariffs = memo(ListTariffsComponent);
