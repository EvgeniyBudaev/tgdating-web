"use client";

import { useRouter } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import { checkProfileExists } from "@/app/api/profile/checkProfile/domain";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
};

const CheckProfileExistsComponent: FC<TProps> = ({ lng, telegramUserId }) => {
  const router = useRouter();

  useEffect(() => {
    const checkExists = async () => {
      try {
        const response = await checkProfileExists({
          telegramUserId: telegramUserId,
        });
        if (response.isExists) {
          const path = createPath({
            route: ERoutes.Telegram,
            params: { telegramUserId },
            lng: lng,
          });
          router.push(path);
          router.refresh();
        }
        if (!response.isExists) {
          const path = createPath({
            route: ERoutes.Started,
            lng: lng,
          });
          router.push(path);
          router.refresh();
        }
      } catch (error) {
        console.error("CheckProfileExists error: ", error);
      }
    };
    telegramUserId && checkExists();
  }, [lng, telegramUserId]);

  return <></>;
};

CheckProfileExistsComponent.displayName = "CheckProfileExists";

export const CheckProfileExists = memo(CheckProfileExistsComponent);
