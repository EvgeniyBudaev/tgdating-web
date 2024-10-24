import { getProfileDetail } from "@/app/api/profile/detail";
import { ProfileDeleted } from "@/app/entities/profile/profileDeleted";
import { ProfileBlocked } from "@/app/entities/profile/profileBlocked";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { redirect } from "next/navigation";
import { ProfileDetailPage } from "@/app/pages/profileDetailPage";

export const dynamic = "force-dynamic";

type TSearchParams = {
  latitude?: string;
  longitude?: string;
};

type TLoader = {
  sessionId: string;
  viewedSessionId: string;
  searchParams: TSearchParams;
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
    return { profile: profileDetailResponse, isNotFound: false };
  } catch (error) {
    //@ts-ignore
    if (error?.status === 404) {
      return { profile: undefined, isNotFound: true };
    }
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TProps = {
  params: { lng: string; sessionId: string; viewedSessionId: string };
  searchParams?: TSearchParams;
};

export default async function ProfileDetailRoute(props: TProps) {
  const { params } = props;
  const { lng, sessionId, viewedSessionId } = params;
  const language = lng as ELanguage;
  const data = await loaderProfileDetail({
    sessionId,
    viewedSessionId,
    searchParams: props?.searchParams ?? {},
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
      isNotFound={data.isNotFound}
      lng={language}
      profile={data?.profile}
      viewedSessionId={viewedSessionId}
    />
  );
}
