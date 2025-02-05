"use client";

import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import type { TMainPageProps } from "@/app/pages/mainPage/types";
import { ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { notification } from "@/app/uikit/utils";

export const useMainPage = (props: TMainPageProps) => {
  const { isExistUser, isManyRequest, lng, telegramUserId } = props;
  const router = useRouter();
  const { query } = useNavigatorQuery();
  const { t } = useTranslation("index");

  useEffect(() => {
    if (isManyRequest) {
      notification({
        title: t("errorBoundary.common.manyRequest"),
        type: "error",
      });
    }
  }, [isManyRequest]);

  useEffect(() => {
    if (!isEmpty(query)) {
      if (!isExistUser) {
        const path = createPath(
          {
            route: ERoutes.Started,
            lng,
          },
          query,
        );
        router.push(path);
        router.refresh();
      } else {
        const path = createPath(
          {
            route: ERoutes.Telegram,
            params: { telegramUserId },
            lng,
          },
          query,
        );
        router.push(path);
        router.refresh();
      }
    }
  }, [isExistUser, lng, telegramUserId, query]);

  return {};
};
