import FilmsList from "../../../components/FilmsList";

export default function FilmsPage() {
  return (
    <>
      <section>
        <h1 className="text-beeYellow">Popular Films This Week</h1>
        <hr className="border-beeYellow" />
        <FilmsList url="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
      </section>
      <section>
        <h1 className="text-beeYellow">Now Playing</h1>
        <hr className="border-beeYellow" />
        <FilmsList url="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1" />
      </section>
      <section>
        <h1 className="text-beeYellow">Upcoming</h1>
        <hr className="border-beeYellow" />
        <FilmsList url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1" />
      </section>
      <section>
        <h1 className="text-beeYellow">Recently Reviewed</h1>
        <hr className="border-beeYellow" />
      </section>
    </>
  );
}
