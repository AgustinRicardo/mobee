import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, apiId, date, review, ratingValue } = await request.json();
  try {
    console.log(userId, apiId, date, review, ratingValue);
    const film = await prismaClient.film.findUnique({
      where: { tmdb_id: apiId },
    });
    console.log(film?.id);
    if (film) {
      const data = await prismaClient.review.create({
        data: {
          film_id: film.id,
          user_id: userId,
          rating: ratingValue,
          reveiw_description: review,
          watched_at: date ? date : null,
        },
      });
    }

    return NextResponse.json({ msg: "Successful", status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
