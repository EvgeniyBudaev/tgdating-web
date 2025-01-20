"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkProfileExists } from "@/app/api/profile/checkProfile/domain";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { createPath } from "@/app/shared/utils";

type TProps = {
  lng: ELanguage;
};

type TUseCheckPermissions = (props: TProps) => void;

export const useCheckPermissions: TUseCheckPermissions = (props) => {
  const { lng } = props;
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useTelegram();
  const telegramUserId = (user?.id ?? "").toString();

  // Check authorization in telegram
  useEffect(() => {
    const checkExists = async () => {
      try {
        const response = await checkProfileExists({
          telegramUserId: telegramUserId,
        });
        const pathTelegram = createPath({
          route: ERoutes.Telegram,
          params: { telegramUserId },
          lng: lng,
        });
        if (response.isExists && pathname !== pathTelegram) {
          router.push(pathTelegram);
          router.refresh();
        }
        const pathStarted = createPath({
          route: ERoutes.Started,
          lng,
        });
        if (!response.isExists && pathname !== pathStarted) {
          router.push(pathStarted);
          router.refresh();
        }
      } catch (error) {
        console.error("CheckProfileExists error: ", error);
      }
    };
    telegramUserId && checkExists();
  }, [lng, telegramUserId]);
};
