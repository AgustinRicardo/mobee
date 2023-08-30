"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Film } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface Props {
  className: string;
  addFilm: boolean;
  setFilmsOnNewList?: Dispatch<SetStateAction<Film[]>>;
  filmsOnNewList?: Film[];
}
export default function FilmsSearchBar({
  className,
  addFilm,
  setFilmsOnNewList,
  filmsOnNewList,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false&query=${query}`;
    const authorization = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    const options = {
      mehtod: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        setFilms(json.results);
      })
      .catch((error) => {
        console.error("ERROR ON FETCHING DATA", error);
      });
  }, [query]);

  return (
    <>
      <div className={`flex ${className}`}>
        <span>Find a film</span>
        <div className="relative">
          <input
            className="bg-beeBeig text-beeBrownBackground rounded-sm py-0.5"
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          {films && (
            <div className="absolute bg-beeBrownLight">
              <ScrollArea className="h-28">
                <ul>
                  {films.map((film) => {
                    return (
                      <li
                        className="hover:bg-beeBeig hover:text-beeBrownBackground hover:cursor-pointer gap-1 flex"
                        onClick={
                          addFilm
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
                            : () => {
                                router.push(`/film_details/${film.id}`);
                              }
                        }
                        key={film.id}
                      >
                        <span>{film.title}</span>
                        <span>{film.release_date.slice(0, 4)}</span>
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
