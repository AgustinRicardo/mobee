import FilmTabs from "@/components/FilmTabs";
import FilmList from "@/components/FilmList";
import FilterFilmList from "@/components/FilterFilmList";
import { getUser } from "@/lib/functions";

export default async function FilmsPage() {
  const user = await getUser();
  const userId = user?.id!;
  return (
    <>
      <section className="py-6">
        <FilmTabs
          popular={
            <FilmList
              url="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
              userId={userId}
            />
          }
          upcoming={
            <FilmList
              url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
              userId={userId}
            />
          }
          nowPlaying={
            <FilmList
              url="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
              userId={userId}
            />
          }
          recentReviews={
            <FilmList url="/api/recentlyReviewedFilms" userId={userId} ownDB />
          }
          filter={<FilterFilmList userId={userId} />}
        ></FilmTabs>
      </section>
    </>
  );
}
