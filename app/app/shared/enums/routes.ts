export enum ERoutes {
  Root = "/",
  Session = "/sessions/:sessionId/list",
  Unauthorized = "/401",
  PermissionDenied = "/403",
  ProfileDetail = "/sessions/:sessionId/profiles/:viewedSessionId",
  ProfileAdd = "/profile/add",
  ProfileEdit = "/profile/edit/:sessionId",
}
