import { type FC, memo, useActionState, useRef } from "react";
import { addPaymentAction } from "@/app/actions/payment/addPaymentAction";
import { EPaymentFormFields } from "@/app/actions/payment/enums";
import { useTranslation } from "@/app/i18n/client";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { useTelegram } from "@/app/shared/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./Premium.scss";

type TProps = {
  telegramUserId: string;
};

const PremiumComponent: FC<TProps> = ({ telegramUserId }) => {
  const csrf = useAuthenticityTokenContext();
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const { initDataCrypt } = useTelegram();
  const { t } = useTranslation("index");

  const [_, formAction] = useActionState(addPaymentAction, INITIAL_FORM_STATE);

  const handleAddPayment = () => {
    // @ts-ignore
    if ("click" in buttonSubmitRef.current) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
  };

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
    <div className="Premium" onClick={handleAddPayment}>
      <form action={handleSubmit} className="Premium-Form">
        <Typography>{t("common.actions.buyPremium")}</Typography>
        <span className="Premium-Icon">
          <Icon type="Crown" />
        </span>
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </div>
  );
};

PremiumComponent.displayName = "Premium";

export const Premium = memo(PremiumComponent);
