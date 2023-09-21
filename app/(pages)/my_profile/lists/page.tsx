import MyUserListsContent from "@/components/MyUserListsContent";
import { getUser } from "@/lib/functions";

export default async function MyUserListsPage() {
  const user = await getUser();
  return <MyUserListsContent userId={user?.id!} />;
}
