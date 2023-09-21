import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../lib/prisma-client";
import { skip } from "node:test";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");
  const pageResults = 10;
  let skip;
  if (page) {
    skip = (Number(page) - 1) * pageResults;
  }
  let listsSavedByUser;

  try {
    if (userId) {
      const total = await prismaClient.listSavedByUser.count({
        where: { user_id: userId },
      });

      const maxPage = Math.ceil(total / pageResults);
      listsSavedByUser = await prismaClient.listSavedByUser.findMany({
        skip,
        take: pageResults,
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
      if (listsSavedByUser) {
        const savedLists = listsSavedByUser.map((entry) => entry.list);
        return NextResponse.json({ savedLists, maxPage });
      }
    }
  } catch (e) {
    return NextResponse.error();
  }
}
