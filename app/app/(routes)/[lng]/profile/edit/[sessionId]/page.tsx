import { getProfile } from "@/app/api/profile/get";
import { ProfileEditPage } from "@/app/pages/profileEditPage";
import { ELanguage } from "@/app/shared/enums";

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
    return { profile: profileResponse };
  } catch (error) {
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

  return <ProfileEditPage lng={language} profile={data?.profile} />;
}
