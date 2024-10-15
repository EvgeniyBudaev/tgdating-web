import { ERoutes } from "@/app/shared/enums";

type TRoutes =
  | ERoutes.Root
  | ERoutes.Register
  | ERoutes.Unauthorized
  | ERoutes.PermissionDenied
  | ERoutes.ProfileAdd;

type TRoutesWithParams = ERoutes.Profile | ERoutes.ProfileEdit;

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
    if (props?.lng) {
      path = `/${props.lng}${path}`;
    }
  }
  console.log("path_0: ", path);

  console.log("11111111111111 query: ", query);
  console.log(
    "11111111111111 Object.keys(query): ",
    query && Object.keys(query),
  );
  if (query && Object.keys(query).length) {
    const path2 = `/${props?.lng ?? ""}${path}${path.includes("?") ? "&" : "?"}${new URLSearchParams(query)}`;
    console.log("11111111111111 path_1: ", path2);
  }

  return path;
}
