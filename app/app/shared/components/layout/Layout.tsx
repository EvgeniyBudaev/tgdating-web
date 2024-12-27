"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FC, memo, type ReactNode, useEffect, useMemo } from "react";
import { Footer } from "@/app/shared/components/footer";
import {
  AuthenticityTokenProvider,
  NavigatorProvider,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ETheme } from "@/app/uikit/enums";
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
  const { isSession, user, theme } = useTelegram();
  const telegramLanguageCode = user?.language_code;

  useEffect(() => {
    if (telegramLanguageCode && telegramLanguageCode !== lng) {
      const updatedPathname = pathname.replace(
        `/${lng}`,
        `/${telegramLanguageCode}`,
      );
      const url = `${updatedPathname}?${searchParams}`;
      router.push(url);
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
    const path = createPath({
      route: ERoutes.ProfileAdd,
      lng,
    });
    return pathname !== path;
  }, [lng, pathname]);

  return (
    <AuthenticityTokenProvider value={csrfToken}>
      <NavigatorProvider value={navigator}>
        <div className="Layout">
          <div className="Layout-Content">{children}</div>
          {isFooter && (
            <Footer isSession={isSession} lng={lng} theme={theme} user={user} />
          )}
        </div>
      </NavigatorProvider>
    </AuthenticityTokenProvider>
  );
};

LayoutComponent.displayName = "Layout";

export const Layout = memo(LayoutComponent);
