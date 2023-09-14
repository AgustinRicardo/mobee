import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const reviews = await prismaClient.review.findMany({
      distinct: ["film_id"],
      orderBy: { created_at: "desc" },
      take: 20,
      include: {
        film: true,
      },
    });

    const results = reviews.map((review) => {
      return review.film;
    });
    return NextResponse.json({ results });
  } catch (e) {
    return NextResponse.error();
  }
}
