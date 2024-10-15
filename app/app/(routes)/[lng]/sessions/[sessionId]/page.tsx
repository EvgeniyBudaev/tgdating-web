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

type TSearchParams = {
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
  searchParams: TSearchParams;
};

async function loader(params: TLoader) {
  const { sessionId, searchParams } = params;
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
        latitude: searchParams?.latitude ? searchParams.latitude : null,
        longitude: searchParams?.longitude ? searchParams.longitude : null,
      };
      const profileListResponse = await getProfileList(query);
      const filterResponse = await getFilter(filterParams);
      return {
        profileFilter: filterResponse,
        profileList: profileListResponse,
      };
    }
    return { profileFilter: undefined, profileList: undefined };
  } catch (error) {
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TProps = {
  params: { lng: string; sessionId: string };
  searchParams?: TSearchParams;
};

export default async function MainRoute(props: TProps) {
  const { params } = props;
  const { lng, sessionId } = params;
  const language = lng as ELanguage;
  const data = await loader({
    sessionId,
    searchParams: props?.searchParams ?? {},
  });

  return (
    <SessionPage
      lng={language}
      profileFilter={data?.profileFilter}
      profileList={data?.profileList}
    />
  );
}
