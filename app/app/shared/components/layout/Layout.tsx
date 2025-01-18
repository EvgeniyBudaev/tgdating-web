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
import { CheckLike } from "@/app/shared/components/сheckLike";
import { Footer } from "@/app/shared/components/footer";
import {
  AuthenticityTokenProvider,
  NavigatorProvider,
  PremiumProvider,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ToastContainer } from "@/app/uikit/components/toast/toastContainer";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Layout.scss";
import { CheckPremium } from "@/app/shared/components/checkPremium";

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
  const telegramLanguageCode = user?.language_code;
  const [isPremium, setIsPremium] = useState(false);

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
    return (
      pathname !== pathProfileAdd &&
      pathname !== pathStarted &&
      pathname !== pathAgreement &&
      pathname !== pathPolicy
    );
  }, [lng, pathname]);

  const handleCheckPremium = (isPremium: boolean) => {
    setIsPremium(isPremium);
  };

  return (
    <AuthenticityTokenProvider value={csrfToken}>
      <NavigatorProvider value={navigator}>
        <PremiumProvider value={{ isPremium }}>
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
            <CheckPremium
              isSession={isSession}
              onLoad={handleCheckPremium}
              telegramUserId={(user?.id ?? "").toString()}
            />
          </div>
        </PremiumProvider>
      </NavigatorProvider>
    </AuthenticityTokenProvider>
  );
};

LayoutComponent.displayName = "Layout";

export const Layout = memo(LayoutComponent);
