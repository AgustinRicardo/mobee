import FilmWatchStatusPanel from "@/components/FilmWatchStatusPanel";
import { Film } from "@/lib/interfaces";
import { getUser } from "@/lib/functions";
import FilmDetailsTabs from "@/components/FilmDetailsTabs";
import CastList from "@/components/CastList";
import GenreList from "@/components/GenreList";
import CrewList from "@/components/CrewList";
import DetailsList from "@/components/DetailsList";
import FilmSlider from "@/components/FilmSlider";
import ReviewList from "@/components/ReviewList";

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
      {film.poster_path !== null ? (
        <div className="relative z-0 mx-[-2%]">
          <div className="absolute z-10 bg-gradientOverlay w-full h-full"></div>

          <img
            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
            alt=""
            className="z-0"
          />
        </div>
      ) : null}

      <div
        className={`flex flex-row gap-4 z-20 overflow-visible px-4 ${
          film.poster_path !== null ? "py-4" : " relative bottom-32"
        }`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
          alt="poster"
          className="w-44 h-min border-beeBrownLight border-2 rounded-md sticky top-5 "
        />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-4 w-full justify-between">
            <div className="film_details flex flex-col w-[34rem] gap-8">
              <div className="flex flex-col">
                <div className="title flex flex-row gap-5 items-baseline py-0">
                  <h1 className="text-[48px] font-lora font-bold">
                    {film.title}
                  </h1>
                  <span className="text-[24px] font-openSans font-normal opacity-50">
                    {film.release_date.slice(0, 4)}
                  </span>
                </div>
                <span className="text-md font-openSans opacity-80">
                  {`Directed by ${
                    film.credits.crew.find((person) => {
                      return person.job === "Director";
                    })?.name || "Unknown"
                  }, `}
                  <span className="italic">{`${film.runtime} min`}</span>
                </span>
              </div>

              <span className="italic font-thin">
                {film.tagline.toUpperCase()}
              </span>
              <p className="font-normal font-lora text-xl">{film.overview}</p>
              <FilmDetailsTabs
                cast={<CastList cast={film.credits.cast} />}
                crew={<CrewList crew={film.credits.crew} />}
                details={
                  <DetailsList
                    companies={film.production_companies}
                    countries={film.production_countries}
                  />
                }
                genres={<GenreList genres={film.genres} />}
              ></FilmDetailsTabs>
            </div>
            <FilmWatchStatusPanel userId={user?.id!} film={film} />
          </div>
          <div className="recent-reviews flex flex-col font-openSans gap-4">
            <ReviewList apiId={film.id} />

            <section>
              <h1 className="text-beeYellow font-openSans">SIMILAR FILMS</h1>
              <hr className="border-beeYellow" />
              <FilmSlider
                userId={user?.id!}
                url={`https://api.themoviedb.org/3/movie/${film.id}/similar?language=en-US&page=1`}
                numOfFilms={8}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
