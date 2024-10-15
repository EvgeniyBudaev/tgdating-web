export enum ERoutes {
  Root = "/",
  Login = "/login",
  Logout = "/logout",
  Register = "/register",
  Unauthorized = "/401",
  PermissionDenied = "/403",
  Profile = "/profile/:viewedSessionId",
  ProfileAdd = "/profile/add",
  ProfileEdit = "/profile/edit/:sessionId",
}
