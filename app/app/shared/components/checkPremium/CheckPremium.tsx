"use client";

import { usePathname } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import { checkPremium } from "@/app/api/payment/checkPremium/domain";
import type { TCheckPremium } from "@/app/api/payment/checkPremium/types";

type TProps = {
  isSession: boolean;
  onLoad: (premium: TCheckPremium) => void;
  telegramUserId: string;
};

const CheckPremiumComponent: FC<TProps> = ({
  isSession,
  onLoad,
  telegramUserId,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    const getPremium = async () => {
      const premium = await checkPremium({ telegramUserId: telegramUserId });
      onLoad(premium);
    };
    if (isSession) {
      getPremium();
    }
  }, [isSession, telegramUserId, pathname, onLoad]);

  return <></>;
};

CheckPremiumComponent.displayName = "CheckPremium";

export const CheckPremium = memo(CheckPremiumComponent);
