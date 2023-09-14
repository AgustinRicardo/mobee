"use client";
import { useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";
import { Film, FilmOnDB } from "@/lib/interfaces";

interface Props {
  url: string;
  userId: string;
  ownDB?: boolean;
}

export default function FilmList({ url, userId, ownDB = false }: Props) {
  const [filmList, setFilmList] = useState<Film[] | FilmOnDB[]>([]);

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
        .then(({ results }) => {
          setFilmList(results);
          console.log(results);
        });
    } else {
      fetch(url, options)
        .then((res) => res.json())
        .then(({ results }) => {
          setFilmList(results);
        });
    }
  }, [url]);

  const renderFilm = (film: Film | FilmOnDB, index: number) => {
    return (
      <li key={index}>
        <FilmPoster
          userId={userId}
          apiId={ownDB ? (film as FilmOnDB).tmdb_id : (film as Film).id}
          className="rounded-md border-2 border-beeBrownLight shadow-md hover:cursor-pointer"
        />
      </li>
    );
  };

  return (
    <ul className="grid grid-cols-5 gap-6 overflow-x-hidden py-6">
      {filmList.map((film: Film | FilmOnDB, index: number) =>
        renderFilm(film, index)
      )}
    </ul>
  );
}
