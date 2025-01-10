"use client";

import { useEffect, useState } from "react";
import WebAppSDK from "@twa-dev/sdk";
import { type WebApp as WebAppTypes, type WebAppUser } from "@twa-dev/types";
import { encrypt } from "@/app/shared/utils/security";
import { ETheme } from "@/app/uikit/enums/theme";

export type TTelegramUser =
  | (WebAppUser & {
      added_to_attachment_menu?: boolean;
      allows_write_to_pm?: boolean;
    })
  | null
  | undefined;

export type TUseTelegramResponse = {
  initDataCrypt: string | undefined;
  isSession: boolean;
  tg: WebAppTypes | undefined;
  theme: ETheme;
  queryId: string | null | undefined;
  user: TTelegramUser;
};

type TUseTelegram = () => TUseTelegramResponse;

export const useTelegram: TUseTelegram = () => {
  const telegram = typeof window !== "undefined" ? WebAppSDK : undefined;
  //const colorScheme = (telegram?.colorScheme as ETheme) ?? ETheme.Dark;
  const colorScheme = ETheme.Dark;
  const [tg, setTg] = useState<WebAppTypes | undefined>();
  const [initDataCrypt, setInitDataCrypt] = useState<string | undefined>();
  const [queryId, setQueryId] = useState<string | null>(null);
  const [theme, setTheme] = useState<ETheme>(colorScheme);
  const [user, setUser] = useState<TTelegramUser | null>(null);
  // console.log("window?.Telegram:", window?.Telegram);

  const mockData1 = {
    initData:
      "query_id=AAEzankUAAAAADNqeRT8WOIx&user=%7B%22id%22%3A343501363%2C%22first_name%22%3A%22Evgeniy%22%2C%22last_name%22%3A%22%28%E2%97%95%E1%86%BA%E2%97%95%29%22%2C%22username%22%3A%22golang_js%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FjkBNT8VgdJucqRa8f90CHgGQ6IlzU38PwTTLn54NKLg.svg%22%7D&auth_date=1736343488&signature=XtXKIkaHjdsxKYN3apWaakWdwMyBWa8TlEC5hKVjOxSe43jYgyQ7JwKZIeWYq6kZtn0jkPGa7F2qeZoMyB2cBw&hash=48db3de7d9349998b2ac059662d17c3be3a96f81e68d9ac6bdfca70970276a1e",
  };

  const mockData2 = {
    initData:
      "query_id=AAHLJYNkAwAAAMslg2SmBRVR&user=%7B%22id%22%3A8128767435%2C%22first_name%22%3A%22SE%22%2C%22last_name%22%3A%22407%22%2C%22username%22%3A%22se407%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FN17I-yNEo0GwYXKEot91PO35WfuXNDpHU0Usv591SKUxmvNZp6OxM1OK-3ogVQcY.svg%22%7D&auth_date=1736343640&signature=XRKghfEJcl6pCOJTm-JY_RWKl38peacL_YfbiXpWgd8aDkLDD-dnLclj4GxrqfW6PIWcHVhpyn3y2t3gn__jDA&hash=2b4a9f7c148c15b9eff92a9c3bfb56c9ae658942570184b8e2e2e23fe08a8f3c",
  };

  const tgMock = mockData1;
  // For test without telegram auth
  useEffect(() => {
    const params = tgMock.initData;
    const initDataSearchParams = new URLSearchParams(params);
    const queryId = initDataSearchParams.get("query_id");
    const user = JSON.parse(initDataSearchParams.get("user") ?? "");
    setQueryId(queryId);
    setTheme(colorScheme);
    setUser(user);
    const telegramInitDataCrypt = encrypt(params);
    setInitDataCrypt(telegramInitDataCrypt);
    // https://core.telegram.org/bots/webapps#locationmanager
    // telegram?.LocationManager.init();
  }, []);

  // useEffect(() => {
  //   if (telegram) {
  //     telegram.expand(); //расширяем на все окно
  //     const params = telegram.initData;
  //     const initDataSearchParams =  new URLSearchParams(params);
  //     const queryId = initDataSearchParams.get("query_id");
  //     const user = JSON.parse(initDataSearchParams.get("user") ?? "");
  //     setTg(telegram);
  //     setQueryId(queryId);
  //     setTheme(colorScheme);
  //     setUser(user);
  //     const telegramInitDataCrypt = encrypt(params);
  //     setInitDataCrypt(telegramInitDataCrypt);
  //   }
  // }, [telegram]);

  return {
    initDataCrypt,
    isSession: !!user?.id,
    tg,
    theme,
    queryId,
    user,
  };
};
