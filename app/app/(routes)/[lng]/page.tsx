import { MainPage } from "@/app/pages/mainPage";
import { ELanguage } from "@/app/shared/enums";

type TProps = {
  params: { lng: string };
};

export default async function MainRoute(props: TProps) {
  const { params } = props;
  const { lng } = params;
  const language = lng as ELanguage;

  return (
    <main>
      <MainPage lng={language} />
    </main>
  );
}
