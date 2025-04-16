"use client";

import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { addPaymentAction } from "@/app/actions/payment/addPaymentAction";
import { EPaymentFormFields } from "@/app/actions/payment/enums";
import { useTranslation } from "@/app/i18n/client";
import { SubmitButton } from "@/app/shared/components/form/submitButton";
import { INITIAL_FORM_STATE } from "@/app/shared/constants";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes, ETariff } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { TARIFF_MAPPING } from "@/app/shared/mapping/tariff";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Typography } from "@/app/uikit/components/typography";
import "./BuyPremiumForm.scss";

type TProps = {
  lng: ELanguage;
  onCancel?: () => void;
  tariff: ETariff;
  telegramUserId: string;
};

const BuyPremiumFormComponent: FC<TProps> = ({
  lng,
  onCancel,
  tariff,
  telegramUserId,
}) => {
  const csrf = useAuthenticityTokenContext();
  const router = useRouter();
  const { initDataCrypt, isSession } = useTelegram();
  const { t } = useTranslation("index");

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
  }, [lng, state?.data, state?.error, state.success, telegramUserId, router]);

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
    <form action={handleSubmit} className="BuyPremiumForm">
      <div className="BuyPremiumForm-Controls">
        <Button
          className="BuyPremiumForm-Controls-Cancel"
          onClick={onCancel}
          type="button"
        >
          <Typography>{t("common.actions.cancel")}</Typography>
        </Button>
        <SubmitButton
          iconType="Credit"
          title={t("common.actions.buyPremium")}
        />
      </div>
    </form>
  );
};

BuyPremiumFormComponent.displayName = "BuyPremiumForm";

export const BuyPremiumForm = memo(BuyPremiumFormComponent);
