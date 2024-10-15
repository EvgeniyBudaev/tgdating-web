import isNil from "lodash/isNil";
import { useEffect, useState } from "react";
import type { TProfile } from "@/app/api/profile/get";
import { ELanguage } from "@/app/shared/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";

type TProps = {
  lng: ELanguage;
};

type TUseProfileEditResponse = {
  isEdit: boolean;
  profile: TProfile | undefined;
};

type TUseProfileEdit = (props: TProps) => TUseProfileEditResponse;

export const useProfileEdit: TUseProfileEdit = ({ lng }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState<TProfile | undefined>();
  const [status, setStatus] = useState(200);
  const navigator = useNavigator({ lng });
  const { isSession, user } = useTelegram();

  useEffect(() => {
    if (isSession) {
      const fetchProfile = async () => {
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
            ...(latitudeGPS && { latitude: latitudeGPS.toString() }),
            ...(longitudeGPS && { longitude: longitudeGPS.toString() }),
          };
          const url = `/${lng}/resources/profiles/session/${user?.id}?${new URLSearchParams(queryParams)}`;
          const response = await fetch(url, requestOptions);
          if (!response.ok && response.status === 404) {
            setIsEdit(false);
            return setStatus(404);
          }
          const data = await response.json();
          setIsEdit(true);
          setProfile(data);
        } catch (error) {
          console.error(error);
        }
      };
      if (isNil(profile)) {
        fetchProfile();
      }
    }
  }, [isSession]);

  return {
    isEdit,
    profile,
  };
};
