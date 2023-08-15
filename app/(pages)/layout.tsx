import MainHeader from "@/components/MainHeader";
import UserProfile from "@/components/UserProfile";
import React from "react";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainHeader>
        <UserProfile />
      </MainHeader>
      <main className="text-beeBeig px-[16%]">{children}</main>
      <footer className="h-12 bg-beeBrownHeader"></footer>
    </>
  );
}
