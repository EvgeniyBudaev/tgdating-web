"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import type { TProfileList } from "@/app/api/profile/list";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useQueryURL, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";

type TProps = {
  lng: ELanguage;
};

type TUseProfileListResponse = {
  profileList: TProfileList | null;
};

type TUseProfileList = (props: TProps) => TUseProfileListResponse;

export const useProfileList: TUseProfileList = ({ lng }) => {
  const [profileList, setProfileList] = useState<TProfileList | null>(null);
  const [status, setStatus] = useState(200);
  const { isSession, user } = useTelegram();
  const { queryURL } = useQueryURL({ lng });

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
      const fetchProfileList = async () => {
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
          const url = `/${lng}/resources/profiles${queryURL}`;
          const response = await fetch(url, requestOptions);
          if (!response.ok && response.status === 404) {
            return setStatus(404);
          }
          const data = await response.json();
          setProfileList(data);
        } catch (error) {
          console.error(error);
        }
      };
      if (isNil(profileList)) {
        fetchProfileList();
      }
    }
  }, [isSession]);

  return {
    profileList,
  };
};
