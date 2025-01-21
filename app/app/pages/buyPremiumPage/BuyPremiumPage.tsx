"use client";

import clsx from "clsx";
import { redirect } from "next/navigation";
import { type FC, memo } from "react";
import { BuyPremiumFooter } from "@/app/pages/buyPremiumPage/buyPremiumFooter";
import { BuyPremiumForm } from "@/app/pages/buyPremiumPage/buyPremiumForm";
import { BuyPremiumTitle } from "@/app/pages/buyPremiumPage/buyPremiumTitle";
import { ListImages } from "@/app/pages/buyPremiumPage/listImages";
import { ListTariffs } from "@/app/pages/buyPremiumPage/listTariffs";
import { Container } from "@/app/shared/components/container";
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTariff, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ETheme } from "@/app/uikit/enums/theme";
import "./BuyPremiumPage.scss";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
};

const BuyPremiumPageComponent: FC<TProps> = ({ lng, telegramUserId }) => {
  const { onChangeTariff, tariff } = useTariff();
  const { theme } = useTelegram();

  const handleCancel = () => {
    const path = createPath({
      route: ERoutes.ProfileDetail,
      params: {
        telegramUserId: telegramUserId,
        viewedTelegramUserId: telegramUserId,
      },
      lng: lng,
    });
    redirect(path);
  };

  return (
    <section
      className={clsx("BuyPremiumPage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <SidebarContentHeader theme={theme} title="Premium" />
      <Container>
        <ListImages />
        <BuyPremiumTitle />
        <ListTariffs onChange={onChangeTariff} tariff={tariff} theme={theme} />
        <BuyPremiumForm
          lng={lng}
          onCancel={handleCancel}
          tariff={tariff}
          telegramUserId={telegramUserId}
        />
        <BuyPremiumFooter lng={lng} />
      </Container>
    </section>
  );
};

BuyPremiumPageComponent.displayName = "BuyPremiumPage";

export const BuyPremiumPage = memo(BuyPremiumPageComponent);
