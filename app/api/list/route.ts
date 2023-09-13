import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listId = searchParams.get("listId");

  try {
    if (listId) {
      const list = await prismaClient.list.findUnique({
        include: { films: { include: { film: true } } },
        where: { id: listId },
      });
      return NextResponse.json({ list });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
