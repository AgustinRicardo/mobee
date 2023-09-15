import MyUserReviewsContent from "@/components/MyUserReviewsContent";
import { getUser } from "@/lib/functions";

export default async function MyUserReviewsPage() {
  const user = await getUser();

  return <MyUserReviewsContent userId={user?.id!} />;
}
