import { getOrAddFilmToDB } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../lib/prisma-client";

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
      filmIdsOnDB.map(async (filmId: string) => {
        await prismaClient.filmsOnLists.create({
          data: { film_id: filmId, list_id: list.id },
        });
      })
    );
    return NextResponse.json({ message: "Successful" }, { status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
