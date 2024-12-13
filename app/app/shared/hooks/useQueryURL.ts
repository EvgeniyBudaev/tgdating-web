"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  AGE_FROM,
  AGE_TO,
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_DISTANCE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SEARCH_GENDER,
  DISTANCE,
  LATITUDE,
  LONGITUDE,
  PAGE,
  SEARCH_GENDER,
  SESSION_ID,
  SIZE,
} from "@/app/shared/constants";
import { useNavigatorContext, useTelegramContext } from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";

type TProps = {
  lng: ELanguage;
};

type TOnUpdateQueryURLProps = {
  page?: string;
  size?: string;
  ageFrom?: string;
  ageTo?: string;
  searchGender?: string;
  telegramUserId?: string;
  distance?: string;
  latitude?: string;
  longitude?: string;
};

type TOnGetQueryURLResponse = {
  page: string;
  size: string;
  ageFrom: string;
  ageTo: string;
  searchGender: string;
  telegramUserId: string;
  distance: string;
  latitude: string;
  longitude: string;
};

type TResponse = {
  queryURL: string;
  getQuery: () => TOnGetQueryURLResponse;
  updateQueryURL: (props: TOnUpdateQueryURLProps) => void;
};

type TUseQueryURL = (props: TProps) => TResponse;

export const useQueryURL: TUseQueryURL = ({ lng }) => {
  const navigator = useNavigatorContext();
  const { replace } = useRouter();
  const pathname = usePathname();
  const telegram = useTelegramContext();
  const telegramUserId = telegram?.user?.id ?? "";
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const page = params.get(PAGE) ?? DEFAULT_PAGE.toString();
  const size = params.get(SIZE) ?? DEFAULT_PAGE_SIZE.toString();
  const ageFrom = params.get(AGE_FROM) ?? DEFAULT_AGE_FROM.toString();
  const ageTo = params.get(AGE_TO) ?? DEFAULT_AGE_TO.toString();
  const searchGender = params.get(SEARCH_GENDER) ?? DEFAULT_SEARCH_GENDER;
  const distance = params.get(DISTANCE) ?? DEFAULT_DISTANCE.toString();
  const latitude = params.get(LATITUDE) ?? "";
  const longitude = params.get(LONGITUDE) ?? "";
  const latitudeGPS = (navigator?.latitude ?? "").toString();
  const longitudeGPS = (navigator?.longitude ?? "").toString();

  const queryURL = useMemo(() => {
    return `?page=${page}&size=${size}&ageFrom=${ageFrom}&ageTo=${ageTo}&searchGender=${searchGender}&telegramUserId=${telegramUserId}&distance=${distance}&latitude=${latitudeGPS}&longitude=${longitudeGPS}`;
  }, [
    page,
    size,
    ageFrom,
    ageTo,
    searchGender,
    telegramUserId,
    distance,
    latitudeGPS,
    longitudeGPS,
  ]);

  const updateQueryURL = (props: TOnUpdateQueryURLProps) => {
    props?.page ? params.set(PAGE, props.page) : params.set(PAGE, page);
    props?.size ? params.set(SIZE, props.size) : params.set(SIZE, size);
    props?.ageFrom
      ? params.set(AGE_FROM, props.ageFrom)
      : params.set(AGE_FROM, ageFrom);
    props?.ageTo ? params.set(AGE_TO, props.ageTo) : params.set(AGE_TO, ageTo);
    props?.searchGender
      ? params.set(SEARCH_GENDER, props.searchGender)
      : params.set(SEARCH_GENDER, searchGender);
    props?.telegramUserId
      ? params.set(SESSION_ID, props.telegramUserId)
      : params.set(SESSION_ID, telegramUserId?.toString() ?? "");
    props?.distance
      ? params.set(DISTANCE, props.distance)
      : params.set(DISTANCE, distance);
    latitudeGPS
      ? params.set(LATITUDE, latitudeGPS)
      : params.set(LATITUDE, latitude);
    longitudeGPS
      ? params.set(LONGITUDE, longitudeGPS)
      : params.set(LONGITUDE, longitude);
    replace(`${pathname}?${params.toString()}`);
  };

  const getQuery = () => {
    return {
      page: params.get(PAGE) ?? DEFAULT_PAGE.toString(),
      size: params.get(SIZE) ?? DEFAULT_PAGE_SIZE.toString(),
      ageFrom: params.get(AGE_FROM) ?? DEFAULT_AGE_FROM.toString(),
      ageTo: params.get(AGE_TO) ?? DEFAULT_AGE_TO.toString(),
      searchGender: params.get(SEARCH_GENDER) ?? DEFAULT_SEARCH_GENDER,
      telegramUserId: params.get(SESSION_ID) ?? "",
      distance: params.get(DISTANCE) ?? DEFAULT_DISTANCE.toString(),
      latitude: params.get(LATITUDE) ?? "",
      longitude: params.get(LONGITUDE) ?? "",
    };
  };

  return {
    queryURL,
    getQuery,
    updateQueryURL,
  };
};
