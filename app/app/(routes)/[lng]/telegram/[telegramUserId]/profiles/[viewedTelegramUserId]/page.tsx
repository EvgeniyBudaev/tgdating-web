import { getProfileDetail } from "@/app/api/profile/getProfileDetail/domain";
import { ProfileDetailPage } from "@/app/pages/profileDetailPage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TSearchParamsLoader = {
  countryCode?: string;
  countryName?: string;
  city?: string;
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
      ...(searchParams?.latitude && { latitude: searchParams?.latitude }),
      ...(searchParams?.longitude && { longitude: searchParams?.longitude }),
      ...(searchParams?.countryCode && {
        countryCode: searchParams?.countryCode,
      }),
      ...(searchParams?.countryName && {
        countryName: searchParams?.countryName,
      }),
      ...(searchParams?.city && { city: searchParams?.city }),
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
  countryCode?: string;
  countryName?: string;
  city?: string;
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

  return (
    <ProfileDetailPage
      isBlocked={data?.profile?.block?.isBlocked}
      isExistUser={data.isExistUser}
      isFrozen={data?.profile?.status?.isFrozen}
      isManyRequest={data.isManyRequest}
      isUnauthorized={data?.isUnauthorized}
      lng={language}
      profile={data?.profile}
      telegramUserId={telegramUserId}
      viewedTelegramUserId={viewedTelegramUserId}
    />
  );
}
