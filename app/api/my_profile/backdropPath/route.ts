import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { backdropPath, userId } = await request.json();

  try {
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        backdrop_path: backdropPath,
      },
    });

    return NextResponse.json({ msg: "Successful" });
  } catch (e) {
    return NextResponse.error();
  }
}
