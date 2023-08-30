import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { listTitle, listDescription, filmIds } = await request.json();
  console.log("hehe");
  try {
    console.log(listTitle, listDescription, filmIds);
    return NextResponse.json({ msg: "Successful", status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
