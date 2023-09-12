import FilmSlider from "@/components/FilmSlider";
import { Toaster } from "@/components/ui/toaster";
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
        </section>
        <section>
          <h1 className="text-beeYellow">POPULAR LISTS</h1>
          <hr className="border-beeYellow" />
        </section>
      </div>
    </>
  );
}
