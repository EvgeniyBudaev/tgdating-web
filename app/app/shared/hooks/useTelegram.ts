"use client";

import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
import WebAppSDK from "@twa-dev/sdk";
import { type WebApp as WebAppTypes, type WebAppUser } from "@twa-dev/types";
import { encrypt } from "@/app/shared/utils/security";

type TTelegramUser = (WebAppUser & {
    added_to_attachment_menu?: boolean;
    allows_write_to_pm?: boolean;
  })
  | null |undefined;

export type TUseTelegramResponse = {
  tg: WebAppTypes | undefined;
  user: TTelegramUser;
  queryId: string | null | undefined;
  initDataCrypt: string | undefined;
  isSession: boolean;
};

type TUseTelegram = () => TUseTelegramResponse;

export const useTelegram: TUseTelegram = () => {
  const [tg, setTg] = useState<WebAppTypes | undefined>();
  const [initDataCrypt, setInitDataCrypt] = useState<string | undefined>();
  const [queryId, setQueryId] = useState<string | null>(null);
  const [user, setUser] = useState<TTelegramUser | null>(null);
  const telegram = typeof window !== "undefined" ? WebAppSDK : undefined;

  const mockData1 = {
    initData:
      "query_id=AAEzankUAAAAADNqeRTRgu1Q&user=%7B%22id%22%3A343501363%2C%22first_name%22%3A%22%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%28%E2%97%95%E1%86%BA%E2%97%95%29%22%2C%22username%22%3A%22golang_js%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FjkBNT8VgdJucqRa8f90CHgGQ6IlzU38PwTTLn54NKLg.svg%22%7D&auth_date=1732635458&signature=5avGjVC2QIDFwf7QqTVaue3PynTtxnlNW3gR8-ntGPgkXLn8wzFBacCVaaSZzRviXl2Xf8srG4zMlQVxp_QkAQ&hash=711bde052fcd92afe1cf398f5ab886c05c93496ab51c4b088f294713ea81cd1e",
  };

  const mockData2 = {
    initData:
      "query_id=AAEtEtErAwAAAC0S0Svdg4Cf&user=%7B%22id%22%3A7177572909%2C%22first_name%22%3A%22%D0%96%D0%B5%D0%BD%D1%8F%22%2C%22last_name%22%3A%22%D0%94%D0%B5%D0%BC%D0%B8%D0%B4%D0%BE%D0%B2%22%2C%22username%22%3A%22boynotfound404%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fesufwwkha4nemTDY8JLY6VAJIm8Nxpmo7WtAvWACM0Q__Rfh8yage3X-RBQhqmjV.svg%22%7D&auth_date=1732635518&signature=Y-9Ss4QYl6pnHnedgVpdc0K1B2ruZi4fWz36GOsc8EX_GXozLArY_P1GMfnEPB7Yjoo56mPLZachZo4fi0lyDg&hash=405b47601ce5b844b0ed5ba495b387ae765880de0c1a0fa5e8eb602185627c95",
  };

  const tgMock = mockData2;

  useEffect(() => {
    const params = tgMock.initData;
    const initDataSearchParams =  new URLSearchParams(params);
    const queryId = initDataSearchParams.get("query_id");
    const user = JSON.parse(initDataSearchParams.get("user") ?? "");
    setQueryId(queryId);
    setUser(user);
    const telegramInitDataCrypt = encrypt(params);
    setInitDataCrypt(telegramInitDataCrypt);
  }, []);

  // useEffect(() => {
  //   if (telegram) {
  //     const params = tgMock.initData;
  //     const initDataSearchParams =  new URLSearchParams(params);
  //     const queryId = initDataSearchParams.get("query_id");
  //     const user = JSON.parse(initDataSearchParams.get("user") ?? "");
  //     setTg(telegram);
  //     setQueryId(queryId);
  //     setUser(user);
  //     const telegramInitDataCrypt = encrypt(params);
  //     setInitDataCrypt(telegramInitDataCrypt);
  //   }
  // }, [telegram]);

  return {
    tg,
    user,
    queryId,
    initDataCrypt,
    isSession: !!user?.id,
  };
};
