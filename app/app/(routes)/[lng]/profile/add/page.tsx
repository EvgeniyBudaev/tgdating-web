import { ProfileAddPage } from "@/app/pages/profileAddPage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function ProfileAddRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return <ProfileAddPage lng={language} />;
}
