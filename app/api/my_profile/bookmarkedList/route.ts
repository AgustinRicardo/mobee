import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../lib/prisma-client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  let listsSavedByUser;
  try {
    if (userId) {
      listsSavedByUser = await prismaClient.listSavedByUser.findMany({
        where: { user_id: userId },
        include: {
          list: {
            include: {
              films: { include: { film: true } },
              user: true,
            },
          },
        },
      });
    }

    if (listsSavedByUser) {
      const savedLists = listsSavedByUser.map((entry) => entry.list);
      return NextResponse.json({ savedLists });
    }
  } catch (e) {
    return NextResponse.error();
  }
}
