import { BuyPremiumPage } from "@/app/pages/buyPremiumPage";
import { ELanguage } from "@/app/shared/enums";

type TParams = Promise<{
  lng: string;
  telegramUserId: string;
}>;

export default async function BuyPremiumRoute({ params }: { params: TParams }) {
  const { lng, telegramUserId } = await params;
  const language = lng as ELanguage;

  return <BuyPremiumPage lng={language} telegramUserId={telegramUserId} />;
}
