"use client";

import isNil from "lodash/isNil";
import { useSearchParams } from "next/navigation";
import { type FC, useMemo, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { updateFilterAction } from "@/app/actions/filter/update/updateFilterAction";
import type { TFilter } from "@/app/api/profile/filter";
import { useTranslation } from "@/app/i18n/client";
import { Header } from "@/app/shared/components/header";
import { SearchBar } from "@/app/shared/components/searchBar";
import { SidebarContent } from "@/app/shared/components/sidebarContent";
import {
  AGE_FROM,
  AGE_TO,
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_SEARCH_GENDER,
  DISTANCE,
  LATITUDE,
  LONGITUDE,
  LOOKING_FOR,
  PAGE,
  SEARCH_GENDER,
  SESSION_ID,
  SIZE,
} from "@/app/shared/constants";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { ELanguage } from "@/app/shared/enums";
import { useQueryURL } from "@/app/shared/hooks";
import {
  SEARCH_BAR_SEARCH_GENDER_MAPPING,
  SEARCH_GENDER_MAPPING,
} from "@/app/shared/mapping/searchGender";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Icon } from "@/app/uikit/components/icon";
import { RangeSlider } from "@/app/uikit/components/rangeSlider";
import { Select, type TSelectOption } from "@/app/uikit/components/select";
import { Sidebar } from "@/app/uikit/components/sidebar";
import "./SearchForm.scss";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  lng: ELanguage;
  profileFilter?: TFilter;
};

export const SearchForm: FC<TProps> = ({ lng, profileFilter }) => {
  const { t } = useTranslation("index");
  const searchParams = useSearchParams();
  const sidebarRef = useRef(null);
  const { onGetQueryURL, onUpdateQueryURL } = useQueryURL({ lng });
  const [isSidebarOpen, setIsSidebarOpen] = useState({
    isGeneralFilters: false,
    isSearchGender: false,
  });
  const defaultAgeRangeFrom = searchParams.get(AGE_FROM)
    ? Number(searchParams.get(AGE_FROM))
    : DEFAULT_AGE_FROM;
  const defaultAgeRangeTo = searchParams.get(AGE_TO)
    ? Number(searchParams.get(AGE_TO))
    : DEFAULT_AGE_TO;
  const [ageRange, setAgeRange] = useState<any>([
    defaultAgeRangeFrom,
    defaultAgeRangeTo,
  ]);
  const [_, formAction] = useFormState(updateFilterAction, INITIAL_FORM_STATE);

  const searchGenderDefault = useMemo(() => {
    return SEARCH_GENDER_MAPPING[lng].find(
      (item) => item.value === profileFilter?.searchGender,
    );
  }, [lng, profileFilter?.searchGender]);

  const searchBarTitle = useMemo(() => {
    return SEARCH_BAR_SEARCH_GENDER_MAPPING[lng].find(
      (item) => item.value === profileFilter?.searchGender,
    )?.label;
  }, [lng, profileFilter?.searchGender]);

  const [searchGenderState, setSearchGenderState] = useState<
    TSelectOption | undefined
  >(searchGenderDefault);

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
    const ageRangeValueFrom = Array.isArray(ageRange) ? ageRange[0] : ageRange;
    const ageRangeValueTo = Array.isArray(ageRange) ? ageRange[1] : ageRange;
    onUpdateQueryURL?.({
      ageFrom: ageRangeValueFrom.toString(),
      ageTo: ageRangeValueTo.toString(),
      searchGender:
        (searchGenderState?.value ?? "").toString() ?? DEFAULT_SEARCH_GENDER,
    });
    const queryURL = onGetQueryURL?.();
    const formDataDto = new FormData();
    formDataDto.append(PAGE, queryURL?.page ?? "");
    formDataDto.append(SIZE, queryURL?.size ?? "");
    formDataDto.append(AGE_FROM, queryURL?.ageFrom ?? "");
    formDataDto.append(AGE_TO, queryURL?.ageTo ?? "");
    formDataDto.append(SEARCH_GENDER, queryURL?.searchGender ?? "");
    formDataDto.append(LOOKING_FOR, queryURL?.lookingFor ?? "");
    formDataDto.append(SESSION_ID, queryURL?.sessionId ?? "");
    formDataDto.append(DISTANCE, queryURL?.distance ?? "");
    formDataDto.append(LATITUDE, queryURL?.latitude ?? "");
    formDataDto.append(LONGITUDE, queryURL?.longitude ?? "");
    // @ts-ignore
    formAction(formDataDto);
    handleCloseSidebar();
  };

  return (
    <div className="SearchForm">
      <Header className="SearchForm-Header">
        <DropDown>
          <DropDown.Button>
            <div className="SearchForm-HeaderInner">
              <SearchBar title={searchBarTitle} />
              <div className="SearchForm-WrapperIcon">
                <Icon className="SearchForm-Icon" type="Filter" />
              </div>
            </div>
          </DropDown.Button>
          <DropDown.Panel>
            <>
              <div className="DropDown-Menu">
                <div className="DropDown-MenuItem" onClick={handleOpenSidebar}>
                  <Typography>{t("common.actions.filterSetup")}</Typography>
                </div>
              </div>
              <div className="DropDown-Menu">
                <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
                  <Typography>{t("common.actions.cancel")}</Typography>
                </div>
              </div>
            </>
          </DropDown.Panel>
        </DropDown>
      </Header>
      <Sidebar
        isActive={isSidebarOpen.isGeneralFilters}
        onClose={handleCloseSidebar}
        ref={sidebarRef}
      >
        <Header className="SidebarContent-Header">
          <Icon
            className="SidebarContent-Header-Cancel"
            onClick={handleCloseSidebar}
            type="ArrowBack"
          />
          <Typography>{t("common.titles.filtersGeneral")}</Typography>
          <form action={handleSubmit}>
            <button className="SidebarContent-Header-Save" type="submit">
              <Typography>{t("common.actions.save")}</Typography>
            </button>
          </form>
        </Header>
        <div className="SidebarContent-List">
          <div className="SidebarContent-List-Item">
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
          <div className="SidebarContent-List-Item">
            <Select
              isSidebarOpen={isSidebarOpen.isSearchGender}
              label={t("common.form.field.searchGender")}
              headerTitle={
                !isNil(searchGenderState) ? searchGenderState?.label : "--"
              }
              onHeaderClick={() =>
                setIsSidebarOpen((prev) => ({ ...prev, isSearchGender: true }))
              }
            >
              <SidebarContent
                onSave={handleChangeSearchGender}
                options={SEARCH_GENDER_MAPPING[lng]}
                onCloseSidebar={handleCloseSidebarSecondary}
                selectedItem={searchGenderState}
                title={t("common.form.field.searchGender")}
              />
            </Select>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};
