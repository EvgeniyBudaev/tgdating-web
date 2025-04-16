import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { translateRawData } from "@/app/shared/utils/i18next";

export const useTranslatedData = <Data>(data?: string | Data): Data | null => {
  const { t } = useTranslation();

  const reviver = useCallback(
    (key: string, value: unknown) => {
      if (typeof value !== "string") {
        return value;
      }

      return translateRawData(t, value);
    },
    [t],
  );

  const parsedData = useMemo((): Data | null => {
    if (!data) {
      return null;
    }

    const stringifiedData =
      typeof data === "string" ? data : JSON.stringify(data);

    try {
      return JSON.parse(stringifiedData, reviver);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [data, reviver]);

  return parsedData ?? null;
};
