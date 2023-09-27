"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

interface Props {
  apiId: number;
  imageWidth: string;
  disableClick?: boolean;
}

export default function FilmImageCard({
  apiId,
  imageWidth,
  disableClick,
}: Props) {
  const [filmPath, setFilmPath] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${apiId}?language=en-US`;
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
            className={`${imageWidth} rounded-sm border-beeBrownLight border-2 hover:cursor-pointer`}
            src={filmPath && `https://image.tmdb.org/t/p/original/${filmPath}`}
            alt="backdrop"
            onClick={
              disableClick
                ? () => {}
                : () => {
                    router.push(`/film_details/${String(apiId)}`);
                  }
            }
          />
        ) : (
          <></>
        )
      ) : (
        <Skeleton className="h-32 w-24" />
      )}
    </>
  );
}
