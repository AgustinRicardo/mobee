import { getOrAddFilmToDB } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../lib/prisma-client";
import { FilmOnDB } from "@/lib/interfaces";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { listTitle, listDescription, filmIds, userId } = await request.json();

  try {
    const filmIdsOnDB = await Promise.all(
      filmIds.map(async (apiId: number) => {
        return await getOrAddFilmToDB(apiId);
      })
    );

    const list = await prismaClient.list.create({
      data: { title: listTitle, user_id: userId, description: listDescription },
    });

    await Promise.all(
      filmIdsOnDB.map(async (film: FilmOnDB) => {
        await prismaClient.filmsOnLists.create({
          data: { film_id: film.id, list_id: list.id },
        });
      })
    );
    return NextResponse.json({ message: "Successful" });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");
  let lists;
  const pageResults = 10;
  let skip;
  if (page) {
    skip = (Number(page) - 1) * pageResults;
  }
  try {
    if (userId) {
      const total = await prismaClient.list.count({
        where: { user_id: userId },
      });
      const maxPage = Math.ceil(total / pageResults);

      lists = await prismaClient.list.findMany({
        where: { user_id: userId },
        skip,
        take: pageResults,
        include: {
          films: { include: { film: true } },
          user: true,
        },
      });
      if (lists) {
        return NextResponse.json({ lists, maxPage });
      }
    }
  } catch (e) {
    return NextResponse.error();
  }
}
