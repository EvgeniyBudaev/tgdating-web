"use client";

import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { addBlockAction } from "@/app/actions/block/addBlock/addBlockAction";
import { useTranslation } from "@/app/i18n/client";
import { EBlockFormFields } from "@/app/actions/block/addBlock/enums";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import { notification } from "@/app/uikit/utils";

type TProps = {
  blockedTelegramUserId: string;
  lng: ELanguage;
  telegramUserId: string;
  theme?: ETheme;
};

const BlockComponent: FC<TProps> = ({
  blockedTelegramUserId,
  lng,
  telegramUserId,
  theme,
}) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const router = useRouter();
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
      router.push(path);
      router.refresh();
    }
    if (!isNil(state?.error)) {
      notification({
        title: state?.error,
        type: "error",
      });
    }
  }, [lng, state, telegramUserId]);

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
      <SidebarContentListItem onClick={openModal} theme={theme}>
        <Typography>{t("common.actions.block")}</Typography>
      </SidebarContentListItem>
      <Modal
        isOpen={isOpenModal}
        onCloseModal={closeModal}
        showCloseIcon={false}
      >
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
            <form action={handleSubmit}>
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
