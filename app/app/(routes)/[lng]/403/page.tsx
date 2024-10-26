import { ErrorBoundary } from "@/app/shared/components/errorBoundary";

export default async function PermissionDeniedRoute() {
  return <ErrorBoundary message={"errorBoundary.common.forbidden"} />;
}
