import isNil from "lodash/isNil";
import {redirect} from "next/navigation";
import {type FC, useEffect, useRef} from "react";
import {useFormState} from "react-dom";
import {useTranslation} from "@/app/i18n/client";
import {deleteProfileAction} from "@/app/actions/profile/delete/deleteProfileAction";
import {EProfileDeleteFormFields} from "@/app/actions/profile/delete/enums";
import {INITIAL_FORM_STATE} from "@/app/shared/constants/form";
import {useAuthenticityTokenContext, useTelegramContext} from "@/app/shared/context";
import {ELanguage, ERoutes} from "@/app/shared/enums";
import {createPath} from "@/app/shared/utils";
import {Typography} from "@/app/uikit/components/typography";

type TProps = {
  lng: ELanguage;
  sessionId: string;
};

export const Freeze: FC<TProps> = ({lng, sessionId}) => {
  const csrf = useAuthenticityTokenContext();
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation("index");
  const telegram = useTelegramContext();
  const isSession = telegram?.isSession;
  const [state, formAction] = useFormState(deleteProfileAction, INITIAL_FORM_STATE);

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.ProfileDeleted,
        params: { sessionId: sessionId },
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, state?.data, state?.error, state.success]);

  const handleFreeze = () => {
    // @ts-ignore
    if ("click" in buttonSubmitRef.current) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
  };

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EProfileDeleteFormFields.SessionId,
        sessionId,
      );
      formDataDto.append(
        EProfileDeleteFormFields.TelegramInitDataCrypt,
        telegram?.initDataCrypt ?? "",
      );
      formDataDto.append(EProfileDeleteFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  }

  return (
    <>
      <div
        className="DropDown-MenuItem DropDown-MenuItem-Warning"
        onClick={handleFreeze}
      >
        <Typography>{t("common.actions.freeze")}</Typography>
      </div>
      <form action={handleSubmit} className="Block-Form">
        <input hidden={true} ref={buttonSubmitRef} type="submit"/>
      </form>
    </>
  )
}
