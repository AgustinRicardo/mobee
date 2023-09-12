import FilmSlider from "@/components/FilmSlider";
import HomeRecentReviews from "@/components/HomeRecentReviews";
import PopularLists from "@/components/PopularLists";
import { getUser } from "@/lib/functions";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <div className="flex flex-col gap-4">
        <section>
          <h1 className="text-beeYellow">POPULAR FILMS</h1>
          <hr className="border-beeYellow" />
          <FilmSlider
            userId={user?.id!}
            url={
              "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
            }
          />
        </section>
        <section>
          <h1 className="text-beeYellow">RECENT REVIEWS</h1>
          <hr className="border-beeYellow" />

          <HomeRecentReviews />
        </section>
        <section>
          <h1 className="text-beeYellow">POPULAR LISTS</h1>
          <hr className="border-beeYellow" />
          <div className="grid grid-cols-3 justify-between gap-1">
            <PopularLists />
          </div>
        </section>
      </div>
    </>
  );
}
