import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiId = Number(searchParams.get("apiId"));

  try {
    const film = await prismaClient.film.findUnique({
      where: {
        tmdb_id: apiId,
      },
    });
    if (film) {
      const reviews = await prismaClient.review.findMany({
        where: { film_id: film?.id },
        include: { user: true },
        take: 3,
      });
      return NextResponse.json({ reviews });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
