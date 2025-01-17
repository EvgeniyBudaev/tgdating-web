import { FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Typography } from "@/app/uikit/components/typography";
import "./StartedPageInfo.scss";
import Link from "next/link";
import { createPath } from "@/app/shared/utils";
import { ELanguage, ERoutes } from "@/app/shared/enums";

type TProps = {
  lng: ELanguage;
};

const StartedPageInfoComponent: FC<TProps> = ({ lng }) => {
  const { t } = useTranslation("index");

  return (
    <div className="StartedPageInfo">
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
          href={createPath({
            route: ERoutes.Agreement,
            lng,
          })}
        >
          <Typography>{t("common.titles.userAgreement")}&nbsp;</Typography>
        </Link>
        <Typography>{t("common.titles.and")}&nbsp;</Typography>
        <Link
          className="StartedPageInfo-Link"
          href={createPath({
            route: ERoutes.Policy,
            lng,
          })}
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
