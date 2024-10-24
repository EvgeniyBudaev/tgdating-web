import { ErrorBoundary } from "@/app/shared/components/errorBoundary";

export default async function PermissionDeniedRoute({
  params: { lng },
}: {
  params: { lng: string };
}) {
  return <ErrorBoundary message={"errorBoundary.common.forbidden"} />;
}
