"use client";

import isNil from "lodash/isNil";
import { type FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { updateFilterAction } from "@/app/actions/filter/updateFilter/updateFilterAction";
import { EFilterUpdateFormFields } from "@/app/actions/filter/updateFilter/enums";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { useTranslation } from "@/app/i18n/client";
import { Header } from "@/app/shared/components/header";
import { SearchBar } from "@/app/shared/components/searchBar";
import { SidebarContent } from "@/app/shared/components/sidebarContent";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_SEARCH_GENDER,
} from "@/app/shared/constants";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import {
  useAuthenticityTokenContext,
  useTelegramContext,
} from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";
import { useQueryURL } from "@/app/shared/hooks";
import {
  SEARCH_BAR_SEARCH_GENDER_MAPPING,
  SEARCH_GENDER_MAPPING,
} from "@/app/shared/mapping/searchGender";
import { Icon } from "@/app/uikit/components/icon";
import { RangeSlider } from "@/app/uikit/components/rangeSlider";
import { Select, type TSelectOption } from "@/app/uikit/components/select";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums";
import "./SearchForm.scss";
import clsx from "clsx";

type TProps = {
  lng: ELanguage;
  profileShortInfo?: TProfileShortInfo;
  theme?: ETheme;
};

const SearchFormComponent: FC<TProps> = ({ lng, profileShortInfo, theme }) => {
  const csrf = useAuthenticityTokenContext();
  const telegram = useTelegramContext();
  const { t } = useTranslation("index");
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState({
    isGeneralFilters: false,
    isSearchGender: false,
  });
  const { updateQueryURL } = useQueryURL({ lng });
  const defaultAgeRangeFrom = profileShortInfo?.ageFrom ?? DEFAULT_AGE_FROM;
  const defaultAgeRangeTo = profileShortInfo?.ageTo ?? DEFAULT_AGE_TO;

  const [ageRange, setAgeRange] = useState<any>([
    defaultAgeRangeFrom,
    defaultAgeRangeTo,
  ]);
  const [state, formAction] = useFormState(
    updateFilterAction,
    INITIAL_FORM_STATE,
  );

  const searchGenderDefault = useMemo(() => {
    return SEARCH_GENDER_MAPPING[lng].find(
      (item) => item.value === profileShortInfo?.searchGender,
    );
  }, [lng, profileShortInfo?.searchGender]);

  const searchBarTitle = useMemo(() => {
    return SEARCH_BAR_SEARCH_GENDER_MAPPING[lng].find(
      (item) => item.value === profileShortInfo?.searchGender,
    )?.label;
  }, [lng, profileShortInfo?.searchGender]);

  const [searchGenderState, setSearchGenderState] = useState<
    TSelectOption | undefined
  >(searchGenderDefault);

  const ageRangeValueFrom = Array.isArray(ageRange)
    ? ageRange[0].toString()
    : ageRange.toString();
  const ageRangeValueTo = Array.isArray(ageRange)
    ? ageRange[1].toString()
    : ageRange.toString();
  const searchGender =
    (searchGenderState?.value ?? "").toString() ?? DEFAULT_SEARCH_GENDER;

  const handleOpenSidebar = () => {
    setIsSidebarOpen((prev) => ({
      ...prev,
      isGeneralFilters: true,
    }));
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen({
      isGeneralFilters: false,
      isSearchGender: false,
    });
  };

  const handleCloseSidebarSecondary = () => {
    setIsSidebarOpen({
      isGeneralFilters: true,
      isSearchGender: false,
    });
  };

  const handleChangeSearchGender = (value?: TSelectOption) => {
    if (value) {
      value && setSearchGenderState(value);
      setIsSidebarOpen({
        isGeneralFilters: true,
        isSearchGender: false,
      });
    }
  };

  const handleSubmit = () => {
    const formDataDto = new FormData();
    formDataDto.append(EFilterUpdateFormFields.AgeFrom, ageRangeValueFrom);
    formDataDto.append(EFilterUpdateFormFields.AgeTo, ageRangeValueTo);
    formDataDto.append(EFilterUpdateFormFields.SearchGender, searchGender);
    formDataDto.append(
      EFilterUpdateFormFields.TelegramUserId,
      profileShortInfo?.telegramUserId ?? "",
    );
    formDataDto.append(
      EFilterUpdateFormFields.TelegramInitDataCrypt,
      telegram?.initDataCrypt ?? "",
    );
    formDataDto.append(EFilterUpdateFormFields.Csrf, csrf ?? "");
    // @ts-ignore
    formAction(formDataDto);
    handleCloseSidebar();
  };

  const handleBack = () => {
    handleCloseSidebar();
    handleSubmit();
  };

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      updateQueryURL({
        ageFrom: ageRangeValueFrom,
        ageTo: ageRangeValueTo,
        searchGender: searchGender,
      });
    }
  }, [lng, state?.data, state?.error, state.success]);

  return (
    <div
      className={clsx("SearchForm", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <Header>
        <SearchBar theme={theme} title={searchBarTitle} />
        <div className="SearchForm-WrapperIcon" onClick={handleOpenSidebar}>
          <Icon className="SearchForm-Icon" type="Filter" />
          <Typography>{t("common.actions.filter")}</Typography>
        </div>
      </Header>
      <Sidebar
        isActive={isSidebarOpen.isGeneralFilters}
        onClose={handleBack}
        ref={sidebarRef}
        theme={theme}
      >
        <div
          className={clsx("SidebarContent SearchForm-SidebarContent", {
            ["theme-dark"]: theme === ETheme.Dark,
          })}
        >
          <div className="SidebarContent-Header">
            <form action={handleBack}>
              <button className="SidebarContent-Header-Save" type="submit">
                <Icon
                  className="SidebarContent-Header-Cancel"
                  type="ArrowBack"
                />
              </button>
            </form>
            <Typography>{t("common.titles.filtersGeneral")}</Typography>
            <div />
          </div>
          <div className="SidebarContent-List SearchForm-SidebarContent-List">
            <div className="SidebarContent-List-Item SearchForm-SidebarContent-List-Item">
              <RangeSlider
                isShowTooltip={true}
                label={t("common.titles.age")}
                max={DEFAULT_AGE_TO}
                min={DEFAULT_AGE_FROM}
                onChange={setAgeRange}
                step={1}
                value={ageRange}
              />
            </div>
            <div className="SidebarContent-List-Item SearchForm-SidebarContent-List-Item">
              <Select
                isSidebarOpen={isSidebarOpen.isSearchGender}
                label={t("common.form.field.searchGender")}
                headerTitle={
                  !isNil(searchGenderState) ? searchGenderState?.label : "--"
                }
                onHeaderClick={() =>
                  setIsSidebarOpen((prev) => ({
                    ...prev,
                    isSearchGender: true,
                  }))
                }
                theme={theme}
              >
                <SidebarContent
                  onSave={handleChangeSearchGender}
                  options={SEARCH_GENDER_MAPPING[lng]}
                  onCloseSidebar={handleCloseSidebarSecondary}
                  selectedItem={searchGenderState}
                  theme={theme}
                  title={t("common.form.field.searchGender")}
                />
              </Select>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

SearchFormComponent.displayName = "SearchForm";

export const SearchForm = memo(SearchFormComponent);
