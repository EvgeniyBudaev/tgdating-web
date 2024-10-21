import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { ELanguage } from "@/app/shared/enums";

type TUseLanguage = () => {
  onChangeLanguage: (locale: ELanguage) => void;
};

export const useLanguage: TUseLanguage = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = useCallback(
    async (locale: ELanguage) => {
      dayjs.locale(locale);
      await i18n.changeLanguage(locale);
    },
    [i18n],
  );

  return {
    onChangeLanguage,
  };
};
