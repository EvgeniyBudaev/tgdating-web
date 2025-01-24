"use client";

import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { type FC, memo } from "react";
import type { TBlockedList } from "@/app/api/block/getBlockedList/types";
import { useTranslation } from "@/app/i18n/client";
import { BlockedListImage } from "@/app/pages/blockedListPage/blockedListImage";
import { Container } from "@/app/shared/components/container";
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { useShortInfoContext } from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./BlockedListPage.scss";

type TProps = {
  blockedList?: TBlockedList;
  lng: ELanguage;
  telegramUserId: string;
};

const BlockedListPageComponent: FC<TProps> = ({
  blockedList,
  lng,
  telegramUserId,
}) => {
  const shortInfo = useShortInfoContext();
  const { theme } = useTelegram();
  const { t } = useTranslation("index");

  return (
    <section
      className={clsx("BlockedListPage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <SidebarContentHeader
        theme={theme}
        title={t("common.titles.blockedList")}
      />
      <div className="BlockedListPage-Inner">
        <div className="BlockedListPage-Background" />
        {isEmpty(blockedList?.content) && (
          <Container>
            <div className="BlockedListPage-IsEmpty">
              <Typography>{t("common.titles.isEmptyBlockedList")}</Typography>
            </div>
          </Container>
        )}
        {!isEmpty(blockedList?.content) && (
          <>
            <div className="BlockedListPage-List">
              {(blockedList?.content ?? []).map((item, index) => {
                const isBlur = !shortInfo?.isPremium;
                return (
                  <BlockedListImage
                    blockedTelegramUserId={item.blockedTelegramUserId}
                    imageUrl={item.url}
                    isBlur={isBlur}
                    key={item.blockedTelegramUserId}
                    lng={lng}
                    telegramUserId={telegramUserId}
                    theme={theme}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

BlockedListPageComponent.displayName = "BlockedListPage";

export const BlockedListPage = memo(BlockedListPageComponent);
