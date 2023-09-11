"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddReviewIcon from "./icons/AddReviewIcon";
import DropdownIcon from "./icons/DropdownIcon";
import CreateDropdown from "./CreateDropdown";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { SearchBar } from "./SearchBar";

interface Props {
  children: React.ReactNode;
  userId: string;
}
export default function MainHeader({ children, userId }: Props) {
  const dropdownContentStyle = "bg-beeBrownLight border-none text-beeBeig";

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
        className={`flex relative flex-row items-center px-[16%]  bg-beeBrownHeader gap-12 h-16 font-switzer font-medium text-sm justify-evenly ${
          pathname.includes("/film_details") || pathname.includes("/profile")
            ? ""
            : "mb-8"
        }`}
      >
        <img src="/logo.png" alt="logo" className="w-24" />
        <nav className="flex flex-row gap-10 uppercase ml-auto">
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
        <SearchBar/>

        <DropdownMenu>
          <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
          <DropdownMenuContent className={dropdownContentStyle}>
            <DropdownMenuItem
              className="text-beeBeig data-[highlighted]:bg-beeBeig data-[highlighted]:text-beeBrownBackground"
              onClick={() => {
                router.push("/profile");
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-beeBeig data-[highlighted]:bg-beeBeig data-[highlighted]:text-beeBrownBackground"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {<CreateDropdown userId={userId} />}
      </header>
    </>
  );
}
