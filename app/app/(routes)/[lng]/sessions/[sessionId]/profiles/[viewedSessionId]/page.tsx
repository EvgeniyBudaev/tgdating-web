import { redirect } from "next/navigation";
import { getProfileDetail } from "@/app/api/profile/detail";
import {ProfileDetailPage} from "@/app/pages/profileDetailPage";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";

export const dynamic = "force-dynamic";

type TSearchParamsLoader = {
  latitude?: string;
  longitude?: string;
};

type TLoader = {
  sessionId: string;
  viewedSessionId: string;
  searchParams: TSearchParamsLoader;
};

async function loaderProfileDetail(params: TLoader) {
  const { sessionId, viewedSessionId, searchParams } = params;
  try {
    const profileDetailResponse = await getProfileDetail({
      sessionId: sessionId,
      viewedSessionId: viewedSessionId,
      latitude: searchParams?.latitude ?? "",
      longitude: searchParams?.longitude ?? "",
    });
    return { profile: profileDetailResponse, isExistUser: true, isManyRequest: false, isUnauthorized: false };
  } catch (error) {
    const errorResponse = error as Response;
    if (errorResponse?.status === 401) {
      return { profile: undefined, isExistUser: true, isManyRequest: false, isUnauthorized: true };
    }
    if (errorResponse?.status === 404) {
      return { profile: undefined, isExistUser: false, isManyRequest: false, isUnauthorized: false };
    }
    if (errorResponse?.status === 429) {
      return { profile: undefined, isExistUser: true, isManyRequest: true, isUnauthorized: false };
    }
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TParams = Promise<{
  lng: string;
  sessionId: string;
  viewedSessionId: string;
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
  const { lng, sessionId, viewedSessionId } = await params;
  const query = await searchParams;
  const language = lng as ELanguage;
  const data = await loaderProfileDetail({
    sessionId,
    viewedSessionId,
    searchParams: query ?? {},
  });

  if (data?.isUnauthorized || !data?.isExistUser) {
    redirect(
      createPath({
        route: ERoutes.Unauthorized,
      }),
    );
  }

  if (data?.profile?.isBlocked) {
    redirect(
      createPath({
        route: ERoutes.ProfileBlocked,
        params: {sessionId: sessionId}
      }),
    );
  }

  if (data?.profile?.isFrozen) {
    redirect(
      createPath({
        route: ERoutes.ProfileDeleted,
        params: {sessionId: sessionId}
      }),
    );
  }

  if (data?.profile?.block?.isBlocked) {
    redirect(
      createPath({
        route: ERoutes.ProfileBlocked,
        params: {sessionId: sessionId}
      }),
    );
  }

  return (
    <ProfileDetailPage
      isExistUser={data.isExistUser}
      isManyRequest={data.isManyRequest}
      lng={language}
      profile={data?.profile}
      sessionId={sessionId}
      viewedSessionId={viewedSessionId}
    />
  );
}
