"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import { type FC, memo, useActionState, useEffect, useState } from "react";
import { addPaymentAction } from "@/app/actions/payment/addPaymentAction";
import { EPaymentFormFields } from "@/app/actions/payment/enums";
import { useTranslation } from "@/app/i18n/client";
import { ListImages } from "@/app/pages/buyPremiumPage/listImages";
import { Tariff } from "@/app/pages/buyPremiumPage/tariff";
import { Container } from "@/app/shared/components/container";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { SubmitButton } from "@/app/shared/components/form/submitButton";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes, ETariff } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./BuyPremiumPage.scss";
import { TARIFF_MAPPING } from "@/app/shared/mapping/tariff";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
};

const BuyPremiumPageComponent: FC<TProps> = ({ lng, telegramUserId }) => {
  const csrf = useAuthenticityTokenContext();
  const router = useRouter();
  const { initDataCrypt, isSession, theme } = useTelegram();
  const { t } = useTranslation("index");
  const priceMonth = "3$";
  const tariffMonth = t("common.titles.premiumTariffMonth");
  const priceThreeMonths = "2$";
  const tariffThreeMonths = t("common.titles.premiumTariffThreeMonths");
  const priceYear = "1$";
  const tariffYear = t("common.titles.premiumTariffYear");
  const titleSubmitButton = t("common.actions.buyPremium");

  const [tariff, setTariff] = useState<ETariff | undefined>();

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
      router.push(path);
      router.refresh();
    }
  }, [lng, state?.data, state?.error, state.success, telegramUserId]);

  const handleChangeTariff = (tariff: ETariff) => {
    setTariff(tariff);
  };

  const handleSubmit = () => {
    if (isSession && tariff) {
      const formDataDto = new FormData();
      const selectedTariff = TARIFF_MAPPING.get(tariff);
      formDataDto.append(EPaymentFormFields.TelegramUserId, telegramUserId);
      formDataDto.append(EPaymentFormFields.Price, selectedTariff?.price ?? "");
      formDataDto.append(
        EPaymentFormFields.Currency,
        selectedTariff?.currency ?? "",
      );
      formDataDto.append(EPaymentFormFields.Tariff, selectedTariff?.name ?? "");
      formDataDto.append(
        EPaymentFormFields.TelegramInitDataCrypt,
        initDataCrypt ?? "",
      );
      formDataDto.append(EPaymentFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <section
      className={clsx("BuyPremiumPage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
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
            <Tariff
              onChange={handleChangeTariff}
              price={priceMonth}
              tariff={ETariff.Month}
              theme={theme}
              title={tariffMonth}
            />
            <Tariff
              onChange={handleChangeTariff}
              price={priceYear}
              tariff={ETariff.Year}
              theme={theme}
              title={tariffYear}
            />
            <Tariff
              onChange={handleChangeTariff}
              price={priceThreeMonths}
              tariff={ETariff.ThreeMonths}
              theme={theme}
              title={tariffThreeMonths}
            />
          </div>
        </div>
        <form action={handleSubmit} className="BuyPremiumPage-Form">
          <div className="BuyPremiumPage-Controls">
            <SubmitButton iconType="Credit" title={titleSubmitButton} />
          </div>
        </form>
      </Container>
    </section>
  );
};

BuyPremiumPageComponent.displayName = "BuyPremiumPage";

export const BuyPremiumPage = memo(BuyPremiumPageComponent);
