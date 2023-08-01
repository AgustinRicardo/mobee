"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainHeader() {
  const supabase = createClientComponentClient();
  const [username, setUsername] = useState("");
  const router = useRouter();

  const getUser = async () => {
    const data = await fetch("/api/user");
    const { username } = await data.json();
    setUsername(username);
  };

  useEffect(() => {
    getUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <>
      <span>{username}</span>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </>
  );
}
