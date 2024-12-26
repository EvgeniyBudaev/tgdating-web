import {getProfileDetail} from "@/app/api/profile/getProfileDetail/domain";
import { ProfileBlocked } from "@/app/entities/profile/profileBlocked";
import { ProfileFreezePage } from "@/app/pages/profileFreezePage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TLoader = {
  telegramUserId: string;
};

async function loaderProfileDeleted(params: TLoader) {
  const { telegramUserId } = params;
  try {
    const profileDetailResponse = await getProfileDetail({
      telegramUserId: telegramUserId,
      viewedTelegramUserId: telegramUserId,
    });
    return { profile: profileDetailResponse, isExistUser: true };
  } catch (error) {
    const errorResponse = error as Response;
    if (errorResponse?.status === 404) {
      return { profile: undefined, isExistUser: false };
    }
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TParams = Promise<{
  lng: string;
  telegramUserId: string;
}>;

export default async function ProfileDeletedRoute({
  params,
}: {
  params: TParams;
}) {
  const { lng, telegramUserId } = await params;
  const language = lng as ELanguage;
  const data = await loaderProfileDeleted({ telegramUserId });

  if (data?.profile?.status?.isBlocked) {
    return <ProfileBlocked />;
  }

  return (
    <ProfileFreezePage
      isDeleted={data?.profile?.status?.isFrozen}
      lng={language}
      telegramUserId={telegramUserId}
    />
  );
}
