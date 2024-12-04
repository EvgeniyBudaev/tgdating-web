import { redirect } from "next/navigation";
import { getProfileDetail } from "@/app/api/profile/getProfileDetail/domain";
import { ProfileDetailPage } from "@/app/pages/profileDetailPage";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";

export const dynamic = "force-dynamic";

type TSearchParamsLoader = {
  latitude?: string;
  longitude?: string;
};

type TLoader = {
  telegramUserId: string;
  viewedTelegramUserId: string;
  searchParams: TSearchParamsLoader;
};

async function loaderProfileDetail(params: TLoader) {
  const { telegramUserId, viewedTelegramUserId, searchParams } = params;
  try {
    const profileDetailResponse = await getProfileDetail({
      telegramUserId: telegramUserId,
      viewedTelegramUserId: viewedTelegramUserId,
      latitude: searchParams?.latitude ?? "",
      longitude: searchParams?.longitude ?? "",
    });
    return {
      profile: profileDetailResponse,
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
  viewedTelegramUserId: string;
}>;

type TSearchParams = Promise<{
  latitude?: string;
  longitude?: string;
}>;

type TProps = {
  params: TParams;
  searchParams?: TSearchParams;
};

export default async function ProfileDetailRoute({
  params,
  searchParams,
}: TProps) {
  const { lng, telegramUserId, viewedTelegramUserId } = await params;
  const query = await searchParams;
  const language = lng as ELanguage;
  const data = await loaderProfileDetail({
    telegramUserId,
    viewedTelegramUserId,
    searchParams: query ?? {},
  });

  if (data?.isUnauthorized || !data?.isExistUser) {
    redirect(
      createPath({
        route: ERoutes.Unauthorized,
      }),
    );
  }

  if (data?.profile?.status?.isBlocked) {
    redirect(
      createPath({
        route: ERoutes.ProfileBlocked,
        params: { telegramUserId: telegramUserId },
      }),
    );
  }

  if (data?.profile?.status?.isFrozen) {
    redirect(
      createPath({
        route: ERoutes.ProfileDeleted,
        params: { telegramUserId: telegramUserId },
      }),
    );
  }

  if (data?.profile?.block?.isBlocked) {
    redirect(
      createPath({
        route: ERoutes.ProfileBlocked,
        params: { telegramUserId: telegramUserId },
      }),
    );
  }

  return (
    <ProfileDetailPage
      isExistUser={data.isExistUser}
      isManyRequest={data.isManyRequest}
      lng={language}
      profile={data?.profile}
      telegramUserId={telegramUserId}
      viewedTelegramUserId={viewedTelegramUserId}
    />
  );
}
