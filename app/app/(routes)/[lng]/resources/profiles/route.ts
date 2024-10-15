import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { Environment } from "@/app/environment";

export async function GET(request: Request) {
  console.log("resources/profiles/route.ts GET");
  if (request.method === "GET") {
    const queryParams = new URL(request.url).searchParams;
    const queryUrl = `?${new URLSearchParams(queryParams)}`;
    const url = `${Environment.NEXT_PUBLIC_API_URL}/gateway/api/v1/profiles/list${queryUrl}`;
    const data = await fetch(url, { cache: "no-store" });
    if (!data.ok && data.status === 404) notFound();
    return NextResponse.json(await data.json());
  }
  return NextResponse.json([]);
}
