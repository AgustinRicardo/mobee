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
      {children}
    </>
  );
}
