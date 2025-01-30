"use client";

import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { addComplaintAction } from "@/app/actions/complaint/addComplaint/addComplaintAction";
import { useTranslation } from "@/app/i18n/client";
import { EComplaintFormFields } from "@/app/actions/complaint/addComplaint/enums";
import { INITIAL_FORM_STATE } from "@/app/shared/constants";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { EComplaint } from "@/app/shared/enums/form";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";
import { notification } from "@/app/uikit/utils";

type TProps = {
  criminalTelegramUserId: string;
  lng: ELanguage;
  onCloseDropDown?: () => void;
  telegramUserId: string;
};

const ComplaintComponent: FC<TProps> = ({
  criminalTelegramUserId,
  lng,
  telegramUserId,
}) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const router = useRouter();
  const { initDataCrypt, isSession } = useTelegram();
  const { t } = useTranslation("index");
  const [state, formAction] = useActionState(
    addComplaintAction,
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

  const handleBlock = () => {
    openModal();
  };

  const handleSubmit = (formData: FormData) => {
    if (isSession && criminalTelegramUserId) {
      const formDataDto = new FormData();
      formDataDto.append(EComplaintFormFields.TelegramUserId, telegramUserId);
      formDataDto.append(
        EComplaintFormFields.CriminalTelegramUserId,
        criminalTelegramUserId.toString(),
      );
      formDataDto.append(EComplaintFormFields.Reason, EComplaint.Other);
      formDataDto.append(
        EComplaintFormFields.TelegramInitDataCrypt,
        initDataCrypt ?? "",
      );
      formDataDto.append(EComplaintFormFields.Csrf, csrf ?? "");
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
      <Modal isOpen={isOpenModal} onCloseModal={closeModal}>
        <Modal.Header align="center">
          <Typography>{t("common.titles.complaintQuestion")}</Typography>
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

ComplaintComponent.displayName = "Complaint";

export const Complaint = memo(ComplaintComponent);
