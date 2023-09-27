"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";
import { Film, FilmOnDB } from "@/lib/interfaces";
import Pagination from "./Pagination";

interface Props {
  url: string;
  userId: string;
  ownDB?: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}

export default function FilmList({
  url,
  userId,
  ownDB = false,
  page,
  setPage,
}: Props) {
  const [filmList, setFilmList] = useState<Film[] | FilmOnDB[]>([]);
  const [maxPage, setMaxPage] = useState<number>();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };
    if (ownDB) {
      fetch(url)
        .then((res) => res.json())
        .then(({ results, maxPage }) => {
          setFilmList(results);
          setMaxPage(maxPage);
        });
    } else {
      fetch(url, options)
        .then((res) => res.json())
        .then(({ results }) => {
          setFilmList(results);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, page]);

  return (
    <>
      <div className="wrapper flex flex-col">
        <ul className="grid grid-cols-5 gap-6 overflow-x-hidden py-6">
          {filmList &&
            filmList.map((film: Film | FilmOnDB) => {
              return (
                <li key={film.id}>
                  <FilmPoster
                    userId={userId}
                    apiId={
                      ownDB ? (film as FilmOnDB).tmdb_id : (film as Film).id
                    }
                    className="rounded-md border-2 border-beeBrownLight shadow-md hover:cursor-pointer"
                  />
                </li>
              );
            })}
        </ul>
        <Pagination page={page} setPage={setPage} maxPage={maxPage} />
      </div>
    </>
  );
}
