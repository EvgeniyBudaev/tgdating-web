"use client";

import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { type FC, type FocusEvent, memo, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TProfile } from "@/app/api/profile/getProfile/types";
import { useTranslation } from "react-i18next";
import { EProfileAddFormFields } from "@/app/actions/profile/addProfile/enums";
import { addProfileFormSchema } from "@/app/actions/profile/addProfile/schemas";
import { editProfileFormSchema } from "@/app/actions/profile/editProfile/schemas";
import {
  useDetectKeyboardOpen,
  useProfileAddOrEdit,
} from "@/app/entities/profile/profileForm/hooks";
import { Container } from "@/app/shared/components/container";
import { CancelButton } from "@/app/shared/components/form/cancelButton";
import { Field } from "@/app/shared/components/form/field";
import { FileUploader } from "@/app/shared/components/form/form/fileUploader";
import { Form } from "@/app/shared/components/form/form";
import { useInitForm } from "@/app/shared/components/form/form/hooks";
import { Input } from "@/app/shared/components/form/input";
import { Select } from "@/app/shared/components/form/select";
import { Textarea } from "@/app/shared/components/form/textarea";
import { SubmitButton } from "@/app/shared/components/form/submitButton";
import { Section } from "@/app/shared/components/section";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery } from "@/app/shared/hooks";
import { getGenderByLocale } from "@/app/shared/mapping/gender";
import { LANGUAGE_MAPPING } from "@/app/shared/mapping/language";
import { getMeasurementByLocale } from "@/app/shared/mapping/measurement";
import { getSearchGenderByLocale } from "@/app/shared/mapping/searchGender";
import { createPath } from "@/app/shared/utils";
import { Info } from "@/app/shared/components/info";
import { Gradient } from "@/app/uikit/components/gradient";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./ProfileForm.scss";

type TProps = {
  isEdit?: boolean;
  lng: ELanguage;
  profile?: TProfile;
};

const ProfileFormComponent: FC<TProps> = ({ isEdit, lng, profile }) => {
  const { t } = useTranslation("index");
  const {
    age,
    ageOptions,
    displayName,
    files,
    gender,
    isSidebarOpen,
    setIsSidebarOpen,
    language,
    languageState,
    measurement,
    onAddFiles,
    onChangeAge,
    onChangeGender,
    onChangeLanguage,
    onChangeMeasurement,
    onChangeSearchGender,
    onCloseSidebar,
    onDeleteFile,
    onSubmit,
    searchGender,
    state,
    tg,
    theme,
  } = useProfileAddOrEdit({ isEdit, lng, profile });
  const titleSubmitButton = !isEdit
    ? t("common.actions.register")
    : t("common.actions.save");
  const schema = isEdit ? editProfileFormSchema : addProfileFormSchema;

  const form = useInitForm(
    {
      resolver: zodResolver(schema),
    },
    { state },
  );

  const { formHeight, isKeyboardOpen } = useDetectKeyboardOpen();
  const { query } = useNavigatorQuery();
  const [focusedEvent, setFocusedEvent] = useState<FocusEvent<HTMLElement>>();
  const formHeightFormatted = isKeyboardOpen ? `${formHeight}px` : "100%";

  useEffect(() => {
    if (isKeyboardOpen && focusedEvent) {
      focusedEvent.target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isKeyboardOpen, focusedEvent]);

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    setFocusedEvent(event);
  };

  if (tg?.user && isEmpty(tg.user?.username))
    return <Info message={t("common.titles.isEmptyUsername")} />;

  return (
    <>
      <section
        className={clsx("ProfileForm", {
          ["theme-dark"]: theme === ETheme.Dark,
        })}
      >
        <Form
          action={onSubmit}
          className="ProfileForm-Form"
          form={form}
          style={{ height: formHeightFormatted }}
        >
          <Section>
            <div className="ProfileForm-Header">
              <div className="ProfileForm-Title">
                {isEdit && (
                  <Typography variant={ETypographyVariant.TextB2Regular}>
                    {t("common.titles.editForm")}
                  </Typography>
                )}
                {!isEdit && (
                  <Typography variant={ETypographyVariant.TextB2Regular}>
                    {t("common.titles.registrationForm")}
                  </Typography>
                )}
              </div>
              <Gradient />
            </div>
            <Container>
              <Field>
                <div className="ProfileForm-FileUploader-Title">
                  <Typography>{t("common.titles.publicPhotos")}</Typography>
                  <>
                    &nbsp;
                    <Typography variant={ETypographyVariant.TextB4Regular}>
                      (
                      {`${t("common.titles.required")}, ${t("common.titles.changeable")}`}
                      )
                    </Typography>
                  </>
                </div>
                <FileUploader
                  accept={{
                    "image/avif": [".avif"],
                    "image/jpeg": [".jpeg"],
                    "image/jpg": [".jpg"],
                    "image/png": [".png"],
                    "image/webp": [".webp"],
                    "image/heif": [".heif"],
                    "image/heic": [".heic"],
                  }}
                  defaultImages={
                    isEdit ? (profile?.images ?? undefined) : undefined
                  }
                  files={files ?? []}
                  // isLoading={fetcherFilesLoading}
                  lng={lng}
                  maxFiles={3}
                  // maxSize={1280 * 1280}
                  multiple={false}
                  name={EProfileAddFormFields.Image}
                  onAddFiles={onAddFiles}
                  onDeleteFile={onDeleteFile}
                  theme={theme}
                  type="file"
                />
              </Field>
              <Field>
                <Input
                  defaultValue={displayName}
                  label={t("common.form.field.displayName") ?? "Display name"}
                  subLabel={`${t("common.titles.required")}, ${t("common.titles.changeable")}`}
                  name={EProfileAddFormFields.DisplayName}
                  onFocus={handleFocus}
                  theme={theme}
                  type="text"
                />
              </Field>
              <Field>
                <Select
                  headerTitle={!isNil(age) ? age?.label : "--"}
                  isSidebarOpen={isSidebarOpen.isAge}
                  label={t("common.form.field.age")}
                  name={EProfileAddFormFields.Age}
                  onCloseSidebar={onCloseSidebar}
                  onHeaderClick={() =>
                    setIsSidebarOpen((prev) => ({ ...prev, isAge: true }))
                  }
                  onSave={onChangeAge}
                  options={ageOptions}
                  selectedItem={age}
                  subLabel={`${t("common.titles.required")}, ${t("common.titles.changeable")}`}
                  theme={theme}
                  title={t("common.form.field.age")}
                  titleButton={t("common.actions.apply")}
                />
              </Field>
              <Field>
                <Select
                  headerTitle={!isNil(gender) ? gender?.label : "--"}
                  isSidebarOpen={isSidebarOpen.isGender}
                  label={t("common.form.field.gender")}
                  name={EProfileAddFormFields.Gender}
                  onCloseSidebar={onCloseSidebar}
                  onHeaderClick={() =>
                    setIsSidebarOpen((prev) => ({ ...prev, isGender: true }))
                  }
                  onSave={onChangeGender}
                  options={getGenderByLocale(language)}
                  selectedItem={gender}
                  subLabel={`${t("common.titles.required")}, ${t("common.titles.changeable")}`}
                  theme={theme}
                  title={t("common.form.field.gender")}
                  titleButton={t("common.actions.apply")}
                />
              </Field>
              <Field>
                <Select
                  headerTitle={
                    !isNil(searchGender) ? searchGender?.label : "--"
                  }
                  isSidebarOpen={isSidebarOpen.isSearchGender}
                  label={t("common.form.field.searchGender")}
                  name={EProfileAddFormFields.SearchGender}
                  onCloseSidebar={onCloseSidebar}
                  onHeaderClick={() =>
                    setIsSidebarOpen((prev) => ({
                      ...prev,
                      isSearchGender: true,
                    }))
                  }
                  onSave={onChangeSearchGender}
                  options={getSearchGenderByLocale(language)}
                  selectedItem={searchGender}
                  subLabel={`${t("common.titles.changeable")}`}
                  theme={theme}
                  title={t("common.form.field.searchGender")}
                  titleButton={t("common.actions.apply")}
                />
              </Field>
              <Field>
                <Select
                  headerTitle={
                    !isNil(languageState) ? languageState?.label : "--"
                  }
                  isSidebarOpen={isSidebarOpen.isLanguage}
                  label={t("common.titles.interfaceLanguage")}
                  name={EProfileAddFormFields.TelegramLanguageCode}
                  onCloseSidebar={onCloseSidebar}
                  onHeaderClick={() =>
                    setIsSidebarOpen((prev) => ({ ...prev, isLanguage: true }))
                  }
                  onSave={onChangeLanguage}
                  options={LANGUAGE_MAPPING[language]}
                  selectedItem={languageState}
                  subLabel={`${t("common.titles.required")}, ${t("common.titles.changeable")}`}
                  theme={theme}
                  title={t("common.titles.interfaceLanguage")}
                  titleButton={t("common.actions.apply")}
                />
              </Field>
              <Field>
                <Select
                  headerTitle={!isNil(measurement) ? measurement?.label : "--"}
                  isSidebarOpen={isSidebarOpen.isMeasurement}
                  label={t("common.titles.measurement")}
                  name={EProfileAddFormFields.Measurement}
                  onCloseSidebar={onCloseSidebar}
                  onHeaderClick={() =>
                    setIsSidebarOpen((prev) => ({
                      ...prev,
                      isMeasurement: true,
                    }))
                  }
                  onSave={onChangeMeasurement}
                  options={getMeasurementByLocale(language)}
                  selectedItem={measurement}
                  subLabel={`${t("common.titles.required")}, ${t("common.titles.changeable")}`}
                  theme={theme}
                  title={t("common.titles.measurement")}
                  titleButton={t("common.actions.apply")}
                />
              </Field>
              <Field>
                <Textarea
                  defaultValue={
                    isEdit ? (profile?.description ?? undefined) : undefined
                  }
                  label={t("common.form.field.description") ?? "Description"}
                  maxLength={1000}
                  name={EProfileAddFormFields.Description}
                  onFocus={handleFocus}
                  theme={theme}
                  type="text"
                />
              </Field>
              {/*<Field>*/}
              {/*  <Checkbox*/}
              {/*    checked={isLeftHand}*/}
              {/*    label={t("common.form.field.isLeftHand")}*/}
              {/*    name={EProfileAddFormFields.IsLeftHand}*/}
              {/*    onChange={onChangeIsLeftHand}*/}
              {/*  />*/}
              {/*</Field>*/}
            </Container>
          </Section>
          <Container>
            <div
              className={clsx("ProfileForm-Controls", {
                ["ProfileForm-Controls__isEdit"]: isEdit,
              })}
            >
              {isEdit && (
                <div className="ProfileForm-Cancel">
                  <CancelButton
                    href={createPath(
                      {
                        route: ERoutes.ProfileDetail,
                        params: {
                          telegramUserId: (
                            profile?.telegramUserId ?? ""
                          ).toString(),
                          viewedTelegramUserId: (
                            profile?.telegramUserId ?? ""
                          ).toString(),
                        },
                        lng: lng,
                      },
                      query,
                    )}
                  />
                </div>
              )}
              <div className="ProfileForm-Save">
                <SubmitButton iconType="Save" title={titleSubmitButton} />
              </div>
            </div>
          </Container>
        </Form>
      </section>
    </>
  );
};

ProfileFormComponent.displayName = "ProfileForm";

export const ProfileForm = memo(ProfileFormComponent);
