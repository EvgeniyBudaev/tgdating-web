import { Environment } from "@/app/environment";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params: { path } }: { params: { path: string[] } },
) {
  return fetch(`${Environment.NEXT_PUBLIC_API_URL}/static/${path.join("/")}`);
}
