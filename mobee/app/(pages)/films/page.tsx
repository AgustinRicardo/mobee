import FilmsList from "../../../components/FilmsList";

export default function FilmsPage() {
  return (
    <>
      <main className="text-beeBeig px-64">
        <section>
          <h1 className="text-beeKaki">Popular Films This Week</h1>
          <hr className="border-beeKaki" />
          <FilmsList url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1" />
        </section>
        <section>
          <h1 className="text-beeKaki">Now Playing</h1>
          <hr className="border-beeKaki" />
        </section>
        <section>
          <h1 className="text-beeKaki">Upcoming</h1>
          <hr className="border-beeKaki" />
        </section>
        <section>
          <h1 className="text-beeKaki">Recently Reviewed</h1>
          <hr className="border-beeKaki" />
        </section>
      </main>
    </>
  );
}
