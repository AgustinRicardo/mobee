import MyUserListsContent from "@/components/MyUserListsContent";
import { getUser } from "@/lib/functions";
import { List } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default async function MyUserListsPage() {
  const user = await getUser();
  return <MyUserListsContent userId={user?.id!} />;
}
