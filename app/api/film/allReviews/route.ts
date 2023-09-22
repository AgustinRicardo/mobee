import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiId = Number(searchParams.get("apiId"));
  const page = Number(searchParams.get("page"));
  const pageResults = 10;
  let skip;
  if (page) {
    skip = pageResults * (page - 1);
  }
  try {
    const film = await prismaClient.film.findUnique({
      where: {
        tmdb_id: apiId,
      },
    });

    if (film) {
      const total = await prismaClient.review.count({
        where: { film_id: film.id },
      });
      const maxPage = Math.ceil(total / pageResults);
      const reviews = await prismaClient.review.findMany({
        skip,
        take: pageResults,
        orderBy: {
          created_at: "desc",
        },
        where: { film_id: film.id },
        include: {
          user: true,
        },
      });

      return NextResponse.json({ reviews, maxPage });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
