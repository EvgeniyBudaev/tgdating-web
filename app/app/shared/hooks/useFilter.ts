"use client";

import isNil from "lodash/isNil";
import { useEffect, useState } from "react";
import type { TFilter } from "@/app/api/profile/filter";
import { ELanguage } from "@/app/shared/enums";
import { useQueryURL, useTelegram } from "@/app/shared/hooks";

type TProps = {
  lng: ELanguage;
};

type TUseProfileListResponse = {
  isNotFound: boolean;
  profileFilter: TFilter | null;
};

type TUseProfileList = (props: TProps) => TUseProfileListResponse;

export const useFilter: TUseProfileList = ({ lng }) => {
  const [profileFilter, setProfileFilter] = useState<TFilter | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const { isSession, user } = useTelegram();
  const { queryURL, onUpdateQueryURL } = useQueryURL({ lng });

  useEffect(() => {
    if (isSession) {
      const fetchProfileFilter = async () => {
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
          const url = `/${lng}/resources/profiles/filter/${user?.id}${queryURL}`;
          const response = await fetch(url, requestOptions);
          if (!response.ok && response.status === 404) {
            return setIsNotFound(true);
          }
          const data = await response.json();
          onUpdateQueryURL?.({
            sessionId: user?.id.toString(),
            searchGender: data?.searchGender,
            lookingFor: data?.lookingFor,
            ageFrom: data?.ageFrom,
            ageTo: data?.ageTo,
            distance: data?.distance,
            page: data?.page,
            size: data?.size,
          });
          setIsNotFound(false);
          setProfileFilter(data);
        } catch (error) {
          console.error(error);
        }
      };
      if (isNil(profileFilter)) {
        fetchProfileFilter();
      }
    }
  }, [isSession]);

  return {
    isNotFound,
    profileFilter,
  };
};
