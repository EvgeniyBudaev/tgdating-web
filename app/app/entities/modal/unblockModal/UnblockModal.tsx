"use client";

import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { EUnblockFormFields } from "@/app/actions/block/unblockAction/enums";
import { unblockAction } from "@/app/actions/block/unblockAction/unblockAction";
import { useTranslation } from "@/app/i18n/client";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Modal } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";
import { INITIAL_FORM_STATE } from "@/app/shared/constants";
import "./UnblockModal.scss";

type TProps = {
  blockedTelegramUserId: string;
  isOpenModal: boolean;
  lng: ELanguage;
  onCloseModal: () => void;
  showCloseIcon?: boolean;
  telegramUserId: string;
};

const UnblockModalComponent: FC<TProps> = ({
  blockedTelegramUserId,
  isOpenModal,
  lng,
  onCloseModal,
  showCloseIcon = false,
  telegramUserId,
}) => {
  const csrf = useAuthenticityTokenContext();
  const { query } = useNavigatorQuery();
  const router = useRouter();
  const { initDataCrypt, isSession } = useTelegram();
  const { t } = useTranslation("index");
  const [state, formAction] = useActionState(unblockAction, INITIAL_FORM_STATE);

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath(
        {
          route: ERoutes.BlockedList,
          params: { telegramUserId },
          lng: lng,
        },
        query,
      );
      onCloseModal();
      router.push(path);
      router.refresh();
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    if (isSession && blockedTelegramUserId) {
      const formDataDto = new FormData();
      formDataDto.append(EUnblockFormFields.TelegramUserId, telegramUserId);
      formDataDto.append(
        EUnblockFormFields.BlockedTelegramUserId,
        blockedTelegramUserId,
      );
      formDataDto.append(
        EUnblockFormFields.TelegramInitDataCrypt,
        initDataCrypt ?? "",
      );
      formDataDto.append(EUnblockFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onCloseModal={onCloseModal}
      showCloseIcon={showCloseIcon}
    >
      <Modal.Header align="center">
        <Typography>{t("common.titles.unblockQuestion")}</Typography>
      </Modal.Header>
      <Modal.Footer>
        <div className="UnblockModal-Controls">
          <Button
            className="UnblockModal-Cancel"
            onClick={onCloseModal}
            type="button"
          >
            <Typography>{t("common.actions.no")}</Typography>
          </Button>
          <form action={handleSubmit}>
            <Button type="submit">
              <Typography>{t("common.actions.yes")}</Typography>
            </Button>
          </form>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

UnblockModalComponent.displayName = "UnblockModal";

export const UnblockModal = memo(UnblockModalComponent);
