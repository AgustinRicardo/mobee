"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function MainHeader() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
}
