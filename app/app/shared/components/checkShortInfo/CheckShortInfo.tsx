"use client";

import { usePathname } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import { getProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/domain";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { notification } from "@/app/uikit/utils";

type TProps = {
  isSession: boolean;
  onLoad: (shortInfo: TProfileShortInfo) => void;
  telegramUserId: string;
};

const CheckShortInfoComponent: FC<TProps> = ({
  isSession,
  onLoad,
  telegramUserId,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const getShortInfo = async () => {
        const shortInfo = await getProfileShortInfo({
          telegramUserId: telegramUserId,
        });
        onLoad(shortInfo);
      };
      if (isSession) {
        getShortInfo();
      }
    } catch (error) {
      notification({
        title: error,
        type: "error",
      });
    }
  }, [isSession, telegramUserId, pathname]);

  return <></>;
};

CheckShortInfoComponent.displayName = "CheckShortInfo";

export const CheckShortInfo = memo(CheckShortInfoComponent);
