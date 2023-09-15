import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  try {
    if (userId) {
      const watchstatus = await prismaClient.filmWatchStatus.findMany({
        where: { user_id: userId, watched: true },
        include: { film: true },
      });
      const films = watchstatus.map((status) => status.film);
      return NextResponse.json({ films });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
