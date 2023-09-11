import prismaClient from "../../../lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
      const lists = await prismaClient.list.findMany({
        include: { films: { include: { film: true } } }
      });
  
      return NextResponse.json({ lists }, { status: 200 });
    } catch (e) {
      return NextResponse.error();
    }
  }