import MyUserFilmsContent from "@/components/MyUserFilmsContent";
import { getUser } from "@/lib/functions";

export default async function MyUserFilmsPage() {
  const user = await getUser();

  return <MyUserFilmsContent userId={user?.id!} />;
}
