import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { Environment } from "@/app/environment";

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } },
) {
  if (request.method === "GET") {
    const url = `${Environment.NEXT_PUBLIC_API_URL}/gateway/api/v1/profiles/short/${params.sessionId}`;
    console.log("resources/profiles/short/sessionId/route.ts GET url: ", url);
    const data = await fetch(url, { cache: "no-store" });
    if (!data.ok && data.status === 404) notFound();
    return NextResponse.json(await data.json());
  }
}
