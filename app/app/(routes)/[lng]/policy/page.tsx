import { ELanguage } from "@/app/shared/enums";
import { PolicyPage } from "@/app/pages/policyPage";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function PolicyRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return <PolicyPage lng={language} />;
}
