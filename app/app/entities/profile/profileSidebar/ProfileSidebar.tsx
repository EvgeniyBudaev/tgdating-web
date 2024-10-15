"use client";

import { type ForwardedRef, forwardRef, memo, useRef } from "react";
import { useFormState } from "react-dom";
import { deleteProfileAction } from "@/app/actions/profile/delete/deleteProfileAction";
import type { TProfileDetail } from "@/app/api/profile/detail";
import { useTranslation } from "@/app/i18n/client";
import { EFormFields } from "@/app/pages/profileDetailPage/enums";
import { Header } from "@/app/shared/components/header";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { Typography } from "@/app/uikit/components/typography";
import "./ProfileSidebar.scss";

type TProps = {
  isSidebarOpen: boolean;
  onCloseSidebar?: () => void;
  profile?: TProfileDetail;
};

const ProfileSidebarComponent = forwardRef(
  (
    { isSidebarOpen, onCloseSidebar, profile }: TProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslation("index");
    const [formAction] = useFormState(deleteProfileAction, INITIAL_FORM_STATE);

    const handleDeleteAccount = () => {
      // TODO: fix
      // @ts-ignore
      if ("click" in buttonSubmitRef?.current) {
        buttonSubmitRef?.current && buttonSubmitRef.current.click();
      }
    };

    const handleSubmit = () => {
      if (profile?.sessionId) {
        const formDataDto = new FormData();
        // TODO: fix EFormFields.Id
        formDataDto.append(EFormFields.SessionId, profile.sessionId);
        // @ts-ignore
        formAction(formDataDto);
        onCloseSidebar?.();
      }
    };

    return (
      <div className="ProfileSidebar">
        <Sidebar isActive={isSidebarOpen} onClose={onCloseSidebar} ref={ref}>
          <Header className="SidebarContent-Header">
            <Icon
              className="SidebarContent-Header-Cancel"
              onClick={onCloseSidebar}
              type="ArrowBack"
            />
            <Typography>{t("common.actions.settings")}</Typography>
            <div />
          </Header>
          {/*<div className="SidebarContent-List">*/}
          {/*  <div*/}
          {/*    className="SidebarContent-List-Item SidebarContent-List-Item-Delete"*/}
          {/*    onClick={handleDeleteAccount}*/}
          {/*  >*/}
          {/*    {t("common.actions.deleteAccount")}*/}
          {/*  </div>*/}
          {/*</div>*/}
          <form action={handleSubmit} className="ProfileSidebar-Form">
            <input hidden={true} ref={buttonSubmitRef} type="submit" />
          </form>
        </Sidebar>
      </div>
    );
  },
);

ProfileSidebarComponent.displayName = "ProfileSidebar";

export const ProfileSidebar = memo(ProfileSidebarComponent);
