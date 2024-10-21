import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { addProfileAction } from "@/app/actions/profile/add/addProfileAction";
import { editProfileAction } from "@/app/actions/profile/edit/editProfileAction";
import type { TProfile } from "@/app/api/profile/get";
import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";
import { EProfileEditFormFields } from "@/app/actions/profile/edit/enums";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_DISTANCE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/app/shared/constants";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";
import {
  useFiles,
  useFormErrors,
  useNavigator,
  useTelegram,
} from "@/app/shared/hooks";
import type { TUseNavigatorResponse } from "@/app/shared/hooks/useNavigator";
import { GENDER_MAPPING } from "@/app/shared/mapping/gender";
import { SEARCH_GENDER_MAPPING } from "@/app/shared/mapping/searchGender";
import type { TFile } from "@/app/shared/types/file";
import { createPath } from "@/app/shared/utils";
import { formattedDate } from "@/app/shared/utils/date";
import type { TSelectOption } from "@/app/uikit/components/select";

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
  navigator: TUseNavigatorResponse;
  onAddFiles: ((acceptedFiles: TFile[], files: TFile[]) => void) | undefined;
  onChangeGender(value?: TSelectOption): void;
  onChangeSearchGender(value?: TSelectOption): void;
  onCloseSidebar(): void;
  onDateChange(date: Date | null): void;
  onDeleteFile(file: TFile, files: TFile[]): void;
  onSubmit(formData: FormData): void;
  searchGender: TSelectOption | undefined;
  valueInputDateField: Date | null;
  setValueInputDateField: (
    value: ((prevState: Date | null) => Date | null) | Date | null,
  ) => void;
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
  console.log("state.errors: ", state.errors);
  console.log("formErrors: ", formErrors);
  const navigator = useNavigator({ lng });
  const { chatId, isSession, queryId, user } = useTelegram();
  const language = lng as ELanguage;
  const location = isEdit
    ? (profile?.location ?? undefined)
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
    : undefined;
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
  const [valueInputDateField, setValueInputDateField] = useState<Date | null>(
    isEdit ? ((profile?.birthday as Date | undefined) ?? null) : null,
  );
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

  // Profile Edit
  useEffect(() => {
    if (isEdit && profile && user) {
      if (profile.sessionId !== user?.id.toString()) {
        // const path = createPath({
        //   route: ERoutes.PermissionDenied,
        //   lng: lng,
        // });
        // redirect(path);
      }
    }
    if (isEdit && !isNil(state?.data) && state.success && !state?.error) {
      const query = {
        ...(navigator?.latitudeGPS
          ? { latitude: navigator?.latitudeGPS.toString() }
          : {}),
        ...(navigator?.longitudeGPS
          ? { longitude: navigator?.longitudeGPS.toString() }
          : {}),
      };
      const path = createPath(
        {
          route: ERoutes.ProfileDetail,
          params: {
            sessionId: user?.id.toString() ?? "",
            viewedSessionId: state.data.sessionId,
          },
          lng: lng,
        },
        query,
      );
      redirect(path);
    }
  }, [isEdit, user?.id, profile, state]);

  // Profile Add
  useEffect(() => {
    if (!isEdit && !isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.Root,
        lng: lng,
      });
      redirect(path);
    }
  }, [isEdit, state]);

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    onDeleteFile?.(file, files);
  };

  const handleDateChange = (date: Date | null) => {
    setValueInputDateField?.(date);
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
    const height = formData.get(EProfileAddFormFields.Height);
    const weight = formData.get(EProfileAddFormFields.Weight);
    formDataDto.append(
      EProfileEditFormFields.SessionId,
      (user?.id ?? "").toString(),
    );
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
    formDataDto.append(EProfileAddFormFields.Height, (height ?? "").toString());
    formDataDto.append(EProfileAddFormFields.Weight, (weight ?? "").toString());
    (files ?? []).forEach((file) => {
      formDataDto.append(EProfileAddFormFields.Image, file);
    });
    const utcDate = formattedDate(valueInputDateField);
    formDataDto.append(EProfileAddFormFields.Birthday, utcDate ?? "");
    formDataDto.append(
      EProfileAddFormFields.Gender,
      (gender?.value ?? "").toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.SearchGender,
      (searchGender?.value ?? ESearchGender.All).toString(),
    );
    formDataDto.append(EProfileAddFormFields.LookingFor, ELookingFor.All);
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
      EProfileAddFormFields.TelegramChatId,
      (chatId ?? 0).toString(),
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramLanguageCode,
      user?.language_code ?? "ru",
    );
    formDataDto.append(
      EProfileAddFormFields.TelegramAllowsWriteToPm,
      (user?.allows_write_to_pm ?? "true").toString(),
    );
    formDataDto.append(EProfileAddFormFields.Latitude, latitude);
    formDataDto.append(EProfileAddFormFields.Longitude, longitude);
    formDataDto.append(EProfileAddFormFields.AgeFrom, ageFrom);
    formDataDto.append(EProfileAddFormFields.AgeTo, ageTo);
    formDataDto.append(EProfileAddFormFields.Distance, distance);
    formDataDto.append(EProfileAddFormFields.Page, page);
    formDataDto.append(EProfileAddFormFields.Size, size);
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
    onDateChange: handleDateChange,
    onDeleteFile: handleDeleteFile,
    onSubmit: handleSubmit,
    searchGender,
    setValueInputDateField,
    valueInputDateField,
  };
};
