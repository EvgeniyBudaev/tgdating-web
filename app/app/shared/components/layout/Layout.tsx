"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {type FC, type ReactNode, useEffect, useMemo} from "react";
import { Footer } from "@/app/shared/components/footer";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import {useTelegram} from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
  lng: ELanguage;
};

export const Layout: FC<TProps> = ({ children, lng }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {user} = useTelegram();

  useEffect(() => {
    const updatedPathname = pathname.replace(`/${lng}`, `/${user?.language_code}`);
    const url = `${updatedPathname}?${searchParams}`;
    router.push(url);
  }, []);

  const isFooter = useMemo(() => {
    const path = createPath({
      route: ERoutes.ProfileAdd,
      lng,
    });
    return pathname !== path;
  }, [pathname]);

  return (
    <div className="Layout">
      <div className="Layout-Content">{children}</div>
      {isFooter && <Footer lng={lng} />}
    </div>
  );
};
