import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");
  const pageResults = 10;
  let skip;
  if (page) {
    skip = (Number(page) - 1) * pageResults;
  }

  try {
    if (userId) {
      const total = await prismaClient.review.count({
        where: { user_id: userId },
      });
      const maxPage = Math.ceil(total / pageResults);
      const reviews = await prismaClient.review.findMany({
        take: pageResults,
        skip,
        where: { user_id: userId },
        include: { film: true },
        orderBy: { created_at: "desc" },
      });

      return NextResponse.json({ reviews, maxPage });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
