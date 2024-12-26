import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import { freezeProfileAction } from "@/app/actions/profile/freezeProfile/freezeProfileAction";
import { EProfileFreezeFormFields } from "@/app/actions/profile/freezeProfile/enums";
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
import "./Freeze.scss";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
};

const FreezeComponent: FC<TProps> = ({ lng, telegramUserId }) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const { t } = useTranslation("index");
  const telegram = useTelegramContext();
  const isSession = telegram?.isSession;
  const [state, formAction] = useActionState(
    freezeProfileAction,
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.ProfileDeleted,
        params: { telegramUserId: telegramUserId },
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, state?.data, state?.error, state.success]);

  const handleFreeze = () => {
    openModal();
  };

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EProfileFreezeFormFields.TelegramUserId,
        telegramUserId,
      );
      formDataDto.append(
        EProfileFreezeFormFields.TelegramInitDataCrypt,
        telegram?.initDataCrypt ?? "",
      );
      formDataDto.append(EProfileFreezeFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <>
      <div
        className="DropDown-MenuItem DropDown-MenuItem-Warning"
        onClick={handleFreeze}
      >
        <Typography>{t("common.actions.freezeProfile")}</Typography>
      </div>
      <Modal isOpen={isOpenModal} onCloseModal={closeModal}>
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

FreezeComponent.displayName = "Freeze";

export const Freeze = memo(FreezeComponent);
