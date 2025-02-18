"use client";

import Link from "next/link";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Typography } from "@/app/uikit/components/typography";
import "./StartedPageInfo.scss";

type TProps = {
  lng: ELanguage;
};

const StartedPageInfoComponent: FC<TProps> = ({ lng }) => {
  const { query } = useNavigatorQuery();
  const { t } = useTranslation("index");

  return (
    <div className="StartedPageInfo">
      <div className="StartedPageInfo-Block">
        <Typography>{t("common.titles.minRequiredAge")}</Typography>
      </div>
      <div className="StartedPageInfo-Block">
        <Typography>{t("common.titles.remember")}</Typography>
      </div>
      <div className="StartedPageInfo-Block">
        <Typography>{t("common.titles.notRequestPersonal")}</Typography>
      </div>
      <div className="StartedPageInfo-Block">
        <Typography>{t("common.titles.doYouFindLove")}</Typography>
      </div>
      <div className="StartedPageInfo-Block">
        <Typography>{t("common.titles.byContinuing")}&nbsp;</Typography>
        <Link
          className="StartedPageInfo-Link"
          href={createPath(
            {
              route: ERoutes.Agreement,
              lng,
            },
            query,
          )}
        >
          <Typography>{t("common.titles.userAgreement")}&nbsp;</Typography>
        </Link>
        <Typography>{t("common.titles.and")}&nbsp;</Typography>
        <Link
          className="StartedPageInfo-Link"
          href={createPath(
            {
              route: ERoutes.Policy,
              lng,
            },
            query,
          )}
        >
          <Typography>{t("common.titles.privacyPolicy")}</Typography>
        </Link>
        .
      </div>
    </div>
  );
};

StartedPageInfoComponent.displayName = "StartedPageInfo";

export const StartedPageInfo = memo(StartedPageInfoComponent);
