"use client";
import { FilmOnDB } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";

interface Props {
  userId: string;
}
export default function MyUserFilmsContent({ userId }: Props) {
  const [watchedFilms, setWatchedFilms] = useState<FilmOnDB[]>();

  useEffect(() => {
    fetch(`/api/my_profile/films?userId=${userId}`)
      .then((res) => res.json())
      .then(({ films }) => {
        setWatchedFilms(films);
        console.log(films);
      });
  }, []);

  return (
    <>
      <h1>Your watched films</h1>
      <div className="grid grid-cols-5">
        {watchedFilms &&
          watchedFilms.map((film) => {
            return <FilmPoster apiId={film.tmdb_id} userId={userId} />;
          })}
      </div>
    </>
  );
}
