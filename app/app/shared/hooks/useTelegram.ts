"use client";

import { useEffect, useState } from "react";
import WebAppSDK from "@twa-dev/sdk";
import { type WebApp as WebAppTypes, type WebAppUser } from "@twa-dev/types";
import { encrypt } from "@/app/shared/utils/security";

export type TUseTelegramResponse = {
  tg: WebAppTypes | undefined;
  user:
    | (WebAppUser & {
        added_to_attachment_menu?: boolean;
        allows_write_to_pm?: boolean;
      })
    | undefined;
  queryId: string | undefined;
  initDataCrypt: string | undefined;
  isSession: boolean;
};

type TUseTelegram = () => TUseTelegramResponse;

export const useTelegram: TUseTelegram = () => {
  const [tg, setTg] = useState<WebAppTypes | undefined>();
  const [initDataCrypt, setInitDataCrypt] = useState<string | undefined>();
  const telegram = typeof window !== "undefined" ? WebAppSDK : undefined;

  const mockData1 = {
    initData:
      "query_id=AAEzankUAAAAADNqeRSHrQIA&user=%7B%22id%22%3A343501363%2C%22first_name%22%3A%22%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%28%E2%97%95%E1%86%BA%E2%97%95%29%22%2C%22username%22%3A%22golang_js%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730715477&hash=dec99ac55920b376bc1f48b4a5e99609769ad810e6793b79ae4516c44c880438",
    initDataUnsafe: {
      query_id: "AAEzankUAAAAADNqeRRE2I2Y",
      user: {
        id: 343501363,
        first_name: "Евгений",
        last_name: "(◕ᆺ◕)",
        username: "golang_js",
        language_code: "ru",
        is_premium: true,
        allows_write_to_pm: true,
      },
      auth_date: "1730708675",
      hash: "c6bdc4664f15611e5631e5421d50dde3ed651f5aaefbec82a45ba852c1e3fb31",
    },
  };

  const mockData2 = {
    initData:
      "query_id=AAEtEtErAwAAAC0S0Sv17nGY&user=%7B%22id%22%3A7177572909%2C%22first_name%22%3A%22%D0%96%D0%B5%D0%BD%D1%8F%22%2C%22last_name%22%3A%22%D0%94%D0%B5%D0%BC%D0%B8%D0%B4%D0%BE%D0%B2%22%2C%22username%22%3A%22boynotfound404%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730715566&hash=c0d146e58733fb059e84f6c7c3ae4fcacb1bce29ff322e8b8c6841570e752b2a",
    initDataUnsafe: {
      query_id: "AAEtEtErAwAAAC0S0SvdCFYR",
      user: {
        id: 7177572909,
        first_name: "Женя",
        last_name: "Демидов",
        username: "boynotfound404",
        language_code: "ru",
        is_premium: true,
        allows_write_to_pm: true,
      },
      auth_date: "1730710447",
      hash: "14824f9e03b671272a2bcbfb5c95cb8d2689acf62d42305fff4ed1b2d017c7f9",
    },
  };

  const tgMock = mockData1;

  useEffect(() => {
    if (telegram) {
      setTg(telegram);
      const telegramInitDataCrypt = encrypt(tgMock.initData);
      setInitDataCrypt(telegramInitDataCrypt);
    }
  }, [telegram]);

  return {
    tg,
    user: tg?.initDataUnsafe?.user ?? tgMock.initDataUnsafe.user,
    queryId: tg?.initDataUnsafe?.query_id ?? tgMock.initDataUnsafe.query_id,
    initDataCrypt,
    isSession: tg?.initDataUnsafe?.user?.id
      ? !!tg?.initDataUnsafe?.user?.id
      : !!tgMock.initDataUnsafe.user.id,
  };

  // return {
  //   tg,
  //   user: tg?.initDataUnsafe?.user,
  //   queryId: tg?.initDataUnsafe?.query_id,
  //   initDataCrypt,
  //   isSession: !!tg?.initDataUnsafe?.user?.id,
  // };
};
