"use client";
import { useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";
import { Film } from "@/lib/interfaces";

interface Props {
  url: string;
  userId: string;
}

export default function FilmList({ url, userId }: Props) {
  const [filmList, setFilmList] = useState<Film[]>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then(({ results }) => {
        setFilmList(results);
      });
  }, [url]);

  const renderFilm = (film: Film, index: number) => {
    return (
      <li key={index}>
        <FilmPoster
          userId={userId}
          src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
          alt={film.title}
          id={String(film.id)}
          className="rounded-md border-2 border-beeBrownLight min-w-full shadow-md hover:cursor-pointer"
        />
      </li>
    );
  };

  return (
    <ul className="grid grid-cols-5 gap-6 overflow-x-hidden py-6">
      {filmList.map((film: Film, index: number) => renderFilm(film, index))}
    </ul>
  );
}
