import { ELanguage } from "@/app/shared/enums";
import { InvalidBrowserPage } from "@/app/pages/invalidBrowserPage";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function InvalidBrowserRoute({
  params,
}: {
  params: TParams;
}) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return <InvalidBrowserPage lng={language} />;
}
