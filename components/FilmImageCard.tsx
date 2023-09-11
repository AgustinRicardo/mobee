"use client";
import { useEffect, useState } from "react";
import { FilmSkeleton } from "./Skeleton";

interface Props {
  filmId: number;
  imageWidth: string;
}

export default function FilmImageCard({ filmId, imageWidth }: Props) {
  const [filmPath, setFilmPath] = useState("");
  const imageStyle = `${imageWidth} rounded-sm border-beeBrownLight border-2 `;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${filmId}?language=en-US&append_to_response=credits`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.poster_path) {
          setFilmPath(data.poster_path);
        } else {
          setFilmPath("");
        }
      });
  }, [filmId]);

  return (
    <>
      {filmPath ? (
        <img
          className={imageStyle}
          src={filmPath && `https://image.tmdb.org/t/p/original/${filmPath}`}
          alt="backdrop"
        />
      ) : (
        <FilmSkeleton className="h-[138px] w-24" />
      )}
    </>
  );
}
