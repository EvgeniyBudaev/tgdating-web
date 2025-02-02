import { TFunction } from "i18next";
import isNil from "lodash/isNil";
import { EMeasurement } from "@/app/shared/enums/form";

export const getDistance = ({
  value,
  t,
  measurement,
}: {
  value?: number | null;
  t: TFunction<string, string>;
  measurement?: EMeasurement;
}): string | undefined => {
  if (isNil(value)) return undefined;

  if (measurement === EMeasurement.American) {
    // Конвертация метров в футы (1 метр = 3.28084 фута)
    const feet = value * 3.28084;

    if (feet >= 5280) {
      // Конвертация футов в мили (1 миля = 5280 футов)
      const miles = feet / 5280;
      return `${Math.round(miles)}${t("common.reductions.mi")}`;
    } else if (feet < 328) {
      return `${328}${t("common.reductions.ft")}`;
    } else {
      return `${Math.round(feet / 100) * 100}${t("common.reductions.ft")}`;
    }
  } else {
    // Метрическая система
    if (value >= 1000) {
      return `${Math.round(value / 1000)}${t("common.reductions.km")}`;
    } else if (value < 100) {
      return `${100}${t("common.reductions.m")}`;
    } else {
      return `${Math.round(value / 100) * 100}${t("common.reductions.m")}`;
    }
  }
};
