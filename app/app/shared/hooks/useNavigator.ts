"use client";

import isNil from "lodash/isNil";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  isCoordsGPS: boolean;
  location?: string;
  latitude?: number;
  latitudeGPS?: number;
  longitude?: number;
  longitudeGPS?: number;
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

  const fetchNavigatorCoords = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPositionIP((prevState) => ({
        ...prevState,
        isCoords: true,
        longitude: position?.coords?.longitude,
        latitude: position?.coords?.latitude,
      }));
    });
  };

  const fetchIPInfo = async () => {
    try {
      const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${process?.env?.NEXT_PUBLIC_YANDEX_API_KEY}&geocode=${positionIP?.longitude},${positionIP?.latitude}&format=json&lang=${lng}`;
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
      setPositionIP({
        isCoords: true,
        location: `${country}, ${city}`,
        longitude: positionIP?.longitude,
        latitude: positionIP?.latitude,
      });
    } catch (error) {
      setPositionIP({
        isCoords: false,
        location: undefined,
        longitude: undefined,
        latitude: undefined,
      });
    }
  };

  const getLocationFromIp = useCallback(async () => {
    try {
      // const getLocalIP = () => { window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection; if (window.RTCPeerConnection) { const pc = new RTCPeerConnection(); pc.createDataChannel(''); pc.createOffer().then(pc.setLocalDescription.bind(pc)); pc.onicecandidate = (ice) => { if (!ice || !ice.candidate || !ice.candidate.candidate) return; const myIP = /([0-9]{1,3}(.[0-9]{1,3}){3})/.exec(ice.candidate.candidate)[1]; console.log('Your local IP address is:', myIP); pc.onicecandidate = () => {}; }; } }; getLocalIP();
      //
      // const ip = await new Promise((resolve, reject) => {
      //   const conn = new RTCPeerConnection()
      //   conn.createDataChannel('')
      //   conn.createOffer(offer => conn.setLocalDescription(offer), reject)
      //   conn.onicecandidate = ice => {
      //     if (ice && ice.candidate && ice.candidate.candidate) {
      //       resolve(ice.candidate.candidate.split(' ')[4])
      //       conn.close()
      //     }
      //   }
      // })
      // console.log("IP: " + ip);

      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;
      if (!ipAddress) return;
      await fetchNavigatorCoords();
    } catch (error) {
      setPositionIP({
        isCoords: false,
        longitude: undefined,
        latitude: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionIP.isCoords]);

  const handlePositionChange = useCallback((position: GeolocationPosition) => {
    if (
      !isNil(position?.coords?.longitude) &&
      !isNil(position?.coords?.latitude)
    ) {
      setPositionGPS({
        errorPosition: undefined,
        isCoords: true,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    }
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    setPositionGPS({
      errorPosition: error,
      isCoords: false,
      longitude: undefined,
      latitude: undefined,
    });
  }, []);

  useEffect(() => {
    if (positionIP.isCoords && !positionIP?.location) {
      fetchIPInfo().then((r) => {});
    }
  }, [positionIP.isCoords, positionIP?.location]);

  useEffect(() => {
    if (positionGPS.isCoords) return;
    getLocationFromIp().then((r) => {});
  }, [getLocationFromIp, positionGPS.isCoords]);

  useEffect(() => {
    navigator?.geolocation?.watchPosition(handlePositionChange, handleError, {
      enableHighAccuracy: false,
    });
  }, [handleError, handlePositionChange]);

  return useMemo(() => {
    return {
      errorPosition: positionGPS?.errorPosition,
      isCoords: positionGPS?.isCoords
        ? positionGPS.isCoords
        : positionIP.isCoords,
      isCoordsGPS: !!positionGPS?.isCoords,
      location: positionIP?.location,
      latitude: positionGPS?.isCoords
        ? positionGPS?.latitude
        : positionIP?.latitude,
      latitudeGPS: positionGPS?.latitude,
      longitude: positionGPS?.isCoords
        ? positionGPS?.longitude
        : positionIP?.longitude,
      longitudeGPS: positionGPS?.longitude,
    };
  }, [
    positionGPS?.errorPosition,
    positionGPS.isCoords,
    positionGPS?.latitude,
    positionGPS?.longitude,
    positionIP.isCoords,
    positionIP?.location,
    positionIP?.latitude,
    positionIP?.longitude,
  ]);
};
