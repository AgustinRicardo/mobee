import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../lib/prisma-client";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiId = searchParams.get("apiId");
  const listId = searchParams.get("listId");
  let filmOnList;
  console.log("hello", apiId, listId);
  try {
    if (listId && apiId) {
      const film = await prismaClient.film.findUnique({
        where: {
          tmdb_id: Number(apiId),
        },
      });
      if (film) {
        filmOnList = await prismaClient.filmsOnLists.delete({
          where: { list_id_film_id: { list_id: listId, film_id: film.id } },
        });
      }
    }
    if (filmOnList) {
      return NextResponse.json({ message: "Successful" }, { status: 200 });
    } else return NextResponse.json({ message: "BadRequest" }, { status: 400 });
  } catch (e) {
    return NextResponse.error();
  }
}
