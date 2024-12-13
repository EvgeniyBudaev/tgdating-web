import { redirect } from "next/navigation";
import { getProfileList } from "@/app/api/profile/getProfileList/domain";
import { getProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/domain";
import { SessionPage } from "@/app/pages/sessionPage";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_DISTANCE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SEARCH_GENDER,
} from "@/app/shared/constants";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";

export const dynamic = "force-dynamic";

type TSearchParamsLoader = {
  page?: string;
  size?: string;
  ageFrom?: string;
  ageTo?: string;
  searchGender?: string;
  telegramUserId?: string;
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
        searchGender: searchParams?.searchGender ?? DEFAULT_SEARCH_GENDER,
        ageFrom: searchParams?.ageFrom ?? DEFAULT_AGE_FROM.toString(),
        ageTo: searchParams?.ageTo ?? DEFAULT_AGE_TO.toString(),
        distance: searchParams?.distance ?? DEFAULT_DISTANCE.toString(),
        page: searchParams?.page ?? DEFAULT_PAGE.toString(),
        size: searchParams?.size ?? DEFAULT_PAGE_SIZE.toString(),
        ...(searchParams?.latitude && { latitude: searchParams?.latitude }),
        ...(searchParams?.longitude && { longitude: searchParams?.longitude }),
      };
      const profileListResponse = await getProfileList(query);
      const profileShortInfoResponse = await getProfileShortInfo({
        telegramUserId,
      });
      return {
        profileList: profileListResponse,
        profileShortInfo: profileShortInfoResponse,
        isExistUser: true,
        isManyRequest: false,
        isUnauthorized: false,
      };
    }
    return {
      profileList: undefined,
      profileShortInfo: undefined,
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
        profileShortInfo: undefined,
        isExistUser: true,
        isManyRequest: false,
        isUnauthorized: true,
      };
    }
    if (errorResponse?.status === 404) {
      return {
        profileList: undefined,
        profileShortInfo: undefined,
        isExistUser: false,
        isManyRequest: false,
        isUnauthorized: false,
      };
    }
    if (errorResponse?.status === 429) {
      return {
        profileList: undefined,
        profileShortInfo: undefined,
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

  if (data?.isUnauthorized) {
    redirect(
      createPath({
        route: ERoutes.Unauthorized,
      }),
    );
  }

  if (data?.profileShortInfo?.isFrozen) {
    redirect(
      createPath({
        route: ERoutes.ProfileDeleted,
        params: { telegramUserId: telegramUserId },
      }),
    );
  }

  if (data?.profileShortInfo?.isBlocked) {
    redirect(
      createPath({
        route: ERoutes.ProfileBlocked,
        params: { telegramUserId: telegramUserId },
      }),
    );
  }

  return (
    <SessionPage
      isExistUser={data.isExistUser}
      isManyRequest={data.isManyRequest}
      lng={language}
      profileList={data?.profileList}
      profileShortInfo={data?.profileShortInfo}
    />
  );
}
