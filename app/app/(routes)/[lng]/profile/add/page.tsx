import { ProfileAddPage } from "@/app/pages/profileAddPage";
import { ELanguage } from "@/app/shared/enums";

type TProps = {
  params: { lng: string };
};

export default async function ProfileAddRoute(props: TProps) {
  const { params } = props;
  const { lng } = params;
  const language = lng as ELanguage;

  return <ProfileAddPage lng={language} />;
}
