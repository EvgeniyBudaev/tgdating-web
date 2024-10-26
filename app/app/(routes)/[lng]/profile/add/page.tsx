import { ProfileAddPage } from "@/app/pages/profileAddPage";
import { ELanguage } from "@/app/shared/enums";

type TParams = Promise<{
  lng: string;
}>;

export default async function ProfileAddRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return <ProfileAddPage lng={language} />;
}
