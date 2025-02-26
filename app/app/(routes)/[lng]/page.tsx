import { headers } from "next/headers";
import { userAgentFromString } from "next/server";
import { RootPage } from "@/app/pages/rootPage";
import { ELanguage } from "@/app/shared/enums";

export const dynamic = "force-dynamic";

type TParams = Promise<{
  lng: string;
}>;

export default async function RootRoute({ params }: { params: TParams }) {
  const { lng } = await params;
  const language = lng as ELanguage;

  const headersList = await headers();
  const userAgent = headersList.get("user-agent");
  const { device } = userAgentFromString(userAgent || undefined);
  const isMobile = device.type === "mobile";

  return (
    <main>
      <RootPage isMobile={isMobile} lng={language} />
    </main>
  );
}
