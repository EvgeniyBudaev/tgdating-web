import { ELanguage } from "@/app/shared/enums";
import { OfferPage } from "@/app/pages/offerPage";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function PolicyRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return <OfferPage lng={language} />;
}
