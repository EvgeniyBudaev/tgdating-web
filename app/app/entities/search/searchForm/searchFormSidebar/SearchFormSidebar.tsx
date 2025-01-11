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
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { SidebarContentList } from "@/app/shared/components/sidebarContent/sidebarContentList";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_SEARCH_GENDER,
} from "@/app/shared/constants";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { SEARCH_GENDER_MAPPING } from "@/app/shared/mapping/searchGender";
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
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const sidebarRef = useRef(null);
  const { initDataCrypt } = useTelegram();
  const { t } = useTranslation("index");

  const defaultAgeRangeFrom = profileShortInfo?.ageFrom ?? DEFAULT_AGE_FROM;
  const defaultAgeRangeTo = profileShortInfo?.ageTo ?? DEFAULT_AGE_TO;

  const [isOpenSidebarSearchGender, setIsOpenSidebarSearchGender] =
    useState(false);
  const [ageRange, setAgeRange] = useState<any>([
    defaultAgeRangeFrom,
    defaultAgeRangeTo,
  ]);
  const [state, formAction] = useActionState(
    updateFilterAction,
    INITIAL_FORM_STATE,
  );

  const searchGenderDefault = useMemo(() => {
    return SEARCH_GENDER_MAPPING[lng].find(
      (item) => item.value === profileShortInfo?.searchGender,
    );
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
      initDataCrypt ?? "",
    );
    formDataDto.append(EFilterUpdateFormFields.Csrf, csrf ?? "");
    // @ts-ignore
    formAction(formDataDto);
    onCloseSidebar?.();
  };

  const handleBack = () => {
    // @ts-ignore
    if ("click" in buttonSubmitRef.current) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
    return;
  };

  return (
    <div className="SearchFormSidebar">
      <Sidebar isActive={isOpen} ref={sidebarRef} theme={theme}>
        <div
          className={clsx("SidebarContent", {
            ["theme-dark"]: theme === ETheme.Dark,
          })}
        >
          <form action={handleSubmit} className="SearchForm-Form">
            <SidebarContentHeader
              onClick={handleBack}
              theme={theme}
              title={t("common.titles.filtersGeneral")}
            />
            <input hidden={true} ref={buttonSubmitRef} type="submit" />
          </form>
          <SidebarContentList
            className="SearchFormSidebar-SidebarContentList"
            theme={theme}
          >
            <SidebarContentListItem theme={theme}>
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
            <SidebarContentListItem theme={theme}>
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
                  onSave={handleChangeSearchGender}
                  options={SEARCH_GENDER_MAPPING[lng]}
                  onCloseSidebar={handleCloseSidebarSearchGender}
                  selectedItem={searchGenderState}
                  theme={theme}
                  title={t("common.form.field.searchGender")}
                />
              </Select>
            </SidebarContentListItem>
          </SidebarContentList>
        </div>
      </Sidebar>
    </div>
  );
};

SearchFormSidebarComponent.displayName = "SearchFormSidebar";

export const SearchFormSidebar = memo(SearchFormSidebarComponent);
