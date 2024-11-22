import {redirect} from "next/navigation";
import { getProfile } from "@/app/api/profile/get";
import { ProfileEditPage } from "@/app/pages/profileEditPage";
import {ELanguage, ERoutes} from "@/app/shared/enums";
import {createPath} from "@/app/shared/utils";

export const dynamic = "force-dynamic";

type TLoader = {
  sessionId: string;
};

async function loaderProfileEdit(params: TLoader) {
  const { sessionId } = params;
  try {
    const profileResponse = await getProfile({
      sessionId,
    });
    return { profile: profileResponse, isExistUser: true, isUnauthorized: false };
  } catch (error) {
    const errorResponse = error as Response;
    if (errorResponse?.status === 401) {
      return { profile: undefined, isExistUser: true, isUnauthorized: true };
    }
    if (errorResponse?.status === 404) {
      return { profile: undefined, isExistUser: false, isUnauthorized: false };
    }
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TParams = Promise<{
  lng: string;
  sessionId: string;
}>;

export default async function ProfileEditRoute({
  params,
}: {
  params: TParams;
}) {
  const { lng, sessionId } = await params;
  const language = lng as ELanguage;
  const data = await loaderProfileEdit({ sessionId });

  if (data?.isUnauthorized || !data?.isExistUser) {
    redirect(
      createPath({
        route: ERoutes.Unauthorized,
      }),
    );
  }

  if (data?.profile?.isDeleted) {
    redirect(
      createPath({
        route: ERoutes.ProfileDeleted,
        params: {sessionId: sessionId}
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

  return <ProfileEditPage lng={language} profile={data?.profile} />;
}
