"use client";

import isNil from "lodash/isNil";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type TPosition = {
  countryCode?: string;
  errorPosition?: unknown;
  isCoords: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
};

export type TUseNavigatorResponse = {
  countryCode?: string;
  errorPosition?: unknown;
  isCoords: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
};

type TProps = {
  lng: string;
};

type TUseNavigator = (props: TProps) => TUseNavigatorResponse;

export const useNavigator: TUseNavigator = ({ lng }) => {
  const { t } = useTranslation("index");
  const [position, setPosition] = useState<TPosition>({
    countryCode: undefined,
    errorPosition: undefined,
    isCoords: false,
    location: undefined,
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
      const country =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.CountryName;
      const countryCode: string = (
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.CountryNameCode ?? ""
      ).toLowerCase();
      const city =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.AdministrativeArea?.SubAdministrativeArea?.Locality?.LocalityName ??
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.AdministrativeArea?.AdministrativeAreaName;
      const location = country
        ? `${country}` + (city && `, ${city}`)
        : t("common.titles.geoPositionExist");
      setPosition((prevState) => ({
        ...prevState,
        countryCode,
        errorPosition: undefined,
        isCoords: true,
        location,
        longitude,
        latitude,
      }));
      return { location };
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
      errorPosition: position?.errorPosition,
      isCoords: position.isCoords,
      location: position?.location,
      latitude: position?.latitude,
      longitude: position?.longitude,
    };
  }, [
    lng,
    position?.countryCode,
    position?.errorPosition,
    position.isCoords,
    position?.location,
    position?.latitude,
    position?.longitude,
  ]);
};
