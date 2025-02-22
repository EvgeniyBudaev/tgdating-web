"use client";

import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FC,
  memo,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { addComplaintAction } from "@/app/actions/complaint/addComplaint/addComplaintAction";
import { useTranslation } from "@/app/i18n/client";
import { EComplaintFormFields } from "@/app/actions/complaint/addComplaint/enums";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { INITIAL_FORM_STATE } from "@/app/shared/constants";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { EComplaint } from "@/app/shared/enums/complaint";
import { useNavigatorQuery, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Input } from "@/app/uikit/components/input";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { RadioButton } from "@/app/uikit/components/radioButton";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import { notification } from "@/app/uikit/utils";
import "./Complaint.scss";

type TProps = {
  criminalTelegramUserId: string;
  lng: ELanguage;
  telegramUserId: string;
  theme?: ETheme;
};

const ComplaintComponent: FC<TProps> = ({
  criminalTelegramUserId,
  lng,
  telegramUserId,
  theme,
}) => {
  const csrf = useAuthenticityTokenContext();
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const { query } = useNavigatorQuery();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { initDataCrypt, isSession } = useTelegram();
  const { t } = useTranslation("index");
  const [state, formAction] = useActionState(
    addComplaintAction,
    INITIAL_FORM_STATE,
  );
  const [complaint, setComplaint] = useState<EComplaint | undefined>();
  const [inputValue, setInputValue] = useState("");
  const isDisabledSubmitButton =
    isNil(complaint) ||
    (complaint === EComplaint.Other && inputValue.length === 0);

  const handleChangeComplaint = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedComplaint = event.target.value as EComplaint;
    setComplaint(selectedComplaint);
    if (selectedComplaint === EComplaint.Other) {
      if (inputRef?.current && "focus" in inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    setComplaint(EComplaint.Other);
  };

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath(
        {
          route: ERoutes.Telegram,
          params: { telegramUserId },
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
  }, [lng, state, telegramUserId]);

  const handleSubmit = (formData: FormData) => {
    if (isSession && criminalTelegramUserId && complaint) {
      const formDataDto = new FormData();
      formDataDto.append(EComplaintFormFields.TelegramUserId, telegramUserId);
      formDataDto.append(
        EComplaintFormFields.CriminalTelegramUserId,
        criminalTelegramUserId.toString(),
      );
      formDataDto.append(EComplaintFormFields.Type, complaint);
      if (complaint !== EComplaint.Other) {
        formDataDto.append(EComplaintFormFields.Description, complaint);
      }
      if (complaint === EComplaint.Other) {
        formDataDto.append(EComplaintFormFields.Description, inputValue);
      }
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
      <SidebarContentListItem onClick={openModal} theme={theme}>
        <Typography>{t("common.actions.complaint")}</Typography>
      </SidebarContentListItem>
      <Modal
        isOpen={isOpenModal}
        onCloseModal={closeModal}
        showCloseIcon={false}
      >
        <Modal.Header align="center">
          <Typography>{t("common.titles.complaintQuestion")}</Typography>
        </Modal.Header>
        <Modal.Content>
          <div className="Complaint-Content">
            <RadioButton
              checked={complaint === EComplaint.Terrorism}
              label={t("common.titles.terrorism")}
              name={EComplaint.Terrorism}
              onChange={handleChangeComplaint}
              theme={theme}
              value={EComplaint.Terrorism}
            />
            <RadioButton
              checked={complaint === EComplaint.Fraud}
              label={t("common.titles.fraud")}
              name={EComplaint.Fraud}
              onChange={handleChangeComplaint}
              theme={theme}
              value={EComplaint.Fraud}
            />
            <RadioButton
              checked={complaint === EComplaint.Spam}
              label={t("common.titles.spam")}
              name={EComplaint.Spam}
              onChange={handleChangeComplaint}
              theme={theme}
              value={EComplaint.Spam}
            />
            <RadioButton
              checked={complaint === EComplaint.Other}
              label={t("common.titles.other")}
              name={EComplaint.Other}
              onChange={handleChangeComplaint}
              theme={theme}
              value={EComplaint.Other}
            />
            <Input
              maxLength={255}
              name={EComplaint.Other}
              onChange={handleChangeInputValue}
              onFocus={handleInputFocus}
              placeholder={t("common.form.field.complaint.placeholder")}
              ref={inputRef}
              theme={theme}
              type="text"
              value={inputValue}
            />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <form action={handleSubmit}>
            <div className="Freeze-Modal-Footer-Controls">
              <Button
                className="Complaint-Button Freeze-Modal-Footer-Cancel"
                onClick={closeModal}
                type="button"
              >
                <Typography>{t("common.actions.cancel")}</Typography>
              </Button>
              <Button
                className="Complaint-Button Complaint-Button-Submit"
                isDisabled={isDisabledSubmitButton}
                type="submit"
              >
                <Typography>{t("common.actions.complaint")}</Typography>
              </Button>
            </div>
          </form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ComplaintComponent.displayName = "Complaint";

export const Complaint = memo(ComplaintComponent);
