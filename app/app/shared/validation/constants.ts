import { t } from "@/app/shared/i18next";

export const LETTERS_EN = "a-zA-Z";
export const LETTERS_RU = "а-яА-ЯёЁ";

// export const EMAIL_ERROR_MESSAGE = t("common.validation.email");
// export const EMAIL_REGEXP =
//   /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export const EMAIL_NOT_CYRILLIC_REGEXP = new RegExp(`^[^${LETTERS_RU}]*$`);
// export const EMAIL_NOT_CYRILLIC_ERROR_MESSAGE = t(
//   "common.validation.cyrillicEmail",
// );

export const EMPTY_FIELD_ERROR_MESSAGE = t("common.validation.empty");

export const NAME_REGEXP = new RegExp(`^[- ${LETTERS_EN}${LETTERS_RU}]*$`);
export const NAME_ERROR_MESSAGE = t("common.validation.onlyLetters");

// export const PASSWORD_ERROR_MESSAGE = t("common.validation.passwordNotMatch");

// export const PHONE_REGEXP = /\+7\s?\(?\d\d\d\)?\s?\d\d\d\s?\d\d\s?\d\d/;
// export const PHONE_ERROR_MESSAGE = t("common.validation.wrongCharacter");

export const FILE_TYPE_MESSAGE = t("common.validation.file.expectedFile");
export const FILE_MAX_SIZE_MESSAGE = t("common.validation.file.maxSize");
export const FILE_MAX_AMOUNT_MESSAGE = t("common.validation.file.maxAmount");

export const NUMBER_TYPE_ERROR = {
  invalid_type_error: t("common.validation.invalidTypeNumber"),
};
