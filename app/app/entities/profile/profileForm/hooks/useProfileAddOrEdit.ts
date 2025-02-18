"use client";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { useRouter } from "next/navigation";
import { useEffect, useState, useActionState, useMemo } from "react";
import { addProfileAction } from "@/app/actions/profile/addProfile/addProfileAction";
import { editProfileAction } from "@/app/actions/profile/editProfile/editProfileAction";
import type { TProfile } from "@/app/api/profile/getProfile/types";
import { EProfileAddFormFields } from "@/app/actions/profile/addProfile/enums";
import { EProfileEditFormFields } from "@/app/actions/profile/editProfile/enums";
import type { TState } from "@/app/shared/components/form/form/types";
import { scrollToFirstErrorField } from "@/app/shared/components/form/form/utils";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_DISTANCE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/app/shared/constants";
import { INITIAL_FORM_STATE } from "@/app/shared/constants";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { EGender, EMeasurement, ESearchGender } from "@/app/shared/enums/form";
import {
  useFiles,
  useFormErrors,
  useNavigatorQuery,
  useTelegram,
} from "@/app/shared/hooks";
import type { TUseTelegramResponse } from "@/app/shared/hooks/useTelegram";
import { getGenderByLocale } from "@/app/shared/mapping/gender";
import { LANGUAGE_MAPPING } from "@/app/shared/mapping/language";
import { getMeasurementByLocale } from "@/app/shared/mapping/measurement";
import { getSearchGenderByLocale } from "@/app/shared/mapping/searchGender";
import type { TFile } from "@/app/shared/types/file";
import { createPath } from "@/app/shared/utils";
import type { TSelectOption } from "@/app/uikit/components/select";
import { DEFAULT_AGE } from "@/app/uikit/constants";
import { ETheme } from "@/app/uikit/enums/theme";

type TProps = {
  isEdit?: boolean;
  lng: ELanguage;
  profile?: TProfile;
};

type TUseProfileEditResponse = {
  age: TSelectOption | undefined;
  ageOptions: TSelectOption[];
  displayName: string | undefined;
  files: TFile[] | null;
  formErrors: Record<string, string[]> | undefined;
  gender: TSelectOption | undefined;
  isEdit: boolean;
  isLeftHand: boolean;
  isSidebarOpen: {
    isAge: boolean;
    isGender: boolean;
    isLanguage: boolean;
    isMeasurement: boolean;
    isSearchGender: boolean;
  };
  setIsSidebarOpen: (
    value:
      | ((prevState: {
          isAge: boolean;
          isGender: boolean;
          isLanguage: boolean;
          isMeasurement: boolean;
          isSearchGender: boolean;
        }) => {
          isAge: boolean;
          isGender: boolean;
          isLanguage: boolean;
          isMeasurement: boolean;
          isSearchGender: boolean;
        })
      | {
          isAge: boolean;
          isGender: boolean;
          isLanguage: boolean;
          isMeasurement: boolean;
          isSearchGender: boolean;
        },
  ) => void;
  language: ELanguage;
  languageState: TSelectOption | undefined;
  measurement: TSelectOption | undefined;
  onAddFiles?: ((acceptedFiles: TFile[], files: TFile[]) => void) | undefined;
  onChangeAge?: (option?: TSelectOption) => void;
  onChangeIsLeftHand?: (value: boolean) => void;
  onChangeGender?: (option?: TSelectOption) => void;
  onChangeLanguage?: (option?: TSelectOption) => Promise<void>;
  onChangeMeasurement?: (option?: TSelectOption) => void;
  onChangeSearchGender?: (option?: TSelectOption) => void;
  onCloseSidebar?: () => void;
  onDeleteFile?: (file: TFile, files: TFile[]) => void;
  onSubmit?: (formData: FormData) => void;
  searchGender: TSelectOption | undefined;
  state: TState;
  tg: TUseTelegramResponse | null;
  theme: ETheme;
};

type TUseProfileAddOrEdit = (props: TProps) => TUseProfileEditResponse;

export const useProfileAddOrEdit: TUseProfileAddOrEdit = ({
  isEdit = false,
  lng,
  profile,
}) => {
  const [state, formAction] = useActionState(
    // @ts-ignore
    isEdit ? editProfileAction : addProfileAction,
    INITIAL_FORM_STATE,
  );
  const formErrors = useFormErrors({ errors: state.errors });
  const csrf = useAuthenticityTokenContext();
  const { query } = useNavigatorQuery();
  const router = useRouter();
  const telegram = useTelegram();
  const { initDataCrypt, user, theme, queryId } = telegram;
  const language = lng as ELanguage;
  const ageDefault = isEdit
    ? {
        label: (profile?.age ?? DEFAULT_AGE).toString(),
        value: (profile?.age ?? DEFAULT_AGE).toString(),
      }
    : undefined;
  const genderDefault = isEdit
    ? (
        getGenderByLocale(language) as Array<{ label: string; value: EGender }>
      ).find((item) => item.value === profile?.gender)
    : undefined;
  const searchGenderDefault = isEdit
    ? (
        getSearchGenderByLocale(language) as Array<{
          label: string;
          value: ESearchGender;
        }>
      ).find((item) => item.value === profile?.filter?.searchGender)
    : getSearchGenderByLocale(language)[0];
  const [age, setAge] = useState<TSelectOption | undefined>(ageDefault);
  const [gender, setGender] = useState<TSelectOption | undefined>(
    genderDefault,
  );
  const [isLeftHand, setIsLeftHand] = useState(false);
  const [searchGender, setSearchGender] = useState<TSelectOption | undefined>(
    searchGenderDefault,
  );
  const measurementDefault = isEdit
    ? (
        getMeasurementByLocale(language) as Array<{
          label: string;
          value: EMeasurement;
        }>
      ).find((item) => item.value === profile?.settings?.measurement)
    : getMeasurementByLocale(language)[0];
  const [measurement, setMeasurement] = useState<TSelectOption | undefined>(
    measurementDefault,
  );
  const languageDefault: TSelectOption | undefined = useMemo(() => {
    return LANGUAGE_MAPPING[lng].find(
      (item: { label: string; value: string }) => {
        return item.value === lng;
      },
    );
  }, [lng]);
  const [languageState, setLanguageState] = useState<TSelectOption | undefined>(
    languageDefault,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState({
    isAge: false,
    isGender: false,
    isLanguage: false,
    isMeasurement: false,
    isSearchGender: false,
  });
  const [files, setFiles] = useState<TFile[] | null>(null);
  const page = isEdit
    ? (profile?.filter?.page?.toString() ?? DEFAULT_PAGE.toString())
    : DEFAULT_PAGE.toString();
  const size = isEdit
    ? (profile?.filter?.size?.toString() ?? DEFAULT_PAGE_SIZE.toString())
    : DEFAULT_PAGE_SIZE.toString();
  const ageFrom = isEdit
    ? (profile?.filter?.ageFrom?.toString() ?? DEFAULT_AGE_FROM.toString())
    : DEFAULT_AGE_FROM.toString();
  const ageTo = isEdit
    ? (profile?.filter?.ageTo?.toString() ?? DEFAULT_AGE_TO.toString())
    : DEFAULT_AGE_TO.toString();
  const distance = isEdit
    ? (profile?.filter?.distance?.toString() ?? DEFAULT_DISTANCE.toString())
    : DEFAULT_DISTANCE.toString();
  const fio =
    user?.first_name && user?.last_name
      ? `${user?.first_name} ${user?.last_name}`
      : user?.first_name;
  const displayName = isEdit ? profile?.displayName : fio;
  const ageOptions: TSelectOption[] = Array.from({ length: 83 }, (_, i) => ({
    value: DEFAULT_AGE_FROM + i,
    label: (DEFAULT_AGE_FROM + i).toString(),
  }));

  const { onAddFiles, onDeleteFile } = useFiles({
    fieldName: EProfileAddFormFields.Image,
    files: files ?? [],
    setValue: (_fieldName: string, files: TFile[]) => setFiles(files),
  });

  // Profile Edit
  useEffect(() => {
    if (isEdit && profile && user) {
      if (profile.telegramUserId !== user?.id.toString()) {
        // const path = createPath({
        //   route: ERoutes.Unauthorized,
        //   lng: lng,
        // });
      }
    }
    if (isEdit && !isNil(state?.data) && state.success && !state?.error) {
      const lang = languageState?.value ?? lng;
      const path = createPath(
        {
          route: ERoutes.ProfileDetail,
          params: {
            telegramUserId: user?.id.toString() ?? "",
            viewedTelegramUserId: state.data.telegramUserId,
          },
          lng: lang.toString(),
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [isEdit, lng, languageState, navigator, user, profile, state]);

  // Profile Add
  useEffect(() => {
    if (!isEdit && !isNil(state?.data) && state.success && !state?.error) {
      const lang = languageState?.value ?? lng;
      const path = createPath(
        {
          route: ERoutes.Telegram,
          params: { telegramUserId: (user?.id ?? "").toString() },
          lng: lang.toString(),
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [isEdit, lng, state]);

  useEffect(() => {
    if (formErrors) {
      scrollToFirstErrorField(formErrors);
    }
  }, [formErrors]);

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    onDeleteFile?.(file, files);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen({
      isAge: false,
      isGender: false,
      isLanguage: false,
      isMeasurement: false,
      isSearchGender: false,
    });
  };

  const handleChangeAge = (option?: TSelectOption) => {
    if (option) {
      setAge(option);
      handleCloseSidebar();
    }
  };

  const handleChangeGender = (option?: TSelectOption) => {
    if (option) {
      setGender(option);
      handleCloseSidebar();
    }
  };

  const handleChangeSearchGender = (option?: TSelectOption) => {
    if (option) {
      setSearchGender(option);
      handleCloseSidebar();
    }
  };

  const handleChangeMeasurement = (option?: TSelectOption) => {
    if (option) {
      setMeasurement(option);
      handleCloseSidebar();
    }
  };

  const handleChangeLanguage = async (option?: TSelectOption) => {
    if (option) {
      setLanguageState(option);
      handleCloseSidebar();
    }
  };

  const handleChangeIsLeftHand = (value: boolean) => {
    setIsLeftHand(value);
  };

  const handleSubmit = (formData: FormData) => {
    const formDataDto = new FormData();
    const displayName = formData.get(EProfileAddFormFields.DisplayName);
    const description = formData.get(
      EProfileAddFormFields.Description,
    ) as string;
    formDataDto.append(
      EProfileAddFormFields.DisplayName,
      (displayName ?? "").toString().trim(),
    );
    formDataDto.append(
      EProfileAddFormFields.Description,
      (description ?? "").toString(),
    );
    (files ?? []).forEach((file) => {
      formDataDto.append(EProfileAddFormFields.Image, file);
    });
    formDataDto.append(
      EProfileAddFormFields.Age,
      (age?.value ?? "").toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.Gender,
      (gender?.value ?? "").toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.SearchGender,
      (searchGender?.value ?? ESearchGender.All).toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramUserID,
      user?.id.toString() ?? "",
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramUsername,
      user?.username?.toString() ?? "",
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramFirstName,
      user?.first_name ?? "",
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramLastName,
      user?.last_name ?? "",
    );
    formDataDto.append(EProfileAddFormFields.TelegramQueryId, queryId ?? "");
    const lang = languageState?.value ?? lng;
    formDataDto.append(
      EProfileAddFormFields.TelegramLanguageCode,
      //user?.language_code ?? "ru",
      lang.toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramAllowsWriteToPm,
      (user?.allows_write_to_pm ?? "true").toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramInitDataCrypt,
      initDataCrypt ?? "",
    );
    formDataDto.append(
      EProfileAddFormFields.CountryCode,
      query?.countryCode ?? "",
    );
    formDataDto.append(
      EProfileAddFormFields.CountryName,
      query?.countryName ?? "",
    );
    formDataDto.append(EProfileAddFormFields.City, query?.city ?? "");
    formDataDto.append(EProfileAddFormFields.Latitude, query?.latitude ?? "");
    formDataDto.append(EProfileAddFormFields.Longitude, query?.longitude ?? "");
    formDataDto.append(EProfileAddFormFields.AgeFrom, ageFrom);
    formDataDto.append(EProfileAddFormFields.AgeTo, ageTo);
    formDataDto.append(EProfileAddFormFields.Distance, distance);
    formDataDto.append(EProfileAddFormFields.Page, page);
    formDataDto.append(EProfileAddFormFields.Size, size);
    formDataDto.append(EProfileAddFormFields.IsLeftHand, isLeftHand.toString());
    formDataDto.append(
      EProfileAddFormFields.Measurement,
      (measurement?.value ?? "").toString(),
    );
    formDataDto.append(EProfileAddFormFields.Csrf, csrf ?? "");
    formDataDto.append(
      EProfileAddFormFields.IsLiked,
      (profile?.filter?.isLiked ?? false).toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.IsOnline,
      (profile?.filter?.isOnline ?? false).toString(),
    );
    if (isEdit) {
      if (
        !isNil(profile?.images) &&
        !isEmpty(profile?.images) &&
        isEmpty(files)
      ) {
        formDataDto.append(EProfileEditFormFields.IsImages, "true");
      }
    }
    // @ts-ignore
    formAction(formDataDto);
  };

  return {
    age,
    ageOptions,
    displayName,
    files,
    formErrors,
    gender,
    isEdit,
    isLeftHand,
    isSidebarOpen,
    setIsSidebarOpen,
    language,
    languageState,
    measurement,
    onAddFiles,
    onChangeAge: handleChangeAge,
    onChangeIsLeftHand: handleChangeIsLeftHand,
    onChangeGender: handleChangeGender,
    onChangeLanguage: handleChangeLanguage,
    onChangeMeasurement: handleChangeMeasurement,
    onChangeSearchGender: handleChangeSearchGender,
    onCloseSidebar: handleCloseSidebar,
    onDeleteFile: handleDeleteFile,
    onSubmit: handleSubmit,
    searchGender,
    state,
    tg: telegram,
    theme,
  };
};
