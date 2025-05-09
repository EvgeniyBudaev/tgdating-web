"use client";

import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import { deleteProfileAction } from "@/app/actions/profile/deleteProfile/deleteProfileAction";
import { EProfileDeleteFormFields } from "@/app/actions/profile/deleteProfile/enums";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { INITIAL_FORM_STATE } from "@/app/shared/constants";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import { notification } from "@/app/uikit/utils";
import "./Delete.scss";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
  theme?: ETheme;
};

const DeleteComponent: FC<TProps> = ({ lng, telegramUserId, theme }) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const { query } = useNavigatorQuery();
  const router = useRouter();
  const { initDataCrypt, isSession } = useTelegram();
  const { t } = useTranslation("index");
  const [state, formAction] = useActionState(
    deleteProfileAction,
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath(
        {
          route: ERoutes.Started,
          lng: lng,
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
    if (!isNil(state?.error)) {
      notification({
        title: state?.error,
        type: "error",
      });
    }
  }, [lng, state, telegramUserId, query, router]);

  const handleSubmit = () => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EProfileDeleteFormFields.TelegramUserId,
        telegramUserId,
      );
      formDataDto.append(
        EProfileDeleteFormFields.TelegramInitDataCrypt,
        initDataCrypt ?? "",
      );
      formDataDto.append(EProfileDeleteFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <>
      <SidebarContentListItem onClick={openModal} theme={theme}>
        <span className="Delete-Warning">
          <Typography>{t("common.actions.deleteProfile")}</Typography>
        </span>
      </SidebarContentListItem>
      <Modal isOpen={isOpenModal} onCloseModal={closeModal}>
        <Modal.Header align="center">
          <Typography>{t("common.titles.deleteQuestion")}</Typography>
        </Modal.Header>
        <Modal.Footer>
          <div className="Delete-Modal-Footer-Controls">
            <Button
              className="Delete-Modal-Footer-Cancel"
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

DeleteComponent.displayName = "Delete";

export const Delete = memo(DeleteComponent);
