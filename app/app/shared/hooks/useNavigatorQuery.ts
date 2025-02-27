"use client";

import {useSearchParams} from "next/navigation";
import {
  CITY,
  COUNTRY_CODE,
  COUNTRY_NAME,
  LATITUDE,
  LONGITUDE,
} from "@/app/shared/constants";

type TUseNavigatorQueryResponse = {
  query: {
    latitude?: string;
    longitude?: string;
    countryCode?: string;
    countryName?: string;
    city?: string;
  };
};

type TUseNavigatorQuery = () => TUseNavigatorQueryResponse;

export const useNavigatorQuery: TUseNavigatorQuery = () => {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());

  const latitude = queryParams.get(LATITUDE);
  const longitude = queryParams.get(LONGITUDE);
  const countryCode = queryParams.get(COUNTRY_CODE);
  const countryName = queryParams.get(COUNTRY_NAME);
  const city = queryParams.get(CITY);

  const query = {
    ...(latitude ? { latitude: latitude.toString() } : {}),
    ...(longitude ? { longitude: longitude.toString() } : {}),
    ...(countryCode && { countryCode: countryCode }),
    ...(countryName && { countryName: countryName }),
    ...(city && { city: city }),
  };

  return { query };
};
