"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { addPaymentAction } from "@/app/actions/payment/addPaymentAction";
import { EPaymentFormFields } from "@/app/actions/payment/enums";
import { useTranslation } from "@/app/i18n/client";
import { ListImages } from "@/app/pages/buyPremiumPage/listImages";
import { Tariff } from "@/app/pages/buyPremiumPage/tariff";
import { Container } from "@/app/shared/components/container";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./BuyPremiumPage.scss";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
};

const BuyPremiumPageComponent: FC<TProps> = ({ lng, telegramUserId }) => {
  const csrf = useAuthenticityTokenContext();
  const { initDataCrypt } = useTelegram();
  const { t } = useTranslation("index");
  const priceMonth = "3$";
  const tariffMonth = t("common.titles.premiumTariffMonth");
  const priceThreeMonths = "2$";
  const tariffThreeMonths = t("common.titles.premiumTariffThreeMonths");
  const priceYear = "1$";
  const tariffYear = t("common.titles.premiumTariffYear");

  const [state, formAction] = useActionState(
    addPaymentAction,
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.Telegram,
        params: { telegramUserId },
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, state?.data, state?.error, state.success, telegramUserId]);

  const handleSubmit = () => {
    const formDataDto = new FormData();
    formDataDto.append(EPaymentFormFields.TelegramUserId, telegramUserId);
    formDataDto.append(EPaymentFormFields.Price, "1");
    formDataDto.append(EPaymentFormFields.Currency, "USD");
    formDataDto.append(EPaymentFormFields.Tariff, "month");
    formDataDto.append(
      EPaymentFormFields.TelegramInitDataCrypt,
      initDataCrypt ?? "",
    );
    formDataDto.append(EPaymentFormFields.Csrf, csrf ?? "");
    // @ts-ignore
    formAction(formDataDto);
  };

  return (
    <section className="BuyPremiumPage">
      <Container>
        <div className="BuyPremiumPage-ListImages">
          <ListImages />
        </div>
        <div className="BuyPremiumPage-Title">
          <Typography variant={ETypographyVariant.TextH4Medium}>
            {t("common.titles.premiumNow")}
          </Typography>
        </div>
        <div className="BuyPremiumPage-ListTariffsWrapper">
          <div className="BuyPremiumPage-ListTariffs">
            <Tariff price={priceMonth} title={tariffMonth} />
            <Tariff price={priceThreeMonths} title={tariffThreeMonths} />
            <Tariff price={priceYear} title={tariffYear} />
          </div>
        </div>
        <form action={handleSubmit} className="BuyPremiumPage-Form">
          <div className="BuyPremiumPage-Controls">
            <Button type="submit">{t("common.actions.buyPremium")}</Button>
          </div>
        </form>
      </Container>
    </section>
  );
};

BuyPremiumPageComponent.displayName = "BuyPremiumPage";

export const BuyPremiumPage = memo(BuyPremiumPageComponent);
