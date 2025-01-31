import { getProfileList } from "@/app/api/profile/getProfileList/domain";
import { SessionPage } from "@/app/pages/sessionPage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TSearchParamsLoader = {
  page?: string;
  size?: string;
  ageFrom?: string;
  ageTo?: string;
  searchGender?: string;
  telegramUserId?: string;
  countryCode?: string;
  countryName?: string;
  city?: string;
  distance?: string;
  latitude?: string;
  longitude?: string;
};

type TLoader = {
  telegramUserId: string;
  searchParams: TSearchParamsLoader;
};

async function loaderProfileList(params: TLoader) {
  const { telegramUserId, searchParams } = params;
  try {
    if (telegramUserId) {
      const query = {
        telegramUserId: telegramUserId,
        ...(searchParams?.latitude && { latitude: searchParams?.latitude }),
        ...(searchParams?.longitude && { longitude: searchParams?.longitude }),
        ...(searchParams?.countryCode && {
          countryCode: searchParams?.countryCode,
        }),
        ...(searchParams?.countryName && {
          countryName: searchParams?.countryName,
        }),
        ...(searchParams?.city && { city: searchParams?.city }),
      };
      const profileListResponse = await getProfileList(query);
      return {
        profileList: profileListResponse,
        isExistUser: true,
        isManyRequest: false,
        isUnauthorized: false,
      };
    }
    return {
      profileList: undefined,
      isExistUser: false,
      isManyRequest: false,
      isUnauthorized: false,
    };
  } catch (error) {
    const errorResponse = error as Response;
    console.log("loaderProfileList errorResponse: ", errorResponse);
    console.log(
      "loaderProfileList errorResponse?.status: ",
      errorResponse?.status,
    );
    if (errorResponse?.status === 401) {
      return {
        profileList: undefined,
        isExistUser: true,
        isManyRequest: false,
        isUnauthorized: true,
      };
    }
    if (errorResponse?.status === 404) {
      return {
        profileList: undefined,
        isExistUser: false,
        isManyRequest: false,
        isUnauthorized: false,
      };
    }
    if (errorResponse?.status === 429) {
      return {
        profileList: undefined,
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
  page?: string;
  size?: string;
  ageFrom?: string;
  ageTo?: string;
  searchGender?: string;
  telegramUserId?: string;
  distance?: string;
  latitude?: string;
  longitude?: string;
}>;

type TProps = {
  params: TParams;
  searchParams?: TSearchParams;
};

export default async function ProfileListRoute({
  params,
  searchParams,
}: TProps) {
  const { lng, telegramUserId } = await params;
  const query = await searchParams;
  const language = lng as ELanguage;
  const data = await loaderProfileList({
    telegramUserId,
    searchParams: query ?? {},
  });

  return (
    <SessionPage
      isExistUser={data.isExistUser}
      isManyRequest={data.isManyRequest}
      isUnauthorized={data?.isUnauthorized}
      lng={language}
      profileList={data?.profileList}
      telegramUserId={telegramUserId}
    />
  );
}
