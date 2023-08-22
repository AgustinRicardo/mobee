import FilmTabs from "@/components/FilmTabs";
import FilmList from "@/components/FilmsList";

export default function FilmsPage() {
  return (
    <>
      <section className="py-6">
        <FilmTabs
          popular={
            <FilmList url="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
          }
          upcoming={
            <FilmList url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1" />
          }
          nowPlaying={
            <FilmList url="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1" />
          }
          recentReviews={<></>}
        ></FilmTabs>
      </section>
    </>
  );
}
