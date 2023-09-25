import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../lib/prisma-client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Credentials, UserDBInfo } from "@/lib/interfaces";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  async function createSupabaseUser(credentials: Credentials) {
    try {
      const supabase = createServerComponentClient({ cookies });
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw error;
    } catch (e) {
      throw e;
    }
  }

  async function createDBUser(dbUser: UserDBInfo) {
    try {
      const user = await prismaClient.user.create({
        data: {
          email: dbUser.email,
          username: dbUser.username,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  try {
    if (username && email && password) {
      await createSupabaseUser({ email, password });
      await createDBUser({ username, email });
    }
    return NextResponse.json({ msg: "Successful" });
  } catch (e) {
    return NextResponse.error();
  }
}
