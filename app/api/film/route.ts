import { getOrAddFilmToDB } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiId = Number(searchParams.get("apiId"));
  try {
    if (apiId) {
      const film = await getOrAddFilmToDB(apiId);
      if (film) {
        return NextResponse.json({ film });
      }
    }
  } catch (e) {
    return NextResponse.error();
  }
}
