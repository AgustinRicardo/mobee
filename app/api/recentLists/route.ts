import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const lists = await prismaClient.list.findMany({
      take: 6,
      include: { films: { include: { film: true } }, user: true },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ lists });
  } catch (e) {
    return NextResponse.error();
  }
}
