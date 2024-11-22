import {getProfileDetail} from "@/app/api/profile/detail";
import {ProfileBlocked} from "@/app/entities/profile/profileBlocked";
import {ProfileDeletedPage} from "@/app/pages/profileDeletedPage";
import { ELanguage } from "@/app/shared/enums";

type TLoader = {
  sessionId: string;
}

async function loaderProfileDeleted(params: TLoader) {
  const { sessionId } = params;
  try {
    const profileDetailResponse = await getProfileDetail({
      sessionId: sessionId,
      viewedSessionId: sessionId,
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
}>;

export default async function ProfileDeletedRoute({ params }: { params: TParams }) {
  const { lng, sessionId } = await params;
  const language = lng as ELanguage;
  const data = await loaderProfileDeleted({sessionId});

  if (data?.profile?.isBlocked) {
    return <ProfileBlocked />;
  }

  return <ProfileDeletedPage isDeleted={data?.profile?.isDeleted} lng={language} sessionId={sessionId} />;
}
