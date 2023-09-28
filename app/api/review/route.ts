import { getOrAddFilmToDB } from "@/lib/functions";
import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { userId, apiId, date, review, ratingValue } = await request.json();
  try {
    const film = await getOrAddFilmToDB(apiId);
    if (film) {
      const filmWatchStatus = await prismaClient.filmWatchStatus.findUnique({
        where: {
          user_id_film_id: {
            user_id: userId,
            film_id: film.id,
          },
        },
      });
      if(filmWatchStatus){
        const update = await prismaClient.filmWatchStatus.update({
          where: {
            user_id_film_id: {
              user_id: userId,
              film_id: film.id,
            },
          },
          data: {
            to_watch: false,
            watched: true,
          },
        });
      } else {
        await prismaClient.filmWatchStatus.create({
          data: {
            film_id: film.id,
            user_id: userId,
            watched: true,
          },
        });
      }
      const data = await prismaClient.review.create({
        data: {
          film_id: film.id,
          user_id: userId,
          rating: ratingValue,
          review_description: review,
          watched_at: date ? date : null,
        },
      });

      await calculateRating(film.id);
    }

    return NextResponse.json({ message: "Successful" });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  try {
    const recentReviews = await prismaClient.review.findMany({
      include: {
        film: true,
        user: true,
      },
      take: 4,
      where: { review_description: { not: null } },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ recentReviews });
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
      await calculateRating(review.film_id);
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
      data: {
        rating: review.ratingValue,
        review_description: review.review,
        watched_at: review.date ? review.date : null,
      },
    });

    if (updatedReview) {
      await calculateRating(updatedReview.film_id);
      return NextResponse.json({ message: "Successful" }, { status: 200 });
    } else return NextResponse.json({ message: "BadRequest" }, { status: 400 });
  } catch (e) {
    return NextResponse.error();
  }
}

async function calculateRating(filmId: string) {
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
