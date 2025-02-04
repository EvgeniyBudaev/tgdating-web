"use client";

import isNil from "lodash/isNil";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type TPosition = {
  countryCode?: string;
  countryName?: string;
  city?: string;
  errorPosition?: unknown;
  isCoords: boolean;
  latitude?: number;
  longitude?: number;
};

export type TUseNavigatorResponse = TPosition;

type TProps = {
  lng: string;
};

type TUseNavigator = (props: TProps) => TUseNavigatorResponse;

export const useNavigator: TUseNavigator = ({ lng }) => {
  const { t } = useTranslation("index");
  const [position, setPosition] = useState<TPosition>({
    countryCode: undefined,
    countryName: undefined,
    city: undefined,
    errorPosition: undefined,
    isCoords: false,
    longitude: undefined,
    latitude: undefined,
  });

  const getLocationFromCoords = async ({
    longitude,
    latitude,
  }: {
    longitude?: number;
    latitude?: number;
  }) => {
    if (!longitude && !latitude) return undefined;
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_GET_LOCATION}/1.x/?apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}&geocode=${longitude},${latitude}&format=json&lang=${lng}`;
      const res = await fetch(url);
      const data = await res.json();
      const countryName: string =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.CountryName ?? "";
      const countryCode: string = (
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.CountryNameCode ?? ""
      ).toLowerCase();
      const city: string =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.AdministrativeArea?.SubAdministrativeArea?.Locality?.LocalityName ??
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.AdministrativeArea?.AdministrativeAreaName ??
        "";
      setPosition((prevState) => ({
        ...prevState,
        countryCode,
        countryName,
        city,
        errorPosition: undefined,
        isCoords: true,
        longitude,
        latitude,
      }));
      return {};
    } catch (error) {
      console.error("getLocationFromIp error: ", error);
      if (error instanceof Error) {
        setPosition((prevState) => ({
          ...prevState,
          errorPosition: error.message,
        }));
      } else {
        setPosition((prevState) => ({
          ...prevState,
          errorPosition: t("errorBoundary.common.unexpectedError"),
        }));
      }
    }
  };

  const getFromNavigator = () => {
    navigator?.geolocation?.getCurrentPosition(
      (position: GeolocationPosition) => {
        if (
          !isNil(position?.coords?.longitude) &&
          !isNil(position?.coords?.latitude)
        ) {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          getLocationFromCoords({
            longitude,
            latitude,
          }).then((r) => null);
        }
      },
      (error: GeolocationPositionError) => {
        setPosition((prevState) => ({
          ...prevState,
          errorPosition: error.message,
        }));
        console.error("getFromNavigator error: ", error);
      },
      {
        enableHighAccuracy: false,
      },
    );
  };

  useEffect(() => {
    if (!position.isCoords) {
      getFromNavigator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position.isCoords]);

  return useMemo(() => {
    return {
      countryCode: position?.countryCode,
      countryName: position?.countryName,
      city: position?.city,
      errorPosition: position?.errorPosition,
      isCoords: position.isCoords,
      latitude: position?.latitude,
      longitude: position?.longitude,
    };
  }, [lng, position]);
};
