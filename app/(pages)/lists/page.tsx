import ListSearchBar from "@/components/ListSearchBar";
import PopularLists from "@/components/PopularLists";
import RecentLists from "@/components/RecentLists";
import { getUser } from "@/lib/functions";

export default async function Lists() {
  const user = await getUser();

  return (
    <>
      <div className="flex flex-row justify-end">
        <ListSearchBar />
      </div>
      <div className="lists-section text-beeYellow">
        <div className="flex flex-row py-1">
          <span className="text-beeYellow">RECENT LISTS</span>
        </div>
        <hr className="border-beeYellow" />
        <div className="grid grid-cols-3 gap-3 py-4">
          <RecentLists userId={user?.id!} />
        </div>
      </div>
      <div className="lists-section text-beeYellow">
        <div className="flex flex-row py-1">
          <span className="text-beeYellow">POPULAR LISTS</span>
        </div>
        <hr className="border-beeYellow" />
        <div className="grid grid-cols-3 gap-3 py-4">
          <PopularLists userId={user?.id!} />
        </div>
      </div>
    </>
  );
}
