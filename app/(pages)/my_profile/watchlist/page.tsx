import WatchlistDetails from "@/components/WatchlistDetails";
import WatchlistPageContent from "@/components/WatchlistPageContent";
import { getUser } from "@/lib/functions";

export default async function MyUserWatchlistPage() {
  const user = await getUser();
  return (
    <>
      <h1>Your watchlist</h1>
      {user && <WatchlistPageContent user={user} />}
    </>
  );
}
