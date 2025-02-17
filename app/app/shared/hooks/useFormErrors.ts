import isEmpty from "lodash/isEmpty";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { translateRawData } from "@/app/shared/utils/i18next";

type TUseFormErrors = (args: {
  errors?: Record<string, string[] | string | undefined>;
}) => Record<string, string[]> | undefined;

export const useFormErrors: TUseFormErrors = ({ errors }) => {
  const { t } = useTranslation();

  return useMemo(() => {
    if (!errors || typeof errors !== "object") {
      return undefined;
    }

    const translatedErrors: Record<string, string[]> = {};

    Object.entries(errors).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        const listErrors: string[] = [];
        value.forEach((v) => {
          const rawData = translateRawData(t, v);
          listErrors.push(rawData);
        });
        translatedErrors[key] = listErrors;
      }
    });

    return !isEmpty(translatedErrors) ? translatedErrors : undefined;
  }, [errors, t]);
};
