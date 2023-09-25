import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

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

      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });
      let photoPath;
      if (user) {
        photoPath = user.profile_picture_path;
      }
      return NextResponse.json({
        watchlist,
        reviews,
        lists,
        watchedFilms,
        photoPath,
      });
    }
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  const { profilePathname, userId } = await request.json();
  console.log(profilePathname, userId);
  try {
    if (userId) {
      await prismaClient.user.update({
        where: { id: userId },
        data: { profile_picture_path: profilePathname },
      });
    }
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.error();
  }
}
