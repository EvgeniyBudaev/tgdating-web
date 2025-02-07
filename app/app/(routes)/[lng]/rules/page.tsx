import { ELanguage } from "@/app/shared/enums";
import { RulesPage } from "@/app/pages/rulesPage";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function RulesRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return <RulesPage lng={language} />;
}
