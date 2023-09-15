import { getOrAddFilmToDB } from "@/lib/functions";
import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, apiId, date, review, ratingValue } = await request.json();

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

    return NextResponse.json({ message: "Successful" });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  try {
    const recentReviews = await prismaClient.review.findMany({
      take: 4,
      where: { review_description: { not: null } },
    });
    const recentReviewsWithUserAndFilm = await Promise.all(
      recentReviews.map(async (review) => {
        const film = await prismaClient.film.findUnique({
          where: { id: review.film_id },
        });
        const user = await prismaClient.user.findUnique({
          where: { id: review.user_id },
        });
        return { review, user, film };
      })
    );

    return NextResponse.json({ recentReviewsWithUserAndFilm });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reviewId = searchParams.get("reviewId");

  let review;
  try {
    if (reviewId) {
      review = await prismaClient.review.delete({
        where: { id: reviewId },
      });
    }
    if (review) {
      return NextResponse.json({ message: "Successful" }, { status: 200 });
    } else return NextResponse.json({ message: "BadRequest" }, { status: 400 });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  const review = await request.json();
  try {
    const updatedReview = await prismaClient.review.update({
      where: { id: review.id },
      data: review,
    });
    if (updatedReview) {
      return NextResponse.json({ message: "Successful" }, { status: 200 });
    } else return NextResponse.json({ message: "BadRequest" }, { status: 400 });
  } catch (e) {
    return NextResponse.error();
  }
}
