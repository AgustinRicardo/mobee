import ListDetails from "@/components/ListDetails";
import { getUser } from "@/lib/functions";

export default async function MyUserWatchlistPage() {
  const user = await getUser();
  return (
    <ListDetails
      url={`/api/my_profile/watchlist?userId=${user?.id}`}
      userId={user?.id!}
    />
  );
}
