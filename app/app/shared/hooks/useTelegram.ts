"use client";

import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
import WebAppSDK from "@twa-dev/sdk";
import { type WebApp as WebAppTypes, type WebAppUser } from "@twa-dev/types";
import { encrypt } from "@/app/shared/utils/security";
import { ETheme } from "@/app/uikit/enums";

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
  const [tg, setTg] = useState<WebAppTypes | undefined>();
  const [initDataCrypt, setInitDataCrypt] = useState<string | undefined>();
  const [queryId, setQueryId] = useState<string | null>(null);
  const [theme, setTheme] = useState<ETheme>(ETheme.Light);
  const [user, setUser] = useState<TTelegramUser | null>(null);
  const telegram = typeof window !== "undefined" ? WebAppSDK : undefined;

  const mockData1 = {
    initData:
      "query_id=AAEzankUAAAAADNqeRQrHRSm&user=%7B%22id%22%3A343501363%2C%22first_name%22%3A%22%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%28%E2%97%95%E1%86%BA%E2%97%95%29%22%2C%22username%22%3A%22golang_js%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FjkBNT8VgdJucqRa8f90CHgGQ6IlzU38PwTTLn54NKLg.svg%22%7D&auth_date=1735277677&signature=8nJcdg_LzWqUZCfTg2nfScf5Jnap3DGs_07riHz7vrIuSqnAF7RcWGYVJIAwEfpFdD30Af7r_LGannBLxlHDBg&hash=a5ffb983d9605bdf4341be7e5f9828b8d17efcca3f15d5aecf8aa1d589896bc7",
  };

  const mockData2 = {
    initData:
      "query_id=AAEtEtErAwAAAC0S0SsUp_gt&user=%7B%22id%22%3A7177572909%2C%22first_name%22%3A%22%D0%96%D0%B5%D0%BD%D1%8F%22%2C%22last_name%22%3A%22%D0%94%D0%B5%D0%BC%D0%B8%D0%B4%D0%BE%D0%B2%22%2C%22username%22%3A%22boynotfound404%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fesufwwkha4nemTDY8JLY6VAJIm8Nxpmo7WtAvWACM0Q__Rfh8yage3X-RBQhqmjV.svg%22%7D&auth_date=1735277745&signature=yKeNe7vL30oB4mXiQCY87mpSJGHnfHCFKxc_uqw8gBjB66-Slpzk6PbvIng2XD8F2K9bF2Ap_8ZMfiuhC5YOBg&hash=c16d3fdf8276d3b2304ef7ffec8f936abf5718ccd446eeb5bb76f4e635db4bac",
  };

  const tgMock = mockData1;

  // For test without telegram auth
  useEffect(() => {
    const params = tgMock.initData;
    const initDataSearchParams = new URLSearchParams(params);
    const queryId = initDataSearchParams.get("query_id");
    const user = JSON.parse(initDataSearchParams.get("user") ?? "");
    setQueryId(queryId);
    const colorScheme = (telegram?.colorScheme as ETheme) ?? ETheme.Light;
    setTheme(colorScheme);
    setUser(user);
    const telegramInitDataCrypt = encrypt(params);
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
  //     const colorScheme = telegram.colorScheme as ETheme;
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
