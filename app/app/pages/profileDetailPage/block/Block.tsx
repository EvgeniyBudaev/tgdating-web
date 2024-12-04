"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, useEffect } from "react";
import { useFormState } from "react-dom";
import { addBlockAction } from "@/app/actions/block/addBlock/addBlockAction";
import { useTranslation } from "@/app/i18n/client";
import { EBlockFormFields } from "@/app/actions/block/addBlock/enums";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import {
  useAuthenticityTokenContext,
  useTelegramContext,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  blockedTelegramUserId: string;
  lng: ELanguage;
  onCloseDropDown?: () => void;
};

export const Block: FC<TProps> = ({ blockedTelegramUserId, lng }) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const telegram = useTelegramContext();
  const isSession = telegram?.isSession;
  const { t } = useTranslation("index");
  const [state, formAction] = useFormState(addBlockAction, INITIAL_FORM_STATE);

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
    openModal();
  };

  const handleSubmit = (formData: FormData) => {
    if (isSession && blockedTelegramUserId) {
      const formDataDto = new FormData();
      formDataDto.append(
        EBlockFormFields.TelegramUserId,
        (telegram?.user?.id ?? "").toString(),
      );
      formDataDto.append(
        EBlockFormFields.BlockedTelegramUserId,
        blockedTelegramUserId.toString(),
      );
      formDataDto.append(
        EBlockFormFields.TelegramInitDataCrypt,
        telegram?.initDataCrypt ?? "",
      );
      formDataDto.append(EBlockFormFields.Csrf, csrf ?? "");
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
      <Modal isOpen={isOpenModal} onCloseModal={closeModal}>
        <Modal.Header align="center">
          <Typography>{t("common.titles.blockQuestion")}</Typography>
        </Modal.Header>
        <Modal.Footer>
          <div className="Freeze-Modal-Footer-Controls">
            <Button
              className="Freeze-Modal-Footer-Cancel"
              onClick={closeModal}
              type="button"
            >
              <Typography>{t("common.actions.no")}</Typography>
            </Button>
            <form action={handleSubmit} className="Block-Form">
              <Button type="submit">
                <Typography>{t("common.actions.yes")}</Typography>
              </Button>
            </form>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
