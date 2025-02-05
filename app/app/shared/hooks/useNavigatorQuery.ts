"use client";

import { useSearchParams } from "next/navigation";
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
  const params = new URLSearchParams(searchParams.toString());

  const latitude = params.get(LATITUDE);
  const longitude = params.get(LONGITUDE);
  const countryCode = params.get(COUNTRY_CODE);
  const countryName = params.get(COUNTRY_NAME);
  const city = params.get(CITY);

  const query = {
    ...(latitude ? { latitude: latitude.toString() } : {}),
    ...(longitude ? { longitude: longitude.toString() } : {}),
    ...(countryCode && { countryCode: countryCode }),
    ...(countryName && { countryName: countryName }),
    ...(city && { city: city }),
  };

  return { query };
};
