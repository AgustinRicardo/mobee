import { getOrAddFilmToDB } from "@/lib/functions";
import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, apiId, date, review, ratingValue } = await request.json();
  console.log(userId, apiId, date, review, ratingValue);

  try {
    const film = await getOrAddFilmToDB(apiId);

    if (film) {
      const data = await prismaClient.review.create({
        data: {
          film_id: film.id,
          user_id: userId,
          rating: ratingValue,
          review_description: review,
          watched_at: date ? date : null,
        },
      });

      const allReviews = await prismaClient.review.findMany({
        where: {
          film_id: film.id,
        },
      });
      let totalRating = 0;
      let numberOfReviews = 0;
      allReviews.forEach((review) => {
        if (review.rating) {
          totalRating += review.rating;
          numberOfReviews++;
        }
      });

      await prismaClient.film.update({
        where: { id: film.id },
        data: { average_rating: totalRating / numberOfReviews },
      });
    }

    return NextResponse.json({ message: "Successful" }, { status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
