import FilmWatchStatusPanel from "@/components/FilmWatchStatusPanel";
import { Film, WatchStatus } from "@/lib/interfaces";
import { getUser } from "@/lib/functions";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser();

  const getFilmAndCrewDetails = async () => {
    const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US&append_to_response=credits`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };
    const res = await fetch(url, options);
    const details = await res.json();

    return details;
  };

  const film: Film = await getFilmAndCrewDetails();

  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
        alt="backdrop"
        className=""
      />
      <div className="flex flex-row p-12 justify-around">
        <img
          src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
          alt="poster"
          className="w-44 h-min"
        />

        <div className="film_details flex flex-col w-96 gap-4">
          <div className="title flex flex-row">
            <h1 className="mr-auto">{film.title}</h1>
            <span>{film.release_date.slice(0, 4)}</span>
          </div>
          <span>{`Directed by ${
            film.credits.crew.find((person) => {
              return person.job === "Director";
            })?.name || "Unknown"
          }`}</span>
          <span>{film.tagline}</span>
          <p>{film.overview}</p>
        </div>

        <FilmWatchStatusPanel userId={user?.id!} film={film} />
      </div>
    </>
  );
}