import PopularLists from "@/components/PopularLists";
import RecentLists from "@/components/RecentLists";
import { getUser } from "@/lib/functions";

export default async function Lists() {
  const user = await getUser();
  return (
    <>
      <div className="lists-section text-beeYellow">
        <div className="flex flex-row py-1">
          <span className="text-beeYellow">Recent Lists</span>
          <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 py-0.5">
            More
          </button>
        </div>
        <hr className="border-beeYellow" />
        <div className="flex flex-row justify-between">
          <RecentLists userId={user?.id!} />
        </div>
      </div>
      <div className="lists-section text-beeYellow">
        <div className="flex flex-row py-1">
          <span className="text-beeYellow">Popular Lists</span>
          <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 py-0.5">
            More
          </button>
        </div>
        <hr className="border-beeYellow" />
        <div className="flex flex-row justify-between">
          <PopularLists />
        </div>
      </div>
    </>
  );
}
