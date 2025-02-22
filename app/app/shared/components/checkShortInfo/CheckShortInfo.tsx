"use client";

import isNil from "lodash/isNil";
import { usePathname, useSearchParams } from "next/navigation";
import { type FC, memo, useActionState, useEffect, useRef } from "react";
import { EGetProfileShortInfoFields } from "@/app/actions/profile/getProfileShortInfo/enums";
import { getProfileShortInfoAction } from "@/app/actions/profile/getProfileShortInfo/getProfileShortInfoAction";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import {
  CITY,
  COUNTRY_CODE,
  COUNTRY_NAME,
  INITIAL_FORM_STATE,
  LATITUDE,
  LONGITUDE,
} from "@/app/shared/constants";
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
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const latitude = params.get(LATITUDE);
  const longitude = params.get(LONGITUDE);
  const countryCode = params.get(COUNTRY_CODE);
  const countryName = params.get(COUNTRY_NAME);
  const city = params.get(CITY);

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      onLoad?.(state.data);
    }
  }, [lng, state, telegramUserId]);

  useEffect(() => {
    if (buttonSubmitRef.current && "click" in buttonSubmitRef.current) {
      buttonSubmitRef.current.click();
    }
  }, [isSession, telegramUserId, pathname]);

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EGetProfileShortInfoFields.TelegramUserId,
        telegramUserId,
      );
      countryCode &&
        formDataDto.append(EGetProfileShortInfoFields.CountryCode, countryCode);
      countryName &&
        formDataDto.append(EGetProfileShortInfoFields.CountryName, countryName);
      city && formDataDto.append(EGetProfileShortInfoFields.City, city);
      latitude &&
        formDataDto.append(
          EGetProfileShortInfoFields.Latitude,
          latitude.toString(),
        );
      longitude &&
        formDataDto.append(
          EGetProfileShortInfoFields.Longitude,
          longitude.toString(),
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
