"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type FC,
  memo,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import "react-toastify/dist/ReactToastify.css";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { CheckLike } from "@/app/shared/components/сheckLike";
import { CheckShortInfo } from "@/app/shared/components/checkShortInfo";
import { Footer } from "@/app/shared/components/footer";
import {
  AuthenticityTokenProvider,
  NavigatorProvider,
  ShortInfoProvider,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ToastContainer } from "@/app/uikit/components/toast/toastContainer";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
  lng: ELanguage;
  csrfToken: string;
};

const LayoutComponent: FC<TProps> = ({ children, lng, csrfToken }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const navigator = useNavigator({ lng });
  const { initDataCrypt, isSession, user, theme } = useTelegram();
  const [shortInfo, setShortInfo] = useState<TProfileShortInfo>(null);
  console.log("shortInfo: ", shortInfo);
  const telegramLanguageCode = shortInfo?.languageCode ?? user?.language_code;

  useEffect(() => {
    if (telegramLanguageCode && telegramLanguageCode !== lng) {
      const updatedPathname = pathname.replace(
        `/${lng}`,
        `/${telegramLanguageCode}`,
      );
      const url = `${updatedPathname}?${searchParams}`;
      router.push(telegramLanguageCode);
    }
  }, [telegramLanguageCode]);

  useEffect(() => {
    if (theme === ETheme.Dark) {
      document.body.classList.add("theme-dark");
    }
    return () => {
      document.body.classList.remove("theme-dark");
    };
  }, [theme]);

  const isFooter = useMemo(() => {
    const pathProfileAdd = createPath({
      route: ERoutes.ProfileAdd,
      lng,
    });
    const pathStarted = createPath({
      route: ERoutes.Started,
      lng,
    });
    const pathAgreement = createPath({
      route: ERoutes.Agreement,
      lng,
    });
    const pathPolicy = createPath({
      route: ERoutes.Policy,
      lng,
    });
    const pathOffer = createPath({
      route: ERoutes.Offer,
      lng,
    });
    const pathBuyPremium = createPath({
      route: ERoutes.BuyPremium,
      params: { telegramUserId: user?.id ?? "" },
      lng,
    });
    return (
      pathname !== pathProfileAdd &&
      pathname !== pathStarted &&
      pathname !== pathAgreement &&
      pathname !== pathPolicy &&
      pathname !== pathOffer &&
      pathname !== pathBuyPremium
    );
  }, [lng, pathname, user]);

  const handleCheckShortInfo = (shortInfo: TProfileShortInfo) => {
    setShortInfo(shortInfo);
  };

  return (
    <AuthenticityTokenProvider value={csrfToken}>
      <NavigatorProvider value={navigator}>
        <ShortInfoProvider value={shortInfo}>
          <div
            className={clsx("fixed-background", {
              ["theme-dark"]: theme === ETheme.Dark,
            })}
          />
          <div className="Layout">
            <ToastContainer />
            <div className="Layout-Content">{children}</div>
            {isFooter && (
              <Footer
                isPremium={shortInfo?.isPremium}
                isSession={isSession}
                lng={lng}
                theme={theme}
                user={user}
              />
            )}
            {/*<CheckLike*/}
            {/*  csrf={csrfToken}*/}
            {/*  initDataCrypt={initDataCrypt}*/}
            {/*  isSession={isSession}*/}
            {/*  lng={lng}*/}
            {/*  telegramUserId={(user?.id ?? "").toString()}*/}
            {/*/>*/}
            <CheckShortInfo
              isSession={isSession}
              onLoad={handleCheckShortInfo}
              telegramUserId={(user?.id ?? "").toString()}
            />
          </div>
        </ShortInfoProvider>
      </NavigatorProvider>
    </AuthenticityTokenProvider>
  );
};

LayoutComponent.displayName = "Layout";

export const Layout = memo(LayoutComponent);
