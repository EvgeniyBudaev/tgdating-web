import {getProfileDetail} from "@/app/api/profile/detail";
import {ProfileBlockedPage} from "@/app/pages/profileBlockedPage";
import { ELanguage } from "@/app/shared/enums";

type TLoader = {
  sessionId: string;
}

async function loaderProfileBlocked(params: TLoader) {
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

export default async function ProfileBlockedRoute({ params }: { params: TParams }) {
  const { lng, sessionId } = await params;
  const language = lng as ELanguage;
  const data = await loaderProfileBlocked({sessionId});

  return <ProfileBlockedPage isBlocked={data?.profile?.isBlocked} lng={language} sessionId={sessionId} />;
}
