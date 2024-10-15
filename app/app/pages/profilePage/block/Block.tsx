"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { addBlockAction } from "@/app/actions/block/add/addBlockAction";
import { useTranslation } from "@/app/i18n/client";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { EBlockFormFields } from "@/app/pages/profilePage/block/enums";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useQueryURL, useTelegram } from "@/app/shared/hooks";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  blockedUserSessionId: string;
  lng: ELanguage;
};

export const Block: FC<TProps> = ({ blockedUserSessionId, lng }) => {
  const { isSession, user } = useTelegram();
  const { t } = useTranslation("index");
  const [state, formAction] = useFormState(addBlockAction, INITIAL_FORM_STATE);
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const { queryURL } = useQueryURL({ lng });

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const rootUrl = `${ERoutes.Root}${lng}${queryURL}`;
      redirect(rootUrl);
    }
  }, [lng, queryURL, state?.data, state?.error, state.success]);

  const handleBlock = () => {
    // @ts-ignore
    if ("click" in buttonSubmitRef.current) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
  };

  const handleSubmit = (formData: FormData) => {
    if (isSession && blockedUserSessionId) {
      const formDataDto = new FormData();
      formDataDto.append(EBlockFormFields.SessionId, user?.id.toString());
      formDataDto.append(
        EBlockFormFields.BlockedUserSessionId,
        blockedUserSessionId.toString(),
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
        <Typography>{t("common.actions.block")}</Typography>
      </div>
      <form action={handleSubmit} className="Block-Form">
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </>
  );
};
