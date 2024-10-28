"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { addComplaintAction } from "@/app/actions/complaint/add/addComplaintAction";
import { useTranslation } from "@/app/i18n/client";
import { EComplaintFormFields } from "@/app/pages/profileDetailPage/complaint/enums";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useTelegramContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useQueryURL } from "@/app/shared/hooks";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  criminalSessionId: string;
  lng: ELanguage;
};

export const Complaint: FC<TProps> = ({ criminalSessionId, lng }) => {
  const telegram = useTelegramContext();
  const isSession = telegram?.isSession;
  const { t } = useTranslation("index");
  const [state, formAction] = useFormState(
    addComplaintAction,
    INITIAL_FORM_STATE,
  );
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const { queryURL } = useQueryURL({ lng });

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const rootUrl = `${ERoutes.Root}${lng}${queryURL}`;
      redirect(rootUrl);
    }
  }, [lng, queryURL, state?.data, state?.error, state.success]);

  const handleBlock = () => {
    // TODO: fix
    // @ts-ignore
    if ("click" in buttonSubmitRef?.current) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
  };

  const handleSubmit = (formData: FormData) => {
    // if (isSession && criminalSessionId) {
    //   const formDataDto = new FormData();
    //   const keycloakSession = session as TSession;
    //   formDataDto.append(
    //     EComplaintFormFields.SessionId,
    //     keycloakSession?.user.id,
    //   );
    //   formDataDto.append(
    //     EComplaintFormFields.CriminalSessionId,
    //     criminalSessionId.toString(),
    //   );
    //   formDataDto.append(EComplaintFormFields.Reason, "");
    //   // @ts-ignore
    //   formAction(formDataDto);
    // }
  };

  return (
    <>
      <div
        className="DropDown-MenuItem DropDown-MenuItem-Warning"
        onClick={handleBlock}
      >
        <Typography>{t("common.actions.complaint")}</Typography>
      </div>
      <form action={handleSubmit} className="Complaint-Form">
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </>
  );
};
