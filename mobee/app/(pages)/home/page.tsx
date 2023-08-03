import PopularFilms from "@/components/PopularFilms";

export default function Home() {
  return (
    <>
      <main className="text-beeBeig px-64">
        <section>
          <h1 className="text-beeKaki">Popular Films</h1>
          <hr className="border-beeKaki" />
          <PopularFilms />
        </section>
        <section>
          <h1 className="text-beeKaki">Recent Reviews</h1>
          <hr className="border-beeKaki" />
        </section>
        <section>
          <h1 className="text-beeKaki">Popular Lists</h1>
          <hr className="border-beeKaki" />
        </section>
      </main>
    </>
  );
}
