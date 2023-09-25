"use client";
import { FilmOnDB } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";

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
      <h1>Your watched films</h1>
      <div className="grid grid-cols-5">
        {watchedFilms &&
          watchedFilms.map((film) => {
            return (
              <FilmPoster key={film.id} apiId={film.tmdb_id} userId={userId} />
            );
          })}
      </div>
    </>
  );
}
