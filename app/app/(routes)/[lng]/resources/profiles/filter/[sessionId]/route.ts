import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { Environment } from "@/app/environment";

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } },
) {
  console.log("resources/profiles/filter/sessionId/route.ts GET");
  if (request.method === "GET") {
    const queryParams = new URL(request.url).searchParams;
    const queryUrl = `?${new URLSearchParams(queryParams)}`;
    const url = `${Environment.NEXT_PUBLIC_API_URL}/gateway/api/v1/profiles/filter/${params.sessionId}${queryUrl}`;
    const data = await fetch(url, { cache: "no-store" });
    if (!data.ok && data.status === 404) notFound();
    return NextResponse.json(await data.json());
  }
}
