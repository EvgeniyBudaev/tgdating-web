import isEmpty from "lodash/isEmpty";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { translateRawData } from "@/app/shared/utils/i18next";

type TUseFormErrors = (args: {
  errors?: Record<string, string[]>;
}) => Record<string, string> | undefined;

export const useFormErrors: TUseFormErrors = ({ errors }) => {
  const { t } = useTranslation();

  return useMemo(() => {
    if (!errors || typeof errors !== "object") {
      return undefined;
    }

    const translatedErrors: Record<string, string> = {};

    Object.entries(errors).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        translatedErrors[key] = translateRawData(t, value[0]);
      }
    });

    return !isEmpty(translatedErrors) ? translatedErrors : undefined;
  }, [errors, t]);
};
