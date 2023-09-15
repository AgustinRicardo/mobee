import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, listId } = await request.json();

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    const list = await prismaClient.list.findUnique({
      where: { id: listId },
    });

    if (list && user) {
      const data = await prismaClient.listSavedByUser.create({
        data: {
          list_id: list.id,
          user_id: user.id,
        },
      });

      await prismaClient.list.update({
        where: { id: list.id },
        data: { bookmark_count: list.bookmark_count + 1 },
      });
    }

    return NextResponse.json({ message: "Successful" });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  const { userId, listId } = await request.json();

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    const list = await prismaClient.list.findUnique({
      where: { id: listId },
    });

    if (list && user) {
      const data = await prismaClient.listSavedByUser.delete({
        where: {
          list_id_user_id: {
            list_id: list.id,
            user_id: user.id,
          },
        },
      });

      await prismaClient.list.update({
        where: { id: list.id },
        data: { bookmark_count: list.bookmark_count - 1 },
      });
    }

    return NextResponse.json({ message: "Successful" });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const listId = searchParams.get("listId");

  try {
    if (userId && listId) {
      const savedList = await prismaClient.listSavedByUser.findUnique({
        where: {
          list_id_user_id: {
            list_id: listId,
            user_id: userId,
          },
        },
      });
      const saved = savedList ? true : false;
      return NextResponse.json({ saved });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
