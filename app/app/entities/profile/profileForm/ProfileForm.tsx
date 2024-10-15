"use client";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addProfileAction } from "@/app/actions/profile/add/addProfileAction";
import { editProfileAction } from "@/app/actions/profile/edit/editProfileAction";
import type { TProfile } from "@/app/api/profile/get";
import { useTranslation } from "@/app/i18n/client";
import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";
import { EProfileEditFormFields } from "@/app/actions/profile/edit/enums";
import { Container } from "@/app/shared/components/container";
import { ErrorBoundary } from "@/app/shared/components/errorBoundary";
import { Field } from "@/app/shared/components/form/field";
import { FileUploader } from "@/app/shared/components/form/fileUploader";
import { Header } from "@/app/shared/components/header";
import { Section } from "@/app/shared/components/section";
import { SidebarContent } from "@/app/shared/components/sidebarContent";
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
import { useFiles, useNavigator, useTelegram } from "@/app/shared/hooks";
import { GENDER_MAPPING } from "@/app/shared/mapping/gender";
import { LANGUAGE_MAPPING } from "@/app/shared/mapping/language";
import { SEARCH_GENDER_MAPPING } from "@/app/shared/mapping/searchGender";
import type { TFile } from "@/app/shared/types/file";
import { createPath } from "@/app/shared/utils";
import { formattedDate } from "@/app/shared/utils/date";
import { Error } from "@/app/uikit/components/error";
import { Input } from "@/app/uikit/components/input";
import { InputDateField } from "@/app/uikit/components/inputDateField";
import { Select, type TSelectOption } from "@/app/uikit/components/select";
import { Textarea } from "@/app/uikit/components/textarea";
import { Typography } from "@/app/uikit/components/typography";
import "./ProfileForm.scss";

type TProps = {
  isEdit?: boolean;
  lng: ELanguage;
  profile?: TProfile;
};

export const ProfileForm: FC<TProps> = ({ isEdit, lng, profile }) => {
  const [state, formAction] = useFormState(
    // @ts-ignore
    isEdit ? editProfileAction : addProfileAction,
    INITIAL_FORM_STATE,
  );
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const navigator = useNavigator({ lng });
  const { chatId, queryId, user } = useTelegram();
  const { i18n, t } = useTranslation("index");
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

  const { onAddFiles, onDeleteFile } = useFiles({
    fieldName: EProfileAddFormFields.Image,
    files: files ?? [],
    setValue: (_fieldName: string, files: TFile[]) => setFiles(files),
  });

  useEffect(() => {
    if (isEdit && profile && profile.sessionId !== user?.id.toString()) {
      const path = createPath({
        route: ERoutes.PermissionDenied,
        lng: lng,
      });
      redirect(path);
    }
    if (isEdit && !isNil(state?.data) && state.success && !state?.error) {
      const query = {
        ...(navigator?.latitudeGPS ? { latitude: navigator?.latitudeGPS } : {}),
        ...(navigator?.longitudeGPS
          ? { longitude: navigator?.longitudeGPS }
          : {}),
      };
      const path = createPath(
        {
          route: ERoutes.ProfileDetail,
          params: {
            sessionId: user?.id ?? "",
            viewedSessionId: state.data.sessionId,
          },
          lng: lng,
        },
        query,
      );
      redirect(path);
    }
    if (!isEdit && !isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.Session,
        params: { sessionId: state.data.sessionId },
        lng: lng,
      });
      redirect(path);
    }
  }, [isEdit, user?.id, profile, state]);

  const handleDeleteFile = (file: TFile, files: TFile[]) => {
    onDeleteFile?.(file, files);
  };

  const handleDateChange = (date: Date | null) => {
    setValueInputDateField?.(date);
  };

  const handleClickSave = () => {
    // @ts-ignore
    buttonSubmitRef.current && buttonSubmitRef.current.click();
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
    if (isEdit) {
      formDataDto.append(
        EProfileEditFormFields.SessionId,
        (user?.id ?? "").toString(),
      );
    }
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

  // if (isEdit && !navigator.isCoords) return <ProfileSkeletonForm />;
  if (isEdit && navigator?.errorPosition) {
    return (
      <ErrorBoundary
        i18n={i18n}
        message={t("errorBoundary.common.geoPositionError")}
      />
    );
  }

  return (
    <form action={handleSubmit} className="ProfileForm-Form">
      <Header>
        <div className="ProfileForm-Header-Cancel">
          <Typography>{t("common.actions.cancel")}</Typography>
        </div>
        <div className="ProfileForm-Header-Save" onClick={handleClickSave}>
          <Typography>{t("common.actions.save")}</Typography>
        </div>
      </Header>
      <Section
        title={t("common.titles.publicPhotos")}
        subTitle={t("common.titles.required")}
      >
        <Field>
          <FileUploader
            accept={{
              "image/avif": [".avif"],
              "image/jpeg": [".jpeg"],
              "image/jpg": [".jpg"],
              "image/png": [".png"],
              "image/webp": [".webp"],
            }}
            defaultImages={isEdit ? (profile?.images ?? undefined) : undefined}
            files={files ?? []}
            // isLoading={fetcherFilesLoading}
            lng={lng}
            maxFiles={3}
            // maxSize={1280 * 1280}
            multiple={false}
            name="Files"
            onAddFiles={onAddFiles}
            onDeleteFile={handleDeleteFile}
            type="file"
          />
          {state?.errors?.image && (
            <Container>
              <div className="InputField-ErrorField">
                <Error errors={state?.errors?.image} />
              </div>
            </Container>
          )}
        </Field>
      </Section>
      <Section title={t("common.titles.moreDetails")}>
        <Field>
          <Input
            defaultValue={
              isEdit
                ? profile?.displayName
                : (user?.first_name +
                    (user?.last_name && " " + user?.last_name) ?? undefined)
            }
            errors={state?.errors?.displayName}
            label={
              `${t("common.form.field.displayName")} (${t("common.titles.required")})` ??
              "Display name"
            }
            name={EProfileAddFormFields.DisplayName}
            type="text"
          />
        </Field>
        <Field>
          <Typography>
            {t("common.form.field.birthday")}&nbsp;(
            {t("common.titles.required")},&nbsp;{t("common.titles.hidden")})
          </Typography>
          <InputDateField
            errors={state?.errors?.birthday}
            locale={LANGUAGE_MAPPING[language]}
            onChange={handleDateChange}
            onFieldClear={() => setValueInputDateField(null)}
            placeholder={t("common.form.field.date.placeholder")}
            value={valueInputDateField}
          />
        </Field>
        <Field>
          <Textarea
            defaultValue={
              isEdit ? (profile?.description ?? undefined) : undefined
            }
            errors={state?.errors?.description}
            isShowMaxLength={true}
            label={t("common.form.field.description") ?? "Description"}
            maxLength={1000}
            name={EProfileAddFormFields.Description}
            type="text"
          />
        </Field>
      </Section>
      <Section title={t("common.titles.properties")}>
        <Field>
          <Select
            errors={state?.errors?.gender}
            isSidebarOpen={isSidebarOpen.isGender}
            label={`${t("common.form.field.gender")} (${t("common.titles.required")})`}
            headerTitle={!isNil(gender) ? gender?.label : "--"}
            onHeaderClick={() =>
              setIsSidebarOpen((prev) => ({ ...prev, isGender: true }))
            }
            onSidebarClose={handleCloseSidebar}
          >
            <SidebarContent
              onSave={handleChangeGender}
              options={GENDER_MAPPING[language]}
              onCloseSidebar={handleCloseSidebar}
              selectedItem={gender}
              title={t("common.form.field.gender")}
            />
          </Select>
        </Field>
        <Field>
          <Select
            errors={state?.errors?.searchGender}
            isSidebarOpen={isSidebarOpen.isSearchGender}
            label={t("common.form.field.searchGender")}
            headerTitle={!isNil(searchGender) ? searchGender?.label : "--"}
            onHeaderClick={() =>
              setIsSidebarOpen((prev) => ({ ...prev, isSearchGender: true }))
            }
            onSidebarClose={handleCloseSidebar}
          >
            <SidebarContent
              onSave={handleChangeSearchGender}
              options={SEARCH_GENDER_MAPPING[language]}
              onCloseSidebar={handleCloseSidebar}
              selectedItem={searchGender}
              title={t("common.form.field.searchGender")}
            />
          </Select>
        </Field>
        <Field>
          <Input
            defaultValue={location}
            errors={state?.errors?.location}
            isReadOnly={true}
            label={
              `${t("common.form.field.location")} (${t("common.titles.autocomplete")})` ??
              "Location"
            }
            name={EProfileAddFormFields.Location}
            type="text"
          />
        </Field>
        <Field>
          <Input
            defaultValue={
              isEdit && profile?.height !== 0
                ? (profile?.height ?? undefined)
                : undefined
            }
            errors={state?.errors?.height}
            label={t("common.form.field.height") ?? "Height"}
            name={EProfileAddFormFields.Height}
            type="text"
          />
        </Field>
        <Field>
          <Input
            defaultValue={
              isEdit && profile?.weight !== 0
                ? (profile?.weight ?? undefined)
                : undefined
            }
            errors={state?.errors?.weight}
            label={t("common.form.field.weight") ?? "Weight"}
            name={EProfileAddFormFields.Weight}
            type="text"
          />
        </Field>
      </Section>
      <input hidden={true} ref={buttonSubmitRef} type="submit" />
    </form>
  );
};
