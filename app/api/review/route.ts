import { getOrAddFilmToDB } from "@/lib/functions";
import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, apiId, date, review, ratingValue } = await request.json();
  console.log(userId, apiId, date, review, ratingValue);

  try {
    const filmId = await getOrAddFilmToDB(apiId);

    if (filmId) {
      const data = await prismaClient.review.create({
        data: {
          film_id: filmId,
          user_id: userId,
          rating: ratingValue,
          review_description: review,
          watched_at: date ? date : null,
        },
      });

      const allReviews = await prismaClient.review.findMany({
        where: {
          film_id: filmId,
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
        where: { id: filmId },
        data: { average_rating: totalRating / numberOfReviews },
      });
    }

    return NextResponse.json({ message: "Successful" }, { status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
