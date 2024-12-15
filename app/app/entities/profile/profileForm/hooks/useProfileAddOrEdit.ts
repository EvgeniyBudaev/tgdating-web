import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
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
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import {
  useAuthenticityTokenContext,
  useNavigatorContext,
  useTelegramContext,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { EGender, ESearchGender } from "@/app/shared/enums/form";
import { useFiles, useFormErrors } from "@/app/shared/hooks";
import type { TUseTelegramResponse } from "@/app/shared/hooks/useTelegram";
import type { TUseNavigatorResponse } from "@/app/shared/hooks/useNavigator";
import { GENDER_MAPPING } from "@/app/shared/mapping/gender";
import { SEARCH_GENDER_MAPPING } from "@/app/shared/mapping/searchGender";
import type { TFile } from "@/app/shared/types/file";
import { createPath } from "@/app/shared/utils";
import type { TSelectOption } from "@/app/uikit/components/select";
import { useSelect } from "@/app/entities/profile/profileForm/hooks/useSelect";
import type {
  TSelectNativeOnChange,
  TSelectNativeOption,
} from "@/app/uikit/components/selectNative/types";

type TProps = {
  isEdit?: boolean;
  lng: ELanguage;
  profile?: TProfile;
};

type TUseProfileEditResponse = {
  displayName: string | undefined;
  files: TFile[] | null;
  formErrors: Record<string, string[]> | undefined;
  gender: TSelectOption | undefined;
  isSidebarOpen: { isSearchGender: boolean; isGender: boolean };
  setIsSidebarOpen: (
    value:
      | ((prevState: { isSearchGender: boolean; isGender: boolean }) => {
          isSearchGender: boolean;
          isGender: boolean;
        })
      | { isSearchGender: boolean; isGender: boolean },
  ) => void;
  language: ELanguage;
  location: string | undefined;
  navigator: TUseNavigatorResponse | null;
  onAddFiles: ((acceptedFiles: TFile[], files: TFile[]) => void) | undefined;
  onChangeGender(value?: TSelectOption): void;
  onChangeSearchGender(value?: TSelectOption): void;
  onCloseSidebar(): void;
  onDeleteFile(file: TFile, files: TFile[]): void;
  onSubmit(formData: FormData): void;
  searchGender: TSelectOption | undefined;
  selectAge: {
    onBlur: () => void;
    onChange: TSelectNativeOnChange;
    onFocus: () => void;
    options: TSelectNativeOption[];
    selectedOption: TSelectNativeOption | null | TSelectNativeOption[];
  };
  state: TState;
  tg: TUseTelegramResponse | null;
};

type TUseProfileAddOrEdit = (props: TProps) => TUseProfileEditResponse;

export const useProfileAddOrEdit: TUseProfileAddOrEdit = ({
  isEdit,
  lng,
  profile,
}) => {
  const [state, formAction] = useFormState(
    // @ts-ignore
    isEdit ? editProfileAction : addProfileAction,
    INITIAL_FORM_STATE,
  );
  const formErrors = useFormErrors({ errors: state.errors });
  const csrf = useAuthenticityTokenContext();
  const navigator = useNavigatorContext();
  const telegram = useTelegramContext();
  const user = telegram?.user;
  const queryId = telegram?.queryId;
  const language = lng as ELanguage;
  console.log("navigator: ", navigator);
  const location = isEdit
    ? (navigator?.location ?? profile?.location ?? undefined)
    : (navigator?.location ?? undefined);
  const genderDefault = isEdit
    ? (
        GENDER_MAPPING[language] as Array<{ label: string; value: EGender }>
      ).find((item) => item.value === profile?.gender)
    : undefined;
  const searchGenderDefault = isEdit
    ? (
        SEARCH_GENDER_MAPPING[language] as Array<{
          label: string;
          value: ESearchGender;
        }>
      ).find((item) => item.value === profile?.filter?.searchGender)
    : SEARCH_GENDER_MAPPING[language][0];
  const [gender, setGender] = useState<TSelectOption | undefined>(
    genderDefault,
  );
  const [searchGender, setSearchGender] = useState<TSelectOption | undefined>(
    searchGenderDefault,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState({
    isGender: false,
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
  const latitude = navigator?.latitude?.toString() ?? "";
  const longitude = navigator?.longitude?.toString() ?? "";
  const fio =
    user?.first_name && user?.last_name
      ? `${user?.first_name} ${user?.last_name}`
      : user?.first_name;
  const displayName = isEdit ? profile?.displayName : fio;

  const { onAddFiles, onDeleteFile } = useFiles({
    fieldName: EProfileAddFormFields.Image,
    files: files ?? [],
    setValue: (_fieldName: string, files: TFile[]) => setFiles(files),
  });

  const defaultOption: TSelectNativeOption = {
    label: profile?.age.toString() ?? DEFAULT_AGE_FROM.toString(),
    value: profile?.age ?? DEFAULT_AGE_FROM,
  };
  const defaultSelectedOption = isEdit ? defaultOption : undefined;
  const {
    onBlur: onBlurSelectAge,
    onChange: onChangeSelectAge,
    onFocus: onFocusSelectAge,
    options: optionsSelectAge,
    selectedOption: selectedOptionAge,
  } = useSelect({ defaultSelectedOption: defaultSelectedOption });

  // Profile Edit
  useEffect(() => {
    if (isEdit && profile && user) {
      if (profile.telegramUserId !== user?.id.toString()) {
        // const path = createPath({
        //   route: ERoutes.Unauthorized,
        //   lng: lng,
        // });
        // redirect(path);
      }
    }
    if (isEdit && !isNil(state?.data) && state.success && !state?.error) {
      const query = {
        ...(navigator?.latitude
          ? { latitude: navigator.latitude.toString() }
          : {}),
        ...(navigator?.longitude
          ? { longitude: navigator.longitude.toString() }
          : {}),
      };
      const path = createPath(
        {
          route: ERoutes.ProfileDetail,
          params: {
            telegramUserId: user?.id.toString() ?? "",
            viewedTelegramUserId: state.data.telegramUserId,
          },
          lng: lng,
        },
        query,
      );
      redirect(path);
    }
  }, [
    isEdit,
    lng,
    navigator?.latitude,
    navigator?.longitude,
    user,
    profile,
    state,
  ]);

  // Profile Add
  useEffect(() => {
    if (!isEdit && !isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.Root,
        lng: lng,
      });
      redirect(path);
    }
  }, [isEdit, lng, state]);

  // Check auth user
  useEffect(() => {
    if (isEmpty(telegram?.user)) {
      const path = createPath({
        route: ERoutes.Unauthorized,
        lng: lng,
      });
      redirect(path);
    }
  }, [telegram?.user]);

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
      isGender: false,
      isSearchGender: false,
    });
  };

  const handleChangeGender = (value?: TSelectOption) => {
    if (value) {
      value && setGender(value);
      handleCloseSidebar();
    }
  };

  const handleChangeSearchGender = (value?: TSelectOption) => {
    if (value) {
      value && setSearchGender(value);
      handleCloseSidebar();
    }
  };

  const handleSubmit = (formData: FormData) => {
    const formDataDto = new FormData();
    const displayName = formData.get(EProfileAddFormFields.DisplayName);
    const description = formData.get(EProfileAddFormFields.Description);
    const location = formData.get(EProfileAddFormFields.Location);
    formDataDto.append(
      EProfileAddFormFields.DisplayName,
      (displayName ?? "").toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.Description,
      (description ?? "").toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.Location,
      (location ?? "").toString(),
    );
    (files ?? []).forEach((file) => {
      formDataDto.append(EProfileAddFormFields.Image, file);
    });
    const age = selectedOptionAge
      ? Array.isArray(selectedOptionAge)
        ? selectedOptionAge[0].value
        : (selectedOptionAge?.value ?? DEFAULT_AGE_FROM.toString())
      : "";
    formDataDto.append(EProfileAddFormFields.Age, age);
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
    formDataDto.append(
      EProfileAddFormFields.TelegramLanguageCode,
      user?.language_code ?? "ru",
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramAllowsWriteToPm,
      (user?.allows_write_to_pm ?? "true").toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramInitDataCrypt,
      telegram?.initDataCrypt ?? "",
    );
    formDataDto.append(EProfileAddFormFields.Latitude, latitude);
    formDataDto.append(EProfileAddFormFields.Longitude, longitude);
    formDataDto.append(EProfileAddFormFields.AgeFrom, ageFrom);
    formDataDto.append(EProfileAddFormFields.AgeTo, ageTo);
    formDataDto.append(EProfileAddFormFields.Distance, distance);
    formDataDto.append(EProfileAddFormFields.Page, page);
    formDataDto.append(EProfileAddFormFields.Size, size);
    formDataDto.append(EProfileAddFormFields.Csrf, csrf ?? "");
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
    displayName,
    files,
    formErrors,
    gender,
    isSidebarOpen,
    setIsSidebarOpen,
    language,
    location,
    navigator,
    onAddFiles,
    onChangeGender: handleChangeGender,
    onChangeSearchGender: handleChangeSearchGender,
    onCloseSidebar: handleCloseSidebar,
    onDeleteFile: handleDeleteFile,
    onSubmit: handleSubmit,
    searchGender,
    selectAge: {
      onBlur: onBlurSelectAge,
      onChange: onChangeSelectAge,
      onFocus: onFocusSelectAge,
      options: optionsSelectAge,
      selectedOption: selectedOptionAge,
    },
    state,
    tg: telegram,
  };
};
