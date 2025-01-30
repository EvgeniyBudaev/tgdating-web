"use client";

import isNil from "lodash/isNil";
import { usePathname } from "next/navigation";
import { type FC, memo, useActionState, useEffect, useRef } from "react";
import { EGetProfileShortInfoFields } from "@/app/actions/profile/getProfileShortInfo/enums";
import { getProfileShortInfoAction } from "@/app/actions/profile/getProfileShortInfo/getProfileShortInfoAction";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { ELanguage } from "@/app/shared/enums";
import type { TUseNavigatorResponse } from "@/app/shared/hooks/useNavigator";
import "./CheckShortInfo.scss";

type TProps = {
  isSession: boolean;
  lng: ELanguage;
  navigator?: TUseNavigatorResponse | null;
  onLoad?: (shortInfo: TProfileShortInfo) => void;
  telegramUserId: string;
};

const CheckShortInfoComponent: FC<TProps> = ({
  isSession,
  lng,
  navigator,
  onLoad,
  telegramUserId,
}) => {
  const [state, formAction] = useActionState(
    getProfileShortInfoAction,
    INITIAL_FORM_STATE,
  );
  const pathname = usePathname();
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      onLoad?.(state.data);
    }
  }, [lng, state, telegramUserId]);

  useEffect(() => {
    // @ts-ignore
    if ("click" in buttonSubmitRef.current) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
  }, [isSession, telegramUserId, pathname]);

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EGetProfileShortInfoFields.TelegramUserId,
        telegramUserId,
      );
      navigator?.latitude &&
        formDataDto.append(
          EGetProfileShortInfoFields.Latitude,
          navigator.latitude.toString(),
        );
      navigator?.longitude &&
        formDataDto.append(
          EGetProfileShortInfoFields.Longitude,
          navigator.longitude.toString(),
        );
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <form action={handleSubmit} className="CheckShortInfo-Form">
      <input hidden={true} ref={buttonSubmitRef} type="submit" />
    </form>
  );
};

CheckShortInfoComponent.displayName = "CheckShortInfo";

export const CheckShortInfo = memo(CheckShortInfoComponent);
