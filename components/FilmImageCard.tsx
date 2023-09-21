"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  apiId: number;
  imageWidth: string;
}

export default function FilmImageCard({ apiId, imageWidth }: Props) {
  const [filmPath, setFilmPath] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const imageStyle = `${imageWidth} rounded-sm border-beeBrownLight border-2 `;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${apiId}?language=en-US&append_to_response=credits`;
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
        setIsLoading(false);
      });
  }, [apiId]);

  return (
    <>
      {!isLoading ? (
        filmPath ? (
          <img
            className={imageStyle}
            src={filmPath && `https://image.tmdb.org/t/p/original/${filmPath}`}
            alt="backdrop"
            onClick={() => {
              router.push(`/film_details/${String(apiId)}`);
            }}
          />
        ) : (
          <></>
        )
      ) : (
        <Skeleton className="h-[138px] w-24" />
      )}
    </>
  );
}
