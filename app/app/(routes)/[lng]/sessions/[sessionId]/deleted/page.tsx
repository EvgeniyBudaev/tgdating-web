import {getProfileDetail} from "@/app/api/profile/detail";
import {ProfileBlocked} from "@/app/entities/profile/profileBlocked";
import {ProfileFreezePage} from "@/app/pages/profileFreezePage";
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

  return <ProfileFreezePage isDeleted={data?.profile?.isFrozen} lng={language} sessionId={sessionId} />;
}
