import { RootPage } from "@/app/pages/rootPage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function RootRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  return (
    <main>
      <RootPage lng={language} />
    </main>
  );
}
