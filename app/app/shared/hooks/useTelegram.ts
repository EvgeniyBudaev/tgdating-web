"use client";

import isEmpty from "lodash/isEmpty";
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

  const mockData1 = {
    initData:
      "query_id=AAEzankUAAAAADNqeRT3qF__&user=%7B%22id%22%3A343501363%2C%22first_name%22%3A%22%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%28%E2%97%95%E1%86%BA%E2%97%95%29%22%2C%22username%22%3A%22golang_js%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FjkBNT8VgdJucqRa8f90CHgGQ6IlzU38PwTTLn54NKLg.svg%22%7D&auth_date=1735720280&signature=5BBKuV72a2x4apPYska2ySLlTF8c7WneOe008HrsdRSYnYjuGFaXTChTaV2hku-UmZgB-mH5-X-SqDyHZbpECQ&hash=08a7d882d44444edde19c943731bf52aa746f4071aa014faae8e8c6338631fa5",
  };

  const mockData2 = {
    initData:
      "query_id=AAEtEtErAwAAAC0S0SvRTNUn&user=%7B%22id%22%3A7177572909%2C%22first_name%22%3A%22%D0%96%D0%B5%D0%BD%D1%8F%22%2C%22last_name%22%3A%22%D0%94%D0%B5%D0%BC%D0%B8%D0%B4%D0%BE%D0%B2%22%2C%22username%22%3A%22boynotfound404%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fesufwwkha4nemTDY8JLY6VAJIm8Nxpmo7WtAvWACM0Q__Rfh8yage3X-RBQhqmjV.svg%22%7D&auth_date=1735720331&signature=z07UxPOCZ0WhKXsoRxzijQvsS7aiXANoQJVvLCP1I23xkzkWmQFqKPR1qinSAxcDx87HPcmoU0LnaEB0J_KQBg&hash=b2d6aa51406d474b2fdd070557bbbca1c096a8ceb25c82ca9143cc7d3accd45d",
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
    console.log("telegramInitDataCrypt: ", telegramInitDataCrypt);
    setInitDataCrypt(telegramInitDataCrypt);
  }, []);

  // useEffect(() => {
  //   if (telegram) {
  // telegram.expand(); //расширяем на все окно
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
