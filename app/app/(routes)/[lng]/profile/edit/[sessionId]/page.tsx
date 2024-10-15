import { getProfile } from "@/app/api/profile/get";
import { ProfileEditPage } from "@/app/pages/profileEditPage";
import { ELanguage } from "@/app/shared/enums";
import { useTranslation } from "@/app/i18n";
import { ErrorBoundary } from "@/app/shared/components/errorBoundary";

type TLoader = {
  sessionId: string;
};

async function loader(params: TLoader) {
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

type TSearchParams = {
  latitude?: string;
  longitude?: string;
};

type TProps = {
  params: { lng: string; sessionId: string };
  searchParams?: TSearchParams;
};

export default async function ProfileEditRoute(props: TProps) {
  const { params } = props;
  const { lng, sessionId } = params;
  const language = lng as ELanguage;
  const { i18n, t } = await useTranslation(lng, "index");

  try {
    const data = await loader({ sessionId });
    return <ProfileEditPage lng={language} profile={data?.profile} />;
  } catch (error) {
    const err = error as Error;
    return <ErrorBoundary i18n={i18n} message={t(err.message as any)} />;
  }
}
