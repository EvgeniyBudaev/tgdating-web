"use client";

import { memo, type FC } from "react";
import { useTranslation } from "@/app/i18n/client";
import "./UnauthorizedPage.scss";

export const UnauthorizedPageComponent: FC = () => {
  const { t } = useTranslation("index");

  return (
    <div className="UnauthorizedPage">
      <div className="UnauthorizedPage-Inner">
        <div className="UnauthorizedPage-Title">
          {t("errorBoundary.common.unauthorized")}
        </div>
      </div>
    </div>
  );
};

UnauthorizedPageComponent.displayName = "UnauthorizedPage";

export const UnauthorizedPage = memo(UnauthorizedPageComponent);
