import { number } from "zod";
import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
      const lists = await prismaClient.list.findMany({
        take: 6,
        include: { films: { include: { film: true } } },
        orderBy: { bookmark_count: "desc" },
      });
  
      return NextResponse.json({ lists }, { status: 200 });
    } catch (e) {
      return NextResponse.error();
    }
  }