"use client";

import { useEffect, useState } from "react";
import WebAppSDK from "@twa-dev/sdk";
import { type WebApp as WebAppTypes, type WebAppUser } from "@twa-dev/types";

export type TUseTelegramResponse = {
  tg: WebAppTypes | undefined;
  chatId: number | undefined;
  user:
    | (WebAppUser & {
        added_to_attachment_menu?: boolean;
        allows_write_to_pm?: boolean;
      })
    | undefined;
  queryId: string | undefined;
  isSession: boolean;
};

type TUseTelegram = () => TUseTelegramResponse;

export const useTelegram: TUseTelegram = () => {
  const [tg, setTg] = useState<WebAppTypes | undefined>();
  const telegram = typeof window !== "undefined" ? WebAppSDK : undefined;

  useEffect(() => {
    setTg(telegram);
  }, [telegram]);

  const mockData1 = {
    user: {
      id: 343501363,
      first_name: "Евгений",
      last_name: "(◕ᆺ◕)",
      username: "golang_js",
      language_code: "ru",
      is_premium: true,
      allows_write_to_pm: true,
    },
    query_id: "AAez",
  };

  const mockData2 = {
    user: {
      id: 2,
      first_name: "Анна",
      last_name: "Миронова",
      username: "mironova",
      language_code: "ru",
      is_premium: true,
      allows_write_to_pm: true,
    },
    query_id: "WwwwRq",
  };

  const mockData3 = {
    user: {
      id: 7177572909,
      first_name: "Женя",
      last_name: "Демидов",
      username: "boynotfound404",
      language_code: "ru",
      is_premium: false,
      allows_write_to_pm: true,
    },
    query_id: "SkeH",
  };

  const initDataUnsafeMockData = mockData1;

  return {
    tg,
    chatId: tg?.initDataUnsafe?.chat?.id,
    user: tg?.initDataUnsafe?.user ?? initDataUnsafeMockData.user,
    queryId: tg?.initDataUnsafe?.query_id ?? initDataUnsafeMockData.query_id,
    isSession: tg?.initDataUnsafe?.user?.id
      ? !!tg?.initDataUnsafe?.user?.id
      : !!initDataUnsafeMockData.user.id,
  };

  // return {
  //   tg,
  //   chatId: tg?.initDataUnsafe?.chat?.id,
  //   user: tg?.initDataUnsafe?.user,
  //   queryId: tg?.initDataUnsafe?.query_id,
  //   isSession: !!tg?.initDataUnsafe?.user?.id,
  // };
};
