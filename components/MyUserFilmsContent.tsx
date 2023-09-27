"use client";
import { FilmOnDB } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";
import Pagination from "./Pagination";

interface Props {
  userId: string;
}
export default function MyUserFilmsContent({ userId }: Props) {
  const [watchedFilms, setWatchedFilms] = useState<FilmOnDB[]>();
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>();

  useEffect(() => {
    fetch(`/api/my_profile/films?userId=${userId}&page=${page}`)
      .then((res) => res.json())
      .then(({ films, maxPage }) => {
        setWatchedFilms(films);
        setMaxPage(maxPage);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <div className="wrapper py-4">
        <h1 className="text-beeYellow font-openSans font-medium text-base tracking-wide uppercase">
          Your watched films
        </h1>
        <hr className="border-beeYellow" />
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-5 gap-4">
          {watchedFilms &&
            watchedFilms.map((film) => {
              return (
                <FilmPoster
                  key={film.id}
                  apiId={film.tmdb_id}
                  userId={userId}
                  className="rounded-sm border-2 border-beeBrownLight"
                />
              );
            })}
        </div>
        <Pagination page={page} maxPage={maxPage} setPage={setPage} />
      </div>
    </>
  );
}
