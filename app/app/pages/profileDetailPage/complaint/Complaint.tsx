"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { addComplaintAction } from "@/app/actions/complaint/add/addComplaintAction";
import { useTranslation } from "@/app/i18n/client";
import { EComplaintFormFields } from "@/app/actions/complaint/add/enums";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import {
  useAuthenticityTokenContext,
  useTelegramContext,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import {EComplaint} from "@/app/shared/enums/form";
import { Typography } from "@/app/uikit/components/typography";
import {createPath} from "@/app/shared/utils";

type TProps = {
  criminalSessionId: string;
  lng: ELanguage;
  onCloseDropDown?: () => void;
};

export const Complaint: FC<TProps> = ({ criminalSessionId, lng, onCloseDropDown }) => {
  const csrf = useAuthenticityTokenContext();
  const telegram = useTelegramContext();
  const isSession = telegram?.isSession;
  const { t } = useTranslation("index");
  const [state, formAction] = useFormState(
    addComplaintAction,
    INITIAL_FORM_STATE,
  );
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.Root,
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, state?.data, state?.error, state.success]);

  const handleBlock = () => {
    // TODO: fix
    // @ts-ignore
    if ("click" in buttonSubmitRef?.current) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
    onCloseDropDown?.();
  };

  const handleSubmit = (formData: FormData) => {
    if (isSession && criminalSessionId) {
      const formDataDto = new FormData();
      formDataDto.append(
        EComplaintFormFields.SessionId,
        (telegram?.user?.id ?? "").toString(),
      );
      formDataDto.append(
        EComplaintFormFields.CriminalSessionId,
        criminalSessionId.toString(),
      );
      formDataDto.append(EComplaintFormFields.Reason, EComplaint.Other);
      formDataDto.append(
        EComplaintFormFields.TelegramInitDataCrypt,
        telegram?.initDataCrypt ?? "",
      );
      formDataDto.append(
          EComplaintFormFields.Csrf,
          csrf ?? "",
      );
      // @ts-ignore
      formAction(formDataDto);
    }
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
