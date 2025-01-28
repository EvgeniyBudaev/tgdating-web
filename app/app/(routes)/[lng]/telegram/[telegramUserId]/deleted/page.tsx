import { ProfileDeletedPage } from "@/app/pages/profileDeletedPage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
  telegramUserId: string;
}>;

export default async function ProfileFrozenRoute({
  params,
}: {
  params: TParams;
}) {
  const { lng, telegramUserId } = await params;
  const language = lng as ELanguage;

  return <ProfileDeletedPage lng={language} telegramUserId={telegramUserId} />;
}
