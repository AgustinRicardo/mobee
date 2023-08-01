import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../lib/prisma-client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getUserAuth = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getUser();
  if (!error) return data.user;
};

const getUsername = async (email: string): Promise<string | undefined> => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
  return user?.username;
};

export async function GET() {
  const supabaseUser = await getUserAuth();
  if (supabaseUser?.email) {
    const username = await getUsername(supabaseUser?.email);
    if (username) {
      return NextResponse.json({ username }, { status: 200 });
    }
  }
}
