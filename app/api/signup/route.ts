import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../lib/prisma-client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface UserDBInfo {
  username: string;
  email: string;
}

type Credentials = {
  email: string;
  password: string;
};

async function createSupabaseUser(credentials: Credentials) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) throw error;
  } catch (e) {
    throw e;
  }
}

export async function createDBUser(dbUser: UserDBInfo) {
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

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

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
