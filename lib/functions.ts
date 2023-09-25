import prismaClient from "./prisma-client";
import { User } from "./interfaces";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getUser(): Promise<User | null> {
  let user: User | null;

  const getUserAuth = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.auth.getSession();
    console.log(error);
    if (!error) return data.session?.user;
  };

  const getUserFromDB = async (email: string): Promise<User | null> => {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    return user as User;
  };

  const userSupabase = await getUserAuth();
  if (userSupabase?.email) {
    user = await getUserFromDB(userSupabase.email);
    return user;
  }
  return null;
}

export async function getOrAddFilmToDB(filmId: number) {
  try {
    const data = await prismaClient.film.findFirst({
      where: {
        tmdb_id: filmId,
      },
    });
    if (!data) {
      const film = await prismaClient.film.create({
        data: {
          tmdb_id: filmId,
        },
      });
      return film;
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}
