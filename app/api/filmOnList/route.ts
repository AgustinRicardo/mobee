import { getOrAddFilmToDB } from "@/lib/functions";
import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { listId, apiId } = await request.json();
  try {
    let filmOnList;
    const filmOnDb = await getOrAddFilmToDB(apiId);
    if (filmOnDb) {
      filmOnList = await prismaClient.filmsOnLists.findFirst({
        where: { film_id: filmOnDb.id, list_id: listId },
      });

      if (!filmOnList) {
        await prismaClient.filmsOnLists.create({
          data: { list_id: listId, film_id: filmOnDb.id },
        });
      }
    }

    return NextResponse.json({ filmOnList });
  } catch (e) {
    return NextResponse.error();
  }
}
