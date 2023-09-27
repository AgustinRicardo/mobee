"use client";
import { FilmOnDB } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import FilmPoster from "./FilmPoster";
import Pagination from "./Pagination";
import { Skeleton } from "./ui/skeleton";

interface Props {
  userId: string;
}
export default function MyUserFilmsContent({ userId }: Props) {
  const [watchedFilms, setWatchedFilms] = useState<FilmOnDB[]>();
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/my_profile/films?userId=${userId}&page=${page}`)
      .then((res) => res.json())
      .then(({ films, maxPage }) => {
        setWatchedFilms(films);
        setMaxPage(maxPage);
        setIsLoading(false);
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
      {isLoading ? (
        <div className="grid grid-cols-5 gap-4">
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
          <Skeleton className="w-48 h-72" />
        </div>
      ) : watchedFilms?.length ? (
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
          <Pagination
            page={page}
            maxPage={maxPage}
            setPage={setPage}
            setIsLoading={setIsLoading}
          />
        </div>
      ) : (
        <span className="flex flex-col w-full h-[60vh] justify-center items-center font-openSans">
          No film has been marked as watched
        </span>
      )}
    </>
  );
}
