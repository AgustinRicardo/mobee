import MainHeader from "@/components/MainHeader";
import UserProfile from "@/components/UserProfile";
import { getUser } from "@/lib/functions";
import React from "react";

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <>
      {user && (
        <>
          <MainHeader userId={user.id}>
            <UserProfile user={user} />
          </MainHeader>
          <main className="text-beeBeig px-[16%] flex-1">{children}</main>
          <footer className="bg-beeBrownHeader h-20 px-[16%] flex flex-col justify-center">
            <span className="opacity-40 text-sm font-openSans">
              © Mobee Limited. Made by fans.
            </span>
            <span className="opacity-40 text-sm font-openSans">
              Film data from{" "}
              <a className="underline" href="https://www.themoviedb.org/">
                TMDb
              </a>
            </span>
          </footer>
        </>
      )}
    </>
  );
}
