import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prismaClient from "../lib/prisma-client";
import { cookies } from "next/headers";

export const revalidate = 1000;

export default async function UserProfile() {
  console.log(":)");
  let username: string | undefined;

  const getUserAuth = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.auth.getUser();
    console.log(error);
    if (!error) return data.user;
  };

  const getUsername = async (email: string): Promise<string | undefined> => {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(user);
    return user?.username;
  };

  const user = await getUserAuth();
  if (user?.email) {
    username = await getUsername(user.email);
    console.log(username);
  }

  return (
    <div>
      <img src="#" alt="user image" />
      <span>{username}</span>
    </div>
  );
}
