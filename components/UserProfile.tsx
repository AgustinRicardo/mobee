import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prismaClient from "../lib/prisma-client";
import { cookies } from "next/headers";
import photo from "../assets/profile_photo.jpg";

export const revalidate = 1000;

export default async function UserProfile() {
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
    <div className="flex flex-row gap-2 items-center ">
      <img
        src="/profile_photo.jpg"
        alt="user image"
        className="w-8 h-8 rounded-full"
      />
      <span className="">{username}</span>
    </div>
  );
}
