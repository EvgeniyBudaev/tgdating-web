import { checkProfileExists } from "@/app/api/profile/checkProfile/domain";
import { MainPage } from "@/app/pages/mainPage";
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

async function loaderMain(params: TLoader) {
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
      const isProfileExistsResponse = await checkProfileExists({
        telegramUserId: telegramUserId,
      });
      if (!isProfileExistsResponse.isExists) {
        return {
          isExistUser: false,
          isManyRequest: false,
        };
      }
      return {
        isExistUser: true,
        isManyRequest: false,
      };
    }
    return {
      isExistUser: false,
      isManyRequest: false,
    };
  } catch (error) {
    const errorResponse = error as Response;
    console.log("loaderMain errorResponse: ", errorResponse);
    if (errorResponse?.status === 400) {
      return {
        isExistUser: false,
        isManyRequest: false,
      };
    }
    if (errorResponse?.status === 401) {
      return {
        isExistUser: true,
        isManyRequest: false,
      };
    }
    if (errorResponse?.status === 404) {
      return {
        isExistUser: false,
        isManyRequest: false,
      };
    }
    if (errorResponse?.status === 429) {
      return {
        isExistUser: true,
        isManyRequest: true,
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

export default async function MainRoute({ params, searchParams }: TProps) {
  const { lng, telegramUserId } = await params;
  const query = await searchParams;
  const language = lng as ELanguage;
  const data = await loaderMain({
    telegramUserId,
    searchParams: query ?? {},
  });
  return (
    <MainPage
      isExistUser={data.isExistUser}
      isManyRequest={data.isManyRequest}
      lng={language}
      telegramUserId={telegramUserId}
    />
  );
}
