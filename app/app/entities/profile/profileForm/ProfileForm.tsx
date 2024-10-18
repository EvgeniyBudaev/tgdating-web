"use client";

import isNil from "lodash/isNil";
import { type FC } from "react";
import type { TProfile } from "@/app/api/profile/get";
import { useTranslation } from "react-i18next";
import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";
import { useProfileAddOrEdit } from "@/app/entities/profile/profileForm/hooks";
import { Container } from "@/app/shared/components/container";
import { ErrorBoundary } from "@/app/shared/components/errorBoundary";
import { Field } from "@/app/shared/components/form/field";
import { FileUploader } from "@/app/shared/components/form/fileUploader";
import { Section } from "@/app/shared/components/section";
import { SidebarContent } from "@/app/shared/components/sidebarContent";
import { ELanguage } from "@/app/shared/enums";
import { GENDER_MAPPING } from "@/app/shared/mapping/gender";
import { LANGUAGE_MAPPING } from "@/app/shared/mapping/language";
import { SEARCH_GENDER_MAPPING } from "@/app/shared/mapping/searchGender";
import { Button } from "@/app/uikit/components/button";
import { Error } from "@/app/uikit/components/error";
import { Icon } from "@/app/uikit/components/icon";
import { Input } from "@/app/uikit/components/input";
import { InputDateField } from "@/app/uikit/components/inputDateField";
import { Select } from "@/app/uikit/components/select";
import { Textarea } from "@/app/uikit/components/textarea";
import { Typography } from "@/app/uikit/components/typography";
import "./ProfileForm.scss";

type TProps = {
  isEdit?: boolean;
  lng: ELanguage;
  profile?: TProfile;
};

export const ProfileForm: FC<TProps> = ({ isEdit, lng, profile }) => {
  const { i18n, t } = useTranslation("index");
  const {
    displayName,
    files,
    formErrors,
    gender,
    isLoading,
    isSidebarOpen,
    setIsSidebarOpen,
    language,
    location,
    navigator,
    onAddFiles,
    onChangeGender,
    onChangeSearchGender,
    onCloseSidebar,
    onDateChange,
    onDeleteFile,
    onSubmit,
    searchGender,
    state,
    setValueInputDateField,
    valueInputDateField,
  } = useProfileAddOrEdit({ isEdit, lng, profile });

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
    <form action={onSubmit} className="ProfileForm-Form">
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
            onDeleteFile={onDeleteFile}
            type="file"
          />
          {formErrors?.image && (
            <Container>
              <div className="InputField-ErrorField">
                <Error errors={formErrors?.image} />
              </div>
            </Container>
          )}
        </Field>
      </Section>
      <Section title={t("common.titles.moreDetails")}>
        <Field>
          <Input
            defaultValue={displayName}
            errors={formErrors?.displayName}
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
            errors={formErrors?.birthday}
            locale={LANGUAGE_MAPPING[language]}
            onChange={onDateChange}
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
            errors={formErrors?.description}
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
            errors={formErrors?.gender}
            isSidebarOpen={isSidebarOpen.isGender}
            label={`${t("common.form.field.gender")} (${t("common.titles.required")})`}
            headerTitle={!isNil(gender) ? gender?.label : "--"}
            onHeaderClick={() =>
              setIsSidebarOpen((prev) => ({ ...prev, isGender: true }))
            }
            onSidebarClose={onCloseSidebar}
          >
            <SidebarContent
              onSave={onChangeGender}
              options={GENDER_MAPPING[language]}
              onCloseSidebar={onCloseSidebar}
              selectedItem={gender}
              title={t("common.form.field.gender")}
            />
          </Select>
        </Field>
        <Field>
          <Select
            errors={formErrors?.searchGender}
            isSidebarOpen={isSidebarOpen.isSearchGender}
            label={t("common.form.field.searchGender")}
            headerTitle={!isNil(searchGender) ? searchGender?.label : "--"}
            onHeaderClick={() =>
              setIsSidebarOpen((prev) => ({ ...prev, isSearchGender: true }))
            }
            onSidebarClose={onCloseSidebar}
          >
            <SidebarContent
              onSave={onChangeSearchGender}
              options={SEARCH_GENDER_MAPPING[language]}
              onCloseSidebar={onCloseSidebar}
              selectedItem={searchGender}
              title={t("common.form.field.searchGender")}
            />
          </Select>
        </Field>
        <Field>
          <Input
            defaultValue={location}
            errors={formErrors?.location}
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
            errors={formErrors?.height}
            // errors={t(`common.validation.lessOrEqualMaxNumber, {"max": 1}`)}
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
            errors={formErrors?.weight}
            label={t("common.form.field.weight") ?? "Weight"}
            name={EProfileAddFormFields.Weight}
            type="text"
          />
        </Field>
      </Section>
      <Container>
        <div className="ProfileForm-Save">
          <Button
            className="ProfileForm-Button"
            isLoading={isLoading}
            type="submit"
          >
            {isLoading && (
              <span className="ProfileForm-Button-Loading">
                <Typography>{t("common.actions.loading")}</Typography>
                <Icon
                  className="ProfileForm-Button-Loading-Icon"
                  type="Spinner"
                />
              </span>
            )}
            {!isLoading && <Typography>{t("common.actions.save")}</Typography>}
          </Button>
        </div>
      </Container>
    </form>
  );
};
