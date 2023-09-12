"use client";

import { useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";
import LeftArrow from "./icons/LeftArrow";
import RightArrow from "./icons/RightArrow";

interface Props {
  userId: string;
  url: string;
}

export default function FilmSlider({ userId, url }: Props) {
  const [films, setFilms] = useState<Array<any>>([]);
  const [slidePosition, setSlidePosition] = useState<number>(0);
  const getFilms = async () => {
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

      setFilms(results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <>
      {films && (
        <ul className="flex flex-row pt-5 pb-2 gap-2">
          {films.slice(5 * slidePosition, 5 * slidePosition + 5).map((film) => {
            return (
              <li key={film.id}>
                <FilmPoster
                  alt={film.title}
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  className=" rounded-md border-beeBrownLight border-2 hover:cursor-pointer basis-auto"
                  userId={userId}
                  apiId={film.id}
                />
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex flex-row">
        <button
          className="bg-beeYellow text-beeBrownBackground rounded-sm h-4 flex items-center shadow-sm"
          onClick={() => {
            if (slidePosition === 0) {
              setSlidePosition(3);
            } else {
              setSlidePosition(slidePosition - 1);
            }
          }}
        >
          <LeftArrow />
        </button>
        <button
          className="bg-beeYellow text-beeBrownBackground rounded-sm h-4 flex items-center ml-auto shadow-sm"
          onClick={() => {
            if (slidePosition === 3) {
              setSlidePosition(0);
            } else {
              setSlidePosition(slidePosition + 1);
            }
          }}
        >
          <RightArrow />
        </button>
      </div>
    </>
  );
}
