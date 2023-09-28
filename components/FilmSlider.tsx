"use client";
import { useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";
import LeftArrow from "./icons/LeftArrow";
import RightArrow from "./icons/RightArrow";
import { usePathname } from "next/navigation";
import { Film } from "@/lib/interfaces";
import { Skeleton } from "./ui/skeleton";

interface Props {
  userId: string;
  url: string;
  numOfFilms: number;
}

export default function FilmSlider({ userId, url, numOfFilms }: Props) {
  const [films, setFilms] = useState<Array<any>>([]);
  const [slidePosition, setSlidePosition] = useState<number>(0);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const getFilms = async () => {
    const authorization = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    try {
      const options = {
        mehtod: "GET",
        headers: {
          accept: "application/json",
          Authorization: authorization,
        },
      };
      const res = await fetch(url, options);
      const { results } = await res.json();

      setFilms(
        results.filter((film: Film) => {
          return film.poster_path !== null;
        })
      );
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-row gap-2 pt-5 pb-2 justify-center">
          {numOfFilms === 5 ? (
            <>
              <Skeleton className="w-48 h-64" />
              <Skeleton className="w-48 h-64" />
              <Skeleton className="w-48 h-64" />
              <Skeleton className="w-48 h-64" />
              <Skeleton className="w-48 h-64" />
            </>
          ) : (
            <>
              <Skeleton className="w-24 h-36" />
              <Skeleton className="w-24 h-36" />
              <Skeleton className="w-24 h-36" />
              <Skeleton className="w-24 h-36" />
              <Skeleton className="w-24 h-36" />
              <Skeleton className="w-24 h-36" />
              <Skeleton className="w-24 h-36" />
              <Skeleton className="w-24 h-36" />
            </>
          )}
        </div>
      ) : films.length ? (
        <>
          {films && (
            <ul
              className={`flex flex-row pt-5 pb-2 gap-2 justify-center ${
                pathname.includes("/film_details") ? "h-44" : "h-80"
              }`}
            >
              {films

                .slice(
                  numOfFilms * slidePosition,
                  numOfFilms * slidePosition + numOfFilms
                )
                .map((film) => {
                  return (
                    <li key={film.id}>
                      <FilmPoster
                        className={`rounded-md border-beeBrownLight border-2 hover:cursor-pointer object-cover ${
                          pathname.includes("/film_details") ? "w-24" : "w-48"
                        } `}
                        userId={userId}
                        apiId={film.id}
                      />
                    </li>
                  );
                })}
            </ul>
          )}
          <div className="flex flex-row">
            <button
              className="bg-beeBrownHeader text-beeYellow rounded-sm h-4 flex items-center shadow-sm  hover:scale-105"
              onClick={() => {
                if (slidePosition === 0) {
                  setSlidePosition(Math.floor(films.length / numOfFilms) - 1);
                } else {
                  setSlidePosition(slidePosition - 1);
                }
              }}
            >
              <LeftArrow />
            </button>
            <button
              className="bg-beeBrownHeader text-beeYellow rounded-sm h-4 flex items-center ml-auto shadow-sm hover:scale-105"
              onClick={() => {
                if (
                  slidePosition ===
                  Math.floor(films.length / numOfFilms) - 1
                ) {
                  setSlidePosition(0);
                } else {
                  setSlidePosition(slidePosition + 1);
                }
              }}
            >
              <RightArrow />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center py-6">
          <span className="font-openSans">No results</span>
        </div>
      )}
    </>
  );
}
