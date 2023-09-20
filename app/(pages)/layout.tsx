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
          <main className="text-beeBeig px-[16%]">{children}</main>
          <footer className="bg-beeBrownHeader h-12"></footer>
        </>
      )}
    </>
  );
}
