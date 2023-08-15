import PopularFilms from "@/components/PopularFilms";

export default function Home() {
  return (
    <>
      <main className="text-beeBeig px-64">
        <section>
          <h1 className="text-beeYellow">Popular Films</h1>
          <hr className="border-beeYellow" />
          <PopularFilms />
        </section>
        <section>
          <h1 className="text-beeYellow">Recent Reviews</h1>
          <hr className="border-beeYellow" />
        </section>
        <section>
          <h1 className="text-beeYellow">Popular Lists</h1>
          <hr className="border-beeYellow" />
        </section>
      </main>
    </>
  );
}
