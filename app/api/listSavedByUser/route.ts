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
        data: { bookmark_count: list.bookmark_count++ },
      });
    }

    return NextResponse.json({ message: "Successful" }, { status: 200 });
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
        data: { bookmark_count: list.bookmark_count-- },
      });
    }

    return NextResponse.json({ message: "Successful" }, { status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  try {
    const lists = await prismaClient.list.findMany({ orderBy: { bookmark_count: 'desc' } });

    return NextResponse.json({ lists }, { status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
