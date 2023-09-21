import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listId = searchParams.get("listId");
  const page = searchParams.get("page");
  const pageResults = 20;
  let skip;
  if (page) {
    skip = pageResults * (Number(page) - 1);
  }

  try {
    if (listId) {
      const listWithFilmCount = await prismaClient.list.findUnique({
        where: {
          id: listId,
        },
        include: {
          _count: {
            select: {
              films: true,
            },
          },
        },
      });
      if (listWithFilmCount) {
        const maxPage = Math.ceil(listWithFilmCount._count.films / pageResults);
        const list = await prismaClient.list.findUnique({
          include: {
            films: { include: { film: true }, skip, take: pageResults },
            user: true,
          },
          where: { id: listId },
        });
        return NextResponse.json({ list, maxPage });
      }
    }
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listId = searchParams.get("listId");
  let list;
  try {
    if (listId) {
      list = await prismaClient.list.delete({
        where: { id: listId },
      });
    }
    if (list) {
      return NextResponse.json({ message: "Successful" }, { status: 200 });
    } else return NextResponse.json({ message: "BadRequest" }, { status: 400 });
  } catch (e) {
    return NextResponse.error();
  }
}
