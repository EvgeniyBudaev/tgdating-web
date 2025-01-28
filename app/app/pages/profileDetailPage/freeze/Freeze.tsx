"use client";

import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import { freezeProfileAction } from "@/app/actions/profile/freezeProfile/freezeProfileAction";
import { EProfileFreezeFormFields } from "@/app/actions/profile/freezeProfile/enums";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { ETheme } from "@/app/uikit/enums/theme";
import { Typography } from "@/app/uikit/components/typography";
import { notification } from "@/app/uikit/utils";
import "./Freeze.scss";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
  theme?: ETheme;
};

const FreezeComponent: FC<TProps> = ({ lng, telegramUserId, theme }) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const router = useRouter();
  const { initDataCrypt, isSession } = useTelegram();
  const { t } = useTranslation("index");

  const [state, formAction] = useActionState(
    freezeProfileAction,
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.ProfileFrozen,
        params: { telegramUserId: telegramUserId },
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
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EProfileFreezeFormFields.TelegramUserId,
        telegramUserId,
      );
      formDataDto.append(
        EProfileFreezeFormFields.TelegramInitDataCrypt,
        initDataCrypt ?? "",
      );
      formDataDto.append(EProfileFreezeFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <>
      <SidebarContentListItem onClick={openModal} theme={theme}>
        <Typography>{t("common.actions.freezeProfile")}</Typography>
      </SidebarContentListItem>
      <Modal
        isOpen={isOpenModal}
        onCloseModal={closeModal}
        showCloseIcon={false}
      >
        <Modal.Header align="center">
          <Typography>{t("common.titles.freezeQuestion")}</Typography>
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

FreezeComponent.displayName = "Freeze";

export const Freeze = memo(FreezeComponent);
