import { getProfileDetail } from "@/app/api/profile/detail";
import { ProfileDeleted } from "@/app/entities/profile/profileDeleted";
import { ProfileBlocked } from "@/app/entities/profile/profileBlocked";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { redirect } from "next/navigation";
import { ProfileDetailPage } from "@/app/pages/profileDetailPage";

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
    return { profile: profileDetailResponse, isExistUser: true };
  } catch (error) {
    const errorResponse = error as Response;
    if (errorResponse?.status === 404) {
      return { profile: undefined, isExistUser: false };
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

  if (data?.profile?.isBlocked) {
    return <ProfileBlocked />;
  }

  if (data?.profile?.isDeleted) {
    return <ProfileDeleted />;
  }

  if (data?.profile?.block?.isBlocked) {
    const path = createPath({
      route: ERoutes.Session,
      params: { sessionId: sessionId },
    });
    redirect(path);
  }

  return (
    <ProfileDetailPage
      isExistUser={data.isExistUser}
      lng={language}
      profile={data?.profile}
      viewedSessionId={viewedSessionId}
    />
  );
}
