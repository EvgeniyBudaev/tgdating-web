import { BlockedListPage } from "@/app/pages/blockedListPage";

export enum ERoutes {
  Root = "/",
  Telegram = "/telegram/:telegramUserId/list",
  Unauthorized = "/401",
  ProfileDetail = "/telegram/:telegramUserId/profiles/:viewedTelegramUserId",
  ProfileAdd = "/profile/add",
  ProfileEdit = "/profile/edit/:telegramUserId",
  ProfileBlocked = "/telegram/:telegramUserId/blocked",
  ProfileDeleted = "/telegram/:telegramUserId/deleted",
  ProfileFrozen = "/telegram/:telegramUserId/frozen",
  BuyPremium = "/telegram/:telegramUserId/premium/buy",
  Started = "/started",
  Agreement = "/agreement",
  Policy = "/policy",
  Offer = "/offer",
  BlockedList = "/telegram/:telegramUserId/blockedList",
  Browser = "/browser",
}
