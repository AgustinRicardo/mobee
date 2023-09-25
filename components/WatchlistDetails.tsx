"use client";
import { FilmOnDB, WatchStatus } from "@/lib/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";
import Pagination from "./Pagination";

interface Props {
  url: string;
  userId: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function WatchlistDetails({
  url,
  userId,
  page,
  setPage,
}: Props) {
  const [films, setFilms] = useState<FilmOnDB[]>();
  const [maxPage, setMaxPage] = useState<number>();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(({ watchlist, maxPage }) => {
        if (watchlist) {
          setFilms(watchlist.map((status: WatchStatus) => status.film));
          setMaxPage(maxPage);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-5">
        {films &&
          films.map((film) => {
            return (
              <FilmPoster
                className="rounded-sm border-2 border-beeBrownLight"
                key={film.id}
                apiId={film.tmdb_id}
                userId={userId}
              />
            );
          })}
      </div>
      <Pagination setPage={setPage} page={page} maxPage={maxPage} />
    </div>
  );
}
