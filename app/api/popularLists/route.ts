import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const lists = await prismaClient.list.findMany({
      take: 6,
      include: { films: { include: { film: true } }, user: true },
      orderBy: { bookmark_count: "desc" },
    });

    return NextResponse.json({ lists });
  } catch (e) {
    return NextResponse.error();
  }
}
