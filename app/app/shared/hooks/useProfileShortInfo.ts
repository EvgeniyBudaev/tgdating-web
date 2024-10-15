import isNil from "lodash/isNil";
import { useEffect, useState } from "react";
import type { TProfileShortInfo } from "@/app/api/profile/shortInfo/get";
import { ELanguage } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";

type TProps = {
  lng: ELanguage;
};

type TUseProfileShortInfoResponse = {
  isNotFound: boolean;
  profileShortInfo: TProfileShortInfo | null;
};

type TUseProfileShortInfo = (props: TProps) => TUseProfileShortInfoResponse;

export const useProfileShortInfo: TUseProfileShortInfo = ({ lng }) => {
  const [profileShortInfo, setProfileShortInfo] =
    useState<TProfileShortInfo | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const { isSession, user } = useTelegram();

  useEffect(() => {
    if (isSession) {
      const fetchProfileShortInfo = async () => {
        try {
          const contentType: { "Content-Type"?: string } = {
            "Content-Type": "application/json",
          };
          const requestOptions = {
            method: "GET",
            headers: {
              ...contentType,
            },
          };
          const url = `/${lng}/resources/profiles/short/${user?.id}`;
          const response = await fetch(url, requestOptions);

          if (!response.ok && response.status === 404) {
            return setIsNotFound(true);
          }
          const data = await response.json();
          setIsNotFound(false);
          setProfileShortInfo(data);
        } catch (error) {
          console.error(error);
        }
      };
      if (isNil(profileShortInfo)) {
        fetchProfileShortInfo();
      }
    }
  }, [isSession]);

  return {
    isNotFound,
    profileShortInfo,
  };
};
