import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  try {
    if (userId) {
      const watchlist = await prismaClient.filmWatchStatus.findMany({
        include: { film: true },
        where: { user_id: userId, to_watch: true },
      });

      return NextResponse.json({ watchlist });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
