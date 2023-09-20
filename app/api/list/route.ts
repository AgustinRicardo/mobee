import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listId = searchParams.get("listId");

  try {
    if (listId) {
      const list = await prismaClient.list.findUnique({
        include: { films: { include: { film: true } }, user: true },
        where: { id: listId },
      });
      return NextResponse.json({ list });
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
