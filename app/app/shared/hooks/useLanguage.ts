import dayjs from "dayjs";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ELanguage } from "@/app/shared/enums";

type TUseLanguage = () => {
  language: ELanguage;
  onChangeLanguage: (locale: ELanguage) => Promise<void>;
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
    language: i18n.language as ELanguage,
    onChangeLanguage,
  };
};
