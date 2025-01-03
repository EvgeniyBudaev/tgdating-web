import { DEFAULT_LANGUAGE } from "@/app/shared/constants";

export const fallbackLng = DEFAULT_LANGUAGE;
export const languages = [fallbackLng, "en", "ar", "be", "ca", "cs", "de", "fi", "fr", "hr", "nl"];
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
