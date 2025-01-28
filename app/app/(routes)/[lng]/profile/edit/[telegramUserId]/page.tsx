import { getProfile } from "@/app/api/profile/getProfile/domain";
import { ProfileEditPage } from "@/app/pages/profileEditPage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TLoader = {
  telegramUserId: string;
};

async function loaderProfileEdit(params: TLoader) {
  const { telegramUserId } = params;
  try {
    const profileResponse = await getProfile({
      telegramUserId,
    });
    return {
      profile: profileResponse,
      isExistUser: true,
      isManyRequest: false,
      isUnauthorized: false,
    };
  } catch (error) {
    const errorResponse = error as Response;
    if (errorResponse?.status === 401) {
      return {
        profile: undefined,
        isExistUser: true,
        isManyRequest: false,
        isUnauthorized: true,
      };
    }
    if (errorResponse?.status === 404) {
      return {
        profile: undefined,
        isExistUser: false,
        isManyRequest: false,
        isUnauthorized: false,
      };
    }
    if (errorResponse?.status === 429) {
      return {
        profile: undefined,
        isExistUser: true,
        isManyRequest: true,
        isUnauthorized: false,
      };
    }
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TParams = Promise<{
  lng: string;
  telegramUserId: string;
}>;

export default async function ProfileEditRoute({
  params,
}: {
  params: TParams;
}) {
  const { lng, telegramUserId } = await params;
  const language = lng as ELanguage;
  const data = await loaderProfileEdit({ telegramUserId });

  return (
    <ProfileEditPage
      isBlocked={data?.profile?.status?.isBlocked}
      isExistUser={data?.isExistUser}
      isFrozen={data?.profile?.status?.isFrozen}
      isManyRequest={data.isManyRequest}
      isUnauthorized={data?.isUnauthorized}
      lng={language}
      profile={data?.profile}
      telegramUserId={telegramUserId}
    />
  );
}
