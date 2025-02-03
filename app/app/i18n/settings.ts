import { DEFAULT_LANGUAGE } from "@/app/shared/constants";

export const fallbackLng = DEFAULT_LANGUAGE;
export const languages = [
  fallbackLng,
  "ru",
  "ar",
  "be",
  "ca",
  "cs",
  "de",
  "es",
  "fi",
  "fr",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "kk",
  "ko",
  "nl",
  "no",
  "pt",
  "sv",
  "uk",
  "zh",
];
export const cookieName = "i18next";
export const defaultNS = "index";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    react: { useSuspense: false },
    i18nFormat: {
      memoize: true,
      memoizeFallback: false,
      bindI18n: "",
      bindI18nStore: "",
    },
  };
}
