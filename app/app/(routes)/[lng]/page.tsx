import { MainPage } from "@/app/pages/mainPage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function MainRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return (
    <main>
      <MainPage lng={language} />
    </main>
  );
}
