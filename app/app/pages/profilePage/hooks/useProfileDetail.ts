import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import type { TProfileDetail } from "@/app/api/profile/detail";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";

type TProps = {
  lng: ELanguage;
  viewedSessionId: string;
};

type TUseProfileDetailResponse = {
  profileDetail: TProfileDetail | null;
};

type TUseProfileDetail = (props: TProps) => TUseProfileDetailResponse;

export const useProfileDetail: TUseProfileDetail = ({
  lng,
  viewedSessionId,
}) => {
  const [profileDetail, setProfileDetail] = useState<TProfileDetail | null>(
    null,
  );
  const [status, setStatus] = useState(200);
  const navigator = useNavigator({ lng });
  const { isSession, user } = useTelegram();

  useEffect(() => {
    if (status === 404) {
      const path = createPath({
        route: ERoutes.ProfileAdd,
        lng: lng,
      });
      redirect(path);
    }
  }, [status]);

  useEffect(() => {
    if (isSession) {
      const fetchProfileDetail = async () => {
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
          const latitudeGPS = navigator?.latitudeGPS;
          const longitudeGPS = navigator?.longitudeGPS;
          const queryParams = {
            ...(viewedSessionId && { viewedSessionId: viewedSessionId }),
            ...(latitudeGPS && { latitude: latitudeGPS.toString() }),
            ...(longitudeGPS && { longitude: longitudeGPS.toString() }),
          };
          const url = `/${lng}/resources/profiles/detail/${user?.id}?${new URLSearchParams(queryParams)}`;
          const response = await fetch(url, requestOptions);
          if (!response.ok && response.status === 404) {
            return setStatus(404);
          }
          const data = await response.json();
          setProfileDetail(data);
        } catch (error) {
          console.error(error);
        }
      };
      if (isNil(profileDetail)) {
        fetchProfileDetail();
      }
    }
  }, [isSession]);

  return {
    profileDetail,
  };
};
