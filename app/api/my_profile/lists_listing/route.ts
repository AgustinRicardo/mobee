import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  let lists;

  try {
    if (userId) {
      lists = await prismaClient.list.findMany({
        where: { user_id: userId },
      });
      if (lists) {
        return NextResponse.json({ lists });
      }
    }
  } catch (e) {
    return NextResponse.error();
  }
}
