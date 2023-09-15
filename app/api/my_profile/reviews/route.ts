import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { useId } from "react";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  try {
    if (userId) {
      const reviews = await prismaClient.review.findMany({
        where: { user_id: userId },
        include: { film: true },
        orderBy: { created_at: "desc" },
      });

      return NextResponse.json({ reviews });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
