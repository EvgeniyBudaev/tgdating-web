import { getProfile } from "@/app/api/profile/getProfile/domain";
import { ProfileEditPage } from "@/app/pages/profileEditPage";
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
  searchParams: TSearchParamsLoader;
};

async function loaderProfileEdit(params: TLoader) {
  const { telegramUserId, searchParams } = params;
  try {
    const profileResponse = await getProfile({
      telegramUserId,
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

export default async function ProfileEditRoute({
  params,
  searchParams,
}: TProps) {
  const { lng, telegramUserId } = await params;
  const query = await searchParams;
  const language = lng as ELanguage;
  const data = await loaderProfileEdit({
    telegramUserId,
    searchParams: query ?? {},
  });

  return (
    <ProfileEditPage
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
