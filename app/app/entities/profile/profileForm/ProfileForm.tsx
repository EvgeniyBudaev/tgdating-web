"use client";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { type FC, type FocusEvent, useEffect, useState } from "react";
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
import { ErrorBoundary } from "@/app/shared/components/errorBoundary";
import { CancelButton } from "@/app/shared/components/form/cancelButton";
import { Field } from "@/app/shared/components/form/field";
import { FileUploader } from "@/app/shared/components/form/form/fileUploader";
import { Form } from "@/app/shared/components/form/form";
import { useInitForm } from "@/app/shared/components/form/form/hooks";
import { Input } from "@/app/shared/components/form/input";
import { InputDateField } from "@/app/shared/components/form/inputDateField";
import { Select } from "@/app/shared/components/form/select";
import { Textarea } from "@/app/shared/components/form/textarea";
import { SubmitButton } from "@/app/shared/components/form/submitButton";
import { Section } from "@/app/shared/components/section";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useCheckPermissions } from "@/app/shared/hooks";
import { GENDER_MAPPING } from "@/app/shared/mapping/gender";
import { LOCALE_MAPPING } from "@/app/shared/mapping/language";
import { SEARCH_GENDER_MAPPING } from "@/app/shared/mapping/searchGender";
import { createPath } from "@/app/shared/utils";
import { Info } from "@/app/shared/components/info";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { notification } from "@/app/uikit/utils";
import "./ProfileForm.scss";

type TProps = {
  isEdit?: boolean;
  isManyRequest?: boolean;
  lng: ELanguage;
  profile?: TProfile;
};

export const ProfileForm: FC<TProps> = ({
  isEdit,
  isManyRequest,
  lng,
  profile,
}) => {
  useCheckPermissions({ lng });
  const { t } = useTranslation("index");
  const {
    displayName,
    files,
    gender,
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
    setValueInputDateField,
    state,
    valueInputDateField,
    tg,
  } = useProfileAddOrEdit({ isEdit, lng, profile });
  const schema = isEdit ? editProfileFormSchema : addProfileFormSchema;

  const form = useInitForm(
    {
      resolver: zodResolver(schema),
    },
    { state },
  );

  const { formHeight, isKeyboardOpen } = useDetectKeyboardOpen();
  const [focusedEvent, setFocusedEvent] = useState<FocusEvent<HTMLElement>>();
  const formHeightFormatted = isKeyboardOpen ? `${formHeight}px` : "100%";

  useEffect(() => {
    if (isManyRequest) {
      notification({
        title: t("errorBoundary.common.manyRequest"),
        type: "error",
      });
    }
  }, [isManyRequest]);

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

  if (isEdit && navigator?.errorPosition) {
    return <ErrorBoundary message={"errorBoundary.common.geoPositionError"} />;
  }

  if (tg?.user && isEmpty(tg.user?.username))
    return <Info message={t("common.titles.isEmptyUsername")} />;

  return (
    <section className="ProfileForm">
      <Form
        action={onSubmit}
        className="ProfileForm-Form"
        form={form}
        style={{ height: formHeightFormatted }}
      >
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
              type="file"
            />
          </Field>
        </Section>
        <Section title={t("common.titles.moreDetails")}>
          <Field>
            <Input
              defaultValue={displayName}
              label={t("common.form.field.displayName") ?? "Display name"}
              subLabel={`${t("common.titles.required")}, ${t("common.titles.changeable")}`}
              name={EProfileAddFormFields.DisplayName}
              onFocus={handleFocus}
              type="text"
            />
          </Field>
          <Field>
            <div style={{ marginBottom: "4px" }}>
              <Typography>{t("common.form.field.birthday")}&nbsp;</Typography>
              <Typography variant={ETypographyVariant.TextB4Regular}>
                ({t("common.titles.required")},&nbsp;{t("common.titles.hidden")}
                ,&nbsp;{t("common.titles.changeable")})
              </Typography>
            </div>
            <InputDateField
              locale={LOCALE_MAPPING[language]}
              name={EProfileAddFormFields.Birthday}
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
              label={t("common.form.field.description") ?? "Description"}
              maxLength={1000}
              name={EProfileAddFormFields.Description}
              onFocus={handleFocus}
              type="text"
            />
          </Field>
        </Section>
        <Section
          className="ProfileForm-Section"
          title={t("common.titles.properties")}
        >
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
              options={GENDER_MAPPING[language]}
              selectedItem={gender}
              subLabel={`${t("common.titles.required")}, ${t("common.titles.changeable")}`}
              title={t("common.form.field.gender")}
            />
          </Field>
          <Field>
            <Select
              headerTitle={!isNil(searchGender) ? searchGender?.label : "--"}
              isSidebarOpen={isSidebarOpen.isSearchGender}
              label={t("common.form.field.searchGender")}
              name={EProfileAddFormFields.SearchGender}
              onCloseSidebar={onCloseSidebar}
              onHeaderClick={() =>
                setIsSidebarOpen((prev) => ({ ...prev, isSearchGender: true }))
              }
              onSave={onChangeSearchGender}
              options={SEARCH_GENDER_MAPPING[language]}
              selectedItem={searchGender}
              title={t("common.form.field.searchGender")}
            />
          </Field>
          <Field>
            <Input
              defaultValue={location}
              isReadOnly={true}
              label={t("common.form.field.location") ?? "Location"}
              subLabel={t("common.titles.autocomplete")}
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
              isNumeric={true}
              label={t("common.form.field.height") ?? "Height"}
              name={EProfileAddFormFields.Height}
              onFocus={handleFocus}
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
              isNumeric={true}
              label={t("common.form.field.weight") ?? "Weight"}
              name={EProfileAddFormFields.Weight}
              onFocus={handleFocus}
              type="text"
            />
          </Field>
        </Section>
        <Container>
          <div className="ProfileForm-Controls">
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
                    {
                      ...(navigator?.latitude
                        ? { latitude: navigator?.latitude.toString() }
                        : {}),
                      ...(navigator?.longitude
                        ? { longitude: navigator?.longitude.toString() }
                        : {}),
                    },
                  )}
                />
              </div>
            )}
            <div className="ProfileForm-Save">
              <SubmitButton />
            </div>
          </div>
        </Container>
      </Form>
    </section>
  );
};
