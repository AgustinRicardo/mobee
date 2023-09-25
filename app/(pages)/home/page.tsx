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
          <h1 className="text-beeYellow font-openSans font-medium text-base tracking-wide uppercase">
            Popular films
          </h1>
          <hr className="border-beeYellow" />
          <FilmSlider
            userId={user?.id!}
            url={
              "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
            }
            numOfFilms={5}
          />
        </section>
        <section>
          <h1 className="text-beeYellow font-openSans font-medium text-base tracking-wide uppercase">
            RECENT REVIEWS
          </h1>
          <hr className="border-beeYellow" />

          <HomeRecentReviews />
        </section>
        <section>
          <h1 className="text-beeYellow font-openSans font-medium text-base tracking-wide uppercase">
            POPULAR LISTS
          </h1>
          <hr className="border-beeYellow" />
          <div className="grid grid-cols-3 justify-between gap-y-8 gap-x-4 py-4">
            <PopularLists userId={user?.id!} />
          </div>
        </section>
      </div>
    </>
  );
}
