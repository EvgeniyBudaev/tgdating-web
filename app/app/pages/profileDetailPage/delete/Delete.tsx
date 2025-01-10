import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import { deleteProfileAction } from "@/app/actions/profile/deleteProfile/deleteProfileAction";
import { EProfileDeleteFormFields } from "@/app/actions/profile/deleteProfile/enums";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import "./Delete.scss";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
};

const DeleteComponent: FC<TProps> = ({ lng, telegramUserId }) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const { t } = useTranslation("index");
  const { initDataCrypt, isSession } = useTelegram();
  const [state, formAction] = useActionState(
    deleteProfileAction,
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.ProfileAdd,
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, state?.data, state?.error, state.success, telegramUserId]);

  const handleFreeze = () => {
    openModal();
  };

  const handleSubmit = (formData: FormData) => {
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
      <div className="Delete-Warning" onClick={handleFreeze}>
        <Typography>{t("common.actions.deleteProfile")}</Typography>
      </div>
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

DeleteComponent.displayName = "Delete";

export const Delete = memo(DeleteComponent);
