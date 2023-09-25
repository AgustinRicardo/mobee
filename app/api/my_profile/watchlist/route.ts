import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");
  let skip;
  const pageResults = 20;
  if (page) {
    skip = pageResults * (Number(page) - 1);
  }

  try {
    if (userId) {
      const total = await prismaClient.filmWatchStatus.count({
        where: {
          user_id: userId,
          to_watch: true,
        },
      });
      const maxPage = Math.ceil(total / pageResults);
      const watchlist = await prismaClient.filmWatchStatus.findMany({
        include: { film: true },
        where: { user_id: userId, to_watch: true },
        skip,
        take: pageResults,
      });

      return NextResponse.json({ watchlist, maxPage });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
