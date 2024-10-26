// https://nextjs.org/docs/app/building-your-application/upgrading/version-15
import { Environment } from "@/app/environment";

export const dynamic = "force-dynamic";

type TParams = Promise<{ path: string[] }>;

export async function GET(request: Request, segmentData: { params: TParams }) {
  const params = await segmentData.params;
  const path = params.path;
  return fetch(`${Environment.NEXT_PUBLIC_API_URL}/static/${path.join("/")}`);
}
