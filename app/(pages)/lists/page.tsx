import PopularLists from "@/components/PopularLists";
import RecentLists from "@/components/RecentLists";
import { getUser } from "@/lib/functions";

export default async function Lists() {
  return (
    <>
      <div className="lists-section text-beeYellow">
        <div className="flex flex-row py-1">
          <span className="text-beeYellow">Recent Lists</span>
        </div>
        <hr className="border-beeYellow" />
        <div className="flex flex-row justify-between">
          <RecentLists />
        </div>
      </div>
      <div className="lists-section text-beeYellow">
        <div className="flex flex-row py-1">
          <span className="text-beeYellow">Popular Lists</span>
        </div>
        <hr className="border-beeYellow" />
        <div className="flex flex-row justify-between gap-1">
          <PopularLists />
        </div>
      </div>
    </>
  );
}
