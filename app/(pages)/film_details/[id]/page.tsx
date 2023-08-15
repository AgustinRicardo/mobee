import AddToListIcon from "@/components/icons/AddToListIcon";
import AdditionalOptionsIcon from "@/components/icons/AdditionalOptionsIcon";
import ToWatchIcon from "@/components/icons/ToWatchIcon";
import WatchedIcon from "@/components/icons/WatchedIcon";
import { Film } from "@/lib/interfaces";

export default async function Page({ params }: { params: { id: string } }) {
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
  console.log(film);

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

        <div className="user-input h-56 w-56 bg-beeBrownLight">
          <WatchedIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
          <ToWatchIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
          <AddToListIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
          <AdditionalOptionsIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
        </div>
      </div>
    </>
  );
}
