export enum ERoutes {
  Root = "/",
  Telegram = "/telegram/:telegramUserId/list",
  Unauthorized = "/401",
  ProfileDetail = "/telegram/:telegramUserId/profiles/:viewedTelegramUserId",
  ProfileAdd = "/profile/add",
  ProfileEdit = "/profile/edit/:telegramUserId",
  ProfileBlocked = "/telegram/:telegramUserId/blocked",
  ProfileDeleted = "/telegram/:telegramUserId/deleted",
}
