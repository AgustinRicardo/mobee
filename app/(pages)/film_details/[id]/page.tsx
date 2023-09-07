import FilmWatchStatusPanel from "@/components/FilmWatchStatusPanel";
import { Film, WatchStatus } from "@/lib/interfaces";
import { getUser } from "@/lib/functions";
import FilmDetailsTabs from "@/components/FilmDetailsTabs";
import CastList from "@/components/CastList";

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
      />
      <div className="flex flex-row justify-around">
        <img
          src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
          alt="poster"
          className="w-44 h-min relative bottom-5 border-beeBeig border-2 rounded-md"
        />

        <div className="film_details flex flex-col relative bottom-2 w-[550px] gap-2">
          <div className="title flex flex-row">
            <h1 className="mr-auto text-[48px] font-lora font-medium">{film.title}</h1>
            <span className="text-[24px] font-lora font-thin mt-[20px]">{film.release_date.slice(0, 4)}</span>
          </div>
          <span className="text-[20px] font-switzer">{`Directed by ${
            film.credits.crew.find((person) => {
              return person.job === "Director";
            })?.name || "Unknown"
          }`}</span>
          <span className="text-[20px] font-switzer mb-[20px]">{`${film.runtime} min`}</span>
          <span className="italic">{film.tagline.toUpperCase()}</span>
          <p className="font-semibold font-lora text-[20px]">{film.overview}</p>
          <FilmDetailsTabs cast={<CastList cast={film.credits.cast}/>} crew={undefined} details={undefined} genres={undefined}></FilmDetailsTabs>
        </div>

        <FilmWatchStatusPanel userId={user?.id!} film={film} />
      </div>
    </>
  );
}
