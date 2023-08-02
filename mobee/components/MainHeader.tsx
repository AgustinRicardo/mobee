"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <>
      <header className="flex flex-row px-80 gap-12">
        <img src="#" alt="logo" className="mr-auto justify-start" />
        <nav className="flex flex-row gap-10">
          <Link href="/films">Films</Link>
          <Link href="/lists">Lists</Link>
          <Link href="/members">Members</Link>
        </nav>
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
