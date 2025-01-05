"use client";

import isNil from "lodash/isNil";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type TPosition = {
  errorPosition?: GeolocationPositionError;
  isCoords: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
};

export type TUseNavigatorResponse = {
  errorPosition?: GeolocationPositionError;
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
        isCoords: true,
        location,
        longitude,
        latitude,
      }));
      return { location };
    } catch (error) {
      console.error("getLocationFromIp error: ", error);
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
      isCoords: position.isCoords,
      location: position?.location,
      latitude: position?.latitude,
      longitude: position?.longitude,
    };
  }, [
    position.isCoords,
    position?.location,
    position?.latitude,
    position?.longitude,
  ]);
};
