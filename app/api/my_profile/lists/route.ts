import { getOrAddFilmToDB } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../lib/prisma-client";
import { FilmOnDB } from "@/lib/interfaces";

export async function POST(request: NextRequest) {
  const { listTitle, listDescription, filmIds, userId } = await request.json();

  try {
    console.log(listTitle, listDescription, filmIds, userId);
    const filmIdsOnDB = await Promise.all(
      filmIds.map(async (apiId: number) => {
        return await getOrAddFilmToDB(apiId);
      })
    );

    const list = await prismaClient.list.create({
      data: { title: listTitle, user_id: userId, description: listDescription },
    });
    console.log(list.id);
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
  let lists;
  console.log(userId);
  try {
    if (userId) {
      lists = await prismaClient.list.findMany({
        where: { user_id: userId },
        include: { films: true },
      });
    }
    console.log(lists);
    if (lists) {
      return NextResponse.json({ lists });
    }
  } catch (e) {
    return NextResponse.error();
  }
}
