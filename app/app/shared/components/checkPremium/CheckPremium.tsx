"use client";

import { type FC, memo, useEffect } from "react";
import { checkPremium } from "@/app/api/payment/checkPremium/domain";

type TProps = {
  isSession: boolean;
  onLoad: (isPremium: boolean) => void;
  telegramUserId: string;
};

const CheckPremiumComponent: FC<TProps> = ({
  isSession,
  onLoad,
  telegramUserId,
}) => {
  useEffect(() => {
    const getPremium = async () => {
      const premium = await checkPremium({ telegramUserId: telegramUserId });
      onLoad(premium.isPremium);
    };
    if (isSession) {
      getPremium();
    }
  }, [isSession, telegramUserId]);

  return <></>;
};

CheckPremiumComponent.displayName = "CheckPremium";

export const CheckPremium = memo(CheckPremiumComponent);
