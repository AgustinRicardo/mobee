import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUser = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return null;
  }
  return session.user;
};

export default async function Home() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return <div>No session</div>;
}
