import ProfileContent from "@/components/ProfileContent";
import { getUser } from "@/lib/functions";

export default async function MyProfilePage() {
  const user = await getUser();

  return (
    <>
      <ProfileContent userId={user?.id!} />
    </>
  );
}
