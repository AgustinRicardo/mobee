import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  const pageResults = 20;
  let skip;
  if (page) {
    skip = pageResults * (Number(page) - 1);
  }

  try {
    const total = await prismaClient.review.findMany({ distinct: ["film_id"] });

    const maxPage = Math.ceil(total.length / pageResults);

    const reviews = await prismaClient.review.findMany({
      skip,
      distinct: ["film_id"],
      orderBy: { created_at: "desc" },
      take: pageResults,
      include: {
        film: true,
      },
    });
    const results = reviews.map((review) => {
      return review.film;
    });

    return NextResponse.json({ results, maxPage });
  } catch (e) {
    return NextResponse.error();
  }
}
