import { ERoutes } from "@/app/shared/enums";

type TRoutes =
  | ERoutes.Root
  | ERoutes.Unauthorized
  | ERoutes.ProfileAdd
  | ERoutes.Started
  | ERoutes.Agreement
  | ERoutes.Browser
  | ERoutes.Device
  | ERoutes.Policy
  | ERoutes.Offer;

type TRoutesWithParams =
  | ERoutes.Main
  | ERoutes.BuyPremium
  | ERoutes.Telegram
  | ERoutes.ProfileDetail
  | ERoutes.ProfileBlocked
  | ERoutes.ProfileDeleted
  | ERoutes.ProfileFrozen
  | ERoutes.ProfileEdit
  | ERoutes.BlockedList;

type TCreatePathProps =
  | { route: TRoutes; lng?: string }
  | {
      route: TRoutesWithParams;
      params: Record<string, string | number>;
      lng?: string;
    };

type TCreatePathPropsWithParams = Extract<
  TCreatePathProps,
  { route: any; params: any; lng?: string }
>;

export function createPath(
  props: TCreatePathProps,
  query?: Record<string, string> | URLSearchParams,
): string {
  let path: string = props.route;

  if (props.hasOwnProperty("params")) {
    path = Object.entries((props as TCreatePathPropsWithParams).params).reduce(
      (previousValue: string, [param, value]) =>
        previousValue.replace(`:${param}`, String(value)),
      path,
    );
  }

  if (query && Object.keys(query).length) {
    path = `${path}${path.includes("?") ? "&" : "?"}${new URLSearchParams(query)}`;
  }

  if (props?.lng) {
    path = `/${props.lng}${path}`;
  }

  return path;
}
