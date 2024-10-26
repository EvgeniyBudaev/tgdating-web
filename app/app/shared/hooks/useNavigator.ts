"use client";

import isNil from "lodash/isNil";
import { useEffect, useMemo, useState } from "react";

type TPositionIP = {
  isCoords: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
};

type TPositionGPS = {
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
  const [positionGPS, setPositionGPS] = useState<TPositionGPS>({
    errorPosition: undefined,
    isCoords: false,
    location: undefined,
    longitude: undefined,
    latitude: undefined,
  });
  const [positionIP, setPositionIP] = useState<TPositionIP>({
    isCoords: false,
    location: undefined,
    longitude: undefined,
    latitude: undefined,
  });

  useEffect(() => {
    console.log("GPS.location: ", positionGPS?.location);
    console.log("IP.location: ", positionIP?.location);
  }, [positionGPS?.location, positionIP?.location]);

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPositionIP((prevState) => ({
        ...prevState,
        isCoords: true,
        longitude: position?.coords?.longitude,
        latitude: position?.coords?.latitude,
      }));
    });
  };

  const getIp = async () => {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      return ipData.ip;
    } catch (error) {
      console.error("getIp error: ", error);
    }
  };

  const getLocationFromIp = async () => {
    try {
      const ipAddress = await getIp();
      const res = await fetch(`https://api.ip-api.com/json?lang=${lng}`);
      const data = await res.json();
      const country = data.country;
      const city = data.city;
      console.log("getLocationFromIp data: ", data);
    } catch (error) {
      console.error("getLocationFromIp error: ", error);
    }
  };

  const getLocationFromCoords = async ({
    longitude,
    latitude,
    isGPS,
  }: {
    longitude?: number;
    latitude?: number;
    isGPS: boolean;
  }) => {
    if (!longitude && !latitude) return undefined;
    try {
      await getLocationFromIp();
      const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${process?.env?.NEXT_PUBLIC_YANDEX_API_KEY}&geocode=${longitude},${latitude}&format=json&lang=${lng}`;
      const res = await fetch(url);
      const data = await res.json();
      const country =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.CountryName;
      const city =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
          ?.AdministrativeArea?.AdministrativeAreaName;
      console.log("getLocationFromCoords location: ", `${country}, ${city}`);
      isGPS &&
        setPositionGPS((prevState) => ({
          ...prevState,
          location: `${country}, ${city}`,
        }));
      !isGPS &&
        setPositionIP((prevState) => ({
          ...prevState,
          location: `${country}, ${city}`,
        }));
      return { location: `${country}, ${city}` };
    } catch (error) {
      console.error("getLocationFromIp error: ", error);
    }
  };

  const getCoordsGPS = (position: GeolocationPosition) => {
    if (
      !isNil(position?.coords?.longitude) &&
      !isNil(position?.coords?.latitude)
    ) {
      setPositionGPS((prevState) => ({
        ...prevState,
        isCoords: true,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      }));
    }
  };

  const getCoordsGPSError = (error: GeolocationPositionError) => {
    console.error("getCoordsGPSError error: ", error);
  };

  useEffect(() => {
    if (!positionGPS.isCoords) {
      navigator?.geolocation?.watchPosition(getCoordsGPS, getCoordsGPSError, {
        enableHighAccuracy: false,
      });
    }
    if (!positionGPS.isCoords && !positionIP.isCoords) {
      getCoords();
    }
    if (positionGPS.isCoords) {
      getLocationFromCoords({
        longitude: positionGPS?.longitude,
        latitude: positionGPS?.latitude,
        isGPS: true,
      }).then((r) => null);
    }
    if (!positionGPS.isCoords && positionIP.isCoords) {
      getLocationFromCoords({
        longitude: positionGPS?.longitude,
        latitude: positionGPS?.latitude,
        isGPS: false,
      }).then((r) => null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    positionGPS.isCoords,
    positionIP.isCoords,
    positionGPS?.location,
    positionIP?.location,
  ]);

  return useMemo(() => {
    return {
      isCoords: positionGPS.isCoords
        ? positionGPS.isCoords
        : positionIP.isCoords,
      location: positionGPS?.location ?? positionIP?.location,
      latitude: positionGPS?.latitude ?? positionIP?.latitude,
      longitude: positionGPS?.longitude ?? positionIP?.longitude,
    };
  }, [
    positionGPS.isCoords,
    positionGPS?.location,
    positionGPS?.latitude,
    positionGPS?.longitude,
    positionIP.isCoords,
    positionIP?.location,
    positionIP?.latitude,
    positionIP?.longitude,
  ]);
};
