"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FC, memo, type ReactNode, useEffect, useMemo } from "react";
import { Footer } from "@/app/shared/components/footer";
import { NavigatorProvider } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
  lng: ELanguage;
};

const LayoutComponent: FC<TProps> = ({ children, lng }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const navigator = useNavigator({ lng });
  const { user } = useTelegram();

  useEffect(() => {
    const updatedPathname = pathname.replace(
      `/${lng}`,
      `/${user?.language_code}`,
    );
    const url = `${updatedPathname}?${searchParams}`;
    router.push(url);
  }, [lng, pathname, router, searchParams, user?.language_code]);

  const isFooter = useMemo(() => {
    const path = createPath({
      route: ERoutes.ProfileAdd,
      lng,
    });
    return pathname !== path;
  }, [lng, pathname]);

  return (
    <NavigatorProvider value={navigator}>
      <div className="Layout">
        <div className="Layout-Content">{children}</div>
        {isFooter && <Footer lng={lng} />}
      </div>
    </NavigatorProvider>
  );
};

LayoutComponent.displayName = "Layout";

export const Layout = memo(LayoutComponent);
