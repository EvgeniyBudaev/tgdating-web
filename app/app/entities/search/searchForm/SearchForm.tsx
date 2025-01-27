"use client";

import clsx from "clsx";
import { type FC, memo, useCallback, useMemo, useState } from "react";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { SearchFormSidebar } from "@/app/entities/search/searchForm/searchFormSidebar";
import { useTranslation } from "@/app/i18n/client";
import { SearchBar } from "@/app/shared/components/searchBar";
import { ELanguage } from "@/app/shared/enums";
import { getSearchBarSearchGenderByLocale } from "@/app/shared/mapping/searchGender";
import { Gradient } from "@/app/uikit/components/gradient";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SearchForm.scss";

type TProps = {
  lng: ELanguage;
  profileShortInfo?: TProfileShortInfo;
  theme?: ETheme;
};

const SearchFormComponent: FC<TProps> = ({ lng, profileShortInfo, theme }) => {
  const { t } = useTranslation("index");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const searchBarTitle = useMemo(() => {
    return getSearchBarSearchGenderByLocale(lng).find(
      (item) => item.value === profileShortInfo?.searchGender,
    )?.label;
  }, [lng, profileShortInfo?.searchGender]);

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div
      className={clsx("SearchForm", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <Gradient />
      <div className="SearchForm-Header">
        <SearchBar theme={theme} title={searchBarTitle} />
        <div className="SearchForm-WrapperIcon" onClick={handleOpenSidebar}>
          <Icon className="SearchForm-Icon" type="Filter" />
          <Typography>{t("common.actions.filter")}</Typography>
        </div>
      </div>
      <SearchFormSidebar
        isOpen={isSidebarOpen}
        lng={lng}
        onCloseSidebar={handleCloseSidebar}
        profileShortInfo={profileShortInfo}
        theme={theme}
      />
    </div>
  );
};

SearchFormComponent.displayName = "SearchForm";

export const SearchForm = memo(SearchFormComponent);
