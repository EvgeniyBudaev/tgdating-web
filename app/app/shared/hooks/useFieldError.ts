import isString from "lodash/isString";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { translateRawData } from "@/app/shared/utils/i18next";

export type TUseFieldError = (args: {
  errors: string | undefined;
}) => string[] | null;

export const useFieldError: TUseFieldError = ({ errors }) => {
  const { t } = useTranslation();

  return useMemo(() => {
    if (!Array.isArray(errors) && isString(errors) && errors.length) {
      return errors.split(", ").map((error) => translateRawData(t, error));
    }

    return null;
  }, [errors, t]);
};
