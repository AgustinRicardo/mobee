import PopularFilms from "@/components/PopularFilms";
import { Toaster } from "@/components/ui/toaster";
import { getUser } from "@/lib/functions";

export default async function Home() {
  const user = await getUser();

  return (
    <>
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
      </section>
    </>
  );
}