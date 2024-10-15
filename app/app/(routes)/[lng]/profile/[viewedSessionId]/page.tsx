import { getProfileDetail } from "@/app/api/profile/detail";
import { ProfileDeleted } from "@/app/entities/profile/profileDeleted";
import { ProfileBlocked } from "@/app/entities/profile/profileBlocked";
import { ProfilePage } from "@/app/pages/profilePage";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type TSearchParams = {
  latitude?: string;
  longitude?: string;
  sessionId?: string;
};

type TLoader = {
  viewedSessionId: string;
  searchParams: TSearchParams;
};

async function loader(params: TLoader) {
  const { viewedSessionId, searchParams } = params;
  try {
    const profileDetailResponse = await getProfileDetail({
      sessionId: searchParams?.sessionId ?? "",
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
  params: { lng: string; viewedSessionId: string };
  searchParams?: TSearchParams;
};

export default async function ProfileDetailRoute(props: TProps) {
  const { params } = props;
  const { lng, viewedSessionId } = params;
  const language = lng as ELanguage;
  const data = await loader({
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
    const path = createPath(
      {
        route: ERoutes.Root,
      },
      {
        sessionId: props?.searchParams?.sessionId ?? "",
      },
    );
    redirect(path);
  }

  return (
    <ProfilePage
      isNotFound={data.isNotFound}
      lng={language}
      profile={data?.profile}
      viewedSessionId={viewedSessionId}
    />
  );
}
