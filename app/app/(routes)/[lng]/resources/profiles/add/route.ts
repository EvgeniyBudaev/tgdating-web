import { Environment } from "@/app/environment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("resources/profiles/add/route.ts POST");
  if (request.method === "POST") {
    const url = `${Environment.NEXT_PUBLIC_API_URL}/gateway/api/v1/profiles`;
    const formData = await request?.formData();
    console.log("PPPPPPPPPPPPP POST formData", formData);
    // const data = await fetch(url, {
    //   cache: "no-store",
    //   method: "POST",
    //   body: formData,
    // });
    // return NextResponse.json(await data.json());
    return NextResponse.json([]);
  }
}
