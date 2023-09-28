import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("searchQuery");
  try {
    if (searchQuery) {
      const results = await prismaClient.list.findMany({
        include: {
          films: true,
        },
        where: {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        take: 20,
      });

      return NextResponse.json({ results });
    }
  } catch (e) {
    return NextResponse.error();
  }
}
