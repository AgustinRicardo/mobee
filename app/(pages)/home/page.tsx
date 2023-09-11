import PopularFilms from "@/components/PopularFilms";
import PopularLists from "@/components/PopularLists";
import { getUser } from "@/lib/functions";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <div className="flex flex-col gap-4">
        <section>
          <h1 className="text-beeYellow">Popular Films</h1>
          <hr className="border-beeYellow" />
          <PopularFilms userId={user?.id!} />
        </section>
        <section>
          <h1 className="text-beeYellow">Recent Reviews</h1>
          <hr className="border-beeYellow" />
        </section>
        <section>
          <h1 className="text-beeYellow">Popular Lists</h1>
          <hr className="border-beeYellow" />
          <div className="flex flex-row justify-between gap-1">
            <PopularLists />
          </div>
        </section>
      </div>
    </>
  );
}
