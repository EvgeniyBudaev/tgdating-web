"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import {
  type FC,
  memo,
  useActionState,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { EFilterUpdateFormFields } from "@/app/actions/filter/updateFilter/enums";
import { updateFilterAction } from "@/app/actions/filter/updateFilter/updateFilterAction";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { useTranslation } from "@/app/i18n/client";
import { SidebarContent } from "@/app/shared/components/sidebarContent";
import { SidebarContentControls } from "@/app/shared/components/sidebarContent/sidebarContentControls";
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { SidebarContentList } from "@/app/shared/components/sidebarContent/sidebarContentList";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_SEARCH_GENDER,
} from "@/app/shared/constants";
import { INITIAL_FORM_STATE } from "@/app/shared/constants";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { CheckboxCustom as Checkbox } from "@/app/uikit/components/checkboxCustom";
import { getSearchGenderByLocale } from "@/app/shared/mapping/searchGender";
import { RangeSlider } from "@/app/uikit/components/rangeSlider";
import { Select, TSelectOption } from "@/app/uikit/components/select";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SearchFormSidebar.scss";

type TProps = {
  isOpen: boolean;
  lng: ELanguage;
  onCloseSidebar?: () => void;
  profileShortInfo?: TProfileShortInfo;
  theme?: ETheme;
};

const SearchFormSidebarComponent: FC<TProps> = ({
  isOpen,
  lng,
  onCloseSidebar,
  profileShortInfo,
  theme,
}) => {
  const csrf = useAuthenticityTokenContext();
  const sidebarRef = useRef(null);
  const { initDataCrypt } = useTelegram();
  const { t } = useTranslation("index");

  const defaultAgeRangeFrom =
    profileShortInfo?.filter?.ageFrom ?? DEFAULT_AGE_FROM;
  const defaultAgeRangeTo = profileShortInfo?.filter?.ageTo ?? DEFAULT_AGE_TO;

  const [isOpenSidebarSearchGender, setIsOpenSidebarSearchGender] =
    useState(false);
  const [ageRange, setAgeRange] = useState<any>([
    defaultAgeRangeFrom,
    defaultAgeRangeTo,
  ]);
  const [_, formAction] = useActionState(
    updateFilterAction,
    INITIAL_FORM_STATE,
  );

  const searchGenderDefault = useMemo(() => {
    return getSearchGenderByLocale(lng).find(
      (item) => item.value === profileShortInfo?.filter?.searchGender,
    );
  }, [lng, profileShortInfo?.filter?.searchGender]);

  const [searchGenderState, setSearchGenderState] = useState<
    TSelectOption | undefined
  >(searchGenderDefault);

  const [isLiked, setIsLiked] = useState(profileShortInfo?.filter?.isLiked);
  const [isOnline, setIsOnline] = useState(profileShortInfo?.filter?.isOnline);

  const ageRangeValueFrom = Array.isArray(ageRange)
    ? ageRange[0].toString()
    : ageRange.toString();
  const ageRangeValueTo = Array.isArray(ageRange)
    ? ageRange[1].toString()
    : ageRange.toString();
  const searchGender =
    (searchGenderState?.value ?? "").toString() ?? DEFAULT_SEARCH_GENDER;

  const handleOpenSidebarSearchGender = useCallback(() => {
    setIsOpenSidebarSearchGender(true);
  }, []);

  const handleCloseSidebarSearchGender = useCallback(() => {
    setIsOpenSidebarSearchGender(false);
  }, []);

  const handleChangeSearchGender = (value?: TSelectOption) => {
    if (value) {
      value && setSearchGenderState(value);
      handleCloseSidebarSearchGender();
    }
  };

  const handleChangeIsOnline = (value: boolean) => {
    setIsOnline(value);
  };

  const handleChangeIsLiked = (value: boolean) => {
    setIsLiked(value);
  };

  const handleSubmit = () => {
    const formDataDto = new FormData();
    formDataDto.append(EFilterUpdateFormFields.AgeFrom, ageRangeValueFrom);
    formDataDto.append(EFilterUpdateFormFields.AgeTo, ageRangeValueTo);
    formDataDto.append(EFilterUpdateFormFields.SearchGender, searchGender);
    formDataDto.append(
      EFilterUpdateFormFields.IsLiked,
      (isLiked ?? false).toString(),
    );
    formDataDto.append(
      EFilterUpdateFormFields.IsOnline,
      (isOnline ?? false).toString(),
    );
    formDataDto.append(
      EFilterUpdateFormFields.TelegramUserId,
      profileShortInfo?.telegramUserId ?? "",
    );
    formDataDto.append(
      EFilterUpdateFormFields.TelegramInitDataCrypt,
      initDataCrypt ?? "",
    );
    formDataDto.append(EFilterUpdateFormFields.Csrf, csrf ?? "");
    // @ts-ignore
    formAction(formDataDto);
    onCloseSidebar?.();
  };

  return (
    <div
      className={clsx("SearchFormSidebar", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <Sidebar isActive={isOpen} ref={sidebarRef} theme={theme}>
        <div
          className={clsx("SidebarContent", {
            ["theme-dark"]: theme === ETheme.Dark,
          })}
        >
          <form action={handleSubmit} className="SearchForm-Form">
            <SidebarContentHeader
              theme={theme}
              title={t("common.titles.filtersGeneral")}
            />
            <SidebarContentList
              className="SearchFormSidebar-SidebarContentList"
              theme={theme}
            >
              <SidebarContentListItem
                className="SearchFormSidebar-SidebarContentListItem"
                theme={theme}
              >
                <RangeSlider
                  classes={{ root: "SearchForm-RangeSlider" }}
                  isShowTooltip={true}
                  label={t("common.titles.age")}
                  max={DEFAULT_AGE_TO}
                  min={DEFAULT_AGE_FROM}
                  onChange={setAgeRange}
                  step={1}
                  value={ageRange}
                />
              </SidebarContentListItem>
              <SidebarContentListItem
                className="SearchFormSidebar-SidebarContentListItem"
                theme={theme}
              >
                <Select
                  isSidebarOpen={isOpenSidebarSearchGender}
                  label={t("common.form.field.searchGender")}
                  headerTitle={
                    !isNil(searchGenderState) ? searchGenderState?.label : "--"
                  }
                  onHeaderClick={handleOpenSidebarSearchGender}
                  theme={theme}
                >
                  <SidebarContent
                    onCloseSidebar={handleCloseSidebarSearchGender}
                    onSave={handleChangeSearchGender}
                    options={getSearchGenderByLocale(lng)}
                    selectedItem={searchGenderState}
                    theme={theme}
                    title={t("common.form.field.searchGender")}
                    titleButton={t("common.actions.apply")}
                  />
                </Select>
              </SidebarContentListItem>
              <SidebarContentListItem
                className="SearchFormSidebar-SidebarContentListItem"
                theme={theme}
              >
                <Checkbox
                  checked={isOnline}
                  label={t("common.form.field.isOnline")}
                  name={EFilterUpdateFormFields.IsOnline}
                  onChange={handleChangeIsOnline}
                />
              </SidebarContentListItem>
              <SidebarContentListItem
                className="SearchFormSidebar-SidebarContentListItem"
                theme={theme}
              >
                <Checkbox
                  checked={isLiked}
                  label={t("common.form.field.isLiked")}
                  name={EFilterUpdateFormFields.IsLiked}
                  onChange={handleChangeIsLiked}
                />
              </SidebarContentListItem>
            </SidebarContentList>
            <SidebarContentControls
              onCancel={onCloseSidebar}
              theme={theme}
              title={t("common.actions.apply")}
              typeButton="submit"
            />
          </form>
        </div>
      </Sidebar>
    </div>
  );
};

SearchFormSidebarComponent.displayName = "SearchFormSidebar";

export const SearchFormSidebar = memo(SearchFormSidebarComponent);
