import { getFilter } from "@/app/api/profile/filter";
import { getProfileList } from "@/app/api/profile/list";
import { SessionPage } from "@/app/pages/sessionPage";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_DISTANCE,
  DEFAULT_LOOKING_FOR,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SEARCH_GENDER,
} from "@/app/shared/constants";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TSearchParamsLoader = {
  page?: string;
  size?: string;
  ageFrom?: string;
  ageTo?: string;
  searchGender?: string;
  lookingFor?: string;
  sessionId?: string;
  distance?: string;
  latitude?: string;
  longitude?: string;
};

type TLoader = {
  sessionId: string;
  searchParams: TSearchParamsLoader;
};

async function loaderProfileList(params: TLoader) {
  const { sessionId, searchParams } = params;
  console.log("loaderProfileList sessionId: ", sessionId);
  try {
    if (sessionId) {
      const query = {
        page: searchParams?.page ?? DEFAULT_PAGE.toString(),
        size: searchParams?.size ?? DEFAULT_PAGE_SIZE.toString(),
        ageFrom: searchParams?.ageFrom ?? DEFAULT_AGE_FROM.toString(),
        ageTo: searchParams?.ageTo ?? DEFAULT_AGE_TO.toString(),
        searchGender: searchParams?.searchGender ?? DEFAULT_SEARCH_GENDER,
        lookingFor: searchParams?.lookingFor ?? DEFAULT_LOOKING_FOR,
        sessionId: sessionId,
        distance: searchParams?.distance ?? DEFAULT_DISTANCE.toString(),
        ...(searchParams?.latitude && { latitude: searchParams?.latitude }),
        ...(searchParams?.longitude && { longitude: searchParams?.longitude }),
      };
      const filterParams = {
        sessionId: sessionId,
        ...(searchParams?.latitude && { latitude: searchParams?.latitude }),
        ...(searchParams?.longitude && { longitude: searchParams?.longitude }),
      };
      console.log("loaderProfileList get list");
      const profileListResponse = await getProfileList(query);
      console.log("loaderProfileList get filter");
      const filterResponse = await getFilter(filterParams);
      console.log("loaderProfileList isExistUser true");
      return {
        profileFilter: filterResponse,
        profileList: profileListResponse,
        isExistUser: true,
      };
    }
    console.log("loaderProfileList return undefined");
    return {
      profileFilter: undefined,
      profileList: undefined,
      isExistUser: false,
    };
  } catch (error) {
    const errorResponse = error as Response;
    console.log(
      "loaderProfileList errorResponse?.status: ",
      errorResponse?.status,
    );
    if (errorResponse?.status === 404) {
      return {
        profileFilter: undefined,
        profileList: undefined,
        isExistUser: false,
      };
    }
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TParams = Promise<{
  lng: string;
  sessionId: string;
}>;

type TSearchParams = Promise<{
  page?: string;
  size?: string;
  ageFrom?: string;
  ageTo?: string;
  searchGender?: string;
  lookingFor?: string;
  sessionId?: string;
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
  const { lng, sessionId } = await params;
  const query = await searchParams;
  const language = lng as ELanguage;
  const data = await loaderProfileList({
    sessionId,
    searchParams: query ?? {},
  });
  console.log("ProfileListRoute isExistUser: ", data.isExistUser);
  return (
    <SessionPage
      isExistUser={data.isExistUser}
      lng={language}
      profileFilter={data?.profileFilter}
      profileList={data?.profileList}
    />
  );
}
