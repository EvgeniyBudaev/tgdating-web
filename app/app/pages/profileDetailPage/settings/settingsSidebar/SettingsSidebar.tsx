"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import {
  type FC,
  memo,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { EUpdateSettingsFormFields } from "@/app/actions/settings/update/enums";
import { updateSettingsAction } from "@/app/actions/settings/update/updateSettingsAction";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { useTranslation } from "@/app/i18n/client";
import { SidebarContentControls } from "@/app/shared/components/sidebarContent/sidebarContentControls";
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { SidebarContentList } from "@/app/shared/components/sidebarContent/sidebarContentList";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import {
  useAuthenticityTokenContext,
  useNavigatorContext,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { CheckboxCustom } from "@/app/uikit/components/checkboxCustom";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { ETheme } from "@/app/uikit/enums/theme";
import { notification } from "@/app/uikit/utils";
import "./SettingsSidebar.scss";
import Link from "next/link";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  isOpen: boolean;
  lng: ELanguage;
  onCloseSidebar?: () => void;
  profile?: TProfileDetail;
  telegramUserId: string;
  theme?: ETheme;
};

const SettingsSidebarComponent: FC<TProps> = ({
  isOpen,
  lng,
  onCloseSidebar,
  profile,
  telegramUserId,
  theme,
}) => {
  const csrf = useAuthenticityTokenContext();
  const navigator = useNavigatorContext();
  const router = useRouter();
  const sidebarRef = useRef(null);
  const { initDataCrypt, isSession } = useTelegram();
  const { t } = useTranslation("index");

  const [isHiddenAge, setIsHiddenAge] = useState(
    profile?.status?.isHiddenAge ?? false,
  );
  const [isShowMessage, setIsShowMessage] = useState(false);

  const [state, formAction] = useActionState(
    updateSettingsAction,
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath(
        {
          route: ERoutes.ProfileDetail,
          params: {
            telegramUserId: telegramUserId,
            viewedTelegramUserId: telegramUserId,
          },
          lng: lng,
        },
        {
          ...(navigator?.latitude
            ? { latitude: navigator?.latitude.toString() }
            : {}),
          ...(navigator?.longitude
            ? { longitude: navigator?.longitude.toString() }
            : {}),
        },
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

  const handleChangeHiddenAge = (value: boolean) => {
    if (profile?.status?.isPremium) {
      setIsHiddenAge(value);
    } else {
      setIsShowMessage(true);
    }
  };

  const handleSubmit = () => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EUpdateSettingsFormFields.TelegramUserId,
        telegramUserId,
      );
      formDataDto.append(
        EUpdateSettingsFormFields.IsHiddenAge,
        String(isHiddenAge),
      );
      formDataDto.append(
        EUpdateSettingsFormFields.TelegramInitDataCrypt,
        initDataCrypt,
      );
      formDataDto.append(EUpdateSettingsFormFields.Csrf, csrf);
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <div className="SettingsSidebar">
      <Sidebar isActive={isOpen} ref={sidebarRef} theme={theme}>
        <div
          className={clsx("SettingsSidebar", {
            ["theme-dark"]: theme === ETheme.Dark,
          })}
        >
          <form action={handleSubmit} className="SettingsSidebar-Form">
            <SidebarContentHeader
              theme={theme}
              title={t("common.actions.settings")}
            />
            <SidebarContentList
              className="SettingsSidebar-SidebarContentList"
              theme={theme}
            >
              <SidebarContentListItem
                className="SettingsSidebar-SidebarContentListItem"
                theme={theme}
              >
                <CheckboxCustom
                  checked={isHiddenAge}
                  label={t("common.titles.isHiddenAge")}
                  name="isHiddenAge"
                  onChange={handleChangeHiddenAge}
                  theme={theme}
                />
                {isShowMessage && (
                  <Link
                    className="SettingsSidebar-Message"
                    href={createPath({
                      route: ERoutes.BuyPremium,
                      params: { telegramUserId: telegramUserId },
                      lng,
                    })}
                  >
                    <Typography>Доступно с Premium</Typography>
                  </Link>
                )}
              </SidebarContentListItem>
            </SidebarContentList>
            <SidebarContentControls
              onCancel={onCloseSidebar}
              theme={theme}
              title={t("common.actions.apply")}
              typeButton="submit"
            />
          </form>
        </div>
      </Sidebar>
    </div>
  );
};

SettingsSidebarComponent.displayName = "SettingsSidebar";

export const SettingsSidebar = memo(SettingsSidebarComponent);
