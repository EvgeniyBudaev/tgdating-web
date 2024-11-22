export enum ERoutes {
  Root = "/",
  Session = "/sessions/:sessionId/list",
  Unauthorized = "/401",
  ProfileDetail = "/sessions/:sessionId/profiles/:viewedSessionId",
  ProfileAdd = "/profile/add",
  ProfileEdit = "/profile/edit/:sessionId",
  ProfileBlocked = "/sessions/:sessionId/blocked",
  ProfileDeleted = "/sessions/:sessionId/deleted",
}
