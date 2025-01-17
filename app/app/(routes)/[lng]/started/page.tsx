import { ELanguage } from "@/app/shared/enums";
import { StartedPage } from "@/app/pages/startedPage";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function StartedRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return <StartedPage lng={language} />;
}
