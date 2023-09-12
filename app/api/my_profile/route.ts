import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    if (userId) {
      const watchlist = await prismaClient.filmWatchStatus.findMany({
        include: { film: true },
        where: {
          user_id: userId,
        },
        take: 4,
      });
      const watchedFilms = await prismaClient.filmWatchStatus.count({
        where: {
          user_id: userId,
          watched: true,
        },
      });
      const reviews = await prismaClient.review.findMany({
        include: { film: true },
        where: {
          user_id: userId,
        },
        orderBy: { created_at: "desc" },
        take: 3,
      });
      const lists = await prismaClient.list.findMany({
        include: { films: { include: { film: true } } },
        where: {
          user_id: userId,
        },
        orderBy: { created_at: "desc" },
        take: 3,
      });
      return NextResponse.json({ watchlist, reviews, lists, watchedFilms });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
