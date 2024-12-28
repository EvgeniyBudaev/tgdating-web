import clsx from "clsx";
import Link from "next/link";
import { memo, type FC } from "react";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { Like } from "@/app/pages/profileDetailPage/like";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useQueryURL } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Icon } from "@/app/uikit/components/icon";
import "./Controls.scss";

type TProps = {
  lng: ELanguage;
  profile?: TProfileDetail;
  telegramUserId: string;
};

const ControlsComponent: FC<TProps> = ({ lng, profile, telegramUserId }) => {
  const { getQuery } = useQueryURL({ lng });
  const params = getQuery();

  const telegramUserIdListPath = createPath(
    {
      route: ERoutes.Telegram,
      params: { telegramUserId },
      lng: lng,
    },
    params,
  );

  return (
    <div
      className={clsx("Controls", {
        ["Controls__isLeftHand"]: profile?.status?.isLeftHand,
      })}
    >
      <Link
        className="Controls-Item Controls-Item-Pink"
        href={telegramUserIdListPath}
      >
        <div className="Controls-Box Controls-Box-Pink">
          <Icon className="Controls-Icon" type="Close" />
        </div>
      </Link>
      <div className="Controls-Item Controls-Item-Green">
        <Like lng={lng} profile={profile} telegramUserId={telegramUserId} />
      </div>
    </div>
  );
};

export const Controls = memo(ControlsComponent);
