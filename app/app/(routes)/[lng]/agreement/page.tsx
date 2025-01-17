import { ELanguage } from "@/app/shared/enums";
import {AgreementPage} from "@/app/pages/agreementPage";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function AgreementRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return <AgreementPage lng={language} />;
}
