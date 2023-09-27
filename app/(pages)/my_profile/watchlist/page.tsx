import WatchlistPageContent from "@/components/WatchlistPageContent";
import { getUser } from "@/lib/functions";

export default async function MyUserWatchlistPage() {
  const user = await getUser();
  return (
    <>
      <div className="wrapper py-4">
        <h1 className="text-beeYellow font-openSans font-medium text-base tracking-wide uppercase">
          Your watchlist
        </h1>
        <hr className="border-beeYellow" />
      </div>
      {user && <WatchlistPageContent user={user} />}
    </>
  );
}
