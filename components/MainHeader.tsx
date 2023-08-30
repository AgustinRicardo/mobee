"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import SearchIcon from "./icons/SearchIcon";

export default function MainHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };
  return (
    <>
      <header
        className={`flex relative flex-row items-center px-[16%] bg-beeBrownHeader gap-12 h-16 font-switzer font-medium text-sm ${
          pathname.includes("/film_details") ? "" : "mb-8"
        }`}
      >
        <img
          src="/logo.png"
          alt="logo"
          className="mr-auto justify-start w-24"
        />
        <nav className="flex flex-row gap-10 uppercase">
          <Link
            href="/home"
            className={pathname === "/home" ? "" : "opacity-50"}
          >
            Home
          </Link>
          <Link
            href="/films"
            className={pathname === "/films" ? "" : "opacity-50"}
          >
            Films
          </Link>
          <Link
            href="/lists"
            className={pathname === "/lists" ? "" : "opacity-50"}
          >
            Lists
          </Link>
        </nav>
        <form id="search-bar" className="relative flex flex-row items-center">
          <input
            type="text"
            className="h-7 rounded-sm text-beeBrownBackground bg-beeBeig placeholder:text-beeBrownBackground pl-2 placeholder:opacity-50"
            placeholder="Search"
          />
          <SearchIcon />
        </form>
        {children}
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
      </header>
    </>
  );
}
