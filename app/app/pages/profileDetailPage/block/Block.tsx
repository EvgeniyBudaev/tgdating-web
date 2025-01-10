"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { addBlockAction } from "@/app/actions/block/addBlock/addBlockAction";
import { useTranslation } from "@/app/i18n/client";
import { EBlockFormFields } from "@/app/actions/block/addBlock/enums";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  blockedTelegramUserId: string;
  lng: ELanguage;
  onCloseDropDown?: () => void;
  telegramUserId: string;
};

const BlockComponent: FC<TProps> = ({
  blockedTelegramUserId,
  lng,
  telegramUserId,
}) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const { initDataCrypt, isSession } = useTelegram();
  const { t } = useTranslation("index");
  const [state, formAction] = useActionState(
    addBlockAction,
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

  const handleBlock = () => {
    openModal();
  };

  const handleSubmit = (formData: FormData) => {
    if (isSession && blockedTelegramUserId) {
      const formDataDto = new FormData();
      formDataDto.append(EBlockFormFields.TelegramUserId, telegramUserId);
      formDataDto.append(
        EBlockFormFields.BlockedTelegramUserId,
        blockedTelegramUserId.toString(),
      );
      formDataDto.append(
        EBlockFormFields.TelegramInitDataCrypt,
        initDataCrypt ?? "",
      );
      formDataDto.append(EBlockFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <>
      <div onClick={handleBlock}>
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

BlockComponent.displayName = "Blocked";

export const Block = memo(BlockComponent);
