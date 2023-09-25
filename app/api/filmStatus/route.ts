import prismaClient from "@/lib/prisma-client";
import { getOrAddFilmToDB } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  async function updateToWatchStatus(filmId: string, userId: string) {
    try {
      const filmWatchStatus = await prismaClient.filmWatchStatus.findUnique({
        where: {
          user_id_film_id: {
            user_id: userId,
            film_id: filmId,
          },
        },
      });
      if (filmWatchStatus) {
        await prismaClient.filmWatchStatus.update({
          where: {
            user_id_film_id: {
              user_id: userId,
              film_id: filmId,
            },
          },
          data: {
            to_watch: !filmWatchStatus.to_watch,
          },
        });
      } else {
        await prismaClient.filmWatchStatus.create({
          data: {
            film_id: filmId,
            user_id: userId,
            to_watch: true,
          },
        });
      }
    } catch (e) {}
  }
  async function updateWatchedStatus(filmId: string, userId: string) {
    try {
      const filmWatchStatus = await prismaClient.filmWatchStatus.findUnique({
        where: {
          user_id_film_id: {
            user_id: userId,
            film_id: filmId,
          },
        },
      });
      if (filmWatchStatus) {
        await prismaClient.filmWatchStatus.update({
          where: {
            user_id_film_id: {
              user_id: userId,
              film_id: filmId,
            },
          },
          data: {
            watched: !filmWatchStatus.watched,
          },
        });
      } else {
        await prismaClient.filmWatchStatus.create({
          data: {
            film_id: filmId,
            user_id: userId,
            watched: true,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  const { apiId, userId, isWatched, toWatch } = await request.json();

  try {
    if (apiId) {
      const film = await getOrAddFilmToDB(apiId);
      if (film) {
        if (isWatched !== undefined) {
          await updateWatchedStatus(film.id, userId);
        } else if (toWatch !== undefined) {
          await updateToWatchStatus(film.id, userId);
        }
      }
    }
    return NextResponse.json({ msg: "Successful" });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  const getFilmInfoFromUser = async (userId: string, filmId: string) => {
    try {
      const data = await prismaClient.filmWatchStatus.findUnique({
        where: {
          user_id_film_id: {
            user_id: userId,
            film_id: filmId,
          },
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  const { searchParams } = new URL(request.url);
  const apiId = Number(searchParams.get("apiId"));
  const userId = searchParams.get("userId");
  try {
    if (apiId && userId) {
      const film = await getOrAddFilmToDB(apiId);
      if (film) {
        const watchStatus = await getFilmInfoFromUser(userId, film.id);

        return NextResponse.json({ watchStatus });
      }
    }
  } catch (e) {
    return NextResponse.error();
  }
}
