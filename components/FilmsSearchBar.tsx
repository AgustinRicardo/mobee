"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Film } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchIcon from "./icons/SearchIcon";
interface Props {
  className?: string;
  action: string;
  setFilmsOnNewList?: Dispatch<SetStateAction<Film[]>>;
  filmsOnNewList?: Film[];
  setFilmToReview?: Dispatch<SetStateAction<Film | null>>;
  setBackdropPath?: Dispatch<SetStateAction<string>>;
  userId?: string;
}
export default function FilmsSearchBar({
  className,
  action,
  setFilmsOnNewList,
  filmsOnNewList,
  setFilmToReview,
  setBackdropPath,
  userId,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}&region=ES`;
    const authorization = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    const options = {
      mehtod: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    };
    if (query !== null) {
      fetch(url, options)
        .then((response) => response.json())
        .then((json) => {
          setFilms(json.results);
        })
        .catch((error) => {
          console.error("ERROR ON FETCHING DATA", error);
        });
    }
  }, [query]);

  return (
    <>
      <div className={`flex ${className}`}>
        <span className="pr-2 py-1">Find a film</span>
        <div className="relative">
          <div className="flex flex-row items-center">
            <input
              className="bg-beeBeig text-beeBrownBackground rounded-sm px-2 py-1 w-[30ch] placeholder:text-beeBrownBackground placeholder:text-opacity-80"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                if (e.target.value === "") {
                  setFilms([]);
                }
                setQuery(e.target.value);
              }}
            />
            <SearchIcon />
          </div>
          {films && (
            <div className="absolute bg-beeBrownLight rounded-md overflow-hidden z-20 ">
              <ScrollArea className="h-28">
                <ul className="rounded-md flex flex-col ">
                  {films.map((film) => {
                    return (
                      <li
                        key={film.id}
                        className="hover:text-beeBeig font-semibold hover:bg-beeBrownLightDarker text-beeBrownBackground font-openSans text-sm px-2 py-1 text-start hover:cursor-pointer"
                        onClick={
                          action === "addFilmToList"
                            ? () => {
                                if (filmsOnNewList && setFilmsOnNewList) {
                                  if (
                                    !filmsOnNewList.find((filmOnList) => {
                                      return film.id === filmOnList.id;
                                    })
                                  ) {
                                    const listWithNewFilm =
                                      filmsOnNewList.concat(film);
                                    setFilmsOnNewList(listWithNewFilm);
                                  }
                                }
                              }
                            : action === "reviewFilm"
                            ? () => {
                                if (setFilmToReview) {
                                  setFilmToReview(film);
                                }
                              }
                            : action === "goToFilmDetails"
                            ? () => {
                                router.push(`/film_details/${film.id}`);
                              }
                            : action === "setBackdrop"
                            ? async () => {
                                if (setBackdropPath) {
                                  const backdropPath = `https://image.tmdb.org/t/p/original${film.backdrop_path}`;
                                  setBackdropPath(backdropPath);

                                  await fetch("/api/my_profile/backdropPath", {
                                    method: "PUT",
                                    body: JSON.stringify({
                                      backdropPath,
                                      userId,
                                    }),
                                  });
                                }
                              }
                            : () => {}
                        }
                      >
                        <span>{film.title}</span>
                        <span className="text-xs font-medium pl-2">
                          {film.release_date.slice(0, 4)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
