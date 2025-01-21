import { BlockedListPage } from "@/app/pages/blockedListPage";
import { ELanguage } from "@/app/shared/enums";
import { getBlockedList } from "@/app/api/block/getBlockedList/domain";

export const dynamic = "force-dynamic";

type TLoader = {
  telegramUserId: string;
};

async function loaderBlockedList(params: TLoader) {
  const { telegramUserId } = params;
  try {
    const blockedListResponse = await getBlockedList({ telegramUserId });
    return {
      blockedList: blockedListResponse,
    };
  } catch (error) {
    const errorResponse = error as Response;
    console.error("loaderBlockedList errorResponse: ", errorResponse);
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TParams = Promise<{
  lng: string;
  telegramUserId: string;
}>;

export default async function BlockedListRoute({
  params,
}: {
  params: TParams;
}) {
  const { lng, telegramUserId } = await params;
  const language = lng as ELanguage;
  const data = await loaderBlockedList({ telegramUserId });

  return (
    <BlockedListPage
      blockedList={data.blockedList}
      lng={language}
      telegramUserId={telegramUserId}
    />
  );
}
