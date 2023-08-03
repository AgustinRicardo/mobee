"use client";

import { useEffect, useState } from "react";

export default function PopularFilms() {
  const [popularFilms, setPopularFilms] = useState<Array<any>>([]);

  const getPopularFilms = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
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
      console.log(results);
      setPopularFilms(results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPopularFilms();
  }, []);

  return (
    <>
      {popularFilms && (
        <div className="grid grid-cols-3 gap-6 py-5">
          {popularFilms.slice(0, 6).map((film) => {
            return (
              <div className="flex flex-row gap-3 ">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  alt={film.title}
                  className="w-28 h-auto rounded-md border-beeBeig border"
                />
                <div className="film-info flex flex-col py-5">
                  <span className="font-lora font-medium">{film.title}</span>
                  <span className="font-switzer opacity-60 font-thin text-base">
                    {film.release_date.slice(0, 4)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
