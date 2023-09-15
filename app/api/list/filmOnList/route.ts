import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../lib/prisma-client";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filmId = searchParams.get("filmId");
  const listId = searchParams.get("listId");
  let filmOnList;

  try {
    if (listId && filmId) {
      filmOnList = await prismaClient.filmsOnLists.delete({
        where: { list_id_film_id: { list_id: listId, film_id: filmId } },
      });
    }
    if (filmOnList) {
      return NextResponse.json({ message: "Successful" }, { status: 200 });
    } else return NextResponse.json({ message: "BadRequest" }, { status: 400 });
  } catch (e) {
    return NextResponse.error();
  }
}
