"use client";

import isEmpty from "lodash/isEmpty";
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
    | null |undefined;
  queryId: string | null | undefined;
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
      "query_id=AAEzankUAAAAADNqeRSuge92&user=%7B%22id%22%3A343501363%2C%22first_name%22%3A%22%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%28%E2%97%95%E1%86%BA%E2%97%95%29%22%2C%22username%22%3A%22golang_js%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FjkBNT8VgdJucqRa8f90CHgGQ6IlzU38PwTTLn54NKLg.svg%22%7D&auth_date=1732011575&signature=nAlGLBCbHQIqSRzQ8kGeokdH7_NXAQK7LHH83lbMNsndWOzaqbPuqRGjl1fuw5R6pUQamtyb41LAQqbjBpqyCA&hash=2b2ed67a637a44d27e2052e975aee191efe1677564390d513d4f5d3e6caebc02",
    initDataUnsafe: {
      query_id: "AAEzankUAAAAADNqeRShiKRd",
      user: {
        id: 343501363,
        first_name: "Евгений",
        last_name: "(◕ᆺ◕)",
        username: "golang_js",
        language_code: "ru",
        is_premium: true,
        allows_write_to_pm: true,
      },
      auth_date: "1730864951",
      hash: "a3765196838337e2db92490366eb9a707124ab0b35174b54174d54735b02671b",
    },
  };

  const mockData2 = {
    initData:
      "query_id=AAEtEtErAwAAAC0S0StJUZM4&user=%7B%22id%22%3A7177572909%2C%22first_name%22%3A%22%D0%96%D0%B5%D0%BD%D1%8F%22%2C%22last_name%22%3A%22%D0%94%D0%B5%D0%BC%D0%B8%D0%B4%D0%BE%D0%B2%22%2C%22username%22%3A%22boynotfound404%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fesufwwkha4nemTDY8JLY6VAJIm8Nxpmo7WtAvWACM0Q__Rfh8yage3X-RBQhqmjV.svg%22%7D&auth_date=1732012504&signature=ufUVrS647fnVxV_Y8Uu8IHo79ibrs1X-XLmFZkef5hzyLNLvMgU5j4eMoki0H8t6c4oiqmwLhcgDlBU6a6joBw&hash=745ef48f190e8850a9cc07fd12d27612152f5b96d89c8a460a29f80124e4fe8d",
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

  const tgMock = mockData2;

  const params = tg && !isEmpty(tg?.initData) ? tg.initData : tgMock.initData;
  const initDataSearchParams =  new URLSearchParams(params);
  const queryId = initDataSearchParams.get("query_id");
  const user = JSON.parse(initDataSearchParams.get("user") ?? "");

  useEffect(() => {
    if (telegram) {
      setTg(telegram);
      const telegramInitDataCrypt = encrypt(tgMock?.initData);
      setInitDataCrypt(telegramInitDataCrypt);
    }
  }, [telegram]);

  return {
    tg,
    user,
    queryId,
    initDataCrypt,
    isSession: !!user?.id,
  };

  // return {
  //   tg,
  //   user: tg?.initDataUnsafe?.user,
  //   queryId: tg?.initDataUnsafe?.query_id,
  //   initDataCrypt,
  //   isSession: !!tg?.initDataUnsafe?.user?.id,
  // };
};
