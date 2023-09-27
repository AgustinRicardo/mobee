import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");
  const pageResults = 20;
  let skip;
  if (page) {
    skip = (Number(page) - 1) * pageResults;
  }
  try {
    if (userId) {
      const totalCount = await prismaClient.filmWatchStatus.count({
        where: { user_id: userId, watched: true },
      });

      const maxPage = Math.ceil(totalCount / pageResults);
      const watchstatus = await prismaClient.filmWatchStatus.findMany({
        where: { user_id: userId, watched: true },
        include: { film: true },
        skip,
        take: pageResults,
      });
      const films = watchstatus.map((status) => status.film);
      return NextResponse.json({ films, maxPage });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
