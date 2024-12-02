import { redirect } from "next/navigation";
import { getProfile } from "@/app/api/profile/get";
import { ProfileEditPage } from "@/app/pages/profileEditPage";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";

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

  if (data?.isUnauthorized || !data?.isExistUser) {
    redirect(
      createPath({
        route: ERoutes.Unauthorized,
      }),
    );
  }

  if (data?.profile?.isFrozen) {
    redirect(
      createPath({
        route: ERoutes.ProfileDeleted,
        params: { telegramUserId: telegramUserId },
      }),
    );
  }

  if (data?.profile?.isBlocked) {
    redirect(
      createPath({
        route: ERoutes.ProfileBlocked,
        params: { telegramUserId: telegramUserId },
      }),
    );
  }

  return (
    <ProfileEditPage
      isManyRequest={data.isManyRequest}
      lng={language}
      profile={data?.profile}
    />
  );
}
