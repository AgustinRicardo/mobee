import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, filmId, date, review, ratingValue } = await request.json();
  try {
    console.log(userId, filmId, date, review, ratingValue);
    return NextResponse.json({ msg: "Successful", status: 200 });
  } catch (e) {
    return NextResponse.error();
  }
}
